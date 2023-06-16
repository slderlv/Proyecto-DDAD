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
export interface Schedule {
    day_quantity: number,
    id: number,
    name: string,
    start_time: string,
    end_time: string
}
export interface Item {
    price: number,
    id: number,
    name: string,
    description: string,
    type: {
        id: number,
        name: string,
        default_image: null
    },
    reserves: {
        start_time?: string,
    	end_time?: string,
    	start_date?: string,
   	    end_date?: string,
    	client_id?: number,
   	    item_name?: string
    }
}