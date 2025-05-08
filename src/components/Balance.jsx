import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa6";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaArrowCircleDown } from "react-icons/fa";


export default function Balance() {
    return (
        <Flex w={'full'} direction={'column'} boxShadow={'md'}  >
                <Box w={'full'} py={3} px={8} bg={'#4299e1'}  >
                    <Flex  w={'fit'} align={'center'}>
                    <FaWallet color="white" />
                    <Text  fontWeight={'bold'} fontSize={'2xl'} color={'white'} ml={3} as={'span'} > Total Balance </Text>
                    </Flex>
                </Box>
                <Box py={3} px={8} >
                    <Heading size={'3xl'} >$0.00</Heading>
                </Box>

                <Flex py={3} px={8} gap={10} justify={'flex-start'} >

                    <Flex  gap={2} alignItems={'center'} >
                        <FaCircleArrowUp   color="green" />

                        <Box>
                        <Text>Monthly Income</Text>
                        <Text>$0.00</Text>
                        </Box>
                    </Flex>

                    <Flex gap={2} alignItems={'center'} >  
                    <FaArrowCircleDown color="red" />
                        <Box>
                        <Text>Monthly Expenses</Text>
                        <Text>$0.00</Text>
                        </Box>
                    </Flex>
                </Flex>
        </Flex>
    )
}
