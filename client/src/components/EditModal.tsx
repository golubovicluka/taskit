import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Center } from "@chakra-ui/react"
import { useEffect } from "react"
import { ICreateEditTask } from "../models/ICreateEditTask"
import CreateTasks from "../views/CreateTaskForm/CreateTaskForm"

interface IProps {
    editTaskObj: ICreateEditTask
    openModal: boolean
    closeModal: Function
}

const EditModal: React.FC<IProps> = ({ editTaskObj, openModal, closeModal }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(editTaskObj);

    const handleClose = () => {
        closeModal(false)
        onClose()
    }

    useEffect(() => {
        if (openModal) onOpen()
    }, [openModal])

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <Center>
                        <ModalHeader>Edit</ModalHeader>
                    </Center>
                    <ModalCloseButton />
                    <ModalBody>
                        <CreateTasks editTaskObj={editTaskObj} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditModal