import {
  Button,
  Flex,
  Heading,
  Icon,
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
import { Link as RouterLink, useHistory } from 'react-router-dom';
import { useRegisterMutation } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const toast = useToast();

  const mutation = useRegisterMutation(graphQLClient, {
    onSuccess: (data) => {
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      toast({
        status: 'error',
        title: 'Passwords do not match',
        isClosable: true,
      });
    } else {
      setLoading(true);
      mutation.mutate({ username, password });
    }
  };

  return (
    <Flex direction="column" align="center" h="100%">
      <Heading as="h1" mb={4}>
        Register
      </Heading>
      <Flex
        as="form"
        onSubmit={handleSubmit}
        direction="column"
        align="center"
        w={400}
        p={8}
        bg={useColorModeValue('gray.100', 'gray.900')}
        rounded="lg"
        boxShadow="md"
      >
        <VStack spacing={4} w="100%">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize={20}
              // eslint-disable-next-line react/no-children-prop
              children={<Icon as={FaUserCircle} />}
            />
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter a username..."
              isRequired
              minLength={2}
              maxLength={255}
              bgColor={useColorModeValue('gray.50', 'gray.800')}
              borderColor="gray.500"
              focusBorderColor="purple.500"
              _hover={{ borderColor: 'gray.500' }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize={20}
              // eslint-disable-next-line react/no-children-prop
              children={<Icon as={FaLock} />}
            />
            <Input
              value={password}
              onChange={(e) => {
                if (e.target.value.length <= 50) setPassword(e.target.value);
              }}
              placeholder="Enter a password..."
              type="password"
              isRequired
              minLength={6}
              maxLength={255}
              bgColor={useColorModeValue('gray.50', 'gray.800')}
              borderColor="gray.500"
              focusBorderColor="purple.500"
              _hover={{ borderColor: 'gray.500' }}
            />
          </InputGroup>
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize={20}
              // eslint-disable-next-line react/no-children-prop
              children={<Icon as={FaLock} />}
            />
            <Input
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              placeholder="Confirm your password..."
              type="password"
              isRequired
              minLength={6}
              maxLength={255}
              bgColor={useColorModeValue('gray.50', 'gray.800')}
              borderColor="gray.500"
              focusBorderColor="purple.500"
              _hover={{ borderColor: 'gray.500' }}
            />
          </InputGroup>
          <Button
            type="submit"
            isLoading={loading}
            isDisabled={!username || !password || !passwordConfirm}
            loadingText="Loading"
            spinner={<Spinner speed="1s" />}
            mt={4}
            w="100%"
            colorScheme="purple"
          >
            Register
          </Button>
          <Text mt={8} fontSize="sm">
            Already registered?{' '}
            <Link as={RouterLink} to="/login" textDecoration="underline">
              Click here to login.
            </Link>
          </Text>
        </VStack>
      </Flex>
    </Flex>
  );
};

export default RegisterPage;
