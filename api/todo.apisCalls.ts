import { todoEndpoints } from "@/constants/endPoints";
import { GenericObject } from "@/types/common.types";
import {
  ICreateListResponse,
  IFetchTodoListItems,
  IFetchTodoListResponse,
  IUpdateListResponse,
} from "@/types/todo.types";
import { deleteApi, getApi, patchApi, postApi } from "@/utils/api.utils";

export const fetchTodoList = async (
  token?: string,
  pageNumber?: number,
  pageSize?: number
) => {
  const headers = {} as GenericObject;
  if (token) {
    headers.token = token;
  }
  let queryString = "";
  if (pageNumber && pageSize) {
    queryString = `?pageNumber=${pageNumber}&pageSize${pageSize}`;
  }
  try {
    const res = await getApi<IFetchTodoListResponse>(
      `${todoEndpoints.getUserTodoList}${queryString}`,
      headers
    );
    return res.data;
  } catch (e: any) {
    throw e;
  }
};

export const fetchAllTodoItems = async (todoListId: string, token: string) => {
  try {
    const res = await getApi<IFetchTodoListItems>(
      `${todoEndpoints.getUserTodoItem}?listId=${todoListId}`,
      { token }
    );
    return res.data;
  } catch (e) {
    throw e;
  }
};

export const createTodoList = (listName) => {
  return postApi<ICreateListResponse>(todoEndpoints.createNewList, {
    listName,
  });
};
export const updateTodoList = (todoListId, updateName) => {
  return patchApi<IUpdateListResponse>(todoEndpoints.updateTodoList, {
    listId: todoListId,
    updates: {
      name: updateName,
    },
  });
};
export const deleteTodoList = (todoListId) => {
  return deleteApi<IUpdateListResponse>(todoEndpoints.deleteTodoList, {
    listId: todoListId,
  });
};
export const createNewTodoItem = (todoListId: string, text: string) => {
  return postApi<{ text: string; listId: string }>(
    todoEndpoints.createTodoItem,
    {
      text,
      listId: todoListId,
    }
  );
};
