import axios from "axios";
import { useEffect, useState } from "react";
import { useRouteMatch, useHistory } from "react-router-dom";
import { Spinner, Box } from "@chakra-ui/react";

const API_ENDPOINT =
  process.env.REACT_APP_SERVER_ENDPOINT || "http://localhost:4000/api";

function HandleRedirectContainer() {
  const [destination, setDestination] = useState<null | string>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const history = useHistory();

  const {
    params: { shortId },
  } = useRouteMatch<{
    shortId: string;
  }>();

  useEffect(() => {
    async function getData() {
      return axios
        .get(`${API_ENDPOINT}/url/${shortId}`)
        .then((res) => setDestination(res.data.originalUrl))
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            setError("not-found");
          } else {
            setError(error.message);
          }
        });
    }
    getData();
  }, [shortId]);

  useEffect(() => {
    if (destination) {
      window.location.replace(destination);
    }
  }, [destination]);

  useEffect(() => {
    if (error === "not-found") {
      history.push("/not-found");
    }
  }, [error, history]);

  if (!destination && !error) {
    return (
      <Box
        height="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      </Box>
    );
  }

  return <p>{error && JSON.stringify(error)}</p>;
}

export default HandleRedirectContainer;