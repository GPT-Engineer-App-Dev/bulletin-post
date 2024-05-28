import { Box, Container, VStack, HStack, Text, Input, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      setPosts([...posts, newPost]);
      setNewPost("");
    }
  };

  return (
    <Box>
      <Box as="nav" bg="blue.500" color="white" p={4}>
        <Container maxW="container.lg">
          <Heading as="h1" size="lg">Public Post Board</Heading>
        </Container>
      </Box>
      <Container maxW="container.lg" py={6}>
        <VStack spacing={6} align="stretch">
          <Box>
            <Heading as="h2" size="md" mb={4}>Posts</Heading>
            {posts.length === 0 ? (
              <Text>No posts yet. Be the first to post!</Text>
            ) : (
              posts.map((post, index) => (
                <Box key={index} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                  <Text>{post}</Text>
                </Box>
              ))
            )}
          </Box>
          <Box as="form" onSubmit={(e) => { e.preventDefault(); handlePostSubmit(); }}>
            <HStack spacing={4}>
              <Input
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Write your post here..."
              />
              <Button type="submit" colorScheme="blue">Post</Button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;