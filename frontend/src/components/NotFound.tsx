import { Box, Heading, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      bg="gray.100"
      p={4}
    >
      <Heading as="h1" size="2xl" mb={4} children="404" />
      <Text fontSize="xl" mb={4}>
        Oops! The page you are looking for does not exist.
      </Text>
      <Button as={Link} to="/" colorScheme="teal" size="lg">
        Go to Home
      </Button>
    </Box>
  );
}

export default NotFound;
