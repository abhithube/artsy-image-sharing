import { chakra } from '@chakra-ui/react';
import { AdvancedImage } from '@cloudinary/react';

const CloudinaryImage = chakra(AdvancedImage, {
  baseStyle: { maxW: '100%', maxH: '100%' },
  shouldForwardProp: (prop) => ['cldImg', 'plugins'].includes(prop),
});

export default CloudinaryImage;
