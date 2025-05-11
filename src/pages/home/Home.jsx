import { Container } from "@chakra-ui/react";
import Accounts from "../../components/Accounts";
import Balance from "../../components/Balance";
import Header from "../../components/Header";
import Transactions from "../../components/Transactions";
import useFinancialStore from "../../store/finance";
import { useEffect } from "react";

export default function Home() {
    
    const {fetchAccounts , accounts , fetchTransactions , transactions} = useFinancialStore();
   

    useEffect(()=>{
      fetchAccounts();
    },[])

    useEffect(()=>{
      fetchTransactions();
    },[])

    console.log(accounts);
    //console.log(transactions);

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
