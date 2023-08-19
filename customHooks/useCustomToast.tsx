import { UseToastOptions, useToast } from "@chakra-ui/react";
import { useCallback } from "react";

export const useCustomToast = () => {
  const toast = useToast();

  const customToast = useCallback(
    (values: Omit<UseToastOptions, "duration" | "isClosable">) => {
      toast({
        ...values,
        duration: 3000,
        isClosable: true,
      });
    },
    [toast]
  );
  return customToast;
};
