import { Button } from '@chakra-ui/button';
import { SimpleGrid, Text } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { useRadioGroup } from '@chakra-ui/radio';
import { useState } from 'react';
import AvatarRadio from './AvatarRadio';

const options = [
  'https://res.cloudinary.com/athube/image/upload/m7pkednv7wsmc9onzcks.png',
  'https://res.cloudinary.com/athube/image/upload/m42qvbxgjnqwdknupsib.png',
  'https://res.cloudinary.com/athube/image/upload/ymeaat9zk745i53bqm3u.png',
  'https://res.cloudinary.com/athube/image/upload/fecxna5bglcbybutdi2j.png',
  'https://res.cloudinary.com/athube/image/upload/yfmzevv6pjsjlcinvuz9.png',
  'https://res.cloudinary.com/athube/image/upload/wi9qswbjmvfon42y9dg5.png',
  'https://res.cloudinary.com/athube/image/upload/lzm3sclqyj5jxniocg3v.png',
  'https://res.cloudinary.com/athube/image/upload/nr9g20lini31sbo3z3mi.png',
];

type AvatarSelectionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleAvatarSelection: (avatarUrl: string | null) => void;
};

const AvatarSelectionModal = ({
  isOpen,
  onClose,
  handleAvatarSelection,
}: AvatarSelectionModalProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(options[0]);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'avatar',
    defaultValue: options[0],
    onChange: value => setAvatarUrl(value),
  });

  const group = getRootProps();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      allowPinchZoom={true}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Welcome to Artsy!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb='4'>Choose an avatar for your profile.</Text>
          <SimpleGrid columns={4} {...group}>
            {options.map(value => {
              const radio = getRadioProps({ value });
              return <AvatarRadio key={value} {...radio} avatarUrl={value} />;
            })}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() => handleAvatarSelection(null)}
            mr='4'
            colorScheme='red'
          >
            Continue without an avatar
          </Button>
          <Button
            onClick={() => handleAvatarSelection(avatarUrl)}
            colorScheme='purple'
          >
            Select
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AvatarSelectionModal;
