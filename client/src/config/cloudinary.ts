import { Cloudinary } from '@cloudinary/base/instance/Cloudinary';

export const cld = new Cloudinary({
  cloud: { cloudName: 'hnisqhgvp' },
  url: { secure: true },
});
