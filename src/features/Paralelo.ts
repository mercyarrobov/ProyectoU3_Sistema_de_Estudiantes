import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../redux'
import {  ParalelosEntity,ParaleloResponseServer } from '../types/types'
import { getParalelos } from '../api/users'



const initalStae: ParaleloResponseServer = {
    error: null,
    loading: false,
    paralelos: []
}

export const paralelosSlice = createSlice({
    name: "Paralelos",
    initialState: initalStae,
    reducers: {
        addMateria: (state, action: PayloadAction<string>) => {

            // state.apellido = action.payload.apellido;
            // state.nombre = action.payload.nombre;
            // state.imageUrl = action.payload.imageUrl;
            // state.numero_cedula = action.payload.numero_cedula;
            // state.password = action.payload.password;
            // state.username = action.payload.username
        },
        fetchParalelosSuccess(state, action: PayloadAction<ParalelosEntity[]>) {
            return {
                ...state,
                loading: false,
                error: null,
                paralelos: action.payload,
            };
        },
        fetchParalelosError(state, action: PayloadAction<Error>) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                paralelos: [],
            };
        },
    }
})

export const GetParalelos = (): AppThunk => {
    return async (dispatch) => {
        
        try {
            const response = await getParalelos();
            dispatch(fetchParalelosSuccess(response))
        } catch (error) {
            dispatch(fetchParalelosError(error as Error))
        }
    }
}


export const { addMateria, fetchParalelosSuccess, fetchParalelosError } = paralelosSlice.actions;
export const selectSttep = (state: RootState) => state.users
export default paralelosSlice.reducer