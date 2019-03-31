export const getInfo = state => state.currentEmployee.info;
export const getSummary = state => state.currentEmployee.summary;
export const getTransactionList = state => state.currentEmployee.transactions ? state.currentEmployee.transactions.list : [];
export const getCurrentTransactionsPage = state => state.currentEmployee.transactions ? state.currentEmployee.transactions.page : 1;
export const getTransactionsPerPage = state => state.currentEmployee.transactions ? state.currentEmployee.transactions.number : 10;
export const getTransactionsTotal = state => state.currentEmployee.transactions ? state.currentEmployee.transactions.total : 1;
export const isFetching = state => state.currentEmployee.isFetching;