import { Box, Input } from "@chakra-ui/react";
import { isEmpty } from "lodash";

const RenderError = ({ message = "" }) => {
  return (
    <Box color={"red"} mt={1}>
      {message}
    </Box>
  );
};

export const AuthInput = ({
  name,
  type,
  errorMessage,
  handleChange,
  handleBlur,
  placeholder,
}: {
  name: string;
  type: string;
  placeholder: string;
  errorMessage: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
}) => {
  return (
    <Box width={"full"} mb={2}>
      <Input
        name={name}
        type={type}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        width={"full"}
      />
      {!isEmpty(errorMessage) && <RenderError message={errorMessage} />}
    </Box>
  );
};
