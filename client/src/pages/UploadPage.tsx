import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import Button from '../lib/components/Button';
import { useCreatePostMutation, usePostQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

const UploadPage = () => {
  const queryClient = useQueryClient();

  const [file, setFile] = useState<string | ArrayBuffer | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const mutation = useCreatePostMutation(graphQLClient, {
    onSuccess: async ({ post }) => {
      queryClient.setQueryData(usePostQuery.getKey({ id: post.id }), {
        post: { result: post, isFavorite: false },
      });

      history.push(`/posts/${post.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      setLoading(true);
      mutation.mutate({ title, body, file: file.toString() });
    }
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
};

export default UploadPage;
