import { ITodoList } from "@/types/todo.types";
import { Box, HStack } from "@chakra-ui/react";
import { FC, lazy, useState } from "react";
import { PencilLineIcon } from "../common/Icons";
import { EditModalView } from "@/constants/common";
import TodoListAddAndUpdateModal from "./TodoListAddAndUpdateModal";

const ActionIconContainer = ({ children, iconColor, onClick }) => {
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
    >
      {children}
    </Box>
  );
};
export const TodoListListItem: FC<ITodoList> = ({ name, uuid }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <Box
      px={3}
      py={2}
      w="full"
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      cursor={"pointer"}
      background="gray.200"
      fontWeight={"normal"}
      borderRadius={"base"}
      width={"100%"}
    >
      <Box textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>
        {name}
      </Box>
      <HStack gap={1}>
        <ActionIconContainer iconColor={"teal"} onClick={openModal}>
          <PencilLineIcon />
        </ActionIconContainer>
        {/* <ActionIconContainer iconColor={"red"}>
          <DeleteLineIcon />
        </ActionIconContainer> */}
      </HStack>
      {isModalOpen && (
        <TodoListAddAndUpdateModal
          selectedListId={uuid}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          viewType={EditModalView.UPDATE}
        />
      )}
    </Box>
  );
};
