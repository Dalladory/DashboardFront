import { UserActionTypes, UserActions } from "../../reducers/userReducer/types";
import { Dispatch } from "redux";
import { toast } from "react-toastify";
import {
  removeTokens,
  GetRequest,
  PostRequest,
} from "../../../services/api-user-service";
import jwtDecode from "jwt-decode";
import {
  setAccessToken,
  setRefreshToken,
} from "../../../services/api-user-service";
import React from "react";
import { CurrentPaginations } from "../../../pages/users";

export const LoginUser = (user: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await PostRequest("/login", user);

      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      if (result.Response.isSuccess) {
        const { accessToken, refreshToken, message } = result.Response;
        setAccessToken(accessToken);
        setRefreshToken(refreshToken);
        AuthUser(accessToken, message, dispatch);
      } else {
        toast.error(result.Response.message);
        dispatch({
          type: UserActionTypes.LOGIN_USER_ERROR,
          payload: result.Response.message,
        });
      }
    } catch (e) {
      toast.error("Unknown error");
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const Register = (user: any, callback: Function) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await PostRequest("/register", user);

      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      if (result.Response.isSuccess) {
        const { accessToken, refreshToken, message } = result.Response;
        toast.success(message);
        dispatch({
          type: UserActionTypes.REGISTER_USER_SUCCESS,
          payload: {
            message,
          },
        });
        callback();
      } else {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.REGISTER_USER_ERROR,
          payload: result.Error.message,
        });
      }
    } catch (e) {
      toast.error("Unknown error");
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const ForgotPassword = (email: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await PostRequest("/ForgotPassword", email);

      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      if (result.Response.isSuccess) {
        dispatch({
          type: UserActionTypes.FORGOT_USER_PASSWORD_SUCCESS,
          payload: result.Response,
        });
      } else {
        toast.error(result.Response.message);
        dispatch({
          type: UserActionTypes.FORGOT_USER_PASSWORD_ERROR,
          payload: result.Response.message,
        });
      }
    } catch (e) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const LogOut = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    removeTokens();
    dispatch({
      type: UserActionTypes.LOGOUT_USER,
    });
  };
};

export const GetUsers = (paginations: CurrentPaginations) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });

      const result = await GetRequest(
        "/getUsers?start=" +
          paginations.start +
          "&end=" +
          paginations.end +
          "&isAll=" +
          paginations.isAll
      );

      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      dispatch({
        type: UserActionTypes.GET_ALL_USERS,
        payload: result.Response.message,
      });
    } catch (error) {
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const GetUsersQuantity = () => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await GetRequest("/GetUsersQuantity");

      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      if (result.Response.isSuccess) {
        dispatch({
          type: UserActionTypes.SET_USERS_QUANTITY,
          payload: result.Response.payload,
        });
      } else {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
      }
    } catch (e) {
      toast.error("Unknown error");
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const GetUserProfile = (userId: string) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await GetRequest("/GetUserProfile?userId=" + userId);

      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });

        return;
      }

      if (result.Response.isSuccess) {
        dispatch({
          type: UserActionTypes.GET_USER_PROFILE,
          payload: result.Response.payload,
        });
      } else {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
      }
    } catch (e) {
      toast.error("Unknown error");
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const UpdateUserProfile = (newUser: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await PostRequest("/UpdateUserProfile", newUser);
      console.log("result update profile: ", result);
      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      if (result.Response.isSuccess) {
        toast.success(result.Response.message);
        dispatch({
          type: UserActionTypes.UPDATE_USER,
          payload: result.Response,
        });
      } else {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Response,
        });
      }
    } catch (e) {
      toast.error("Unknown error");
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const DeleteUserForAdmin = (userId: any, callbackResult: Function) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await GetRequest("DeleteUserForAdmin?userId=" + userId);

      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      if (result.Response.isSuccess) {
        callbackResult(true);
        toast.success(result.Response.message);
        dispatch({
          type: UserActionTypes.DELETE_USER_FOR_ADMIN,
          payload: result.Response,
        });
      } else {
        callbackResult(false);
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error,
        });
      }
    } catch (e) {
      callbackResult(false);
      toast.error("Unknown error");
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: e,
      });
    }
  };
};

export const UpdatePayload = (newPayload: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    dispatch({
      type: UserActionTypes.UPDATE_PAYLOAD,
      payload: newPayload,
    });
  };
};

export const EditUserForAdmin = (newUser: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await PostRequest("/UserEditForAdministrator", newUser);

      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      if (result.Response.isSuccess) {
        toast.success(result.Response.message);
        dispatch({
          type: UserActionTypes.UPDATE_USER,
          payload: newUser,
        });
      } else {
        toast.error(result.Response.message);

        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Response,
        });
      }
    } catch (e) {
      toast.error("Unknown error");
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const ChangePassword = (newPasswordModel: any) => {
  return async (dispatch: Dispatch<UserActions>) => {
    try {
      dispatch({ type: UserActionTypes.START_REQUEST });
      const result = await PostRequest("/ChangePassword", newPasswordModel);
      console.log("result: ", result);
      if (!result.IsSuccess) {
        toast.error(result.Error.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Error.message,
        });
        return;
      }

      if (result.Response.isSuccess) {
        toast.success(result.Response.message);
        dispatch({
          type: UserActionTypes.CHANGE_PASSWORD,
        });
      } else {
        toast.error(result.Response.message);
        dispatch({
          type: UserActionTypes.SERVER_USER_ERROR,
          payload: result.Response,
        });
      }
    } catch (e: any) {
      toast.error("catch");
      dispatch({
        type: UserActionTypes.SERVER_USER_ERROR,
        payload: "Unknown error",
      });
    }
  };
};

export const AuthUser = (
  token: string,
  message: string,
  dispatch: Dispatch<UserActions>
) => {
  const decodedToken = jwtDecode(token) as any;
  dispatch({
    type: UserActionTypes.LOGIN_USER_SUCCESS,
    payload: {
      message,
      decodedToken,
    },
  });
};
