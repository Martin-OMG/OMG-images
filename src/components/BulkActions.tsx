import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Space,
  Table,
  Tag,
  Form,
  Upload,
  Select,
  Image,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import Loader from "./Loader";
import image from "../assets/no-image.png";

interface DataType {
  _id: string;
  name: string;
  category: string;
  subcategory: string;
  tagcategory: string;
  colors: string;
  sizes: string;
  imageUrl: string;
}
const getColumns = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => <div>{index + 1}</div>,
      align: "center",
    },
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => (
        <div>
          {record.imageUrl === "" ? (
            <Image width={100} height={100} src={image} />
          ) : (
            <Image width={100} height={100} src={record.imageUrl} />
          )}

          <div style={{ marginTop: "10px" }}>
            <strong>{record.name}</strong>
          </div>
        </div>
      ),
      align: "center",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      align: "center",
    },
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      key: "subcategory",
      align: "center",
    },
    {
      title: "Tagcategory",
      key: "tagcategory",
      dataIndex: "tagcategory",
      align: "center",
    },
    {
      title: "Colors & Sizes",
      key: "action",
      render: (_, record) => (
        <>
          <div>{record.colors}</div>
          <div>{record.sizes}</div>
        </>
      ),
      align: "center",
    },
  ];

  return columns;
};

const BulkActions: React.FC = () => {
  const [productFiltered, setProductFiltered] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const filterProducts = (value: string) => {
    if (value === "all") {
      setProductFiltered(products);
    } else {
      const filter = products.filter(
        (product: any) => product.imageColor === value
      );
      setProductFiltered(filter);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const prodHttp = await axios.get("http://localhost:3000/products");
      setProducts(prodHttp.data);
      setProductFiltered(prodHttp.data);
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const propsLogo = {
    beforeUpload: async (file: any) => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        const resp = await axios.patch(
          `http://localhost:3000/products/image/${productId}`,
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
  };

  return (
    <>
      <Loader show={isLoading} tip={"Loading"} size={"large"} />

      <div style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            justifyContent: "space-between",
          }}
        >
          <Select
            defaultValue="all"
            style={{ width: 120 }}
            options={[
              { value: "all", label: "All Products" },
              { value: "dark", label: "Darks Products" },
              { value: "light", label: "Lights Products" },
            ]}
            onChange={filterProducts}
          />
          <Button type="primary">Bulk Actions</Button>
        </div>
        <Table columns={getColumns()} dataSource={productFiltered} />

        <Modal
          title="Upload Image"
          open={isOpen}
          onOk={() => setIsOpen(false)}
          onCancel={() => setIsOpen(false)}
          footer={null}
        >
          <div style={{ textAlign: "center" }}>
            <Form.Item>
              <Upload
                {...propsLogo}
                action="http://localhost:3000/products/imagen/imagen"
                listType="picture-circle"
                maxCount={1}
              >
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default BulkActions;
