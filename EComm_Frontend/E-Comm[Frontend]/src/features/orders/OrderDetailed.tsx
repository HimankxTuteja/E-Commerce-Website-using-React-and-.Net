// import { Box, Typography, Button, Grid } from "@mui/material";
// import { BasketItem } from "../../app/models/basket";
// import { Order } from "../../app/models/order";
// import BasketSummary from "../basket/BasketSummary";
// import BasketTable from "../basket/BasketTable";

// interface Props {
//     order: Order;
//     setSelectedOrder: (id: number) => void;
// }

// const OrderDetailed: React.FC<Props> = ({ order, setSelectedOrder }) => {
//     const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

//     return (
//         <>
//             <Box display='flex' justifyContent='space-between'>
//                 <Typography sx={{ p: 2 }} gutterBottom variant='h4'>Order# {order.id} - {order.orderStatus}</Typography>
//                 <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained'>Back to orders</Button>
//             </Box>
//             <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
//             <Grid container spacing={2}>
//                 <Grid item xs={6}>
//                     {/* You can place content here if needed */}
//                 </Grid>
//                 <Grid item xs={6}>
//                     <BasketSummary subtotal ={subtotal} />
//                 </Grid>
//             </Grid>
//         </>
//     );
// }

// export default OrderDetailed;


import { Box, Typography, Button, Grid } from "@mui/material";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

const OrderDetailed: React.FC<Props> = ({ order, setSelectedOrder }) => {
    const subtotal = order.orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4'>
                    {`Order# ${order.id} - ${order.orderStatus}`}
                </Typography>
                <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained'>
                    Back to orders
                </Button>
            </Box>
            <BasketTable items={order.orderItems as BasketItem[]} isBasket={false} />
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    {/* You can place content here if needed */}
                </Grid>
                <Grid item xs={6}>
                    <BasketSummary subtotal={subtotal} />
                </Grid>
            </Grid>
        </>
    );
};

export default OrderDetailed;

