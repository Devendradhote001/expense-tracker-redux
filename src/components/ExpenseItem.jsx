import { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExpense,
  editExpense,
  selectCategories,
} from "../features/expenseSlice";

const ExpenseItem = ({ expense }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const [isEditing, setIsEditing] = useState(false);
  const [editedExpense, setEditedExpense] = useState({
    ...expense,
    date: new Date(expense.date).toISOString().split("T")[0],
  });

  const handleDelete = () => {
    console.log(expense.id);
    dispatch(deleteExpense(expense.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense({ ...editedExpense, [name]: value });
  };

  const handleSave = () => {
    dispatch(
      editExpense({
        ...editedExpense,
        amount: Number(editedExpense.amount),
      })
    );
    setEditedExpense({
      ...expense,
      date: new Date(expense.date).toISOString().split("T")[0],
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedExpense({
      ...expense,
      date: new Date(expense.date).toISOString().split("T")[0],
    });
    setIsEditing(false);
  };

  const formattedDate = new Date(expense.date).toLocaleDateString();

  return (
    <Card className="mb-3">
      <Card.Body>
        {isEditing ? (
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={editedExpense.title}
                    onChange={handleChange}
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
                    value={editedExpense.amount}
                    onChange={handleChange}
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
                    value={editedExpense.category}
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
                    value={editedExpense.date}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex gap-2">
              <Button variant="success" onClick={handleSave}>
                Save
              </Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Form>
        ) : (
          <>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5>{expense.title}</h5>
                <div className="text-muted">
                  ƒ
                  <small>
                    {expense.category} • {formattedDate}
                  </small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <h5 className="mb-0 me-3">₹{expense.amount.toFixed(2)}</h5>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handleEdit}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default ExpenseItem;
