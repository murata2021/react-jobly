import { AUTH } from "./Constants";

const reducer = (state, action) => {
  if (action.type === AUTH.LOGIN_SUCCESS) {
    const newState = { ...state, ...action.payload, isLoggedIn: true };

    return newState;
  } 
  // else if (action.type === AUTH.USER_UPDATE_SUCCESS) {
  //   const newState = { ...state, };

  //   return newState;
  // }
   else if (action.type === AUTH.LOGOUT_SUCCESS) {
    return { isLoggedIn: false,username:null };
  }

  return state;
};

export default reducer;
