import { Box, InputGroup, InputRightElement } from "@chakra-ui/react";
import { FormInput } from "../common/FormInput";
import { Button } from "../common/Button";
import { Formik } from "formik";
import { useCustomToast } from "@/customHooks/useCustomToast";
import { useTodoDispatchContext } from "@/context/TodoContext/useTodoDispatchContext";
import { useRouter } from "next/router";
import { createNewTodoItem } from "@/api/todo.apisCalls";
import { get, isEmpty } from "lodash";
import { ITodoItem } from "@/types/todo.types";
import {
  addNewTodoItemAction,
  addNewTodoList,
} from "@/context/TodoContext/actions";
import { FC } from "react";

enum FormItemName {
  ADD_TODO_ITEM_INPUT = "addTodoItem",
}
interface ICreateNewTodoItemForm {
  [FormItemName.ADD_TODO_ITEM_INPUT]: string;
}
const validateTodoItem = (values: ICreateNewTodoItemForm) => {
  let errors = {} as ICreateNewTodoItemForm;
  if (!values[FormItemName.ADD_TODO_ITEM_INPUT]) {
    errors[FormItemName.ADD_TODO_ITEM_INPUT] = "Please enter your todo";
  }
  return errors;
};
export const AddTodoInput: FC<{ scrollToLastElement: () => void }> = ({
  scrollToLastElement,
}) => {
  const toast = useCustomToast();
  const todoDispatch = useTodoDispatchContext();
  const router = useRouter();
  const handleAddTodoItem = async (
    values: ICreateNewTodoItemForm,
    { setSubmitting, setValues }
  ) => {
    try {
      const todoListId = router.query.todoListId as string;
      const response = await createNewTodoItem(
        todoListId,
        values[FormItemName.ADD_TODO_ITEM_INPUT].trim()
      );
      const todoItemDetails = get(response, "data.data", {}) as ITodoItem;
      if (isEmpty(todoItemDetails)) {
        throw new Error("Unable to create new list");
      }

      toast({
        title: "Todo item created",
        status: "success",
      });
      todoDispatch(addNewTodoItemAction(todoListId, todoItemDetails));
      setValues({
        [FormItemName.ADD_TODO_ITEM_INPUT]: "",
      });
      scrollToLastElement();
    } catch (e: any) {
      toast({
        ...e.response.data,
        status: "error",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Box w="full">
      <Formik
        initialValues={{
          [FormItemName.ADD_TODO_ITEM_INPUT]: "",
        }}
        validate={validateTodoItem}
        onSubmit={handleAddTodoItem}
      >
        {({ handleSubmit, isSubmitting, handleBlur, handleChange, values }) => {
          return (
            <form onSubmit={handleSubmit}>
              <InputGroup size={"lg"}>
                <FormInput
                  value={values[FormItemName.ADD_TODO_ITEM_INPUT]}
                  placeholder="Purchase tomatoes"
                  background={"gray.100"}
                  name={FormItemName.ADD_TODO_ITEM_INPUT}
                  type="text"
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  errorMessage={""}
                  border={"none"}
                />
                <InputRightElement width={"auto"} height={"100%"} mr={4}>
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    isDisabled={
                      values[FormItemName.ADD_TODO_ITEM_INPUT].length <= 0
                    }
                  >
                    Add
                  </Button>
                </InputRightElement>
              </InputGroup>
            </form>
          );
        }}
      </Formik>
    </Box>
  );
};
