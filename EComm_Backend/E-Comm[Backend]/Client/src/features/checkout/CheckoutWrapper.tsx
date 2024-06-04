 import CheckoutPage from "./CheckoutPage";
import {Elements} from "@stripe/react-stripe-js"
import {loadStripe} from "@stripe/stripe-js"
 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripePromise = loadStripe('pk_test_51OzYCzASqjxLvxfbUarAQGpkntdxl3cgaTDuRpvDhlhT2V9mbUPxJrs3TojZfbbDZtJIGclhLBqhzC57jB3Uuw1T00moQrWHOx')
export default function CheckoutWrapper(){
    return(
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}