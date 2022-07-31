import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    useToast,
} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { IRegister } from '../../models/IRegister';
import { fPost } from '../../hooks/useFetch';
import { AuthContext } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router';
import { SERVER_URL } from '../../config/backend-url';
import { Link as LinkRouter } from 'react-router-dom';

export default function Register() {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [register, setRegister] = useState<IRegister>({
        username: '',
        email: '',
        password: ''
    });

    // To populate register - we can post this data later in a post request towards backend
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegister({
            ...register,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fPost(`${SERVER_URL}/auth/signup`, register)
            .then(
                res => {
                    console.log(res);
                })
    }
    const toast = useToast()

    useEffect(() => {
        if (auth?.isAuthenticated) {
            navigate('/');
        }
    })

    return (
        <Stack spacing={2} mx={'auto'} maxW={'md'} p={4}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Register
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    to start using Taskit
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <HStack>
                            <FormControl id="username" isRequired>
                                <FormLabel>Username</FormLabel>
                                <Input type="text" name="username" onChange={handleChange} />
                            </FormControl>
                        </HStack>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} name="password" onChange={handleChange} />
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() =>
                                            setShowPassword((showPassword) => !showPassword)
                                        }>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <FormControl id="email" isRequired>
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" name="email" onChange={handleChange} />
                        </FormControl>

                        <Stack spacing={10} pt={2}>
                            <Button
                                onClick={() =>
                                    toast({
                                        title: 'Account created.',
                                        description: "We've created account for you.",
                                        status: 'success',
                                        duration: 3000,
                                        isClosable: true,
                                    })
                                }
                                type="submit"
                                loadingText="Submitting"
                                size="lg"
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Register
                            </Button>
                        </Stack>
                        <Stack pt={2}>
                            <Text align={'center'}>
                                Already a user?
                                <LinkRouter to="/login">
                                    <Link color={'blue.400'}> Login</Link>
                                </LinkRouter>
                            </Text>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Stack>
    );
}