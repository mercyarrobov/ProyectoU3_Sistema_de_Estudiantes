export interface IUser{
    username?:string;
    name_rol?:string;
}

export interface IContext extends IUser {
    authenticate: (username:string,password:string) => Promise<Response>;
    logout : () => void;
}

export interface IAuthProvider {
    children: JSX.Element;
}

export interface Response {
    error:boolean | null;
    message: string | null;
    rol?:string;
    token:string;
}