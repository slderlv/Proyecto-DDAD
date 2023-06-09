export interface LoginResponse {
    token: string,
    user: UserLoginResponse;
}
export interface UserLoginResponse {
    nickname: string,
    password: string;
}
export interface UserProfile {
    email: string,
    city: string,
    role: string | null,
    userInformationId: UserInformation | null
}
export interface UserInformation {
    id: number,
    first_name: string,
    last_name: string,
    nickname: string,
    profile_image: string | null
}