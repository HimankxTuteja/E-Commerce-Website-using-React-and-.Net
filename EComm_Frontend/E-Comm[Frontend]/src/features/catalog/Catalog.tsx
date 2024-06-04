//import LoadingComponent from "../../app/layout/LoadingComponent";
import ProductList from './ProductList';
import {useEffect } from 'react';
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { Grid, Paper} from "@mui/material";
import ProductSearch from "./ProductSearch";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import AppPagination from "../../app/components/AppPagination";
import LoadingComponent from '../../app/layout/LoadingComponent';
//import AppPagination from "../../app/components/AppPagination";




// eslint-disable-next-line @typescript-eslint/no-unused-vars
const sortOptions = [
  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price-High to low'},
  {value: 'price', label: 'Price - Low to high'},

]
export default function Catalog(){
    const products = useAppSelector(productSelectors.selectAll);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {productsLoaded, status, filtersLoaded, brands, types, productParams,metaData} = useAppSelector(state => state.catalog);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const dispatch = useAppDispatch();

 /* useEffect(() => {
    fetch('https://localhost:7124/api/Products')
    .then(response => response.json())
    .then(data => setProducts(data))
    agent.catalog.list()
    .then(products => setProducts(products))
    .catch(error => console.log(error))
    //to turn off loading indicator
    .finally(() => setLoading(false))
  }, [])*/
  useEffect(() => {
   if(!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch])

  useEffect(() => {
    if(!filtersLoaded) dispatch(fetchFilters());
   }, [dispatch, filtersLoaded])
  
  if (!filtersLoaded) return <LoadingComponent message='Loading Products...'/>

    return (
        <Grid container spacing  = {4}>
          <Grid item xs={3}>
          <Paper sx={{mb: 2}}>
          <ProductSearch />
            </Paper>
            <Paper sx={{mb: 2, p: 2}}>
            <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) => dispatch(setProductParams({orderBy: e.target.value}))}
            />
    </Paper> 
    <Paper sx={{mb: 2, p: 2}}>
  <CheckboxButtons
     items = {brands}
     checked = {productParams.brands}
     onChange = {(items: string[]) => dispatch(setProductParams({ brands: items}))}
  
  />
    </Paper>
  
    <Paper sx={{mb: 2, p: 2}}>
    <CheckboxButtons
     items = {types}
     checked = {productParams.types}
     onChange = {(items: string[]) => dispatch(setProductParams({ types: items}))}
  
  />
    </Paper>
            
          </Grid>
          <Grid item xs={9}>
            <ProductList products = {products} />
          </Grid>
          <Grid item xs={3} /> 
          <Grid item xs={9} sx={{mb:2}}>
            {metaData && 
            <AppPagination
            metaData={metaData}
            onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
          />}
         
          </Grid>
          
        </Grid>
       
      
      
    )
}