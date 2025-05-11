import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FaRegCreditCard } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AlertDialogT from './AlertDialogT';
import { useState } from 'react';
import UpdateTransaction from './UpdateTransaction';


export default function TransactionCard({transaction}) {

  const [open , setOpen] = useState(false);
  const [openUpdate , setOpenUpdate] = useState(false);


  return (
    <Flex w={{base:'80%',md:'60%'}} cursor={'pointer'} _hover={{boxShadow : 'lg',ml:6}} transition={'all 0.3s ease'}  boxShadow={'md'} justify={'space-between'}  borderRadius={4} p={5}   >
        <Flex align={'center'} gap={3} >
        
        <Box>
            <Heading size={'lg'}> {transaction.category}</Heading>
            <Text fontSize={'sm'} color={'gray.500'} >{transaction.description}</Text>
        </Box>
        </Flex>

        <Box>
            <Heading mb={2} size={'lg'}>{transaction.amount}$</Heading>
            <Flex ml={3} gap={2}>
            <FaEdit onClick={()=>setOpenUpdate(true)} cursor={'pointer'} color='orange'  size={'20px'} />
            <MdDelete onClick={()=> setOpen(true)} cursor={'pointer'} color='red'  size={'20px'}  />
            </Flex>
        </Box>

        <AlertDialogT  open={open} setOpen={setOpen} id={transaction.id}   />
        <UpdateTransaction open={openUpdate} setOpen={setOpenUpdate} transaction={transaction}  />
    </Flex>
  )
}
