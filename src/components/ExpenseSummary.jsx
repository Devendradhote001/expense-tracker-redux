import { Card, Row, Col, ProgressBar } from "react-bootstrap";
import { useSelector } from "react-redux";
import {
  selectRemainingBudget,
  selectSalary,
  selectTotalExpenses,
} from "../features/expenseSlice";

const ExpenseSummary = () => {
  const salary = useSelector((state) => {
    return state.expenses.salary;
  });
  const totalExpenses = useSelector(selectTotalExpenses);
  const remainingBudget = useSelector(selectRemainingBudget);

  // Calculate percentage of salary spent
  const percentageSpent = salary > 0 ? (totalExpenses / salary) * 100 : 0;

  // Determine progress bar variant based on percentage spent
  const getProgressVariant = (percent) => {
    if (percent < 50) return "success";
    if (percent < 75) return "warning";
    return "danger";
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Expense Summary</Card.Title>

        <Row className="mb-4">
          <Col md={4}>
            <div className="text-center">
              <h6>Monthly Salary</h6>
              <h3>₹{salary.toFixed(2)}</h3>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <h6>Total Expenses</h6>
              <h3>₹{totalExpenses.toFixed(2)}</h3>
            </div>
          </Col>
          <Col md={4}>
            <div className="text-center">
              <h6>Remaining Budget</h6>
              <h3
                className={remainingBudget < 0 ? "text-danger" : "text-success"}
              >
                ₹{remainingBudget.toFixed(2)}
              </h3>
            </div>
          </Col>
        </Row>

        <div className="mb-4">
          <h6>Budget Usage</h6>
          <ProgressBar
            now={Math.min(percentageSpent, 100)}
            variant={getProgressVariant(percentageSpent)}
            label={`${percentageSpent.toFixed(1)}%`}
          />
        </div>

        <h6>Expenses by Category</h6>
        {/* {expensesByCategory
          .filter((item) => item.amount > 0)
          .sort((a, b) => b.amount - a.amount)
          .map(({ category, amount }) => (
            <div key={category} className="mb-2">
              <div className="d-flex justify-content-between">
                <span>{category}</span>
                <span>₹{amount.toFixed(2)}</span>
              </div>
              <ProgressBar
                now={(amount / totalExpenses) * 100}
                variant="info"
                style={{ height: "5px" }}
              />
            </div>
          ))} */}
      </Card.Body>
    </Card>
  );
};

export default ExpenseSummary;
