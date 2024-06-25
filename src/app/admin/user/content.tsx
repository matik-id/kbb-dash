"use client";
import { Box, Img, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "components/DataTable";
import TableSkeleton from "components/Skeleton/TableSkeleton";
import useDebounce from "hooks/useDebounce";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { HiLockOpen } from "react-icons/hi";
import { userService } from "services";
import ModalReset from "./modalRpw";

const fecthData = async (role: string | null, q?: string) => {
  try {
    const response = await userService.getUsers({
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
  const roleParam = searchParams.get("role");
  const [activeItem, setActiveItem] = useState<any>(null);
  const resetPassUser = useDisclosure();

  const handleResetOpen = (data: any) => {
    resetPassUser.onOpen();
    setActiveItem(data);
  };

  const handleResetClose = () => {
    resetPassUser.onClose();
  };

  const { data, isLoading, isSuccess, isError, refetch } = useQuery({
    queryKey: ["users", roleParam, debouncedSearch],
    queryFn: () => fecthData(roleParam, debouncedSearch),
  });

  let filteredData: any[] = [];

  if (isSuccess && data)
    filteredData = data.data.filter(
      (v) =>
        v.email.toLowerCase().includes(search.toLowerCase()) ||
        v.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleRowClick = (v: any) => {
    router.push("/admin/user/view/" + v.ID);
  };
  const handleEdit = (v: any) => {
    router.push("/admin/user/edit/" + v.ID + "?role=" + v.role);
  };

  let rowActions: any = [
    {
      icon: HiLockOpen,
      label: "Reset Password",
      onClick: (data: any) => handleResetOpen(data),
      bg: "green.100",
      color: "green.700",
    },
    { icon: FiEdit, label: "Edit", onClick: handleEdit, variant: "white" },
  ];

  let columns: any = [];

  columns = [
    { name: "email", label: "Email" },
    { name: "name", label: "Nama Lengkap" },
    { name: "role", label: "Role" },
  ]

  if (roleParam === "satker") {
    columns.push({
      format: (v: any) => v.Eselon1.name,
      label: "Eselon",
    })
    
  }

  const navigateRow = (row: any) => `/admin/user/view/${row.ID}`;

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      {isLoading && <TableSkeleton />}
      {isSuccess && filteredData.length === 0 && (
        <Box display={"flex"} justifyContent="center" my={16}>
          <Img src={process.env.NEXT_PUBLIC_BASE_PATH + '/img/no-data.png'} w="35%"></Img>
        </Box>
      )}
      {isSuccess && data && filteredData.length > 0 && (
        <DataTable
          title={"List Pengguna (" + roleParam + ")"}
          onRowClick={handleRowClick}
          navigateRow={navigateRow}
          primaryKey="id"
          columns={columns}
          rows={filteredData}
          rowActions={rowActions}
        />
      )}

      {resetPassUser.isOpen && activeItem && (
        <ModalReset
          activeItem={activeItem}
          isOpen={resetPassUser.isOpen}
          onClose={handleResetClose}
        />
      )}
    </Box>
  );
}
