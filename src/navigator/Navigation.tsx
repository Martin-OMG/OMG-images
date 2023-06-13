import { Route, Routes } from "react-router-dom";
import BulkActions from "../components/BulkActions";
import MainLayout from "../components/MainLayout";
import FormProduct from "../components/FormProduct";
import TableProducts from "../components/TableProducts";

export const Navigation = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <TableProducts />
          </MainLayout>
        }
      />
      <Route
        path="/bulk-actions"
        element={
          <MainLayout>
            <BulkActions />
          </MainLayout>
        }
      />
    </Routes>
  );
};
