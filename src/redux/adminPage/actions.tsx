import { AdminPageActions, SetBookRequest, AdminBookPageActions, BooksPageState, BookPageDeleteState} from "./types";
import { createAction } from "typesafe-actions";

const prefix = "@@admin";

export function doAdminInit() {
  return { type: `${prefix}/${AdminPageActions.ADMIN_INIT}` };
}
export function doBooks(data: BooksPageState){
  return { type: `@@admin/BOOK_INIT`, payload:data };
}

export function allBook(data: BooksPageState){
  return { type: `@@admin/BOOK_ALL`, payload:data };
}

export function deleteBook(data: BookPageDeleteState){
  return { type: `@@admin/BOOK_DELETE`, payload:data };
}

createAction(`${prefix}/${AdminBookPageActions.BOOK_INIT}`, resolve => {
  return (data: BooksPageState) => {
    return resolve({ data });
  };
});
createAction(`${prefix}/${AdminBookPageActions.BOOK_ALL}`, resolve => {
  return (data: BooksPageState) => {
    return resolve({ data });
  };
});
createAction(`${prefix}/${AdminBookPageActions.BOOK_DELETE}`, resolve => {
  return (data: BookPageDeleteState) => {
    return resolve({ data });
  };
});
