import { Box } from "@chakra-ui/react";
import URLShortenerForm from "../components/UrlShortenerPage";

function Home() {
  return (
    <Box
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      backgroundColor="white"
    >
      <URLShortenerForm />
    </Box>
  );
}

export default Home;