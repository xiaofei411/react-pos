export const getCurrentPage = state => state.players.currentPage;
export const getPerPage = state => state.players.perPage;
export const getTotalPages = state =>state.players.totalPages;

export const getList = state => {

  let list = state.players.list;
  const page = getCurrentPage(state);
  const listName = `page${page}`;
  let resultSet = list[listName];

  if (typeof resultSet === "undefined")
    return;

  return resultSet;
};