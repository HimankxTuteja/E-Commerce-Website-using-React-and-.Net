
import BasketSummary from "./BasketSummary";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";

import BasketTable from "./BasketTable";
import { Grid, Button } from "@mui/material";


export default function BasketPage(){
   //if(!loading) return <Typography variant='h3'>Your basket is empty</Typography>
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const {basket} = useAppSelector(state => state.basket);
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   const dispatch = useAppDispatch();
   // eslint-disable-next-line @typescript-eslint/no-unused-vars
 
   /*// eslint-disable-next-line @typescript-eslint/no-unused-vars
   function handleAddItem(productId: number, name: string){
    setStatus({loading: true, name});
    agent.Basket.addItem(productId)
    .then(basket => dispatch(setBasket(basket)))
    .catch(error => console.log(error))
    .finally(() => setStatus({loading: false, name: ''}))
   }

   // eslint-disable-next-line @typescript-eslint/no-unused-vars
   function handleRemoveItem(productId: number, quantity = 1, name: string){
    setStatus({loading: true, name});
    agent.Basket.removeItem(productId, quantity)
       .then(() => dispatch(removeItem({productId, quantity})))
       .catch(error => console.log(error))
       .finally(() => setStatus({loading: false, name: ''}))
    
   }*/
    return(
      <>
      
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}> 
        <BasketSummary />
        <Button
          component={Link}
          to='/checkout'
          variant='contained'
          size='large'
          fullWidth
          > 
          Checkout
          </Button>
        </Grid>
      </Grid>
      </>
        
    )
}