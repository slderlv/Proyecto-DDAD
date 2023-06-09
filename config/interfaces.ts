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
    information: UserProfileInformation
}
export interface UserProfileInformation {
    firstName: string,
    lastName: string,
    nickname: string,
    profileImg: string | null,
}