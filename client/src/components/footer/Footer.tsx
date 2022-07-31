import {
    Box,
    Button,
    chakra,
    Container,
    IconButton,
    Link,
    Stack,
    Text,
    Tooltip,
    useClipboard,
    useColorModeValue,
    VisuallyHidden,
} from '@chakra-ui/react';
import { FaLinkedin, FaGithub, FaYoutube, FaLinkedinIn } from 'react-icons/fa';
import { ReactNode } from 'react';
import { EmailIcon } from '@chakra-ui/icons';

const Logo = (props: any) => {
    return (
        <h1>TASKIT</h1>
    );
};

const SocialButton = ({
    children,
    label,
    href,
}: {
    children: ReactNode;
    label: string;
    href: string;
}) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    );
};



export default function SmallWithLogoLeft() {
    return (
        <Box
            width={'100%'}
            position={'fixed'}
            bottom={0}
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}>
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'row', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}>
                <Logo />
                <Text>Made with ❤️ by Luka G. </Text>
                <Stack direction={'row'} spacing={6}>
                    <SocialButton label={'Github'} href={'https://github.com/golubovicluka'}>
                        <FaGithub />
                    </SocialButton>
                    <SocialButton label={'Linkedin'} href={'https://www.linkedin.com/in/luka-golubovi%C4%87-b898a0130/'}>
                        <FaLinkedinIn />
                    </SocialButton>
                    <SocialButton label={'Email'} href={'mailto: luka_golubovic@yahoo.com?subject = Feedback on your Frontend Project&body = Hello Luka!'}>
                        <EmailIcon />
                    </SocialButton>
                </Stack>
            </Container>
        </Box>
    );
}