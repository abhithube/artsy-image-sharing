import { useApolloClient, useMutation } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import Button from '../lib/components/Button';
import { CREATE_POST, POST } from '../lib/graphql';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const client = useApolloClient();

  const [createPost] = useMutation(CREATE_POST, {
    onCompleted: async ({ post }) => {
      client.writeQuery({
        query: POST,
        variables: {
          id: post.id,
        },
        data: {
          post: {
            result: post,
            isFavorite: false,
          },
        },
      });

      navigate(`/posts/${post.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) return;

    const extension = file.name.split('.').pop();

    const reader = new FileReader();
    reader.onload = () => {
      setLoading(true);

      if (reader.result) {
        createPost({
          variables: {
            title: `${title}.${extension}`,
            body,
            file: reader.result.toString(),
          },
        });
      }
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-4">Upload</h1>
      <form
        className="flex flex-col space-y-8 p-8 w-[400px] bg-gray-800 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <FileUpload setFile={setFile} />
        <div className="flex flex-col space-y-4 w-full">
          <input
            className="p-2 bg-gray-800 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= 50) setTitle(e.target.value);
            }}
            placeholder="Enter a title..."
            required
          />
          <textarea
            className="p-2 bg-gray-800 border border-gray-500 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter an optional description..."
            required={false}
            maxLength={500}
          />
        </div>
        <Button
          type="submit"
          isDisabled={!file || !title || loading}
          isLoading={loading}
          color="indigo"
        >
          Upload
        </Button>
      </form>
    </div>
  );
}
