import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { FaRegCreditCard } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function TransactionCard() {
  return (
    <Flex w={{base:'80%',md:'60%'}} cursor={'pointer'} _hover={{boxShadow : 'lg',ml:6}} transition={'all 0.3s ease'}  boxShadow={'md'} justify={'space-between'}  borderRadius={4} p={5}   >
        <Flex align={'center'} gap={3} >
        
        <Box>
            <Heading size={'lg'}> Category</Heading>
            <Text fontSize={'sm'} color={'gray.500'} >Des</Text>
        </Box>
        </Flex>

        <Box>
            <Heading mb={2} size={'lg'}>$12,312.00</Heading>
            <Flex ml={3} gap={2}>
            <FaEdit cursor={'pointer'} color='orange'  size={'20px'} />
            <MdDelete cursor={'pointer'} color='red'  size={'20px'}  />
            </Flex>
        </Box>
    </Flex>
  )
}
