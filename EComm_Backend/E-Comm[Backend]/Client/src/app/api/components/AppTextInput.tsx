// import { UseControlledProps } from "@material-ui/core/utils/useControlled";
// import { TextField } from "@mui/material";
// import {  useController } from "react-hook-form";


// interface Props extends UseControlledProps {
//     label: string;
// }

// export default function AppTextInput(props: Props) {
//     const {fieldState, field} = useController({...props, defaultValue: ''})
//     return (
//         <TextField 
//             {...props}
//             {...field}
//             fullWidth
//             variant='outlined'
//             error={!!fieldState.error}
//             helperText={fieldState.error?.message}
        
//         />
//     )
// }


import { TextField } from "@mui/material";
import { useController, Control, FieldValues } from "react-hook-form";

interface AppTextInputProps {
    name: string; 
    control: Control<FieldValues>; 
    label: string;
}

export default function AppTextInput({ name, control, label, ...props }: AppTextInputProps) {
    const { field, fieldState } = useController({ name, control });

    return (
        <TextField 
            {...field}
            {...props}
            label={label}
            fullWidth
            variant='outlined'
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
        />
    );
}

