import { Form, Card, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectFilter,
  setFilters,
} from "../features/expenseSlice";

const CategoryFilter = () => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const filter = useSelector(selectFilter);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Generate years (current year and 5 years back)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i);

  const handleCategoryChange = (e) => {
    dispatch(setFilters({ category: e.target.value }));
  };

  const handleMonthChange = (e) => {
    dispatch(setFilters({ month: parseInt(e.target.value) }));
  };

  const handleYearChange = (e) => {
    dispatch(setFilters({ year: parseInt(e.target.value) }));
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Filter Expenses</Card.Title>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select
                value={filter.category}
                onChange={handleCategoryChange}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Month</Form.Label>
              <Form.Select value={filter.month} onChange={handleMonthChange}>
                {months.map((month, index) => (
                  <option key={month} value={index}>
                    {month}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Select value={filter.year} onChange={handleYearChange}>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CategoryFilter;
