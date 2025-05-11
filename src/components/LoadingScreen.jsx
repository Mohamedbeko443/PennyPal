import { Flex, Spinner } from "@chakra-ui/react";


export default function LoadingScreen() {
    return (
        <Flex w={'full'} justify={'center'} align={'center'} h={'300px'}  >
            <Spinner size="lg" />
        </Flex>
    )
}
