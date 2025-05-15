import { configureStore } from "@reduxjs/toolkit";
import expenseReducer from "../features/expenseSlice";

export const store = configureStore({
  reducer: {
    expenses: expenseReducer,
  },
});
