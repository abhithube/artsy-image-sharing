import {
  Box,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  IconButton,
  Image,
  Input,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

type FileUploadProps = {
  setFile: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>;
};

const FileUpload = ({ setFile }: FileUploadProps) => {
  const [thumbnail, setThumbnail] = useState('');

  const toast = useToast();

  const inputBgColor = useColorModeValue('gray.50', 'gray.800');
  const inputBorderColor = useColorModeValue('gray.900', 'gray.500');

  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const files = e.dataTransfer.files;
    if (files.length > 1) {
      toast({
        status: 'error',
        title: 'Single file upload only',
        isClosable: true,
      });
    } else handleFile(files[0]);
  };

  const handleFile = (file: File) => {
    const fileType = file.type.split('/')[0];

    if (fileType !== 'image') {
      toast({
        status: 'error',
        title: 'Image files only',
        isClosable: true,
      });
    } else if (file.size > 1024 * 1024 * 5) {
      toast({
        status: 'error',
        title: 'File size cannot exceed 5MB',
        isClosable: true,
      });
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setFile(reader.result);
        setThumbnail(URL.createObjectURL(file));
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Box w='100%'>
      {thumbnail && (
        <Flex direction='column' align='center'>
          <Center
            w='100%'
            h='300px'
            bgColor='black'
            mb='8'
            pos='relative'
            onMouseEnter={() => setIsOverlayActive(true)}
            onMouseLeave={() => setIsOverlayActive(false)}
          >
            <Image
              src={thumbnail}
              alt='media to upload'
              maxH='100%'
              opacity={isOverlayActive ? '0.5' : '1'}
            />
            <IconButton
              icon={<Icon as={FaTrashAlt} />}
              onClick={() => {
                setFile(null);
                setThumbnail('');
              }}
              aria-label='remove image'
              d={isOverlayActive ? 'flex' : 'none'}
              pos='absolute'
              size='lg'
              bgColor='red.400'
              _hover={{ bgColor: 'red.500' }}
            />
          </Center>
        </Flex>
      )}
      {!thumbnail && (
        <FormControl
          w='300px'
          h='300px'
          mb='8'
          border='2px dashed'
          borderColor={inputBorderColor}
        >
          <FormLabel
            htmlFor='file-input'
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            h='100%'
            w='100%'
            d='flex'
            alignItems='center'
            justifyContent='center'
            bgColor={inputBgColor}
            _hover={{ cursor: 'pointer' }}
          >
            <Text textAlign='center' px='8'>
              Drop an image here, or click to select one.
            </Text>
          </FormLabel>
          <Input
            id='file-input'
            type='file'
            accept='image/*'
            onChange={e => handleFile(e.target.files![0])}
            d='none'
          />
        </FormControl>
      )}
    </Box>
  );
};

export default FileUpload;
