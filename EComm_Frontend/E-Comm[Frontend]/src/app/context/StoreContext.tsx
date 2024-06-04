import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Basket } from "../models/basket";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface StoreContextValue {
    basket: Basket | null;
    setBasket: (basket: Basket) => void;
    removeItem: (productId: number, quantity: number) => void;
    
}
export const StoreContext = createContext<StoreContextValue | undefined>(undefined);

export function useStoreContext() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const context = useContext(StoreContext);
    if(context === undefined) {
        throw Error('Oops -we do not seen to be inside the provider');
    }
    return context;
}

export function StoreProvider({children}: PropsWithChildren<unknown>){
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [basket, setBasket] = useState<Basket | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function removeItem(ProductId: number, quantity: number){
        if(!basket) return;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const items = [...basket.items];
        const itemIndex = items.findIndex(i => i.productId === ProductId);
        if(itemIndex >= 0){
            items[itemIndex].quantity-= quantity;
            if(items[itemIndex].quantity === 0) items.splice(itemIndex, 1);
            setBasket(prevState => {
                return {...prevState!, items}
            })
        }
    }
    return (
        <StoreContext.Provider value ={{basket, setBasket, removeItem}}>
            {children}
        </StoreContext.Provider>
    )
}