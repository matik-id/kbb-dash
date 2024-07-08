"use client";
import { Badge, Box, Img, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "components/DataTable";
import TableSkeleton from "components/Skeleton/TableSkeleton";
import useDebounce from "hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { HiLockOpen } from "react-icons/hi";
import { userService } from "services";
import ModalReset from "./modalRpw";
import ModalDelete from "./modalDelete";
import { FaThumbsUp } from "react-icons/fa6";
import ModalApprove from "./modalApprove";

const fecthData = async (status: string | null, q?: string) => {
  try {
    const response = await userService.getUsers({
      sort_by: "-updated_at",
      status: status,
      q,
    });

    return response;
  } catch (error) {
    throw new Error("Fetching Error");
  }
};

export default function Content() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const searchParams = useSearchParams();
  const debouncedSearch = useDebounce(search, 400);
  const statusParam = searchParams.get("status");
  const [activeItem, setActiveItem] = useState<any>(null);
  const deleteModal = useDisclosure();
  const approveModal = useDisclosure();
  const resetPassUser = useDisclosure();

  const handleResetOpen = (data: any) => {
    resetPassUser.onOpen();
    setActiveItem(data);
  };

  const handleResetClose = () => {
    resetPassUser.onClose();
  };

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["users", statusParam, debouncedSearch],
    queryFn: () => fecthData(statusParam, debouncedSearch),
  });

  let filteredData: any[] = [];

  if (isSuccess && data && data.data && data.data.records)
    filteredData = data.data.records.filter(
      (v) =>
        v.email.toLowerCase().includes(search.toLowerCase()) ||
        v.fullname.toLowerCase().includes(search.toLowerCase())
    );

  const handleRowClick = (v: any) => {
    router.push("/admin/user/view/" + v.id);
  };
  const handleEdit = (v: any) => {
    router.push("/admin/user/edit/" + v.ID + "?role=" + v.role);
  };

  const handleDelete = (v: any) => {
    setActiveItem(v);
    deleteModal.onOpen();
  };

  const handleDeleteClose = () => {
    refetch();
    deleteModal.onClose();
  };

  const handleApprove = (v: any) => {
    setActiveItem(v);
    approveModal.onOpen();
  };

  const handleApproveClose = () => {
    refetch();
    approveModal.onClose();
  };

  let rowActions: any = [
    {
      icon: HiLockOpen,
      label: "Reset Password",
      onClick: (data: any) => handleResetOpen(data),
      colorScheme: "teal",
    },
    { icon: FiEdit, label: "Edit", onClick: handleEdit, colorScheme: "orange" },
    {
      icon: FiTrash,
      label: "Hapus",
      onClick: handleDelete,
      colorScheme: "red",
    },
  ];

  if (statusParam == "new") {
    rowActions.push(
      {
        icon: FaThumbsUp,
        label: "Setujui",
        onClick: handleApprove,
        colorScheme: "teal",
      },
    );
  }

  let columns: any = [];

  columns = [
    { name: "fullname", label: "Nama Lengkap" },
    { name: "number", label: "No. Anggota" },
    { name: "position", label: "Jabatan" },
    {
      format: (v: any) =>
        v.status == "pending" ? (
          <Badge colorScheme="yellow">Pending</Badge>
        ) : v.status == "new" ? (
          <Badge colorScheme="blue">Baru</Badge>
        ) : v.status == "active" ? (
          <Badge colorScheme="green">Aktif</Badge>
        ) : (
          <Badge colorScheme="red">Blokir</Badge>
        ),
      label: "Status",
    },
  ];

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {isLoading && <TableSkeleton />}
      {isSuccess && filteredData.length === 0 && (
        <Box display={"flex"} justifyContent="center" my={16}>
          <Img
            src={process.env.NEXT_PUBLIC_BASE_PATH + "/img/no-data.png"}
            w="35%"
          ></Img>
        </Box>
      )}
      {isSuccess && data && filteredData.length > 0 && (
        <DataTable
          title={"List Anggota (" + statusParam + ")"}
          onRowClick={handleRowClick}
          primaryKey="id"
          columns={columns}
          rows={filteredData}
          rowActions={rowActions}
        />
      )}

      {deleteModal.isOpen && activeItem && (
        <ModalDelete
          activeItem={activeItem}
          isOpen={deleteModal.isOpen}
          onClose={handleDeleteClose}
        />
      )}
      {resetPassUser.isOpen && activeItem && (
        <ModalReset
          activeItem={activeItem}
          isOpen={resetPassUser.isOpen}
          onClose={handleResetClose}
        />
      )}
      {approveModal.isOpen && activeItem && (
        <ModalApprove
          activeItem={activeItem}
          isOpen={approveModal.isOpen}
          onClose={handleApproveClose}
        />
      )}
    </Box>
  );
}
