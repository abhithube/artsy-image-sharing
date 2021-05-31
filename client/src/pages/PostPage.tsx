import { Box, Center, Flex, Spinner, Text, useToast } from '@chakra-ui/react';
import { format, quality } from '@cloudinary/base/actions/delivery';
import { autoLow } from '@cloudinary/base/qualifiers/quality';
import { placeholder } from '@cloudinary/react';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CloudinaryImage from '../components/CloudinaryImage';
import PostDetails from '../components/PostDetails';
import RelatedPosts from '../components/RelatedPosts';
import { cld } from '../config/cloudinary';
import { useImageQuery } from '../lib/generated/graphql';
import { graphQLClient } from '../lib/graphql/client';

type Params = {
  id: string;
};

type Uploaded = Location & {
  uploaded?: boolean;
};

const PostPage = () => {
  const { id } = useParams<Params>();
  const location = useLocation<Uploaded>();

  const { data, isLoading } = useImageQuery(graphQLClient, { id: Number(id) });

  const cldImg = cld
    .image(data?.post?.result.image.publicId)
    .quality(quality(autoLow()))
    .delivery(format('auto'));

  const toast = useToast();

  useEffect(() => {
    if (location.state?.uploaded) {
      toast({
        status: 'success',
        title: 'Created post successfully',
        isClosable: true,
      });

      location.state.uploaded = false;
    }

    return () => toast.closeAll();
  }, [location.state, toast]);

  useEffect(() => window.scrollTo({ top: 0, behavior: 'smooth' }), [id]);

  if (isLoading) return <Spinner speed="1s" />;

  return (
    <Flex align="flex-start">
      {data?.post && (
        <>
          <Box
            flexBasis={['100%', '100%', '100%', '75%', '75%']}
            pr={[null, null, null, 16, 16]}
          >
            <Center h="72vh" mb={4} bgColor="black">
              <CloudinaryImage
                cldImg={cldImg}
                plugins={[placeholder('blur')]}
              />
            </Center>
            <PostDetails id={Number(id)} />
          </Box>
          <Box
            flexBasis={['0%', '0%', '0%', '25%', '25%']}
            display={['none', 'none', 'none', 'block', 'block']}
          >
            <RelatedPosts postId={Number(id)} />
          </Box>
        </>
      )}
      {!data?.post && <Text>Post not found</Text>}
    </Flex>
  );
};

export default PostPage;
