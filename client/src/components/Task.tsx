import { DeleteIcon } from '@chakra-ui/icons'
import { Wrap, WrapItem, Center, Box, Text, IconButton } from '@chakra-ui/react'
import React from 'react'
import { ITask } from '../models/ITask'

type Props = { id, title, description, status }

// Primer response-a 
// {id: 3, title: 'test title', description: 'desccccc', status: 'IN_PROGRESS', userId: 1}

const Task = ({ id, title, description, status }: Props) => {
    return (
        <Wrap>
            <Box w="400px" rounded="20px">
                <h1>{title}</h1>
                <Text>
                    {description}
                </Text>
                <p>
                    {status}
                </p>

            </Box>
            <IconButton
                variant='outline'
                colorScheme='red'
                aria-label='Delete item'
                icon={<DeleteIcon />}
            />
        </Wrap>
    )
}

export default Task