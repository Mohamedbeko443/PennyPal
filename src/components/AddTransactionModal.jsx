import { Button, Dialog, Field, Input, Portal, Stack, NativeSelect } from "@chakra-ui/react"

import { NumberInput } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import { Spinner } from "@chakra-ui/react"
import { useState } from "react";
import useFinancialStore from "../store/finance";



export default function AddTransactionModal({ open, setOpen }) {


    const { accounts, createTransaction } = useFinancialStore();
    const now = new Date();
    console.log(accounts);


    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        accountId: accounts[0]?.id,
        type: 'INCOME',
        amount: 0,
        category: 'FOOD',
        description: '',
        date: now.toISOString()
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (formData.description < 3 || formData.amount === 0) {
            toaster.create({
                title: 'Please Enter valid data',
                description: 'Account name must be at least 3 characters and initialBalance at least 100',
                type: 'error'
            })
            return
        }


        try {
            console.log(formData);
            setLoading(true);
            const newAccount = await createTransaction(formData);
            console.log(newAccount);
            setOpen(false);
            resetForm();
        }
        catch {
            null
        }
        finally {
            setLoading(false);
        }
    }

    const resetForm = () => {
        setFormData({
            accountId: '',
            type: '',
            amount: 0,
            category: '',
            description: '',
            date: now.toISOString()
        });
    }

    return (
        <Dialog.Root size={{ base: 'xs', md: 'md' }} open={open} onOpenChange={(e) => setOpen(e.open)} placement={'center'}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Add Transaction</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body pb="4">
                            <Stack gap="4">
                                <Field.Root>
                                    <Field.Label>Description</Field.Label>
                                    <Input
                                        value={formData.description}
                                        onChange={(e) => handleChange('description', e.target.value)}
                                        placeholder="e.g. Main Bank Account"
                                    />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Type</Field.Label>
                                    <NativeSelect.Root size="sm">
                                        <NativeSelect.Field
                                            value={formData.type}
                                            onChange={(e) => handleChange('type', e.target.value)}
                                        >
                                            <option value="INCOME">Income</option>
                                            <option value="EXPENSE">Expense</option>
                                        </NativeSelect.Field>
                                        <NativeSelect.Indicator />
                                    </NativeSelect.Root>
                                </Field.Root>


                                <Field.Root>
                                    <Field.Label>Account</Field.Label>
                                    <NativeSelect.Root size="sm">
                                        <NativeSelect.Field
                                            value={formData.accountId}
                                            onChange={(e) => handleChange('accountId', e.target.value)}
                                        >
                                            {
                                                accounts.map(account => <option key={account.id} value={account.id}>{account.accountName}</option>)
                                            }
                                        </NativeSelect.Field>
                                        <NativeSelect.Indicator />
                                    </NativeSelect.Root>
                                </Field.Root>


                                <Field.Root>
                                    <Field.Label>Cat</Field.Label>
                                    <NativeSelect.Root size="sm">
                                        <NativeSelect.Field
                                            value={formData.category}
                                            onChange={(e) => handleChange('category', e.target.value)}
                                        >
                                            <option value="FOOD">Food</option>
                                            <option value="EDUCATION">Education</option>
                                            <option value="TRANSPORT">Transport</option>
                                            <option value="HEALTHCARE">Health Care</option>
                                            <option value="OTHER">Other</option>
                                        </NativeSelect.Field>
                                        <NativeSelect.Indicator />
                                    </NativeSelect.Root>
                                </Field.Root>

                                <Field.Root >
                                    <Field.Label>Amount</Field.Label>
                                    <NumberInput.Root
                                        w={'full'}
                                        min={1}
                                        value={formData.amount}
                                        onValueChange={(e) => handleChange('amount', +e.value)}
                                    >
                                        <NumberInput.Control />
                                        <NumberInput.Input />
                                    </NumberInput.Root>
                                </Field.Root>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button onClick={() => { setOpen(false); resetForm(); }} variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                disabled={loading}
                                onClick={handleSubmit}
                                colorScheme="blue"
                            >
                                {loading ? <Spinner size={'xs'} /> : 'Add Account'}
                            </Button>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>

    )
}
