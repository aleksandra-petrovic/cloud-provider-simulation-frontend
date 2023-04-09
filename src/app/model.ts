export interface LoginRequest{
    username: string,
    password: string
}

export interface LoginResponse {
    jwt: string
}

export interface User {
    userId: number,
    name: string,
    surname: string,
    email: string,
    permissions: Permission[]
}

export interface Permission {
    permissionId: number,
    permission: string
}


export interface Machine {
    machineId: number,
    name: string,
    status: number,
    active: boolean,
    dateCreated: Date
}

export interface ErrorMsg {
    errorId: number,
    date: Date,
    machineId: number,
    operation: string,
    description: string
}