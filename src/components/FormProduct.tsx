import { Button, Form, Input, Upload } from "antd";
import React, { useState } from "react";
import "./FormProducts.css";
import axios from "axios";
import { NotificationPlacement } from "antd/es/notification/interface";

const initForm = {
  name: "",
  category: "Apparel",
  subcategory: "Casual wear",
  tagcategory: "Normal Taxeable",
  colors: "4 Colors",
  sizes: "3 sizes",
};

const FormProduct = ({
  setIsOpenCreate,
  openNotification,
  getData,
}: {
  setIsOpenCreate: (val: boolean) => void;
  openNotification: (val: NotificationPlacement, message: string) => void;
  getData: ()=> void;
}) => {
  const [form, setForm] = useState(initForm);

  const onChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const save = async () => {
    try {
      const resp = await axios.post("http://localhost:3000/products", form);
      setIsOpenCreate(false);
      openNotification("topRight", "Product saved successfully");
      await getData()
    } catch (error: any) {
      setIsOpenCreate(false);
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Form layout="horizontal" style={{ width: "900px" }}>
          <Form.Item>
            <Input
              placeholder="Name"
              name="name"
              className="input"
              value={form.name}
              onChange={(e) => onChange(e)}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Category"
              name="category"
              className="input"
              value={form.category}
              onChange={(e) => onChange(e)}
              disabled={true}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Sub-category"
              name="subcategory"
              className="input"
              value={form.subcategory}
              onChange={(e) => onChange(e)}
              disabled={true}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Tag-category"
              name="tagcategory"
              className="input"
              value={form.tagcategory}
              onChange={(e) => onChange(e)}
              disabled={true}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Color"
              name="colors"
              className="input"
              value={form.colors}
              onChange={(e) => onChange(e)}
              disabled={true}
            />
          </Form.Item>
          <Form.Item>
            <Input
              placeholder="Sizes"
              name="sizes"
              className="input"
              value={form.sizes}
              onChange={(e) => onChange(e)}
              disabled={true}
            />
          </Form.Item>
          <Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button type="primary" onClick={save}>
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormProduct;
