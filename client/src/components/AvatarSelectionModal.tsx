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
import { CLOUDINARY_URL } from '../lib/constants';
import AvatarRadio from './AvatarRadio';

const options = [
  `${CLOUDINARY_URL}/v1622234180/man1_peof9j.png`,
  `${CLOUDINARY_URL}/v1622234180/man2_jfyenx.png`,
  `${CLOUDINARY_URL}/v1622234181/man3_sfpahn.png`,
  `${CLOUDINARY_URL}/v1622234181/man4_uglr0s.png`,
  `${CLOUDINARY_URL}/v1622234180/woman1_fbwh8e.png`,
  `${CLOUDINARY_URL}/v1622234181/woman2_qmpunu.png`,
  `${CLOUDINARY_URL}/v1622234180/woman3_sup9dv.png`,
  `${CLOUDINARY_URL}/v1622234181/woman4_jfjduk.png`,
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
    onChange: (value) => setAvatarUrl(value),
  });

  const group = getRootProps();

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
          <SimpleGrid columns={4} {...group}>
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return <AvatarRadio key={value} {...radio} avatarUrl={value} />;
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
            onClick={() => handleAvatarSelection(avatarUrl)}
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
