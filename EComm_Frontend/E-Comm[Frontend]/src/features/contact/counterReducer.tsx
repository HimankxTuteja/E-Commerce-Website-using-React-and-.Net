export const INCREMENT_COUNTER = "INCREMENT_COUNTER";
export const DECREMENT_COUNTER = "DECREMENT_COUNTER";
export interface CounterState {
    data: number;
    title: string;
}

//while creating redux we need to initialise it
const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter)'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function increment(amount = 1){
    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1){
    return {
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface CounterAction { 
    type: string
    payload: number
}
//reducer function 
// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
export default function counterReducer(state = initialState, action: CounterAction){
    switch (action.type) {
        case INCREMENT_COUNTER:
        return {
            ...state,
            data: state.data + action.payload
        }
        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data -action.payload
            }
            default:
                return state;
    }
    return state;
}