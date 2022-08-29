import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../redux'
import { NotasResponseServer, NotasEntity } from '../types/types'
import { GetNotesAdmin } from '../api/users'



const initalStae: NotasResponseServer = {
    error: null,
    loading: false,
    notas: []
}

export const notassSlice = createSlice({
    name: "Notas",
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
        fetchNotasSuccess(state, action: PayloadAction<NotasEntity[]>) {
            return {
                ...state,
                loading: false,
                error: null,
                notas: action.payload,
            };
        },
        fetchNotasError(state, action: PayloadAction<Error>) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                notas: [],
            };
        },
    }
})

export const GetNotasAdmin = (): AppThunk => {
    return async (dispatch) => {

        try {
            const response = await GetNotesAdmin();
            dispatch(fetchNotasSuccess(response))
        } catch (error) {
            dispatch(fetchNotasError(error as Error))
        }
    }
}


export const { addMateria, fetchNotasSuccess, fetchNotasError } = notassSlice.actions;
export const selectSttep = (state: RootState) => state.users
export default notassSlice.reducer