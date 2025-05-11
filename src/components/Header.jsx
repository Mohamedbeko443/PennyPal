import { Button, Flex, Heading,  Text } from '@chakra-ui/react';
import { FiLogOut } from 'react-icons/fi';
import useUserStore from '../store/user';
import useAuthStore from '../store/Auth';
import { useNavigate } from 'react-router-dom';
import { toaster } from "@/components/ui/toaster"




export default function Header() {
    const navigate = useNavigate();
    const {user} = useUserStore();
    

    const handleLogout = () => {
      useAuthStore.persist.clearStorage();
      useUserStore.persist.clearStorage();
      
      toaster.create({
        title : 'you have been logged out successfully',
        type : 'success'
      });

      navigate('/login');
    }


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
          Hello, {user.name}
        </Text>
        
        <Button onClick={handleLogout} colorPalette={'red'} > <FiLogOut/> Logout</Button>
      </Flex>
    </Flex>
  )
}
