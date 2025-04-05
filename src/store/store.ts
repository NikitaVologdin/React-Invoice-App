import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./features/filter/filterSlice";
import authReducer from "./features/auth/authSlice";
import invoicesReducer from "./features/invoices/invoicesSlice";
import notificationReducer from "./features/notification/notificationSlice";
import formReducer from "./features/form/formSlice";
import datePickerReducer from "./features/datePicker/datePickerSlice";
import termsReducer from "./features/terms/termsSlice";

export const store = configureStore({
  reducer: {
    filters: filterReducer,
    auth: authReducer,
    invoices: invoicesReducer,
    notification: notificationReducer,
    form: formReducer,
    datePicker: datePickerReducer,
    terms: termsReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
