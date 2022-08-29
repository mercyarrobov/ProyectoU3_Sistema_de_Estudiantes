import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import UsersSlice from '../features/users'
import Materias from '../features/materia'
import CicloAcademico  from '../features/ciclo_academico'
import UserStudent from '../features/usuarios'
import UsersDocentes from '../features/Docentes'
import Paralelos from '../features/Paralelo'
import NotasAdmin from '../features/notasAdmin'
export const store = configureStore({
    reducer: {
        // cliente:
        users: UsersSlice,
        materias: Materias,
        cicloAcademico:CicloAcademico,
        userStudent:UserStudent,
        usersDocentes: UsersDocentes,
        paralelos: Paralelos,
        notasAdmin:NotasAdmin
        // equipo: equipoSlice,
        // partesEquipo: PartesEquipo
    },
    devTools: true
})
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export type AppDispatch = typeof store.dispatch;