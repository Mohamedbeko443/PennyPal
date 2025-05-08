import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react';
import { GoPlus } from "react-icons/go";
import EmptyMessage from './EmptyMessage';
import TransactionCard from './TransactionCard';


export default function Transactions() {
    const [empty, setEmpty] = useState(false);
    
    return (
        <Flex mt={4} w={'full'} direction={'column'} boxShadow={'md'} >
            <Flex bg={'#4299e1'} w={'full'} py={5} px={8} justify={'space-between'} align={'center'}>
                <Text color={'white'} fontWeight={'bold'} fontSize={'2xl'}     > Transactions </Text>
                <Button bg={'black'}  > <GoPlus /> Transactions</Button>
            </Flex>

            {
                empty && <Box  >
                    <EmptyMessage title='No transactions yet.' message='Click "Add Transaction" to get started.' />
                </Box>
            }

            <VStack p={5} gap={4} mt={7}>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
                <TransactionCard/>
            </VStack>
        </Flex>
    )
}
