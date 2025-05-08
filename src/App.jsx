import { Button, HStack } from "@chakra-ui/react"

function App() {
  

  return (
    <>
      <HStack>
      <Button onClick={()=> alert('hello chakra')} >Click me</Button>
      <Button>Click me</Button>
      </HStack>
    </>
  )
}

export default App
