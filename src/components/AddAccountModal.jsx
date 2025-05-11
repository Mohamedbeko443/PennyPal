import { Button, Dialog, Field, Input, Portal, Stack, NativeSelect } from "@chakra-ui/react"

import { NumberInput } from "@chakra-ui/react"
import { toaster } from "@/components/ui/toaster"
import { Spinner } from "@chakra-ui/react"
import { useState } from "react";
import useFinancialStore from "../store/finance";


export default function AddAccountModal({open , setOpen}) {

    const {createAccount} = useFinancialStore();

    

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        accountName: '',
        accountType: 'BANK',
        initialBalance: 0
    });

    const handleChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        if (formData.accountName.length < 3 || formData.initialBalance < 100) {
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
            const newAccount = await createAccount(formData);
            console.log(newAccount);
            setOpen(false);
            resetForm();
        }
        catch  {
            null
        }
        finally {
            setLoading(false);
        }
    }

    const resetForm = () => {
        setFormData({
            accountName: '',
            accountType: 'Bank Account',
            initialBalance: 0
        });
    }

  return (
            <Dialog.Root size={{ base: 'xs', md: 'md' }} open={open} onOpenChange={(e) => setOpen(e.open)} placement={'center'}>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Add Account</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body pb="4">
                            <Stack gap="4">
                                <Field.Root>
                                    <Field.Label>Account Name</Field.Label>
                                    <Input 
                                        value={formData.accountName} 
                                        onChange={(e) => handleChange('accountName', e.target.value)} 
                                        placeholder="e.g. Main Bank Account" 
                                    />
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Account Type</Field.Label>
                                    <NativeSelect.Root size="sm">
                                        <NativeSelect.Field
                                            value={formData.accountType}
                                            onChange={(e) => handleChange('accountType', e.target.value)}
                                        >
                                            <option value="BANK">Bank Account</option>
                                            <option value="CASH">Cash</option>
                                            <option value="CREDIT_CARD">Credit Card</option>
                                            <option value="DEBIT_CARD">Debit Card</option>
                                        </NativeSelect.Field>
                                        <NativeSelect.Indicator />
                                    </NativeSelect.Root>
                                </Field.Root>

                                <Field.Root >
                                    <Field.Label>Initial Balance</Field.Label>
                                    <NumberInput.Root 
                                        w={'full'}
                                        min={100}
                                        value={formData.initialBalance} 
                                        onValueChange={(e) => handleChange('initialBalance', +e.value)}
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
