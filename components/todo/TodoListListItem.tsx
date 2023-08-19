import { ITodoList } from "@/types/todo.types";
import { Box, HStack, Tooltip } from "@chakra-ui/react";
import { FC, useState } from "react";
import { PencilLineIcon } from "../common/Icons";
import { EditModalView } from "@/constants/common";
import TodoListAddAndUpdateModal from "./TodoListAddAndUpdateModal";
import { ActionIconContainer } from "./ActionItemContainer";
import { DeletePopoverWithConfirmation } from "./DeletePopoverWithConfirmation";
import { useRouter } from "next/router";
import { todoRoutes } from "@/constants/routes";

export const TodoListListItem: FC<ITodoList> = ({ name, uuid: todoListId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const navigateToTodoItem = () => router.push(todoRoutes.todo(todoListId));

  return (
    <Box
      px={3}
      py={2}
      w="full"
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      cursor={"pointer"}
      transition={"0.1s all ease-in"}
      background={
        router.query.todoListId === todoListId ? "gray.300" : "gray.200"
      }
      _hover={{
        background: "gray.300",
      }}
      fontWeight={"normal"}
      borderRadius={"base"}
      width={"100%"}
      onClick={navigateToTodoItem}
    >
      <Box textOverflow={"ellipsis"} overflow={"hidden"} whiteSpace={"nowrap"}>
        {name}
      </Box>
      <HStack gap={3} cursor={"pointer"}>
        <Tooltip label="Edit list name" hasArrow placement="bottom">
          <span>
            <ActionIconContainer iconColor={"teal"} onClick={openModal}>
              <PencilLineIcon />
            </ActionIconContainer>
          </span>
        </Tooltip>
        <Box>
          <DeletePopoverWithConfirmation todoListId={todoListId} />
        </Box>
      </HStack>
      {isModalOpen && (
        <TodoListAddAndUpdateModal
          selectedListId={todoListId}
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          viewType={EditModalView.UPDATE}
        />
      )}
    </Box>
  );
};
