import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/react"
import { useState } from "react";
import useFinancialStore from "../store/finance";



export default function AlertDialog({open , setOpen , id }) {
    const [loading , setLoading] = useState(false);
    const {error , deleteAccount} = useFinancialStore();

    console.log(id);
    


    const handleDelete = async () => {
        try{
            setLoading(true)
            await deleteAccount(id);
            setOpen(false);
        }
        catch (err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }
    }

    if(error)
    {
        null
    }

    return (
        <Dialog.Root  open={open} onOpenChange={(e) => setOpen(e.open)} placement={'center'} size={{base:'xs',md:'md'}}  role="alertdialog">
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Are you sure?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <p>
                                This action cannot be undone. This will permanently delete your
                                Account/Transaction and remove your data from our systems.
                            </p>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button  onClick={handleDelete} disabled={loading}  colorPalette="red">{ loading ? <Spinner/>  : "Delete"}</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}