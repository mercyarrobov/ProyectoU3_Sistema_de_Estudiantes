import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../redux'
import { MateriaState, MateriaEntity,CicloAcademico,CliclosAcademicosEntity } from '../types/types'
import { getCiclosAcademicos } from '../api/users'



const initalStae: CicloAcademico = {
    loading: false,
    error:null,
    ciclosAcademicos:[]
}

export const usersSlice = createSlice({
    name: "Materia",
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
        fetchCiclosAcademicosSuccess(state, action: PayloadAction<CliclosAcademicosEntity[]>) {
            return {
                ...state,
                loading: false,
                error: null,
                ciclosAcademicos: action.payload,
            };
        },
        fetchCiclosAcademicosError(state, action: PayloadAction<Error>) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                ciclosAcademicos: [],
            };
        },
    }
})

export const GetCiclosAcademicos = (): AppThunk => {
    return async (dispatch) => {

        try {
            const response = await getCiclosAcademicos();
            // console.log(response)
            dispatch(fetchCiclosAcademicosSuccess(response))
        } catch (error) {
            dispatch(fetchCiclosAcademicosError(error as Error))
        }
    }
}


export const { addMateria, fetchCiclosAcademicosSuccess, fetchCiclosAcademicosError } = usersSlice.actions;
export const selectSttep = (state: RootState) => state.users
export default usersSlice.reducer