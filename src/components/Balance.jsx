import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa6";
import { FaCircleArrowUp } from "react-icons/fa6";
import { FaArrowCircleDown } from "react-icons/fa";
import useFinancialStore from "../store/finance";


export default function Balance() {
    const {totalBalance , monthlyIncome , monthlyExpenses} = useFinancialStore();
    console.log(totalBalance);


    return (
        <Flex w={'full'} direction={'column'} boxShadow={'md'}  >
                <Box w={'full'} py={3} px={8} bg={'#4299e1'}  >
                    <Flex  w={'fit'} align={'center'}>
                    <FaWallet color="white" />
                    <Text  fontWeight={'bold'} fontSize={'2xl'} color={'white'} ml={3} as={'span'} > Total Balance </Text>
                    </Flex>
                </Box>
                <Box py={3} px={8} >
                    <Heading size={'3xl'} >${totalBalance}</Heading>
                </Box>

                <Flex py={3} px={8} gap={10} justify={'flex-start'} >

                    <Flex  gap={2} alignItems={'center'} >
                        <FaCircleArrowUp   color="green" />

                        <Box>
                        <Text>Monthly Income</Text>
                        <Text>${monthlyIncome}</Text>
                        </Box>
                    </Flex>

                    <Flex gap={2} alignItems={'center'} >  
                    <FaArrowCircleDown color="red" />
                        <Box>
                        <Text>Monthly Expenses</Text>
                        <Text>${monthlyExpenses}</Text>
                        </Box>
                    </Flex>
                </Flex>
        </Flex>
    )
}
