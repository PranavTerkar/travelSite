// src/reducers/authReducer.js
const initialState = {
    isAuthenticated: false,
    user: {},
  };
  
  const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  