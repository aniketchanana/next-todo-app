import { Box, Spinner } from "@chakra-ui/react";

export const FullScreenSpinner = () => {
  return (
    <Box
      h="full"
      w="full"
      display={"flex"}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Spinner size={"lg"} />
    </Box>
  );
};
