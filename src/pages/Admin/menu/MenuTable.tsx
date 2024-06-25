import { HStack } from "@chakra-ui/react";
import { Menu } from "../../../api/types";
import { DynamicTableCellFormat } from "../../../components/DynamicTable/DynamicTable";
import MainLayout from "../../../components/MainLayout";
import AddNewButton from "./AddNewButton";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import { useState } from "react";
import MenuFilters from "./MenuFilter";

const format: DynamicTableCellFormat<Menu>[] = [
  {
    header: "Name",
    accessor: "name",
    isSortable: true,
  },
  {
    header: "Branch",
    accessor: "branch",
    isSortable: true,
    accessorFn: (cell) => (
      cell.row.branch 
      ? `${cell.row.branch.name}` 
      : "(Branch not assigned)"
    )
  },
  {
    header: "Edit/Delete",
    accessor: "",
    accessorFn: (cell) => (
      <HStack justifyContent={"center"} spacing={2}>
        <EditButton menu={cell.row} />
        <DeleteButton id={cell.row.id} />
      </HStack>
    ),
  },
];

const MenusTable = () => {
  const [name, setName] = useState("");

  return (
    <MainLayout
      resource={"menu"}
      format={format}
      filters={<MenuFilters name={name} setName={setName} />}
      queryFilters={[
        {
          field: "name",
          value: name,
        },
      ]}
      perPage={2}
      tableTitle="Menus"
      buttons={<AddNewButton />}
    />
  );
};

export default MenusTable;