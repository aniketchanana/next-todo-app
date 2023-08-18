import { useState } from "react";
import { Button } from "../common/Button";
import { AddLineIcon } from "../common/Icons";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { FormInput } from "../common/FormInput";
import { useCustomToast } from "@/customHooks/useCustomToast";
import { useRouter } from "next/router";
import { get } from "lodash";
import { todoRoutes } from "@/constants/routes";
import { createTodoList } from "@/api/todo.apisCalls";
enum FormItemName {
  TODO_LIST_NAME = "todoListName",
}
interface ICreateNewTodoListForm {
  todoListName: string;
}
export const AddNewTodoListButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const toast = useCustomToast();
  const validateTodoListName = (values: ICreateNewTodoListForm) => {
    let errors = {} as ICreateNewTodoListForm;
    if (!values[FormItemName.TODO_LIST_NAME]) {
      errors[FormItemName.TODO_LIST_NAME] = "Please enter list name!";
    }
    return errors;
  };

  const onFormSubmit = async (
    values: ICreateNewTodoListForm,
    { setSubmitting }
  ) => {
    try {
      const response = await createTodoList(values.todoListName.trim());
      const newListId = get(response, "data.data.listDetails.uuid", "");
      toast({
        title: "Successfully created todo list",
        status: "success",
      });
      router.push(todoRoutes.todo(newListId));
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

  return (
    <>
      <Button leftIcon={<AddLineIcon />} onClick={openModal}>
        Add new list
      </Button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new TODO List</ModalHeader>
          <ModalCloseButton />
          <Formik
            initialValues={{ [FormItemName.TODO_LIST_NAME]: "" }}
            validate={validateTodoListName}
            onSubmit={onFormSubmit}
          >
            {({
              handleSubmit,
              isSubmitting,
              handleBlur,
              handleChange,
              errors,
              touched,
            }) => {
              return (
                <form onSubmit={handleSubmit}>
                  <ModalBody>
                    <FormInput
                      onInputRefReady={(ref) => {
                        ref.current?.focus();
                      }}
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
                      Create
                    </Button>
                  </ModalFooter>
                </form>
              );
            }}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};
