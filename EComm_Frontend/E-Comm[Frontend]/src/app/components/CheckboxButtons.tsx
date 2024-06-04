import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface Props {
    items: string[];
    checked?: string[];
     onChange: (items: string[]) =>void;
}
export default function  ChcekboxButtons({items, checked, onChange}: Props){
 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 const [checkedItems, setCheckedItems] = useState(checked || [] )
 

 // eslint-disable-next-line @typescript-eslint/no-unused-vars
 function handleChecked(value: string){
    const currentIndex = checkedItems.findIndex(item => item === value);
    let newChecked: string[] = [];
    if(currentIndex === -1) newChecked = [...checkedItems, value];
    else newChecked = checkedItems.filter(item => item !== value);
    setCheckedItems(newChecked);
    onChange(newChecked);
 }
    return(
    <FormGroup>
    {items.map(item => (
      <FormControlLabel 
      control={<Checkbox
      checked={checkedItems.indexOf(item) !== -1}
      onClick={() => handleChecked(item)}
         />} 
         label ={item}
         key={item}/>
    ))}
</FormGroup>
 )
}