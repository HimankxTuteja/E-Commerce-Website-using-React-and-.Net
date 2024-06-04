import React, { useState } from 'react';
import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { setProductParams } from './catalogSlice';
import { debounce } from '@mui/material';

export default function ProductSearch() {
    const {productParams} = useAppSelector(state => state.catalog);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000)
    return (
        <TextField 
            label='Search products'
            variant='outlined'
            fullWidth 
            value = {searchTerm || ''}
            onChange={(event: any) => {
                setSearchTerm(event.target.value);
                debouncedSearch(event);
            }}
        />
    );
}
