import { ApiListResponse, FilterItem } from "../../api/types";
import { currentPageToAPIRange, filtersToAPIFormat } from "../../api/utils";
import SelectInput from "../SelectInput";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import { useMemo } from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";
import { client } from "../../api/api";

interface Props extends StateManagerProps {
  setter: (value: string | null) => void;
  defaultValue?: string;
  error?: string;
  touched?: boolean;
  label: string;
  placeholder?: string;
  nameProp?: string;
  valueProp?: string;
  resource: string;
  filters?: FilterItem[];
  name: string;
}

const SyncField = (props: Props) => {
  const getAuthHeader = useAuthHeader();

  const {
    setter,
    defaultValue,
    error,
    touched,
    label,
    placeholder,
    nameProp,
    valueProp,
    resource,
    filters,
    name,
    ...rest
  } = props;

  const {
    data: items,
    isPending,
    isSuccess,
  } = useQuery({
    queryKey: [resource, filters],
    queryFn: () =>
      client.get<ApiListResponse<any>>(resource, {
        headers: {
          Authorization: getAuthHeader,
        },
        params: {
          filters: filtersToAPIFormat(filters || []),
          ...currentPageToAPIRange(0, 1000),
        },
      }),
      select: (r) => r.data.items
  });

  const defaultOption = useMemo(() => {
    const item = items?.find((i) => i.id === defaultValue);
    if (!item) return null;
    return {
      value: item[valueProp || "id"],
      label: item[nameProp || "name"],
    };
  }, [items, isSuccess]);

  return (
    <SelectInput
      isLoading={isPending}
      options={
        isSuccess
          ? items.map((p) => ({
              label: p[nameProp || "name"],
              value: p[valueProp || "id"],
            }))
          : []
      }
      label={label}
      name={name}
      error={error}
      touched={touched}
      onChange={(option: any) => setter(option?.value ?? null)}
      defaultValue={defaultOption}
      placeholder={placeholder}
      isClearable
      {...rest}
    />
  );
};

export default SyncField;