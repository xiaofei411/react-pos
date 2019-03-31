export const getCurrentPage = state => state.employees.currentPage;
export const getPerPage = state => state.employees.perPage;
export const getTotalPages = state => state.employees.totalPages;

export const getList = state => {

  let list = state.employees.list;
  const page = getCurrentPage(state);
  const listName = `page${page}`;
  let resultSet = list[listName];

  if (typeof resultSet === "undefined")
    return;

  return resultSet;
};