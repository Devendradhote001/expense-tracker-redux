import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  salary: 0,
  expenses: [],
  categories: [
    "Food",
    "Transportation",
    "Housing",
    "Entertainment",
    "Utilities",
    "Healthcare",
    "Other",
  ],
  filter: {
    category: "All",
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
};

export const expenseSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addSalary: (state, action) => {
      state.salary = action.payload;
    },
    addExpense: (state, action) => {
      state.expenses.push({
        id: Date.now().toString(),
        ...action.payload,
        date: new Date(action.payload.date).toISOString(),
      });
    },
    setFilters: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    editExpense: (state, action) => {
      const { id, ...updates } = action.payload;
      const expenseIndex = state.expenses.findIndex(
        (expense) => expense.id === id
      );
      if (expenseIndex !== -1) {
        state.expenses[expenseIndex] = {
          ...state.expenses[expenseIndex],
          ...updates,
          date: new Date(updates.date).toISOString(),
        };
      }
    },
    deleteExpense: (state, action) => {
      state.expenses = state.expenses.filter(
        (exp) => exp.id !== action.payload
      );
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSalary, addExpense, setFilters, editExpense, deleteExpense } =
  expenseSlice.actions;

export const selectSalary = (state) => state.expenses.salary;
export const selectCategories = (state) => state.expenses.categories;
export const selectFilter = (state) => state.expenses.filter;

export const selectExpenses = (state) => {
  const { category, month, year } = state.expenses.filter;

  return state.expenses.expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    const matchesMonth = expenseDate.getMonth() === month;
    const matchesYear = expenseDate.getFullYear() === year;
    const matchesCategory = category === "All" || expense.category === category;

    return matchesMonth && matchesYear && matchesCategory;
  });
};

export const selectTotalExpenses = (state) => {
  const filterExpense = selectExpenses(state);
  return filterExpense.reduce((total, exp) => total + exp.amount, 0);
};

export const selectRemainingBudget = (state) => {
  const totalExpense = selectTotalExpenses(state);
  return state.expenses.salary - totalExpense;
};

export default expenseSlice.reducer;
