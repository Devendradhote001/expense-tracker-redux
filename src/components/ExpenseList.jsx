import { Card } from "react-bootstrap";
import ExpenseItem from "./ExpenseItem";
import { useSelector } from "react-redux";
import { selectExpenses } from "../features/expenseSlice";

const ExpenseList = () => {
  const expenses = useSelector(selectExpenses);
  console.log("expenses->", expenses);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Expenses</Card.Title>
        {expenses.length === 0 ? (
          <p className="text-muted">
            No expenses found for the selected period.
          </p>
        ) : (
          expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        )}
      </Card.Body>
    </Card>
  );
};

export default ExpenseList;
