import { Box, Heading, Text, VStack } from '@chakra-ui/layout';

const AboutPage = () => (
  <VStack spacing='4' alignItems='flex-start'>
    <Heading>About</Heading>
    <Text>
      Artsy is an image sharing website, where users can create accounts and
      upload images. Users can also add comments and favorites to uploaded
      content. Clicking on a user's name will take you to their artist profile,
      which contains the posts they've created and favorited.
    </Text>
    <Text>
      To get started, click on the
      <Box as='span' color='purple.400'>
        {' Browse '}
      </Box>
      tab to see what artwork, photographs, and other content users are
      uploading. Or, if you're logged in, click on your avatar and the
      <Box as='span' color='purple.400'>
        {' Upload '}
      </Box>
      tab to create a new post.
    </Text>
  </VStack>
);

export default AboutPage;
