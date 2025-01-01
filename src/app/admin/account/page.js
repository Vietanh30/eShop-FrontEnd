"use client";

import AdminTab from "@/components/admin/adminTab";
import { useState, useEffect } from "react";
import { getAllProfile, updateRole, getProfile } from "@/app/api/userApi";
import Modal from "@mui/material/Modal";
import Swal from "sweetalert2";

export default function AdminAccount() {
  const [userAccounts, setUserAccounts] = useState([]);
  const [allUserAccounts, setAllUserAccounts] = useState([]);
  const [totalAccounts, setTotalAccounts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [roleToUpdate, setRoleToUpdate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  const roleOptions = [
    { value: "admin", label: "Quản lý" },
    { value: "customer", label: "Khách hàng" },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token_ = localStorage.getItem("user-token");
      setToken(token_);
      if (token_) {
        try {
          const userList = await getAllProfile(token_);
          setAllUserAccounts(userList);
          setUserAccounts(userList.slice(0, 10));
          setTotalAccounts(userList.length);
          setCurrentUser(await getProfile(token_));
        } catch (error) {
          console.error("Error fetching user data:", error);
          Swal.fire({
            title: "Lỗi",
            text: "Không thể tải danh sách người dùng.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    setUserAccounts(
      allUserAccounts.slice((currentPage - 1) * 10, currentPage * 10)
    );
  }, [currentPage, allUserAccounts]);

  const handleUpdateRole = async () => {
    if (!selectedUser) return;

    try {
      await updateRole(token, roleToUpdate, selectedUser._id);
      setIsModalOpen(false);

      Swal.fire({
        title: "Thành công!",
        text: "Cập nhật quyền thành công!",
        icon: "success",
        confirmButtonText: "OK",
      });

      const updatedAccounts = await getAllProfile(token);
      setAllUserAccounts(updatedAccounts);
      setUserAccounts(updatedAccounts.slice(0, 10));
      setTotalAccounts(updatedAccounts.length);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error updating role:", error);
      Swal.fire({
        title: "Lỗi",
        text: "Cập nhật quyền không thành công.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const handleUserClick = (account) => {
    if (currentUser?._id !== account._id) {
      setSelectedUser(account);
      setRoleToUpdate(account.roleUser); // Đặt giá trị mặc định cho roleToUpdate
      setIsModalOpen(true);
    }
  };
  return token ? (
    <div className="flex flex-row">
      <AdminTab />

      <div className="bg-primary_color/10 min-h-screen w-[85%] px-20 pt-10">
        <div className="bg-white drop-shadow-lg rounded p-8">
          <div className="flex items-center justify-between">
            <p className="font-bold font-primary text-primary_color text-xl py-4 border-b-2 px-4">
              Tài khoản
            </p>
          </div>
          <div className="grid grid-cols-5 text-sm border-b-2 py-2">
            <p className="px-4 font-semibold text-black py-3">ID</p>
            <p className="px-4 font-semibold text-primary_color py-3">Name</p>
            <p className="px-4 font-semibold text-gray-800 py-3">Email</p>
            <p className="px-4 font-semibold text-primary_color py-3">Phone</p>
            <p className="px-4 font-semibold text-gray-800 py-3">Role</p>
          </div>
          <div className="h-[400px] overflow-y-auto">
            {userAccounts.map((account) => (
              <div
                key={account._id}
                className="grid grid-cols-5 text-sm border-b-2 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleUserClick(account)} // Sử dụng hàm này
              >
                <p className="px-4 font-semibold py-3 text-black">
                  {account._id}
                </p>
                <p className="px-4 text-primary_color py-3 line-clamp-2">
                  {account.name}
                </p>
                <p className="px-4 text-gray-800 py-3">{account.email}</p>
                <p className="px-4 text-primary_color py-3 line-clamp-2">
                  {account.phoneNumber}
                </p>
                <p className="px-4 text-primary_color py-3 line-clamp-2">
                  {account.roleUser}
                </p>
              </div>
            ))}
          </div>
          <div className="flex gap-x-3 items-center text-sm">
            <p
              onClick={() => {
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className="text-sub_primary_color border-2 rounded-lg py-1 px-2 cursor-pointer hover:text-primary_color hover:bg-gray-100"
            >
              {"<"}
            </p>
            <p className="text-primary_color">{currentPage}</p>
            <p
              onClick={() => {
                if (currentPage < Math.ceil(totalAccounts / 10))
                  setCurrentPage(currentPage + 1);
              }}
              className="text-sub_primary_color border-2 rounded-lg py-1 px-2 cursor-pointer hover:text-primary_color hover:bg-gray-100"
            >
              {">"}
            </p>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-1/2 bg-white drop-shadow-lg p-8">
          <div className="flex flex-col mb-4 text-primary_color">
            <div className="flex gap-x-2 items-center my-8">
              <p className="text-gray-800 text-sm">Cập nhật quyền:</p>
              <select
                value={roleToUpdate} // Đặt giá trị cho select
                onChange={(e) => setRoleToUpdate(e.target.value)}
                className="text-sm text-primary_color border px-2 py-1"
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <button
              className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-2 rounded"
              type="button"
              onClick={handleUpdateRole}
            >
              Update
            </button>
          </div>
          <div
            className="uppercase text-md font-semibold text-sub_primary_color text-center p-4 rounded hover:text-blue-500 cursor-pointer"
            onClick={() => setIsModalOpen(false)}
          >
            Back
          </div>
        </div>
      </Modal>
    </div>
  ) : null; // Loại bỏ phần hiển thị lỗi
}
