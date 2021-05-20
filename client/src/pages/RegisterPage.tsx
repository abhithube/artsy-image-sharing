import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Text,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import { useHistory } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { graphQLClient } from '../App';
import { useRegisterMutation } from '../generated/graphql';

const RegisterPage = () => {
  const history = useHistory();

  const mutation = useRegisterMutation(graphQLClient, {
    onSuccess: data => {
      if (data.registered) history.push('/login', { registered: true });
    },
    onError: () => {
      setLoading(false);
      toast({
        status: 'error',
        title: 'Username already taken',
        isClosable: true,
      });
    },
  });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      return toast({
        status: 'error',
        title: 'Passwords do not match',
        isClosable: true,
      });
    }

    setLoading(true);
    mutation.mutate({ username, password });
  };

  return (
    <Flex direction='column' align='center' h='100%'>
      <Heading as='h1' mb='4'>
        Register
      </Heading>
      <Flex
        as='form'
        onSubmit={handleSubmit}
        direction='column'
        align='center'
        w='400px'
        p='50'
        pb='8'
        bg={useColorModeValue('gray.100', 'gray.900')}
        rounded='lg'
        boxShadow='md'
      >
        <VStack spacing={4} w='100%'>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='20'
              children={<FaUserCircle />}
            />
            <Input
              value={username}
              onChange={e => setUsername(e.target.value)}
              type='text'
              placeholder='Enter a username...'
              isRequired={true}
              minLength={2}
              maxLength={255}
              bgColor={useColorModeValue('gray.50', 'gray.800')}
              borderColor='gray.500'
              focusBorderColor='purple.500'
              _hover={{ borderColor: 'gray.500' }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='20'
              children={<FaLock />}
            />
            <Input
              value={password}
              onChange={e => {
                if (e.target.value.length <= 50) setPassword(e.target.value);
              }}
              placeholder='Enter a password...'
              type='password'
              isRequired={true}
              minLength={6}
              maxLength={255}
              bgColor={useColorModeValue('gray.50', 'gray.800')}
              borderColor='gray.500'
              focusBorderColor='purple.500'
              _hover={{ borderColor: 'gray.500' }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              color='gray.300'
              fontSize='20'
              children={<FaLock />}
            />
            <Input
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
              placeholder='Confirm your password...'
              type='password'
              isRequired={true}
              minLength={6}
              maxLength={255}
              bgColor={useColorModeValue('gray.50', 'gray.800')}
              borderColor='gray.500'
              focusBorderColor='purple.500'
              _hover={{ borderColor: 'gray.500' }}
            />
          </InputGroup>
          <Button
            type='submit'
            isLoading={loading}
            isDisabled={!username || !password || !passwordConfirm}
            loadingText='Loading'
            spinner={<Spinner speed='1s' />}
            mt='4'
            w='100%'
            colorScheme='purple'
          >
            Register
          </Button>
          <Text mt='8' fontSize='sm'>
            Already registered?{' '}
            <Link as={RouterLink} to='/login' textDecoration='underline'>
              Click here to login.
            </Link>
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
