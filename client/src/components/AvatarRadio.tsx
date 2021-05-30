import { Box, Input, useRadio, UseRadioProps } from '@chakra-ui/react';
import { AvatarFragment } from '../lib/generated/graphql';
import Avatar from './Avatar';

type RadioProps = UseRadioProps & {
  avatar: AvatarFragment;
};

const AvatarRadio = (props: RadioProps) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const { avatar } = props;

  return (
    <Box as="label">
      <Input {...getInputProps()} />
      <Box
        {...getCheckboxProps()}
        rounded="full"
        cursor="pointer"
        _hover={{ bgColor: 'purple.300' }}
        _checked={{
          bgColor: 'purple.500',
        }}
        p={1}
      >
        <Avatar avatar={avatar} />
      </Box>
    </Box>
  );
};

export default AvatarRadio;
