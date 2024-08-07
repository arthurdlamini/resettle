
import { jwtDecode } from "jwt-decode"
import { logoutUser } from "../context/userSlice";
import { useDispatch,  } from 'react-redux';

export const AutoLogout=(token)=> {
    const dispatch = useDispatch();
    try {
        if (token) {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            console.log(decodedToken.exp < currentTime)
            if (decodedToken.exp < currentTime) {
              // Token is expired, logout user
              dispatch(logoutUser());
            }
          }
    } catch (error) {
        console.log(error)
    }
}
