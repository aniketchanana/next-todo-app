import { UseToastOptions, useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();

  const customToast = (
    values: Omit<UseToastOptions, "duration" | "isClosable">
  ) => {
    toast({
      ...values,
      duration: 3000,
      isClosable: true,
    });
  };
  return customToast;
};
