import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addExpense, selectCategories } from "../features/expenseSlice";

const ExpenseForm = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const [expense, setExpense] = useState({
    title: "",
    amount: "",
    category: "Other",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addExpense({
        ...expense,
        amount: Number(expense.amount),
      })
    );
    // Reset form
    setExpense({
      title: "",
      amount: "",
      category: "Other",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Add New Expense</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={expense.title}
                  onChange={handleChange}
                  placeholder="Enter expense title"
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  name="amount"
                  value={expense.amount}
                  onChange={handleChange}
                  placeholder="Enter amount"
                  min="0"
                  step="0.01"
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={expense.category}
                  onChange={handleChange}
                  required
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="date"
                  value={expense.date}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="primary" type="submit">
            Add Expense
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ExpenseForm;
