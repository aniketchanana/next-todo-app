export const authRoutes = {
  login: () => "/login",
  signup: () => "/signup",
};

export const todoRoutes = {
  todo: (listId) => `/todo/${listId}`,
};
export const mainRoutes = {
  root: () => "/",
};
