import { ButtonProps, Button as ChakraButton } from "@chakra-ui/react";
import { FC } from "react";

export const Button: FC<ButtonProps> = (props) => {
  return (
    <ChakraButton colorScheme="teal" {...props}>
      {props.children}
    </ChakraButton>
  );
};
