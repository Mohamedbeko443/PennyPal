import { Container } from "@chakra-ui/react";
import Accounts from "../../components/Accounts";
import Balance from "../../components/Balance";
import Header from "../../components/Header";
import Transactions from "../../components/Transactions";

export default function Home() {
  return (
    <>
      <Container maxW={"8xl"}>
        <Header />
        <Balance />
        <Accounts />
        <Transactions />
      </Container>
    </>
  );
}
