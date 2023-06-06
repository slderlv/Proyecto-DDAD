export interface Users{
    id: number;
    email: string;
    city: string;
    password: string;
    role: string | null;
    createdAt: EpochTimeStamp;
    info: User_Information;
}
export interface User_Information{
    birthdate: Date;
    first_name: string;
    last_name: string;
}

export interface Reservations{
    id: number;
    user: Users;
    initial_date: Date;
    final_date: Date;
    pending: boolean;
    debt: number;
}

export interface Institution{
    name: string;
}

export interface Places{
    name: string;
    institution: Institution;
}

export interface Request{
    id: number;
    name: string;
    place: Places;
    description: string;
} 

export interface Request_Reservations{
    id: number;
    request: Request;
    reservation: Reservations;
}