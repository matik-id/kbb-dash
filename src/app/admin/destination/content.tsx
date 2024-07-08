"use client";
import { Box, Img, useDisclosure } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import DataTable from "components/DataTable";
import TableSkeleton from "components/Skeleton/TableSkeleton";
import useDebounce from "hooks/useDebounce";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { destinationService } from "services";
import ModalDelete from "./modalDelete";

const fecthData = async (q?: string) => {
  try {
    const response = await destinationService.getDestinations({
      sort_by: "-updated_at",
    });

    return response;
  } catch (error) {
    throw new Error("Fetching Error");
  }
};

export default function Content() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 400);
  const deleteModal = useDisclosure();
  const [activeItem, setActiveItem] = useState<any>(null);

  const { data, isLoading, isSuccess, refetch } = useQuery({
    queryKey: ["destinations", debouncedSearch],
    queryFn: () => fecthData(debouncedSearch),
  });

  let filteredData: any[] = [];

  if (isSuccess && data && data.data && data.data.records)
    filteredData = data.data.records.filter((v) =>
      v.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleEdit = (v: any) => {
    router.push("/admin/destination/edit/" + v.ID);
  };

  const handleDelete = (v: any) => {
    setActiveItem(v);
    deleteModal.onOpen();
  };

  const handleDeleteClose = () => {
    refetch();
    deleteModal.onClose();
  };

  let rowActions: any = [
    { icon: FiEdit, label: "Edit", onClick: handleEdit, colorScheme: "orange" },
    { icon: FiTrash, label: "hapus", onClick: handleDelete, colorScheme: "red" }, 
  ];

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
          title={"List Destinasi Wisata"}
          navigateRow={(row: any) => `/admin/destination/view/${row.id}`}
          primaryKey="id"
          columns={[{ name: "name", label: "Nama Wisata" }, { name: "category", label: "Kategori" }, {name: "address", label: "Alamat"}]}
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
    </Box>
  );
}
