import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useRadioGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { AVATAR_OPTIONS } from '../lib/constants';
import AvatarRadio from './AvatarRadio';

type AvatarSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleAvatarSelection: (avatar: string | null) => void;
};

const AvatarSelectionModal = ({
  isOpen,
  onClose,
  handleAvatarSelection,
}: AvatarSelectionModalProps) => {
  const [avatar, setAvatar] = useState<string>(AVATAR_OPTIONS[0]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'avatar',
    defaultValue: AVATAR_OPTIONS[0],
    onChange: (value) => setAvatar(value),
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      allowPinchZoom
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to Artsy!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={4}>Choose an avatar for your profile.</Text>
          <SimpleGrid columns={4} {...getRootProps()}>
            {AVATAR_OPTIONS.map((option) => {
              const radio = getRadioProps({ value: option });
              return (
                <AvatarRadio
                  key={option}
                  {...radio}
                  avatar={{ publicId: option }}
                />
              );
            })}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => handleAvatarSelection(null)}
            mr={4}
            colorScheme="red"
          >
            Continue without an avatar
          </Button>
          <Button
            onClick={() => handleAvatarSelection(avatar)}
            colorScheme="purple"
          >
            Select
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarSelectionModal;
