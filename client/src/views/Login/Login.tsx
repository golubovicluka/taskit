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
import { fPost } from '../../hooks/useFetch';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../providers/AuthProvider';
import { ILogin } from '../../models/ILogin';
import { SERVER_URL } from '../../config/backend-url'
import { Link as LinkRoute } from "react-router-dom"

export default function Login() {
    const { auth, setAuth } = useContext(AuthContext);
    const navigate = useNavigate();
    const toast = useToast()
    const [showPassword, setShowPassword] = useState(false);
    const [login, setLogin] = useState<ILogin>({
        username: '',
        password: ''
    });

    // To populate register - we can post this data later in a post request towards backend
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin({
            ...login,
            [e.target.name]: e.target.value
        })
    }

    const redirect = () => {
        navigate('/');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fPost(`${SERVER_URL}/auth/signin`, login)
            .then(
                res => {
                    console.log(res);
                    if (res.loggedIn) {
                        localStorage.setItem('token', res.accessToken);
                        if (setAuth) {
                            setAuth({
                                isAuthenticated: true,
                                user: "Luka"
                            })
                        }
                        redirect()
                    } else {
                        toast({
                            position: "top",
                            title: 'Login failed',
                            description: "Wrong username or password",
                            status: 'error',
                            duration: 3000,
                            isClosable: true,
                        })
                    }
                })
    }

    useEffect(() => {
        if (auth?.isAuthenticated) {
            navigate('/');
        }
    })


    return (
        // <Flex
        //     minH={'86vh'}
        //     align={'center'}
        //     justify={'center'}
        //     bg={useColorModeValue('gray.50', 'gray.800')} >
        <Stack spacing={5} mx={'auto'} maxW={'lg'} p={5}>
            <Stack align={'center'}>
                <Heading fontSize={'4xl'} textAlign={'center'}>
                    Log in
                </Heading>
                <Text fontSize={'lg'} color={'gray.600'}>
                    to preview all your tasks ✌️
                </Text>
            </Stack>
            <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={8}>


                <form onSubmit={handleSubmit}>
                    <Stack spacing={4}>
                        <FormControl id="username" isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input type="text" name="username" onChange={handleChange} />
                        </FormControl>
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
                                Sign In
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <LinkRoute to="/register">
                                <Text align={'center'}>
                                    Don't have account? <Link color={'blue.400'}>Register</Link>
                                </Text>
                            </LinkRoute>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Stack>
        // </Flex >
    );
}