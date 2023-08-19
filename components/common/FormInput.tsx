import { Box, Input, InputProps, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { FC, useEffect, useRef } from "react";

const RenderError = ({ message = "" }) => {
  return (
    <Text fontSize={"small"} color={"red.500"} mt={1}>
      {message}
    </Text>
  );
};
interface IFormInput {
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
  onInputRefReady?: (ref: React.RefObject<HTMLInputElement>) => void;
}
export const FormInput: FC<InputProps & IFormInput> = ({
  name,
  type,
  errorMessage,
  handleChange,
  handleBlur,
  placeholder,
  onInputRefReady = null,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (onInputRefReady && inputRef && inputRef.current) {
      onInputRefReady(inputRef);
    }
  }, [inputRef, onInputRefReady]);
  return (
    <Box w="full">
      <Input
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        width={"full"}
        ref={inputRef}
        {...rest}
      />
      {!isEmpty(errorMessage) && <RenderError message={errorMessage} />}
    </Box>
  );
};
