import { XIcon } from '@heroicons/react/solid';
import { useState } from 'react';
import Avatar from '../lib/components/Avatar';
import Button from '../lib/components/Button';
import { AVATAR_OPTIONS } from '../lib/constants';

type AvatarSelectionModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleAvatarSelection: (avatarUrl: string) => void;
};

export default function AvatarSelectionModal({
  isOpen,
  setIsOpen,
  handleAvatarSelection,
}: AvatarSelectionModalProps) {
  const [avatar, setAvatar] = useState<string>(AVATAR_OPTIONS[0]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed z-10 top-0 right-0 bottom-0 left-0 bg-black opacity-70" />
      <div className="fixed z-10 top-1/3 left-1/2 bg-gray-800 rounded-md transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex justify-between items-center p-4 border-b border-gray-600">
          <h1 className="text-2xl font-semibold">Welcome to Artsy!</h1>
          <Button onClick={() => setIsOpen(false)}>
            <XIcon className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-4">
          <p className="mb-4">Choose an avatar for your profile.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAvatarSelection(avatar);
            }}
          >
            <div className="grid grid-cols-4 gap-4 justify-items-center mb-4">
              {AVATAR_OPTIONS.map((option) => (
                <label key={option} htmlFor={option}>
                  <input
                    className="absolute opacity-0"
                    type="radio"
                    id={option}
                    value={option}
                    checked={option === avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                  <div className="border-[5px] border-gray-500 rounded-full hover:cursor-pointer filter brightness-75 sibling-checked:border-indigo-400 sibling-checked:brightness-105">
                    <Avatar
                      url={`${process.env.IMAGES_URL}/avatars/${option}.webp`}
                      size="xl"
                    />
                  </div>
                </label>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                onClick={() => handleAvatarSelection('avatar_default')}
                color="red"
              >
                Continue without an avatar
              </Button>
              <Button type="submit" color="indigo">
                Select
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
