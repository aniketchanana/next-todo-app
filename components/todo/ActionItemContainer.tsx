import { Box, PlacementWithLogical, Tooltip } from "@chakra-ui/react";
import { FC } from "react";

interface IActionIconContainer {
  children: string | React.ReactElement;
  iconColor: string;
  onClick?: () => void;
  label?: string;
  tooltipPlacement?: PlacementWithLogical;
}
export const ActionIconContainer: FC<IActionIconContainer> = ({
  children,
  iconColor,
  onClick,
  label = "",
  tooltipPlacement = "bottom",
}) => {
  return (
    <Tooltip placement={tooltipPlacement} label={label} hasArrow>
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
    </Tooltip>
  );
};
