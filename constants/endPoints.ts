const getFullEndPoints = <T>(endPoints): T => {
  const root = endPoints?.root || "";
  const values = {};
  Object.entries(endPoints).forEach(([key, value]) => {
    if (key !== "root") values[key] = `${root}${value}`;
  });
  return values as T;
};

enum authAPI {
  root = "/auth",
  signIn = "/signin",
  signUp = "/signup",
  logout = "/logout",
  isValidSession = "/isValidSession",
}
export const authEndPoints =
  getFullEndPoints<Omit<typeof authAPI, "root">>(authAPI);

enum todoAPI {
  root = "/todo",

  createNewList = "/createNewList",
  getUserTodoList = "/getUserTodoList",
  updateTodoList = "/updateTodoList",
  deleteTodoList = "/deleteTodoList",

  createTodoItem = "/createTodoItem",
  getUserTodoItem = "/getUserTodoItem",
  updateTodoItem = "/updateTodoItem",
  deleteTodoItem = "/deleteTodoItem",
}

export const todoEndpoints =
  getFullEndPoints<Omit<typeof todoAPI, "root">>(todoAPI);
