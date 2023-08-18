import { useState } from "react";
import { Button } from "../common/Button";
import { AddLineIcon } from "../common/Icons";
import TodoListAddAndUpdateModal from "./TodoListAddAndUpdateModal";
import { EditModalView } from "@/constants/common";

export const AddNewTodoListButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <>
      <Button leftIcon={<AddLineIcon />} onClick={openModal}>
        Add new list
      </Button>
      {isModalOpen && (
        <TodoListAddAndUpdateModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          viewType={EditModalView.ADD}
        />
      )}
    </>
  );
};
