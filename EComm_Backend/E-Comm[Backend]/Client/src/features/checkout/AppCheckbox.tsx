import { Checkbox, FormControlLabel } from "@material-ui/core";
import { UseControlledProps } from "@material-ui/core/utils/useControlled";
import { Control, FieldValues, useController } from "react-hook-form";

interface Props extends UseControlledProps {
    label: string;
    control: Control<FieldValues>;
}

export default function AppCheckbox(props: Props) {
    const {field} = useController({...props, defaultValue: false});
    
    return (
        <FormControlLabel 
        control={
            <Checkbox
                 {...field}
                 checked={field.value}
                 color='secondary'
            />
        } 
        label={props.label} />
    )
}