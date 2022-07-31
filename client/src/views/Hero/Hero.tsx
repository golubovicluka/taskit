import {
    Container,
    Heading,
    Stack,
    Text,
    Button,
    Link,
} from '@chakra-ui/react';
import { Link as LinkRouter } from "react-router-dom"

export default function Hero() {
    return (
        <Container maxW={'5xl'}>
            <Stack
                textAlign={'center'}
                align={'center'}
                spacing={{ base: 8, md: 10 }}
                py={{ base: 20, md: 20 }}>
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'120%'}>
                    Organizing tasks{' '}
                    <Text as={'span'} color={'blue.400'}>
                        made easy
                    </Text>
                </Heading>
                <Text color={'gray.500'} maxW={'3xl'}>
                    Never forget a thing. Organize your day and never be late with your projects. Keep track of your
                    tasks and receive smart reminders in appropriate times.
                </Text>
                <Stack spacing={6} direction={'row'}>
                    <LinkRouter to="/createtasks">
                        <Button
                            rounded={'full'}
                            px={6}
                            colorScheme={'blue'}
                            bg={'blue.400'}
                            _hover={{ bg: 'blue.500' }}>
                            Get started
                        </Button>
                    </LinkRouter>
                    <LinkRouter to="/viewtasks">
                        <Button rounded={'full'} px={6}>
                            Preview tasks
                        </Button>
                    </LinkRouter>
                </Stack>
            </Stack>
        </Container>
    );
}
