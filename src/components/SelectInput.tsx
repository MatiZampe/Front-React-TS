import Select from "react-select";
import { StateManagerProps } from "react-select/dist/declarations/src/useStateManager";
import LabeledComponent from "./LabeledComponent";

interface Props extends StateManagerProps {
    label: string;
    error?: string;
    touched?: boolean;
    name: string;
}

const SelectInput = (props: Props) => {
    const { label, error, touched, name, ...rest } = props;

    const customStyles = {
        control: (provided: any) => ({
          ...provided,
          height: "3rem",
        }),
      };

    return (
        <LabeledComponent
            name={name}
            component={<Select styles={customStyles} {...rest} />}
            label={label}
            error={error}
            touched={touched}
        />
    );
};

export default SelectInput;