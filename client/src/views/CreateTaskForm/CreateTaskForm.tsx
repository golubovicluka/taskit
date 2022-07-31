import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useToast, Box, Text, Flex, useColorModeValue, Stack, Heading, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button, Textarea, Link, Checkbox, Select, Center } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { ITask } from '../../models/ITask'
import { Link as LinkRoute } from "react-router-dom"
import { SERVER_URL } from '../../config/backend-url'
import { fPatch, fPost } from '../../hooks/useFetch'
import { uniqueID } from '../../libs/uniqueID'
import { ICreateEditTask } from '../../models/ICreateEditTask'
import { ETaskStatus } from '../../models/ETaskStatus'

interface IProps {
    editTaskObj?: ICreateEditTask
}

const CreateTaskForm = ({ editTaskObj }: IProps) => {
    const toast = useToast()
    const initialTask: ITask = {
        description: '',
        title: ''
    }
    const [editMode, setEditMode] = useState<boolean>(false)
    const [task, setTask] = useState<ITask>(initialTask)

    const statusHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setTask({
            ...task,
            status: ETaskStatus[e.target.value]
        })
    }

    const handleChange = (e: React.ChangeEvent<any>) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        !editMode && fPost(`${SERVER_URL}/tasks`, task)
            .then(
                res => {
                    if (res.id) {
                        toast({
                            position: "top",
                            title: 'Task',
                            description: "Task created successfuly",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                        setTask(initialTask)
                    }

                }
            )
        editMode && fPatch(`${SERVER_URL}/tasks`, task)
            .then(
                res => {
                    if (res.id) {
                        toast({
                            position: "top",
                            title: 'Task',
                            description: "Task updated successfuly",
                            status: 'success',
                            duration: 3000,
                            isClosable: true,
                        })
                        setTask(initialTask)
                    }
                }
            )
    }


    useEffect(() => {
        console.log(initialTask);
    }, [task])

    useEffect(() => {
        if (editTaskObj) {
            setEditMode(true)
            setTask(editTaskObj)
        }
        console.log(editTaskObj);
    }, [editTaskObj])

    return (
        <Box
            alignItems={'center'}
            rounded={'lg'}
            p={10}
            width={'80vw'}
            maxH={'450px'}
            maxW={'40px'}
            minW={'400px'}
            bg={useColorModeValue('white', 'gray.700')}
        >
            <form onSubmit={handleSubmit}>
                <Center>

                    <Stack spacing={4}>
                        <FormControl id="title" isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input value={task.title} type="text" name="title" onChange={handleChange} />
                        </FormControl>

                        <FormControl id="description" isRequired>
                            <FormLabel>Description</FormLabel>
                            <Textarea value={task.description} name="description" onChange={handleChange} placeholder={"Task description..."} />
                        </FormControl>

                        {
                            editMode &&
                            <Select placeholder='' onChange={statusHandler}>
                                <option value='IN_PROGRESS' selected={task.status === "IN_PROGRESS" ? true : false}>In progress</option>
                                <option value='OPEN' selected={task.status === "OPEN" ? true : false}>Open</option>
                                <option value='DONE' selected={task.status === "DONE" ? true : false}>Done</option>
                            </Select>
                        }
                        <Stack spacing={10} pt={2}>
                            <Button
                                type="submit"
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                {editMode ? 'Update task' : 'Create task'}
                            </Button>
                        </Stack>
                    </Stack>
                </Center>
            </form>
        </Box>
    )
}

export default CreateTaskForm