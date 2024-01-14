import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

export default function SearchFilter({ onInputChange }) {
  const [filterValue, setFilterValue] = useState("");

  const handleClick = () => {
    onSearch();
  };

  const handleChange = (e) => {
    const newFilter = e.target.value;
    setFilterValue(newFilter);
    onInputChange(newFilter);
  };

  return (
    <div>
      <InputGroup className="mb-3">
        <InputGroup.Text>
          <b>Search by Tag</b>
        </InputGroup.Text>
        <Form.Control
          placeholder="Tag name"
          value={filterValue}
          onChange={handleChange}
        />
      </InputGroup>
    </div>
  );
}
