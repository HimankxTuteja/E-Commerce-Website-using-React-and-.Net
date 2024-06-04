import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    data: number;
    title: string;
}

//while creating redux we need to initialise it
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const initialState: CounterState = {
    data: 42,
    title: 'YARC (yet another redux counter with redux) '
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers:{
        increment: (state, action) => {
            state.data += action.payload
        },
        decrement: (state, action) => {
            state.data -= action.payload
        },

    }
})

export const {increment, decrement} = counterSlice.actions;