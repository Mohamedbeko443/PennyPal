import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { GoPlus } from "react-icons/go";
import EmptyMessage from './EmptyMessage';
import { useState } from 'react';
import AccountCard from './AccountCard';
import AddAccountModal from './AddAccountModal';
import useFinancialStore from '../store/finance';
import LoadingScreen from './LoadingScreen';
import AlertDialog from './AlertDialog';

export default function Accounts() {
    const [open , setOpen] = useState(false);
    const {accounts , loading} = useFinancialStore();
   


    if(loading)
    {
        return <LoadingScreen/>
    }


    return (
        <Flex mt={4}  w={'full'} direction={'column'} boxShadow={'md'}  >

            <Flex bg={'#4299e1'}  w={'full'} py={5} px={8} justify={'space-between'} align={'center'}>
                <Text color={'white'} fontWeight={'bold'} fontSize={'2xl'} > Accounts </Text>
                <Button bg={'black'} onClick={()=> setOpen(true)} > <GoPlus /> Account</Button>
            </Flex>

            {
                accounts.length === 0 && <Box >
                    <EmptyMessage title='No accounts yet.' message='Click "Add Account" to get started.' />
                </Box>
            }


                <VStack p={5}  gap={4} mt={7}>
                {
                    accounts.map(account => <AccountCard   key={account.id} account={account}  />)
                }
                </VStack>
                

                <AddAccountModal open={open} setOpen={setOpen}  />
        </Flex>
    )
}
