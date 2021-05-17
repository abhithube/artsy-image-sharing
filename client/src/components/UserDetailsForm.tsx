import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { FaLock, FaUserCircle } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

type UserDetailsFormProps = {
  initUsername: string;
  initEmail: string;
  initPassword: string;
  addUserDetails: (username: string, email: string, password: string) => void;
};

const UserDetailsForm = ({
  initUsername,
  initEmail,
  initPassword,
  addUserDetails,
}: UserDetailsFormProps) => {
  const [username, setUsername] = useState(initUsername);
  const [email, setEmail] = useState(initEmail);
  const [password, setPassword] = useState(initPassword);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    addUserDetails(username, email, password);
  };

  return (
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
          children={<HiOutlineMail />}
        />
        <Input
          value={email}
          onChange={e => setEmail(e.target.value)}
          type='email'
          placeholder='Enter an email...'
          isRequired={true}
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
          type={showPassword ? 'text' : 'password'}
          isRequired={true}
          minLength={6}
          maxLength={255}
          bgColor={useColorModeValue('gray.50', 'gray.800')}
          borderColor='gray.500'
          focusBorderColor='purple.500'
          _hover={{ borderColor: 'gray.500' }}
        />
        <InputRightElement w='16'>
          <Button
            h='6'
            size='sm'
            mr='2'
            onClick={() => setShowPassword(prev => !prev)}
            colorScheme='purple'
          >
            {showPassword ? 'Hide' : 'Show'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Button
        onClick={handleSubmit}
        isDisabled={!username || !email || !password}
        mt='4'
        w='100px'
        colorScheme='purple'
      >
        Next
      </Button>
    </VStack>
  );
};

export default UserDetailsForm;
