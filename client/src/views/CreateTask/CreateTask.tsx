
import { Flex, useColorModeValue, Stack, Heading } from '@chakra-ui/react'
import CreateTaskForm from '../CreateTaskForm/CreateTaskForm'

type Props = {}

const CreateTask = (props: Props) => {
    return (
        <Flex
            minH={'70vh'}
            width={'100%'}
            height={'100%'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')} >
            <Stack spacing={8} mx={'auto'} maxW={'100%'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Create new task
                    </Heading>
                </Stack>
                <CreateTaskForm />
            </Stack>
        </Flex >
    )
}

export default CreateTask