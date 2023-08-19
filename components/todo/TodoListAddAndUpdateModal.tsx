import { useTodoDispatchContext } from "@/context/TodoContext/useTodoDispatchContext";
import { useCustomToast } from "@/customHooks/useCustomToast";
import {
  Box,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { useRouter } from "next/router";
import { FC, useCallback, useMemo, useState } from "react";
import { FormInput } from "../common/FormInput";
import { Button } from "../common/Button";
import { createTodoList, updateTodoList } from "@/api/todo.apisCalls";
import { get, isEmpty, values } from "lodash";
import { ITodoList } from "@/types/todo.types";
import { todoRoutes } from "@/constants/routes";
import {
  addNewTodoList,
  updateTodoListAction,
} from "@/context/TodoContext/actions";
import { useTodoStateContext } from "@/context/TodoContext/useTodoStateContext";
import { EditModalView } from "@/constants/common";

enum FormItemName {
  TODO_LIST_NAME = "todoListName",
}
interface ICreateNewTodoListForm {
  todoListName: string;
}

interface ITodoListAddAndUpdateModal {
  isModalOpen: boolean;
  closeModal: () => void;
  viewType: EditModalView;
  selectedListId?: string;
}

const validateTodoListName = (values: ICreateNewTodoListForm) => {
  let errors = {} as ICreateNewTodoListForm;
  if (!values[FormItemName.TODO_LIST_NAME]) {
    errors[FormItemName.TODO_LIST_NAME] = "Please enter list name!";
  }
  return errors;
};
const TodoListAddAndUpdateModal: FC<ITodoListAddAndUpdateModal> = ({
  isModalOpen,
  closeModal,
  viewType = EditModalView.ADD,
  selectedListId = "",
}) => {
  const todoDispatch = useTodoDispatchContext();
  const router = useRouter();
  const { allTodoLists = [] } = useTodoStateContext();
  const selectedTodoList = useMemo(() => {
    return allTodoLists.find(
      (listDetails) => listDetails.uuid === selectedListId
    );
  }, [allTodoLists, selectedListId]);
  const toast = useCustomToast();

  const onCreateTodoList = async (
    values: ICreateNewTodoListForm,
    { setSubmitting }
  ) => {
    try {
      const response = await createTodoList(values.todoListName.trim());
      const listDetails = get(
        response,
        "data.data.listDetails",
        {}
      ) as ITodoList;
      if (isEmpty(listDetails)) {
        throw new Error("Unable to create new list");
      }
      const newListId = get(listDetails, "uuid", "");
      toast({
        title: "Successfully created todo list",
        status: "success",
      });
      router.push(todoRoutes.todo(newListId));
      todoDispatch(addNewTodoList(listDetails));
    } catch (e: any) {
      toast({
        ...e.response.data,
        status: "error",
      });
    } finally {
      setSubmitting(false);
      closeModal();
    }
  };

  const onUpdateTodoList = async (
    values: ICreateNewTodoListForm,
    { setSubmitting }
  ) => {
    try {
      const updatedName = values.todoListName.trim();
      await updateTodoList(selectedListId, updatedName);
      toast({
        title: "Successfully updated todo list",
        status: "success",
      });
      todoDispatch(updateTodoListAction(selectedListId, updatedName));
    } catch (e: any) {
      toast({
        ...e.response.data,
        status: "error",
      });
    } finally {
      setSubmitting(false);
      closeModal();
    }
  };
  const selectedListName = selectedTodoList?.name || "";
  const ModalConfig = {
    [EditModalView.ADD]: {
      formSubmission: onCreateTodoList,
      initialValue: "",
      title: "Create new TODO List",
      btnText: "Create",
    },
    [EditModalView.UPDATE]: {
      formSubmission: onUpdateTodoList,
      initialValue: selectedListName,
      title: (
        <Box display={"flex"} gap={2}>
          <Text>Update:</Text>
          <Text color={"blue.400"}> {selectedListName}</Text>
        </Box>
      ),
      btnText: "Update",
    },
  };
  const onInputRefReady = useCallback((ref) => {
    ref?.current?.focus();
  }, []);

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ModalConfig[viewType].title}</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{
            [FormItemName.TODO_LIST_NAME]: ModalConfig[viewType].initialValue,
          }}
          validate={validateTodoListName}
          onSubmit={ModalConfig[viewType].formSubmission}
        >
          {({
            handleSubmit,
            isSubmitting,
            handleBlur,
            handleChange,
            errors,
            touched,
            initialValues,
          }) => {
            return (
              <form onSubmit={handleSubmit}>
                <ModalBody>
                  <FormInput
                    defaultValue={initialValues[FormItemName.TODO_LIST_NAME]}
                    onInputRefReady={onInputRefReady}
                    name={FormItemName.TODO_LIST_NAME}
                    type="text"
                    placeholder="Grocery list"
                    handleBlur={handleBlur}
                    handleChange={handleChange}
                    errorMessage={
                      (errors[FormItemName.TODO_LIST_NAME] &&
                        touched[FormItemName.TODO_LIST_NAME] &&
                        errors[FormItemName.TODO_LIST_NAME]) ||
                      ""
                    }
                  />
                </ModalBody>

                <ModalFooter>
                  <Button type="submit" isLoading={isSubmitting}>
                    {ModalConfig[viewType].btnText}
                  </Button>
                </ModalFooter>
              </form>
            );
          }}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default TodoListAddAndUpdateModal;
