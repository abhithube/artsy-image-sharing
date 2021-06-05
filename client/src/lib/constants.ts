export const AVATAR_DEFAULT = 'avatar_default';

export const AVATAR_OPTIONS = [
  'avatar_man1',
  'avatar_man2',
  'avatar_man3',
  'avatar_man4',
  'avatar_woman1',
  'avatar_woman2',
  'avatar_woman3',
  'avatar_woman4',
];

export const FULL_IMAGE_TRANSFORMATIONS = {
  quality: 'auto:low',
  format: 'webp',
  flag: 'attachment',
};

export const PREVIEW_IMAGE_TRANSFORMATIONS = {
  crop: 'fill',
  gravity: 'auto',
  height: 480,
  width: 480,
  quality: 'auto:low',
  format: 'webp',
};

export const AVATAR_TRANSFORMATIONS = {
  crop: 'scale',
  height: 200,
  width: 200,
  radius: 'max',
  quality: 'auto:low',
  format: 'webp',
};
