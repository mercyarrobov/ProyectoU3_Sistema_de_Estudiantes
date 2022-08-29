import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState, AppThunk } from '../redux'
import { UserState, UserEntity } from '../types/types'
import { getUsersDocentes } from '../api/users'



const initalStae: UserState = {
    error: null,
    loading: false,
    users: []
}

export const usersSlice = createSlice({
    name: "UsersDocentes",
    initialState: initalStae,
    reducers: {
        addUser: (state, action: PayloadAction<string>) => {

            // state.apellido = action.payload.apellido;
            // state.nombre = action.payload.nombre;
            // state.imageUrl = action.payload.imageUrl;
            // state.numero_cedula = action.payload.numero_cedula;
            // state.password = action.payload.password;
            // state.username = action.payload.username
        },

        fetchUsersDocentesSuccess(state, action: PayloadAction<UserEntity[]>) {
            return {
                ...state,
                loading: false,
                error: null,
                users: action.payload,
            };
        },
        fetchUsersDocentesError(state, action: PayloadAction<Error>) {
            return {
                ...state,
                loading: false,
                error: action.payload,
                users: [],
            };
        },
    }
})

export const GetUsersDocentes = (): AppThunk => {
    return async (dispatch) => {

        try {
            const response = await getUsersDocentes();
            dispatch(fetchUsersDocentesSuccess(response))
        } catch (error) {
            dispatch(fetchUsersDocentesError(error as Error))
        }
    }
}


export const { addUser, fetchUsersDocentesSuccess, fetchUsersDocentesError } = usersSlice.actions;
export const selectSttep = (state: RootState) => state.users
export default usersSlice.reducer