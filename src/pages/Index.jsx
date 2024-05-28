import { Box, Container, VStack, HStack, Text, Input, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { usePosts, useAddPost, useReactions, useAddReaction } from "../integrations/supabase/index.js";

const Index = () => {
  const { data: posts, isLoading, isError } = usePosts();
  const addPostMutation = useAddPost();
  const addReactionMutation = useAddReaction();
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = () => {
    if (newPost.trim() !== "") {
      addPostMutation.mutate({ title: newPost, body: newPost, author_id: "user-id-placeholder" });
      setNewPost("");
    }
  };

  const handleReaction = (postId, emoji) => {
    addReactionMutation.mutate({ post_id: postId, user_id: "user-id-placeholder", emoji });
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
            {isLoading ? (
              <Text>Loading...</Text>
            ) : isError ? (
              <Text>Error loading posts.</Text>
            ) : posts.length === 0 ? (
              <Text>No posts yet. Be the first to post!</Text>
            ) : (
              posts.map((post) => (
                <Box key={post.id} p={4} shadow="md" borderWidth="1px" borderRadius="md">
                  <Text>{post.title}</Text>
                  <Text>{post.body}</Text>
                  <HStack spacing={2}>
                    {post.reactions?.map((reaction) => (
                      <Text key={reaction.id}>{reaction.emoji}</Text>
                    ))}
                    <Button size="xs" onClick={() => handleReaction(post.id, "👍")}>👍</Button>
                    <Button size="xs" onClick={() => handleReaction(post.id, "❤️")}>❤️</Button>
                  </HStack>
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
              <Button type="submit" colorScheme="blue" isLoading={addPostMutation.isLoading}>Post</Button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default Index;