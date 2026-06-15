import { Plus } from "lucide-react";
import { AddressCard } from "./components/ui/address-card";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import { useState } from "react";
import {
  useGetAddressesByUserIdQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} from "@/store/api/api-address";
import { page } from "@/constant/paginate";
import { Pagination } from "@/components/ui/pagination";
import type { Address } from "@/types/address";
import { AddressFormModal, type AddressForm } from "./components/ui/address-form";

export const AddressPage = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | undefined>();
  const [createAddress] = useCreateAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();

  const handleAdd = () => {
    setEditingAddress(undefined);
    setModalOpen(true);
  };

  const handleEdit = (id: number) => {
    const address = addresses.find((addr) => addr.id === id);
    if (address) {
      setEditingAddress(address);
      setModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    deleteAddress({ addressId: id });
  };

  const handleSave = (data: AddressForm) => {
    if (!user) return;
    if (editingAddress) {
      updateAddress({ data: { ...editingAddress, ...data } });
    } else {
      createAddress({ userId: user.id, data: { ...data } as any });
    }
    setModalOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const { data } = useGetAddressesByUserIdQuery(
    {
      userId: user?.id || "",
      params: {
        pageNumber: currentPage,
        pageSize: page.pageSize,
      },
    },
    { skip: !user },
  );

  const addresses = data?.data || [];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Sổ địa chỉ</h2>
        <button
          className="flex items-center gap-2 rounded-2xl bg-black px-5 py-3 text-white transition hover:bg-gray-800"
          onClick={handleAdd}
        >
          <Plus size={20} />
          Thêm địa chỉ mới
        </button>
      </div>

      <div className="space-y-6">
        {addresses.map((addr) => (
          <AddressCard
            key={addr.id}
            address={addr}
            onEdit={(id) => handleEdit(id)}
            onRemove={(id) => {
              handleDelete(id);
            }}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={data?.totalPages ?? 1}
        onPageChange={handlePageChange}
      ></Pagination>

      <AddressFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSave}
        initialData={editingAddress}
      />
    </div>
  );
};
