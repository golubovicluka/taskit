import { DeleteIcon } from '@chakra-ui/icons';
import { Center, Wrap, WrapItem, Text, Button, Box, useColorMode, Toast, useToast, Grid, Flex, GridItem, SimpleGrid } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react'
import { ITask } from '../models/ITask';
import { fDel, fGet } from '../hooks/useFetch';
import { SERVER_URL } from '../config/backend-url';
import Task from './Task';
import TaskCard from './TaskCard';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import EditModal from './EditModal';
import { ICreateEditTask } from '../models/ICreateEditTask';
import { Link as LinkRouter } from 'react-router-dom';

type Props = {}

// Task komponenta koje se renderuje
const ViewTasks = (props: Props) => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [editTask, setEditTask] = useState<ICreateEditTask>({
        title: '',
        description: '',
        status: '',
    });
    const [openModal, setOpenModal] = useState<boolean>(false);

    const toast = useToast()
    // const tasksRef = useRef<React.MutableRefObject<undefined>>()
    const [tasksRef] = useAutoAnimate<HTMLDivElement>()


    const getTasks = () => {
        fGet(`${SERVER_URL}/tasks`)
            .then(res => {
                console.log(res);
                setTasks(res)
            })
    }

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id))
        fDel(`${SERVER_URL}/tasks/${id}`, [])
            .then(res => {
                console.log(res);
                if (!res.error) {
                    toast({
                        position: "top",
                        title: 'Task deleted',
                        description: "Task deleted successfuly",
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    })
                }
            })
    }

    const editSingleTask = (task: ICreateEditTask) => {
        setEditTask(task)
        setOpenModal(true)
    }

    // Automatsko pozivanje getTaskova
    useEffect(() => {
        getTasks()
    }, [])

    return (
        <Center>
            <Box display={'grid'} mb={{ xl: '5%', sm: '15%' }} mt={'2%'} borderWidth='1px' borderRadius='lg' boxShadow={'xl'}>
                <Center m="15px">
                    <Text fontWeight={700}>
                        {tasks.length > 0 ? <Text fontWeight={700}>List of all your tasks</Text> :
                            <Box justifyContent={'center'} alignItems={'center'}>
                                <Text m={7} fontWeight={700}>No tasks found, create one?</Text>
                                <Center>
                                    <LinkRouter to="/createtasks">
                                        <Button colorScheme={'blue'}>Create task</Button>
                                    </LinkRouter>
                                </Center>
                            </Box>
                        }</Text>

                </Center>
                <Flex
                    ref={tasksRef}
                    display={{ '2xl': 'grid', xl: 'grid', md: 'grid', sm: 'flex' }}
                    flexDirection={'column'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    p={{ xl: '2', sm: '10' }}
                    gap={10}
                    mx={{ xl: '25px', md: '50px' }}
                    mb={{ xl: '20px', sm: '5%' }}
                    flexShrink={0}
                    gridTemplateColumns={{ '2xl': '1fr 1fr 1fr', xl: '1fr 1fr' }}
                >
                    {tasks.map((task, i) => <TaskCard key={task.id} id={task.id} title={task.title} description={task.description} status={task.status} deleteTask={deleteTask} editTask={editSingleTask} />)
                    }
                </Flex>
                <EditModal editTaskObj={editTask} openModal={openModal} closeModal={() => setOpenModal(false)} />
            </Box>
        </Center >
    )
}

export default ViewTasks

