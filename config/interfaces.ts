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
    userInformationId: {
        id: number,
        first_name: string,
        last_name: string,
        nickname: string | null,
        profile_image: string | null
    } | null
}