import React from "react";
import { Form } from "react-bootstrap";

export default function SwitchArchiveFilter({ handleSwitchChange }) {
  return (
    <div>
      <Form className="ms-4 mb-2">
        <Form.Switch
          type="switch"
          id="custom-switch"
          label="Archived"
          onChange={handleSwitchChange}
        />
      </Form>
    </div>
  );
}
