import {
    Center,
    Flex,
    Heading,
    HStack,
    Spinner,
    VStack,
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { client } from "../api/api";
import { ApiListResponse, FilterItem, Sort } from "../api/types";
import {
    currentPageToAPIRange,
    filtersToAPIFormat,
    sortToAPISort,
} from "../api/utils";
import DynamicTable, {
    DynamicTableCellFormat,
} from "./DynamicTable/DynamicTable"
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";

interface Props {
    resource: string;
    format: DynamicTableCellFormat<any>[];
    buttons?: ReactNode;
    filters?: ReactNode;
    queryFilters: FilterItem[];
    tableTitle?: string;
    perPage: number;
}

const MainLayout = ({
    resource,
    format,
    buttons,
    queryFilters,
    filters,
    tableTitle,
    perPage,
}: Props) => {
    const getAuthHeader = useAuthHeader();
    const [currentPage, setCurrentPage] = useState(0);
    const [sort, setSort] = useState<Sort>({
        field: "name",
        isAscending: false,
    });

    const {
        data: response,
        isLoading,
        isSuccess,
        isError,
    } = useQuery({
        queryKey: [resource, currentPage, sort, queryFilters],
        queryFn: () => client.get<ApiListResponse<any>>(`/${resource}`, {
            headers: {
                Authorization: getAuthHeader,
            },
            params: {
                ...currentPageToAPIRange(currentPage, perPage),
                ...sortToAPISort(sort),
                filters: filtersToAPIFormat(queryFilters),
            },
        }),
        select: (r) => r.data
    });

    useEffect(() => {
        setCurrentPage(0);
    }, [sort, queryFilters]);

    return (
        <Flex w="full" h="full">
            <VStack w="full" alignItems={"flex-end"} borderRadius={"10"}>
                <HStack w="full" justifyContent={"flex-end"} pe={10}>
                    {filters}
                    {buttons}
                </HStack>
                {(isError || isLoading) && (
                    <Center w="full" h="full">
                        {isLoading && <Spinner size={"xl"} color="black" />}
                        {isError && (
                            <Heading color="red">
                                There was an error, try again later
                            </Heading>
                        )}
                    </Center>
                )}
                {isSuccess && (
                    <DynamicTable
                        tableTitle={tableTitle}
                        data={response.items}
                        format={format}
                        totalPages={Math.ceil(response.totalCount / perPage)}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        sort={sort}
                        setSort={setSort}
                    />
                )}
            </VStack>
        </Flex>
    );
};
export default MainLayout;