"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PopupModal } from "../../components/layouts/ContainerModal";
import { PackageTable } from "../../components/Packages/PackageTable";
import { CiCirclePlus } from "react-icons/ci";
import { PackageForm } from "../../components/Packages/PackageForm";
import AdminLayout from "./layout";

const AdminPackagePage: React.FC = () => {
  const [auth, setAuth] = useState<boolean | undefined>();
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <AdminLayout>
        <div className="text-4xl text-bg-slate-900 text-center font-semibold p-8">
          Packages Portal
        </div>
        <div className=" mx-16">
          {" "}
          <div className=" flex justify-end ">
            <button
              onClick={handleOpenModal}
              className="bg-slate-900 p-3 px-4 rounded"
            >
              <div className="flex items-center">
                <div className="mr-2">
                  <CiCirclePlus size={32} color="white" />
                </div>
                <span className="text-white font-semibold">Add Package</span>
              </div>
            </button>
          </div>
          <PackageTable />
        </div>
      </AdminLayout>
      <PopupModal isOpen={showModal} onClose={handleCloseModal}>
        <PackageForm/>
      </PopupModal>
    </>
  );
};

export default AdminPackagePage;
