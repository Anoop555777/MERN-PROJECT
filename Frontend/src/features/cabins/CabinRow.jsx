import styled from "styled-components";
import { formatCurrency } from "./../../utiles/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";
import { useState } from "react";
import { HiPencil, HiTrash } from "react-icons/hi2";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const CabinRow = ({ cabin }) => {
  const [showEditForm, setShowEditForm] = useState(false);
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteCabin,
    onSuccess: () => {
      toast.success("cabin deleted successfully");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  const {
    _id: cabinId,
    name,
    imageCover,
    price,
    priceDiscount,
    maxCapacity,
  } = cabin;

  return (
    <>
      <TableRow role="row">
        <Img src={imageCover} alt={`Cabin ${name}`} />

        <Cabin>{name}</Cabin>

        <div>Fits up to {maxCapacity} guests</div>

        <Price>{formatCurrency(price)}</Price>

        {priceDiscount ? (
          <Discount>{formatCurrency(priceDiscount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button onClick={() => setShowEditForm((prev) => !prev)}>
            <HiPencil />
          </button>
          <button onClick={() => mutate(cabinId)} disabled={isLoading}>
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
};

export default CabinRow;
