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
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import { graphQLClient } from '../App';
import AvatarSelectionModal from '../components/AvatarSelectionModal';
import { AuthContext } from '../context/AuthContext';
import { useAuthQuery, useLoginMutation } from '../generated/graphql';

type Registered = Location & {
  registered?: boolean;
};

const LoginPage = () => {
  const { setAuthenticatedUser } = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const location = useLocation<Registered>();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const queryClient = useQueryClient();
  const queryKey = useAuthQuery.getKey();

  const mutation = useLoginMutation(graphQLClient, {
    onSuccess: (data) => {
      if (data.auth.confirmed) {
        setAuthenticatedUser(data.auth);
        queryClient.setQueryData(queryKey, data);
        const redirect = localStorage.getItem('redirect');
        history.push(redirect || '/posts');
        localStorage.removeItem('redirect');
      } else {
        setLoading(false);
        onOpen();
      }
    },
    onError: () => {
      setLoading(false);
      toast({
        status: 'error',
        title: 'Invalid credentials',
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    mutation.mutate({ username, password });
  };

  const handleAvatarSelection = (avatarUrl: string | null) => {
    setLoading(true);
    mutation.mutate({ username, password, avatarUrl });
  };

  useEffect(() => {
    if (location.state?.registered) {
      toast({
        status: 'success',
        title: 'Registered successfully',
        isClosable: true,
      });

      location.state.registered = false;
    }
  }, [location.state, toast]);

  return (
    <>
      <AvatarSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        handleAvatarSelection={handleAvatarSelection}
      />
      <Flex direction="column" align="center" h="100%">
        <Heading as="h1" mb={4}>
          Login
        </Heading>
        <Flex
          as="form"
          onSubmit={handleSubmit}
          direction="column"
          align="center"
          w={400}
          p={50}
          pb={8}
          bg={useColorModeValue('gray.100', 'gray.900')}
          rounded="lg"
          boxShadow="md"
        >
          <VStack spacing={4} align="stretch" w="100%">
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
                onChange={(e) => {
                  if (e.target.value.length <= 50) setUsername(e.target.value);
                }}
                placeholder="Enter your username..."
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
                placeholder="Enter your password..."
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
          </VStack>
          <Button
            type="submit"
            isLoading={loading}
            isDisabled={!username || !password}
            loadingText="Loading"
            spinner={<Spinner speed="1s" />}
            mt={4}
            w="100%"
            colorScheme="purple"
          >
            Login
          </Button>
          <Text mt={8} fontSize="sm">
            Need an account?{' '}
            <Link as={RouterLink} to="/register" textDecoration="underline">
              Click here to register.
            </Link>
          </Text>
        </Flex>
      </Flex>
    </>
  );
};

export default LoginPage;
