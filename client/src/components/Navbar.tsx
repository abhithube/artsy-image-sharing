import {
  Avatar,
  Box,
  Container,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FaChevronDown, FaMoon, FaSun } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';
import { useQueryClient } from 'react-query';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useAuthQuery, useLogoutMutation } from '../generated/graphql';
import { graphQLClient } from '../graphql/client';

type From = Location & {
  from: string;
};

const Navbar = () => {
  const { isLoading, authenticatedUser, setAuthenticatedUser } =
    useContext(AuthContext);

  const queryClient = useQueryClient();
  const queryKey = useAuthQuery.getKey();

  const mutation = useLogoutMutation(graphQLClient, {
    onSuccess: (data) => {
      if (data.isLoggedOut) {
        setAuthenticatedUser(null);
        queryClient.setQueryData(queryKey, { auth: null });
      }
    },
  });

  const location = useLocation<From>();

  const { toggleColorMode } = useColorMode();

  return (
    <Box
      as="nav"
      w="100vw"
      bg={useColorModeValue('gray.50', 'gray.900')}
      boxShadow="sm"
      pos="fixed"
      top={0}
      zIndex="sticky"
    >
      <Container maxW="80%">
        <Flex align="center" h={16}>
          <HStack flex="1" spacing={4}>
            <Link
              as={RouterLink}
              to="/"
              mr={8}
              _focus={{ outline: 'none' }}
              _hover={{ textDecoration: 'none' }}
            >
              <HStack>
                <Icon as={IoMdImages} fontSize="4xl" color="purple.500" />
                <Text fontSize="2xl">Artsy</Text>
              </HStack>
            </Link>
            <Link
              as={RouterLink}
              to="/posts"
              mr={4}
              _hover={{ color: 'purple.400' }}
              _focus={{ outline: 'none' }}
            >
              <Text>Browse</Text>
            </Link>
            <Link
              as={RouterLink}
              to="/about"
              _hover={{ color: 'purple.400' }}
              _focus={{ outline: 'none' }}
            >
              About
            </Link>
          </HStack>
          {!isLoading && authenticatedUser && (
            <Menu>
              <MenuButton>
                <HStack spacing={4}>
                  <Avatar
                    src={
                      authenticatedUser.avatarUrl
                        ? `https://res.cloudinary.com/athube/image/upload/q_auto:eco,w_200,h_200/${
                            authenticatedUser.avatarUrl.split('upload/')[1]
                          }`
                        : undefined
                    }
                    cursor="pointer"
                    size="md"
                    bg="purple.500"
                    borderWidth="1px"
                    borderColor="purple.500"
                  />
                  <Icon as={FaChevronDown} />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>
                  <Link as={RouterLink} to="/upload" _hover={{}}>
                    <Text>Upload</Text>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <Link
                    as={RouterLink}
                    to={`/users/${authenticatedUser.id}`}
                    _hover={{}}
                  >
                    <Text>Profile</Text>
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => mutation.mutate({})}>Logout</MenuItem>
              </MenuList>
            </Menu>
          )}
          {!isLoading && !authenticatedUser && (
            <Link
              as={RouterLink}
              to="/login"
              onClick={() => {
                if (
                  location.pathname !== '/login' &&
                  location.pathname !== '/register'
                )
                  localStorage.setItem('redirect', location.pathname);
              }}
              _hover={{ color: 'purple.400' }}
              _focus={{ outline: 'none' }}
            >
              <Text>Login</Text>
            </Link>
          )}
          <IconButton
            aria-label="toggle dark mode"
            onClick={toggleColorMode}
            icon={useColorModeValue(<Icon as={FaMoon} />, <Icon as={FaSun} />)}
            ml={6}
          />
        </Flex>
      </Container>
    </Box>
  );
};

export default Navbar;
