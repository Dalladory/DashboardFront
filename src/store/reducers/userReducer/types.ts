import { Interface } from "readline";

export interface UserState {
  user: any;
  message: null | string;
  payload: any;
  loading: boolean;
  error: null | string;
  isAuth: boolean;

  usersQuantity: number;
}

export enum UserActionTypes {
  START_REQUEST = "START_REQUEST",

  LOGIN_USER_ERROR = "LOGIN_USER_ERROR",
  LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS",

  REGISTER_USER_SUCCESS = "REGISTER_USER_SUCCESS",
  REGISTER_USER_ERROR = "REGISTER_USER_ERROR",

  FORGOT_USER_PASSWORD_SUCCESS = "FORGOT_USER_PASSWORD_SUCCESS",
  FORGOT_USER_PASSWORD_ERROR = "FORGOT_USER_PASSWORD_ERROR",
  SERVER_USER_ERROR = "SERVER_USER_ERROR",
  LOGOUT_USER = "LOGOUT_USER",
  GET_ALL_USERS = "GET_ALL_USERS",
  GET_USER_PROFILE = "GET_USER_PROFILE",
  UPDATE_USER = "UPDATE_USER",
  DELETE_USER_FOR_ADMIN = "DELETE_USER_FOR_ADMIN",
  UPDATE_PAYLOAD = "UPDATE_PAYLOAD",
  SET_USERS_QUANTITY = "SET_USERS_QUANTITY",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

interface LOGOUT_USER {
  type: UserActionTypes.LOGOUT_USER;
}

interface StartRequestAction {
  type: UserActionTypes.START_REQUEST;
}

interface ForgotUserPasswordSuccessAction {
  type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS;
  payload: any;
}

interface ForgotUserPasswordErrorAction {
  type: UserActionTypes.FORGOT_USER_PASSWORD_ERROR;
  payload: any;
}

interface LoginUserSuccessAction {
  type: UserActionTypes.LOGIN_USER_SUCCESS;
  payload: any;
}

interface LoginUserErrorAction {
  type: UserActionTypes.LOGIN_USER_ERROR;
  payload: any;
}

interface RegisterUserSuccessAction {
  type: UserActionTypes.REGISTER_USER_SUCCESS;
  payload: any;
}
interface RegisterUserErrorAction {
  type: UserActionTypes.REGISTER_USER_ERROR;
  payload: any;
}

interface ServerUserErrorAction {
  type: UserActionTypes.SERVER_USER_ERROR;
  payload: any;
}

interface GetAllUsersAction {
  type: UserActionTypes.GET_ALL_USERS;
  payload: any;
}

interface GetUserProfileAction {
  type: UserActionTypes.GET_USER_PROFILE;
  payload: any;
}

interface UpdateUserAction {
  type: UserActionTypes.UPDATE_USER;
  payload: any;
}

interface DeleteUserForAdminAction {
  type: UserActionTypes.DELETE_USER_FOR_ADMIN;
  payload: any;
}
interface UpdatePayloadAction {
  type: UserActionTypes.UPDATE_PAYLOAD;
  payload: any;
}
interface SetUsersQuantity {
  type: UserActionTypes.SET_USERS_QUANTITY;
  payload: number;
}

interface ChangePasswordAction {
  type: UserActionTypes.CHANGE_PASSWORD;
}

export type UserActions =
  | StartRequestAction
  | LOGOUT_USER
  | ForgotUserPasswordErrorAction
  | LoginUserErrorAction
  | RegisterUserSuccessAction
  | RegisterUserErrorAction
  | ServerUserErrorAction
  | LoginUserSuccessAction
  | ForgotUserPasswordSuccessAction
  | GetAllUsersAction
  | GetUserProfileAction
  | UpdateUserAction
  | DeleteUserForAdminAction
  | UpdatePayloadAction
  | SetUsersQuantity
  | ChangePasswordAction;
