import { Button, Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';


export default function Header() {

  return (
      <Flex 
      as="header" 
      align="center" 
      justify="space-between" 
      p={4}
      bg="white"
      boxShadow="sm"
      mb={4}
    >
      <Heading as="h1" size="2xl" color="#4299e1">
      PennyPal
      </Heading>
      
      <Flex align="center" gap={4}>
        <Text  display={{base:'none',md:'block'}} fontSize="md" color="gray.600">
          Hello, Mohamed Medhat
        </Text>
        
        <Button onClick={()=>alert("hello")} colorPalette={'red'} > <FiLogOut/> Logout</Button>
      </Flex>
    </Flex>
  )
}
