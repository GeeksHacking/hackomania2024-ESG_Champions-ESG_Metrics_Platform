import { useState } from "react";
import Form from "../components/Form";

const ESGForm = () => {
  const [formData, setFormData] = useState({});

  return (
    <div>
      <Form formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default ESGForm;
