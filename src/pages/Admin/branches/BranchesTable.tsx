import { useState } from "react";
import { Branch} from "../../../api/types";
import { DynamicTableCellFormat } from "../../../components/DynamicTable/DynamicTable";
import MainLayout from "../../../components/MainLayout";
import AddNewButton from "./AddNewButton";
import BranchFilter from "../Filter/BranchFilter";
import { HStack } from "@chakra-ui/react";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

const format: DynamicTableCellFormat<Branch>[] = [
  {
    header: "Name",
    accessor: "name",
    isSortable: true,
  },
  {
    header: "Street",
    accessor: "street",
    isSortable: false,
  },
  {
    header: "Description",
    accessor: "description",
    isSortable: false,
  },
  {
    header: "Menu",
    accessor: "menu.name",
    isSortable: true,
  },
  {
    header: "Edit/Delete",
    accessor: "",
    accessorFn: (cell) => (
      <HStack spacing={20}>
        <EditButton branch={cell.row} />
        <DeleteButton id={cell.row.id} />
      </HStack>
    )
  }
];

const BranchesTable = () => {

  const [name, setName] = useState("");

  return (
    <MainLayout
      resource={"branch"}
      format={format}
      filters={
        <BranchFilter
          name={name}
          setName={setName}
        />
      }
      queryFilters={[
        {
          field: "name",
          value: name,
        },
      ]}
      perPage={2}
      tableTitle="Branches"
      buttons={<AddNewButton />}
    />
  );
};

export default BranchesTable;