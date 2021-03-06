// onClick={(e) =>
//   window.w3.sortHTML(
//     "#example",
//     ".item",
//     "td:nth-child(7)"
//   )
// }

export const sortTableByColumn = (table, rowItem, nthColumn) => {
  window.w3.sortHTML(table, rowItem, `td:nth-child(${nthColumn})`);
};
