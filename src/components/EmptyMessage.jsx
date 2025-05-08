import { EmptyState, VStack } from "@chakra-ui/react"
import { LuShoppingCart } from "react-icons/lu"


export default function EmptyMessage({title , message}) {
    return (
        <EmptyState.Root  >
            <EmptyState.Content>
                <VStack textAlign="center">
                    <EmptyState.Title>{title}</EmptyState.Title>
                    <EmptyState.Description>
                    {message}
                    </EmptyState.Description>
                </VStack>
            </EmptyState.Content>
        </EmptyState.Root>
    )
}
