import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/config/interfaces';
import axios from 'axios';

export const UserContext = createContext<UserProfile>({
  email: "",
  city: "",
  role: null,
  userInformationId: null
});

export function useUserContext(){
  return useContext(UserContext)
}

const URL = process.env+'/users';

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile>({
    email: "hola",
    city: "",
    role: null,
    userInformationId: null
  });

  const requestUser = async () => {
    const token = localStorage.getItem('token');
    const ENDPOINT = process.env.customKey + '/users/profile'
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
    try {
      const response = await axios.get(ENDPOINT, config)
      if (response.data){
        const userProfile: UserProfile = {
          email: response.data[0],
          city: response.data[1],
          role: response.data[2],
          userInformationId: {
            id: response.data[3].id,
            first_name: response.data[3].first_name,
            last_name: response.data[3].last_name,
            nickname: response.data[3].nickname,
            profile_image: response.data[3].profile_image
          }
        }
        setUser(userProfile);
      }
    } catch (error: any) {
      console.log(error)
    }
  }

  useEffect(() => {
    requestUser();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;