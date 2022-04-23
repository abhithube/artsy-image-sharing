import { ExclamationCircleIcon, TrashIcon } from '@heroicons/react/solid';
import classnames from 'classnames';
import { useState } from 'react';
import Button from '../lib/components/Button';

type FileUploadProps = {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
};

function FileUpload({ setFile }: FileUploadProps) {
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const [isOverlayActive, setIsOverlayActive] = useState(false);

  const handleFile = (file: File) => {
    const fileType = file.type.split('/')[0];

    if (fileType !== 'image') setError('Image files only');
    else if (file.size > 1024 * 1024 * 5)
      setError('File size cannot exceed 5MB');
    else {
      setError(null);

      setFile(file);
      setThumbnail(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();

    const { files } = e.dataTransfer;
    if (files.length > 1) setError('Single file upload only');
    else handleFile(files[0]);
  };

  return (
    <div>
      {thumbnail && (
        <div className="flex flex-col items-center">
          <div
            className="relative flex justify-center items-center w-full h-[300px] bg-black"
            onMouseEnter={() => setIsOverlayActive(true)}
            onMouseLeave={() => setIsOverlayActive(false)}
          >
            <img
              className={classnames('max-h-full', {
                'opacity-50': isOverlayActive,
              })}
              src={thumbnail}
              alt="media to upload"
            />
            <div
              className={classnames('absolute', { hidden: !isOverlayActive })}
            >
              <Button
                onClick={() => {
                  setFile(null);
                  setThumbnail('');
                }}
                color="red"
              >
                <TrashIcon className="w-8 h-8" />
              </Button>
            </div>
          </div>
        </div>
      )}
      {!thumbnail && (
        <>
          {error && (
            <div className="flex justify-center items-center space-x-2 mb-4 p-1 bg-red-200 rounded-sm">
              <ExclamationCircleIcon className="w-5 h-5 text-red-500" />
              <span className="text-red-500">{error}</span>
            </div>
          )}
          <div className="w-full h-[300px] border-2 border-dashed">
            <label
              className="flex justify-center items-center w-full h-full"
              htmlFor="file-input"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <span className="px-8 text-center">
                Drop an image here, or click to select one.
              </span>
              <input
                className="hidden"
                id="file-input"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && handleFile(e.target.files[0])
                }
              />
            </label>
          </div>
        </>
      )}
    </div>
  );
}

export default FileUpload;
