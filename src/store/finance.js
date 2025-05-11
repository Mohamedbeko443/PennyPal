import { create } from 'zustand';
import axios from 'axios';
import { toaster } from "@/components/ui/toaster"
import useAuthStore from './Auth';

    const base = import.meta.env.VITE_BASE_URL;

    
    
    

const useFinancialStore = create((set, get) => ({
    // State
    accounts: [],
    transactions: [],
    loading: false,
    error: null,
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    expenseBreakdown: {},

    

    // Helper function to handle API calls
   apiRequest: async (method, endpoint, data = undefined) => {
    const { token } = useAuthStore.getState();

    set({ loading: true, error: null });
    try {
        const config = {
            method,
            url: `${base}${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        };

        // Only attach data if it's defined
        if (data !== undefined && data !== null) {
            config.data = data;
        }

        const response = await axios(config);
        return response.data;
    } catch (error) {
        set({ error: error.response?.data?.message || error.message });
        throw error;
    } finally {
        set({ loading: false });
    }
},

    // Account Actions
    fetchAccounts: async () => {
        try {
            const accounts = await get().apiRequest('GET', '/api/accounts');
            set({ accounts });
            get().calculateFinancials();
        } catch (error) {
            console.error('Failed to fetch accounts:', error);
            toaster.create({
                title :'Failed to fetch accounts! please try again.',
                type : 'error'
            })
        }
    },

    createAccount: async (accountData) => {
        try {
            const newAccount = await get().apiRequest('POST', '/api/accounts', accountData);
            set((state) => ({ accounts: [...state.accounts, newAccount] }));
            get().calculateFinancials();
            toaster.create({
                title : 'Account Has Been Created Successfully',
                type : 'success'
            })
            return newAccount;
        } catch (error) {
            console.error('Failed to create account:', error);
            toaster.create({
                title : 'something went wrong! please try again.',
                type : 'error'
            })
            throw error;
        }
    },

    updateAccount: async (id, updates) => {
        try {
            const updatedAccount = await get().apiRequest('PUT', `/api/accounts/${id}`, updates);
            set((state) => ({
                accounts: state.accounts.map((account) =>
                    account.id === id ? updatedAccount : account
                ),
            }));
            get().calculateFinancials();
            toaster.create({
                title : 'Account Has Been Updated Successfully!',
                type : 'success'
            })
            return updatedAccount;
        } catch (error) {
            console.error('Failed to update account:', error);
            toaster.create({
                title : 'something went wrong! please try again.',
                type : 'error'
            })
            throw error;
        }
    },

    deleteAccount: async (id) => {
        try {
            await get().apiRequest('DELETE', `/api/accounts/${id}`);
            set((state) => ({
                accounts: state.accounts.filter((account) => account.id !== id),
                transactions: state.transactions.filter(
                    (transaction) => transaction.accountId !== id
                ),
            }));
            get().calculateFinancials();
            toaster.create({
                title : 'Account Has Been Deleted Successfully!',
                type : 'success'
            })
        } catch (error) {
            console.error('Failed to delete account:', error);
            toaster.create({
                title : 'something went wrong! please try again.',
                type : 'error'
            })
            throw error;
        }
    },

    // Transaction Actions
    fetchTransactions: async (accountId = null) => {
        try {
            const endpoint = accountId
                ? `/transactions/account/${accountId}`
                : '/api/transactions/user/all';
            const transactions = await get().apiRequest('GET', endpoint);
            set({ transactions });
            get().calculateFinancials();
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            toaster.create({
                title :'something went wrong! please try again.',
                type : 'error'
            })
        }
    },

    createTransaction: async (transactionData) => {
        try {
            const newTransaction = await get().apiRequest(
                'POST',
                '/api/transactions',
                transactionData
            );
            set((state) => ({ transactions: [...state.transactions, newTransaction] }));

            // Update account balance
            const balanceChange = newTransaction.type === 'INCOME'
                ? newTransaction.amount
                : -newTransaction.amount;

            set((state) => ({
                accounts: state.accounts.map((account) =>
                    account.id === newTransaction.accountId
                        ? { ...account, balance: account.balance + balanceChange }
                        : account
                ),
            }));

            get().calculateFinancials();
            toaster.create({
                title : 'Transaction Has Been Added Successfully!',
                type : 'success'
            })
            return newTransaction;
        } catch (error) {
            console.error('Failed to create transaction:', error);
            toaster.create({
                title :'something went wrong! please try again.',
                type : 'error'
            })
            throw error;
        }
    },

    updateTransaction: async (id, updates) => {
        try {
            const oldTransaction = get().transactions.find(t => t.id === id);
            if (!oldTransaction) return;

            const updatedTransaction = await get().apiRequest(
                'PUT',
                `/api/transactions/${id}`,
                updates
            );

            set((state) => ({
                transactions: state.transactions.map((t) =>
                    t.id === id ? updatedTransaction : t
                ),
            }));

            // If amount or type changed, update account balances
            if (updates.amount || updates.type) {
                // Revert old transaction effect
                const oldBalanceChange = oldTransaction.type === 'INCOME'
                    ? -oldTransaction.amount
                    : oldTransaction.amount;

                // Apply new transaction effect
                const newBalanceChange = updatedTransaction.type === 'INCOME'
                    ? updatedTransaction.amount
                    : -updatedTransaction.amount;

                set((state) => ({
                    accounts: state.accounts.map((account) =>
                        account.id === updatedTransaction.accountId
                            ? {
                                ...account,
                                balance: account.balance + oldBalanceChange + newBalanceChange
                            }
                            : account
                    ),
                }));
            }

            get().calculateFinancials();
            toaster.create({
                title : 'Transaction Has Been Updated Successfully!',
                type : 'success'
            })
            return updatedTransaction;
        } catch (error) {
            console.error('Failed to update transaction:', error);
            toaster.create({
                title : 'Something went wrong! please try again.',
                type : 'error'
            })
            throw error;
        }
    },

    deleteTransaction: async (id) => {
        try {
            const transactionToDelete = get().transactions.find(t => t.id === id);
            if (!transactionToDelete) return;

            await get().apiRequest('DELETE', `/api/transactions/${id}`);

            set((state) => ({
                transactions: state.transactions.filter((t) => t.id !== id),
            }));

            // Revert the transaction's effect on the account
            const balanceChange = transactionToDelete.type === 'INCOME'
                ? -transactionToDelete.amount
                : transactionToDelete.amount;

            set((state) => ({
                accounts: state.accounts.map((account) =>
                    account.id === transactionToDelete.accountId
                        ? { ...account, balance: account.balance + balanceChange }
                        : account
                ),
            }));

            get().calculateFinancials();
            toaster.create({
                title : 'Transaction Has Been Deleted Successfully!',
                type : 'success'
            })
        } catch (error) {
            console.error('Failed to delete transaction:', error);
            toaster.create({
                title : 'Something went wrong! please try again ',
                type : 'error'
            })
            throw error;
        }
    },

    // Financial Calculations
    calculateFinancials: () => {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        // Calculate total balance
        const totalBalance = get().accounts.reduce(
            (total, account) => total + account.balance,
            0
        );

        // Calculate monthly income and expenses
        let monthlyIncome = 0;
        let monthlyExpenses = 0;
        const expenseBreakdown = {};

        get().transactions.forEach((transaction) => {
            const transactionDate = new Date(transaction.date);
            const isCurrentMonth =
                transactionDate.getMonth() === currentMonth &&
                transactionDate.getFullYear() === currentYear;

            if (isCurrentMonth) {
                if (transaction.type === 'INCOME') {
                    monthlyIncome += transaction.amount;
                } else {
                    monthlyExpenses += transaction.amount;
                    const category = transaction.category || 'Other';
                    expenseBreakdown[category] = (expenseBreakdown[category] || 0) + transaction.amount;
                }
            }
        });

        set({
            totalBalance,
            monthlyIncome,
            monthlyExpenses,
            expenseBreakdown
        });
    },

    // Get transactions for a specific account
    getAccountTransactions: (accountId) => {
        return get().transactions.filter(
            (transaction) => transaction.accountId === accountId
        );
    },
}));

export default useFinancialStore;