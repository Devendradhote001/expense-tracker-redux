import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addSalary } from "../features/expenseSlice";

const SalaryInput = () => {
  const dispatch = useDispatch();
  const [salary, setSalaryInput] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSalary((Number(salary))));
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Set Monthly Salary</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Monthly Salary</Form.Label>
            <Form.Control
              type="number"
              value={salary}
              onChange={(e) => setSalaryInput(e.target.value)}
              placeholder="Enter your monthly salary"
              min="0"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SalaryInput;
