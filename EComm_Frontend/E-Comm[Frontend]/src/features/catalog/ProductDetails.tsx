import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import axios from "axios";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
//import { useStoreContext } from "../../app/context/StoreContext";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails(){
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
    const {id} = useParams<{id: string}>();
    const dispatch = useAppDispatch();
    const {basket, status} = useAppSelector(state => state.basket);
    const product = useAppSelector(state => productSelectors.selectById(state,parseInt(id!)));
   
    //const [product, setProduct] = useState<Product | null>(null);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {status: productStatus} = useAppSelector(state => state.catalog);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [quantity, setQuantity] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const item = basket?.items.find( i => i.productId === product?.id);

   //useEffect(() => {
        /*axios.get(`https://localhost:7124/api/Products/${id}`)*/
        /*if(item) setQuantity(item.quantity);
        id && agent.catalog.details(parseInt(id))
        .then(Response => setProduct(Response))
        .catch(error => console.log(error.response))
        .finally(() => setLoading(false));
    }, [id, item]);*/ //[id] --> dependencies -->if not mention then useeffect loop will run
    useEffect(() => {
        if(item) setQuantity(item.quantity);
        if(!product && id ) dispatch(fetchProductAsync(parseInt(id)));
    }, [id, item, product, dispatch]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function handleInputChange(event: ChangeEvent<HTMLInputElement>){
        if(parseInt(event.currentTarget.value) >= 0){
        setQuantity(parseInt(event.currentTarget.value));
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function handleUpdateCart(){
      
        if(!item || quantity > item.quantity){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const UpdatedQuantity= item? quantity - item.quantity: quantity;
            dispatch(addBasketItemAsync({productId: product?.id, quantity: UpdatedQuantity}))

        }else{
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const UpdatedQuantity =  item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.id, quantity: UpdatedQuantity}))
        } 
    }

    if(productStatus.includes('pending')) return <LoadingComponent message='Loading Item...' />
    if(!product) return <NotFound />
    return(
        <Grid container spacing={6}>
             <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
             </Grid>
             <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{mb: 2}} />
                <Typography variant='h4' color='secondary'>{(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Brand</TableCell>
                                <TableCell>{product.brand}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Quantity in stock</TableCell>
                                <TableCell>{product.quantityInStock}</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField 
                        onChange={handleInputChange}
                        variant='outlined'
                        type='number'
                        label ='Quantity in Cart'
                        fullWidth
                        value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                        disabled={item?.quantity === quantity || !item && quantity === 0}
                        loading={status.includes('pending')}
                        onClick = {handleUpdateCart}
                        sx={{height: '55px'}}
                        color='primary'
                        size='large'
                        variant='contained'
                        fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
                </Grid>
        </Grid>
    )
}