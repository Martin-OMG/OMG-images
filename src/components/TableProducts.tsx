import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Table,
  Form,
  Upload,
  notification,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import { PlusOutlined } from "@ant-design/icons";
import Loader from "./Loader";
import { NotificationPlacement } from "antd/es/notification/interface";
import FormProduct from "./FormProduct";

interface DataType {
  _id: string;
  name: string;
  category: string;
  subcategory: string;
  tagcategory: string;
  colors: string;
  sizes: string;
}
const getColumns = ({
  setProductId: setProductId,
  setIsOpen: setIsOpen,
}: {
  setProductId: (id: string) => void;
  setIsOpen: (open: boolean) => void;
}) => {
  const columns: ColumnsType<DataType> = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => <div>{index + 1}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Upload Image",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => {
              setProductId(record._id);
              setIsOpen(true);
            }}
            type="link"
          >
            Upload
          </Button>
        </>
      ),
    },
  ];

  return columns;
};

const TableProducts: React.FC = () => {
  const Context = React.createContext({ name: "Default" });
  const [products, setProducts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [productId, setProductId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [defaultImage, setDefaultImage] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const openNotification = (
    placement: NotificationPlacement,
    message?: string
  ) => {
    api.info({
      message: `OMG Notification`,
      description: (
        <Context.Consumer>
          {({ name }) => (message ? message : `Image uploaded succefully`)}
        </Context.Consumer>
      ),
      placement,
    });
  };

  const getData = async () => {
    try {
      setIsLoading(true);
      const prodHttp = await axios.get("http://localhost:3000/products");
      setProducts(prodHttp.data);
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
        openNotification("topRight");
        setIsLoading(false);
        setIsOpen(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
  };

  return (
    <>
      {contextHolder}
      <Loader show={isLoading} tip={"Loading"} size={"large"} />
      <div style={{ width: "100%" }}>
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Button onClick={() => setIsOpenCreate(true)} type="primary">
            +
          </Button>
        </div>
        <div style={{ maxWidth: "800px", margin: "0px auto" }}>
          <Table
            columns={getColumns({ setProductId, setIsOpen })}
            dataSource={products}
          />
        </div>

        <Modal
          title="Create Product"
          open={isOpenCreate}
          onOk={() => setIsOpenCreate(false)}
          onCancel={() => setIsOpenCreate(false)}
          footer={null}
        >
          <div style={{ textAlign: "center" }}></div>
          <FormProduct
            setIsOpenCreate={setIsOpenCreate}
            openNotification={openNotification}
            getData={getData}

          />
        </Modal>

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
                defaultFileList={defaultImage}
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

export default TableProducts;
