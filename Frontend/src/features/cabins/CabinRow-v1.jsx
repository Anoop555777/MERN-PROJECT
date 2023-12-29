import styled from "styled-components";
import { formatCurrency } from "./../../utiles/helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { toast } from "react-hot-toast";
import CreateCabinForm from "./CreateCabinForm";

import { HiEllipsisVertical, HiPencil, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

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
      <Table.Row>
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
          <Modal>
            <Modal.Open opens="edit">
              <button>
                <HiPencil />
              </button>
            </Modal.Open>
            <Modal.Window name="edit">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>
          </Modal>
          <Modal>
            <Modal.Open opens="delete">
              <button>
                <HiTrash />
              </button>
            </Modal.Open>
            <Modal.Window name="delete">
              <ConfirmDelete
                resource={name}
                onConfirm={() => mutate(cabinId)}
                disabled={isLoading}
              />
            </Modal.Window>
          </Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId}>
              <HiEllipsisVertical />
            </Menus.Toggle>
            <Menus.List id={cabinId}>
              <Menus.Button>
                <span>
                  <HiPencil />
                </span>
                Edit
              </Menus.Button>
              <Menus.Button>
                <span>
                  <HiTrash />
                </span>
                Delete
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
