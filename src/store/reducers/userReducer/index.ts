import { PlaylistAddOutlined } from "@mui/icons-material";
import { number } from "yup/lib/locale";
import { UserState, UserActions, UserActionTypes } from "./types";

const initialState: UserState = {
  user: {},
  message: null,
  loading: false,
  error: null,
  isAuth: false,
  payload: null,
  usersQuantity: 0,
};

const UserReducer = (state = initialState, action: UserActions): UserState => {
  switch (action.type) {
    case UserActionTypes.START_REQUEST:
      return { ...state, loading: true };
    case UserActionTypes.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.decodedToken,
        message: action.payload.message,
      };
    case UserActionTypes.LOGIN_USER_ERROR:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.SERVER_USER_ERROR:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.REGISTER_USER_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.REGISTER_USER_ERROR:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: action.payload.message,
      };
    case UserActionTypes.LOGOUT_USER:
      return {
        isAuth: false,
        loading: false,
        user: null,
        message: null,
        error: null,

        payload: null,
        usersQuantity: 0,
      };
    case UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.FORGOT_USER_PASSWORD_ERROR:
      return { ...state, loading: false, message: action.payload.message };
    case UserActionTypes.GET_ALL_USERS:
      return { ...state, loading: false, payload: action.payload };
    case UserActionTypes.GET_USER_PROFILE:
      return {
        ...state,
        loading: false,
        payload: action.payload,
      };
    case UserActionTypes.UPDATE_USER:
      return { ...state, loading: false };
    case UserActionTypes.DELETE_USER_FOR_ADMIN:
      return { ...state, loading: false, payload: action.payload };
    case UserActionTypes.UPDATE_PAYLOAD:
      return { ...state, payload: action.payload };
    case UserActionTypes.SET_USERS_QUANTITY:
      return { ...state, usersQuantity: action.payload };
    case UserActionTypes.CHANGE_PASSWORD:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default UserReducer;
