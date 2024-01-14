import { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function TagsForm({ handleTag, showTags }) {
  const [tag, setTag] = useState("");
  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleClick = () => {
    handleTag(tag);
    setTag("");
  };

  return (
    <>
      <Form.Group>
        <Form.Label>Tags</Form.Label>
        <Form.Control
          placeholder="Add a tag..."
          onChange={handleTagChange}
          value={tag}
        />
        <Button
          variant="primary"
          size="sm"
          onClick={handleClick}
          className="m-2"
        >
          +
        </Button>
        <p>Tags: {showTags.join(", ")}</p>
      </Form.Group>
    </>
  );
}
