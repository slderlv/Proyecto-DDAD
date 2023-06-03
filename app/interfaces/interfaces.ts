export interface Users{
    id: string;
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