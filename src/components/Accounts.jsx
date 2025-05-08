import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react'
import { GoPlus } from "react-icons/go";
import EmptyMessage from './EmptyMessage';
import { useState } from 'react';
import AccountCard from './AccountCard';

export default function Accounts() {
    const [empty, setEmpty] = useState(false)
    return (
        <Flex mt={2} w={'full'} direction={'column'} boxShadow={'md'}  >
            <Flex bg={'#4299e1'}  w={'full'} py={5} px={8} justify={'space-between'} align={'center'}>
                <Text color={'white'} fontWeight={'bold'} fontSize={'2xl'}     > Accounts </Text>
                <Button bg={'black'}  > <GoPlus /> Account</Button>
            </Flex>

            {
                empty && <Box >
                    <EmptyMessage title='No accounts yet.' message='Click "Add Account" to get started.' />
                </Box>
            }


            
                <VStack gap={4} mt={7}>
                <AccountCard/>
                <AccountCard/>
                <AccountCard/>
                <AccountCard/>
                </VStack>
                
        </Flex>
    )
}
