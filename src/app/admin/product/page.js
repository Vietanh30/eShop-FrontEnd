"use client";

import AdminTab from "@/components/admin/adminTab";
import { useState, useEffect } from "react";
import { getAllProducts, getProductBySlug } from "@/app/api/productApi";
import { getAllCates } from "@/app/api/cateApi";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
} from "@mui/material";
import { createProduct, updateProduct } from "@/app/api/adminApi";
import Swal from "sweetalert2";
import AddProductForm from "@/components/admin/AddProductForm";
import EditProductForm from "@/components/admin/EditProductForm";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productLength, setProductLength] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [token, setToken] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token_ = localStorage.getItem("user-token");
      setToken(token_);
      const [listProducts, listCategories] = await Promise.all([
        getAllProducts(token_),
        getAllCates(token_),
      ]);
      setProducts(listProducts);
      setCategories(listCategories);
      setProductLength(listProducts.length);
    };

    fetchData();
  }, []);

  const handleOpenDialog = async (product = null) => {
    if (product) {
      try {
        const productEdit = await getProductBySlug(product.slug); // Gọi hàm với await
        setCurrentProduct(productEdit);
        console.log(productEdit);
      } catch (error) {
        showAlert("Lỗi", "Không thể tải sản phẩm.", "error");
        return; // Thoát nếu có lỗi
      }
    } else {
      setCurrentProduct(null);
    }
    setEditMode(!!product);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentProduct(null);
  };

  const handleSubmit = async (values) => {
    const updatedValues = {
      ...values,
    };

    try {
      if (editMode) {
        await updateProduct(currentProduct._id, token, updatedValues);
        showAlert(
          "Cập Nhật Thành Công",
          "Sản phẩm đã được cập nhật.",
          "success"
        );
      } else {
        await createProduct(token, updatedValues);
        showAlert("Thêm Thành Công", "Sản phẩm mới đã được thêm.", "success");
      }

      // Fetch lại danh sách sản phẩm sau khi thành công
      await reloadProducts();
    } catch (error) {
      showAlert("Lỗi", "Đã xảy ra lỗi khi thực hiện thao tác.", "error");
    }

    handleCloseDialog();
  };

  const showAlert = (title, text, icon) => {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: "OK",
    });
  };

  const reloadProducts = async () => {
    const token = localStorage.getItem("user-token");
    const listProducts = await getAllProducts(token);
    setProducts(listProducts);
    setProductLength(listProducts.length);
  };

  return token ? (
    <>
      <div className="flex flex-row">
        <AdminTab />
        <div className="bg-primary_color/10 min-h-screen w-[85%] px-20 pt-10">
          <div className="bg-white drop-shadow-lg rounded p-8">
            <div className="flex justify-between mb-4">
              <p className="font-bold font-primary text-primary_color text-xl">
                Sản phẩm
              </p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenDialog()}
              >
                Thêm Sản Phẩm
              </Button>
            </div>

            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .slice(
                      currentPage * rowsPerPage,
                      currentPage * rowsPerPage + rowsPerPage
                    )
                    .map((item, index) => (
                      <TableRow key={item._id}>
                        <TableCell>
                          {index + 1 + currentPage * rowsPerPage}
                        </TableCell>
                        <TableCell>
                          <img
                            src={item.image[0]}
                            alt={item.name}
                            width={40}
                            height={40}
                          />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.price} đ</TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleOpenDialog(item)}
                          >
                            Sửa
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={productLength}
              rowsPerPage={rowsPerPage}
              page={currentPage}
              onPageChange={(event, newPage) => setCurrentPage(newPage)}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(parseInt(event.target.value, 10));
                setCurrentPage(0);
              }}
            />
          </div>

          {/* Dialog for Adding/Editing Product */}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            fullWidth
            maxWidth="md"
          >
            <DialogTitle>
              {editMode ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm"}
            </DialogTitle>
            <DialogContent>
              {editMode ? (
                <EditProductForm
                  categories={categories}
                  currentProduct={currentProduct}
                  onSubmit={handleSubmit}
                  onCloseDialog={handleCloseDialog}
                />
              ) : (
                <AddProductForm
                  categories={categories}
                  onSubmit={handleSubmit}
                  onCloseDialog={handleCloseDialog}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  ) : null;
}
