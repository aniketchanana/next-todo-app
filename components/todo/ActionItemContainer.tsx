import { Box } from "@chakra-ui/react";
import { FC } from "react";

interface IActionIconContainer {
  children: string | React.ReactElement;
  iconColor: string;
  onClick?: () => void;
}
export const ActionIconContainer: FC<IActionIconContainer> = ({
  children,
  iconColor,
  onClick,
}) => {
  return (
    <Box
      color={`${iconColor}.300`}
      transform={"scale(1)"}
      transition={"0.1s all ease-in"}
      _hover={{
        color: iconColor,
        transform: "scale(1.2)",
      }}
      onClick={onClick}
      cursor={"pointer"}
    >
      {children}
    </Box>
  );
};
