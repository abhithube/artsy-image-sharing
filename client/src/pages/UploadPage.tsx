import {
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Textarea,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { FormEvent, useState } from 'react';
import { useQueryClient } from 'react-query';
import { Redirect } from 'react-router-dom';
import { graphQLClient } from '../App';
import FileUpload from '../components/FileUpload';
import { useCreatePostMutation, usePostQuery } from '../generated/graphql';

const UploadPage = () => {
  const queryClient = useQueryClient();

  const mutation = useCreatePostMutation(graphQLClient, {
    onSuccess: data => {
      queryClient.setQueryData(usePostQuery.getKey({ id: data.post.id }), {
        post: { result: data.post, isFavorite: false },
      });
      setSuccess(true);
    },
    onError: () => setLoading(false),
  });

  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    mutation.mutate({ title, body, file: file?.toString()! });
    try {
    } catch (err) {}
  };

  return (
    <Flex direction='column' align='center' h='100%'>
      <Heading as='h1' mb='4'>
        Upload
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
        <FileUpload setFile={setFile} />
        <VStack spacing={4} align='stretch' w='100%'>
          <Input
            value={title}
            onChange={e => {
              if (e.target.value.length <= 50) setTitle(e.target.value);
            }}
            placeholder='Enter a title...'
            isRequired={true}
            bgColor={useColorModeValue('gray.50', 'gray.800')}
            borderColor='gray.500'
            focusBorderColor='purple.500'
            _hover={{ borderColor: 'gray.500' }}
          />
          <Textarea
            value={body}
            onChange={e => setBody(e.target.value)}
            placeholder='Enter an optional description...'
            isRequired={false}
            maxLength={500}
            resize='none'
            bgColor={useColorModeValue('gray.50', 'gray.800')}
            borderColor='gray.500'
            focusBorderColor='purple.500'
            _hover={{ borderColor: 'gray.500' }}
          />
        </VStack>
        <Button
          type='submit'
          isLoading={loading}
          isDisabled={!file || !title}
          loadingText='Uploading'
          spinner={<Spinner speed='1s' />}
          mt='4'
          w='100%'
          colorScheme='purple'
        >
          Upload
        </Button>
      </Flex>
      {success && (
        <Redirect push to={{ pathname: '/posts', state: { uploaded: true } }} />
      )}
    </Flex>
  );
};

export default UploadPage;
