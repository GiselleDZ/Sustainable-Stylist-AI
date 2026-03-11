import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const isResError = isRouteErrorResponse(error);

  return (
    <Box id="error-page">
      <Heading>Oops!</Heading>
      <Heading size="md">Sorry an unexpected error occurred.</Heading>
      {isResError ? (
        <Box id="detailed-error">
          <Heading size="lg" id="error-status">
            {error.status}: {error.statusText}
          </Heading>
          <Text id="error-text">{error.data}</Text>
        </Box>
      ) : (
        <Text as="i">Unknown Error</Text>
      )}
    </Box>
  );
}
