import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box } from '@chakra-ui/layout';
import { useRadio, UseRadioProps } from '@chakra-ui/radio';

type RadioProps = UseRadioProps & {
  avatarUrl: string;
};

const AvatarRadio = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <Input {...input} />
      <Image
        {...checkbox}
        src={`https://res.cloudinary.com/athube/image/upload/q_auto:eco,w_200,h_200,r_max/${
          props.avatarUrl.split('upload/')[1]
        }`}
        alt='avatar'
        cursor='pointer'
        borderRadius='full'
        _checked={{
          bgColor: 'purple.500',
        }}
        p='1.5'
      />
    </Box>
  );
};

export default AvatarRadio;
