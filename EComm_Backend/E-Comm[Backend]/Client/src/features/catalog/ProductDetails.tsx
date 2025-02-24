// import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography} from "@mui/material";
// import { ChangeEvent, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// // import agent from "../../app/api/agent";
// import NotFound from "../../app/errors/NotFound";
// import LoadingComponent from "../../app/layout/LoadingComponent";
// import { LoadingButton } from "@mui/lab";
// import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
// import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
// import { fetchProductAsync, productSelectors } from "./catalogSlice";

// export default function ProductDetails() {
//     const {basket, status} = useAppSelector(state => state.basket);
//     const dispatch = useAppDispatch();
//     const {id} = useParams<{id: string}>();
//     const product = useAppSelector(state => productSelectors.selectById(state, id));
//     const {status: productStatus} = useAppSelector(state => state.catalog);
//     const [quantity, setQuantity] = useState(0);
//     const item = basket?.items.find(i => i.productId === product?.id);

//     useEffect(() => {
//         if(item) setQuantity(item.quantity);
//         if(!product) dispatch(fetchProductAsync(parseInt(id)));
//     }, [id, item, dispatch, product])

//     function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
//         if(parseInt(event.currentTarget.value) >= 0){
//             setQuantity(parseInt(event.currentTarget.value));
//         }
//     }

//     // function handleUpdateCart() {
//     //     if(!item || quantity > item.quantity) {
//     //         const updatedQuantity = item ? quantity - item.quantity : quantity;
//     //         dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
//     //     } else {
//     //         const updatedQuantity = item.quantity - quantity;
//     //         dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
//     //     }
//     // }

//     function handleUpdateCart() {
//         // Check if product and product.id are not null or undefined before proceeding
//         if (product && product.id) {
//             if (!item || quantity > item.quantity) {
//                 const updatedQuantity = item ? quantity - item.quantity : quantity;
//                 dispatch(addBasketItemAsync({ productId: product.id, quantity: updatedQuantity }));
//             } else {
//                 const updatedQuantity = item.quantity - quantity;
//                 dispatch(removeBasketItemAsync({ productId: product.id, quantity: updatedQuantity }));
//             }
//         } else {
//             // Handle the case where product or product.id is null or undefined
//             console.error('Product or product ID is undefined.');
//         }
//     }
    

//     if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...' />

//     if (!product) return <NotFound />

//     return (
//         <Grid container spacing={6}>
//             <Grid item xs={6}>
//                 <img src ={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
//             </Grid>
//             <Grid item xs={6}>
//                 <Typography variant='h3'>{product.name}</Typography>
//                 <Divider sx={{mb: 2}} />
//                 <Typography variant='h4' color='secondary'>${(product.price /100).toFixed(2)}</Typography>
//                 <TableContainer>
//                     <Table>
//                         <TableBody>
//                             <TableRow>
//                                 <TableCell>Name</TableCell>
//                                 <TableCell>{product.name}</TableCell>
//                             </TableRow>
//                             <TableRow>
//                                 <TableCell>Desciption</TableCell>
//                                 <TableCell>{product.description}</TableCell>
//                             </TableRow>
//                             <TableRow>
//                                 <TableCell>Type</TableCell>
//                                 <TableCell>{product.type}</TableCell>
//                             </TableRow>
//                             <TableRow>
//                                 <TableCell>Brand</TableCell>
//                                 <TableCell>{product.brand}</TableCell>
//                             </TableRow>
//                             <TableRow>
//                                 <TableCell>Quantity in Stock</TableCell>
//                                 <TableCell>{product.quantityInStock}</TableCell>
//                             </TableRow>
//                         </TableBody>
//                     </Table>
//                 </TableContainer>
//                 <Grid container spacing={2}>
//                     <Grid item xs={6}>
//                         <TextField
//                             onChange={handleInputChange}
//                             variant='outlined'
//                             type='number'
//                             label='Quantity in Cart'
//                             fullWidth
//                             value={quantity}
//                         />
//                     </Grid>
//                     <Grid item xs = {6}>
//                         <LoadingButton
//                              disabled={item?.quantity === quantity || !item && quantity === 0}
//                              loading={status.includes('pendingRemoveItem' + item?.productId)}
//                              onClick={handleUpdateCart}
//                              sx={{height: '55px'}}
//                              color='primary'
//                              size='large'
//                              variant='contained'
//                              fullWidth
//                         >
//                             {item ? 'Update Quantity' : 'Add to Cart'}
//                         </LoadingButton>
//                     </Grid>
//                 </Grid>
//             </Grid>

//         </Grid>
//     )
// }
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const { basket, status: basketStatus } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const { id } = useParams<{ id: string }>();
    const productId = id ? parseInt(id) : null;
    const product = useAppSelector(state => productId !== null ? productSelectors.selectById(state, productId) : null);
    const { status: productStatus } = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    const item = basket?.items.find(i => i.productId === product?.id);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product && productId !== null && !isNaN(productId)) {
            dispatch(fetchProductAsync(productId));
        }
    }, [item, product, productId, dispatch]);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        if (parseInt(event.currentTarget.value) >= 0) {
            setQuantity(parseInt(event.currentTarget.value));
        }
    }

    function handleUpdateCart() {
        if (product && product.id && quantity !== undefined) {
            if (!item || quantity > item.quantity) {
                const updatedQuantity = item ? quantity - item.quantity : quantity;
                dispatch(addBasketItemAsync({ productId: product.id, quantity: updatedQuantity }));
            } else {
                const updatedQuantity = item ? item.quantity - quantity : 0;
                dispatch(removeBasketItemAsync({ productId: product.id, quantity: updatedQuantity }));
            }
        } else {
            console.error('Product or product ID is undefined.');
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message='Loading product...' />

    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={6}>
                <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
            </Grid>
            <Grid item xs={6}>
                <Typography variant='h3'>{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            {[
                                ["Name", product.name],
                                ["Description", product.description],
                                ["Type", product.type],
                                ["Brand", product.brand],
                                ["Quantity in Stock", product.quantityInStock]
                            ].map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>{row[0]}</TableCell>
                                    <TableCell>{row[1]}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            label="Quantity in Cart"
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || (!item && quantity === 0)}
                            loading={basketStatus.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
