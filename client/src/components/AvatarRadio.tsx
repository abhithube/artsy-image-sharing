import { Box, Image, Input, useRadio, UseRadioProps } from '@chakra-ui/react';

type RadioProps = UseRadioProps & {
  avatarUrl: string;
};

const AvatarRadio = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const { avatarUrl } = props;

  return (
    <Box as="label">
      <Input {...getInputProps()} />
      <Image
        {...getCheckboxProps()}
        src={`https://res.cloudinary.com/athube/image/upload/q_auto:eco,w_200,h_200,r_max/${
          avatarUrl.split('upload/')[1]
        }`}
        alt="avatar"
        cursor="pointer"
        borderRadius="full"
        _checked={{
          bgColor: 'purple.500',
        }}
        p={1.5}
      />
    </Box>
  );
};

export default AvatarRadio;
