import { HStack, Img } from "@chakra-ui/react";
import { Product } from "../../../api/types";
import { DynamicTableCellFormat } from "../../../components/DynamicTable/DynamicTable";
import MainLayout from "../../../components/MainLayout";
import AddNewButton from "./AddNewButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import ProductFilters from '../Filter/ProductsFilter';
import { useState } from "react";

const format: DynamicTableCellFormat<Product>[] = [
  {
    header: "Name",
    accessor: "name",
    isSortable: true,
  },
  {
    header: "Cash Price",
    accessor: "cashPrice",
    isSortable: true,
    accessorFn: (cell) => `$${cell.row.cashPrice.toLocaleString("en-US")}`,
  },
  {
    header: "Card Price",
    accessor: "cardPrice",
    isSortable: true,
    accessorFn: (cell) => `$${cell.row.cashPrice.toLocaleString("en-US")}`,
  },
  {
    header: "Description",
    accessor: "description",
    isSortable: false,
  },
  {
    header: "Subtitle",
    accessor: "subtitle",
    isSortable: false,
  },
  {
    header: "Code",
    accessor: "code",
    isSortable: true,
},
  {
    header: "Image",
    accessor: "productImage",
    accessorFn: (cell) =>
      cell.row.productImage && (
        <Img
          w="12rem"
          src={cell.row.productImage}
          alt={cell.row.name}
        />
      ),
    isSortable: false,
  },
  {
    header: "Edit/Delete",
    accessor: "",
    accessorFn: (cell) => (
      <HStack spacing={20}>
        <EditButton product={cell.row} />
        <DeleteButton id={cell.row.id} />
      </HStack>
    ),
  },
];

const ProductsTable = () => {

  const [name, setName] = useState("");
  const [active, setActive] = useState<boolean | null>(null);

  return (
    <MainLayout
      resource={"product"}
      format={format}
      filters={
        <ProductFilters
          name={name}
          setName={setName}
          active={active}
          setActive={setActive}
        />
      }
      queryFilters={[
        {
          field: "name",
          value: name,
        },
        {
          field: "active",
          value: active,
        },
      ]}
      perPage={2}
      tableTitle="Products"
      buttons={<AddNewButton />}
    />
  );
};

export default ProductsTable;