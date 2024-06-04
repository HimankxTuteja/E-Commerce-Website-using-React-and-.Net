import { Avatar,CardHeader, Card, CardActions, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
//import { useState } from "react";
//import agent from "../../app/api/agent";
//import { useCookies } from "react-cookie";
import { LoadingButton } from "@mui/lab";
//import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/Util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props){
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {status} = useAppSelector(state => state.basket);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useAppDispatch();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
/*function handleAddItem(productId: number){
   setLoading(true);
  agent.Basket.addItem(productId)
  .then(basket => setBasket(basket))
   setCookie('buyerId', res.buyerId, { path: '/'})
  .catch(error => console.log(error))
  .finally(() => setLoading(false));

}*/
  
  return (
      
        <Card>
            <CardHeader 
            avatar={
                <Avatar sx={{bgcolor: 'secondary.main'}}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={product.name}
            titleTypographyProps={{
                sx: {fontWeight: 'bold', color: 'primary.main'}
              }}
            />
        <CardMedia
          sx={{ height: 140, width: 270, backgroundSize: 'contain', bgcolor: 'white'}}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom color='red' variant="h5">
              {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="black">
           {product.brand} / {product.type}
          </Typography>
        </CardContent>
        <CardActions>
          <LoadingButton 
          loading={status.includes('pendingAddItem' + product.id)} 
          onClick={() => dispatch(addBasketItemAsync({productId: product.id}))} 
          size="small">Add to cart</LoadingButton>
          <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button> 
        </CardActions>
      </Card>
       
     )



     // `` --> to write the text and js together 
}

 //${(product.price / 100).toFixed(2)}