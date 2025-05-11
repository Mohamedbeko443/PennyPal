import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FaRegCreditCard } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AlertDialog from './AlertDialog';
import { useState } from 'react';
import UpdateAccount from './UpdateAccount';

export default function AccountCard({account}) {

      const [open , setOpen] = useState(false);
      const [openUpdate,setOpenUpdate] = useState(false);

  return (
    <Flex w={{base:'80%',md:'60%'}} cursor={'pointer'} _hover={{boxShadow : 'lg',ml:6}} transition={'all 0.3s ease'}  boxShadow={'md'} justify={'space-between'}  borderRadius={4} p={5}   >
        <Flex align={'center'} gap={3} >
        <FaRegCreditCard  color='#4299e1' />
        <Box>
            <Heading size={'lg'}>{account.accountName}</Heading>
            <Text fontSize={'sm'} color={'gray.500'} >{account.accountType}</Text>
        </Box>
        </Flex>

        <Box>
            <Heading mb={2} size={'lg'}>{account.balance}$</Heading>
            <Flex ml={3} gap={2}>
            <FaEdit onClick={()=>setOpenUpdate(true)} cursor={'pointer'} color='orange'  size={'20px'} />
            <MdDelete onClick={()=> setOpen(true)} cursor={'pointer'} color='red'  size={'20px'}  />
            </Flex>
        </Box>

        <AlertDialog  open={open} setOpen={setOpen} id={account.id} />
        <UpdateAccount open={openUpdate} setOpen={setOpenUpdate} account={account} />
    </Flex>
  )
}
