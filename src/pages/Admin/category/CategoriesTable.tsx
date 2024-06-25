import { HStack } from "@chakra-ui/react";
import { Category } from "../../../api/types";
import { DynamicTableCellFormat } from "../../../components/DynamicTable/DynamicTable";
import MainLayout from "../../../components/MainLayout";
import AddNewButton from "./AddNewButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useState } from "react";
import CategoryFilters from "./CategoryFilter";

const format: DynamicTableCellFormat<Category>[] = [
  {
    header: "Name",
    accessor: "name",
    isSortable: true,
  },
  {
    header: "Description",
    accessor: "description",
    isSortable: false,
  },
  {
    header: "Menu",
    accessor: "menu",
    isSortable: true,
    accessorFn: (cell) => `${cell.row.menu.name}`
  },
  {
    header: "Parent Category",
    accessor: "parentCategory",
    isSortable: true,
    accessorFn: (cell) => (
      cell.row.parentCategory
      ? `${cell.row.parentCategory?.name}`
      : "(Is Parent Category)"
    )
  },
  {
    header: "Edit/Delete",
    accessor: "",
    accessorFn: (cell) => (
      <HStack justifyContent={"center"} spacing={2}>
        <EditButton category={cell.row} />
        <DeleteButton id={cell.row.id} />
      </HStack>
    ),
  },
];

const CategoriesTable = () => {
  const [name, setName] = useState("");
  const [menuId, setMenuId] = useState<string | null>(null);

  return (
    <MainLayout
      resource={"category"}
      format={format}
      filters={
        <CategoryFilters
          name={name} 
          setName={setName} 
          setMenuId={setMenuId}
        />
      }
      queryFilters={[
        {
          field: "name",
          value: name,
        },
        {
          field: "menuId",
          value: menuId,
        },
      ]}
      perPage={2}
      tableTitle="Categories"
      buttons={<AddNewButton />}
    />
  );
};

export default CategoriesTable;