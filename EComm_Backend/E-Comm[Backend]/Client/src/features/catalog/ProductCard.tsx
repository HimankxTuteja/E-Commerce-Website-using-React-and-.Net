/*
import { Product } from '../../app/models/product';
import { useCookies } from 'react-cookie';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';


 interface Props {
    product: Product;
}


export default function ProductCard({product}: Props){
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //const[loading, setLoading] = useState(false);
  const {status} = useAppSelector{state => state.basket};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['buyerId'])
  // const { setBasket } = useStoreContext();
  const dispatch = useAppDispatch();


// eslint-disable-next-line @typescript-eslint/no-unused-vars
// function handleAddItem(productId: number){
//   setLoading(true);
//   agent.Basket.addItem(productId).then(res=>res)
//   setCookie('buyerId', BuyerId , {path: '/'});
//  // .catch((error: unknown) => console.log(error))
//  // .finally(() => setLoading(false));

// }

// function handleAddItem(productId: number) {
//   setLoading(true);
//   agent.Basket.addItem(productId)
//     .then(response => {
//       const buyerIdFromResponse = response.buyerId || 'defaultBuyerId';
//       setCookie('buyerId', buyerIdFromResponse, { path: '/' });

//       return response;
//     })
//     .then(basket => dispatch(setBasket(basket)))
//     .catch((error: unknown) => console.log(error))
//     .finally(() => setLoading(false));
// }

*/

import { Product } from '../../app/models/product';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/util/util';
import { Link } from 'react-router-dom'; 
import { addBasketItemAsync } from '../basket/basketSlice';

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(false);
  const {status} = useAppSelector(state => state.basket);
   

  // const handleAddItem = async (productId: number) => {
  //   setLoading(true);
  //   try {
  //     // Dispatch your add to cart action here, e.g.:
  //     // await dispatch(addItemToBasket(productId));
  //   } catch (error) {
  //     console.error("Failed to add item to cart", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'secondary.main' }}>
            {product.name.charAt(0).toUpperCase()}
          </Avatar>
        }
        title={product.name}
        titleTypographyProps={{
          sx: { fontWeight: 'bold', color: 'primary.main' }
        }}
      />
      <CardMedia
        sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
        image={product.pictureUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom color="secondary" variant="h5">
          {currencyFormat(product.price)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
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
  );
}
