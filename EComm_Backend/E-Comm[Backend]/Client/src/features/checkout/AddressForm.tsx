import { Typography, Grid } from "@mui/material";
import AppTextInput from "../../app/api/components/AppTextInput";

import AppCheckbox from "./AppCheckbox";
import { useFormContext } from "react-hook-form";

export default function AddressForm() {
  const { control } = useFormContext(); 
  
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      {/* <form onSubmit={handleSubmit(data => console.log(data))}> */}
        <Grid container spacing={3}> 
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='fullName' label='Full name' />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput control={control} name='address1' label='Address 1' />
          </Grid>
          <Grid item xs={12}>
            <AppTextInput control={control} name='address2' label='Address 2' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='city' label='City' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='state' label='State' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='zip' label='Zipcode' />
          </Grid>
          <Grid item xs={12} sm={6}>
            <AppTextInput control={control} name='country' label='Country' />
          </Grid>
          <Grid item xs={12}>
            <AppCheckbox name='saveAddress' label={'Save this as default address'} control={control} controlled={undefined} default={undefined}  />
          </Grid>
        </Grid>
    </>
  );
}


