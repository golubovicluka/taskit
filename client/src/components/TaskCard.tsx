import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Box,
    Center,
    Heading,
    Text,
    Stack,
    useColorModeValue,
    IconButton,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { ETaskStatusReverse } from '../models/ETaskStatusReverse';
import { ITask } from '../models/ITask';
import { AuthContext } from '../providers/AuthProvider';

interface ITaskCard extends ITask {
    deleteTask: Function
    editTask: Function
}

const TaskCard = ({ title, id, description, status = "IN_PROGRESS", deleteTask, editTask }: ITaskCard) => {
    const { auth } = useContext(AuthContext);

    return (
        <Center py={6}>
            <Box
                alignItems={'center'}
                maxW={'445px'}
                minW={'445px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={3}
            // overflow={'hidden'}
            >
                <Stack>
                    <Text
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'xl'}
                        letterSpacing={1.1}>
                        Task
                    </Text>
                    <Heading
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        {title}
                    </Heading>
                    <Text color={'gray.500'}>
                        {description}
                    </Text>
                </Stack>
                <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
                    <Stack direction={'column'} spacing={0} fontSize={'sm'}>
                        <Text fontWeight={600}>Task</Text>
                        <Text>{ETaskStatusReverse[status]}</Text>
                    </Stack>
                    <Stack mt={6} direction={'row'} spacing={4} align={'center'} justifyContent={'flex-end'}>
                        <Stack>
                            <IconButton
                                onClick={() => editTask({ id, description, title, status })}
                                variant='outline'
                                colorScheme='blue'
                                aria-label='Edit task'
                                icon={<EditIcon />}
                            />
                        </Stack>
                        <Stack>
                            <IconButton
                                onClick={() => deleteTask(id)}
                                variant='outline'
                                colorScheme='red'
                                aria-label='Delete task'
                                icon={<DeleteIcon />}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Box>
        </Center >
    );
}
export default TaskCard