/* eslint-disable no-case-declarations */

import jwtDecode from 'jwt-decode';

import {
  SET_INITIAL_AUTH,
  AUTH_LOADING,
  GETTING_CURRENT_USER_SUCCESS,
  GETTING_CURRENT_USER_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAILURE,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAILURE,
  EMPLOYEE_LOGOUT_SUCCESS,
  EMPLOYEE_LOGOUT_FAILURE,
  EMPLOYEE_REGISTER_SUCCESS,
  EMPLOYEE_REGISTER_FAILURE,
  CHANGE_PASSWORD_SUCCESS
} from '../actions/auth';
import { RESTAURANT_AUTH } from '../actions/restaurant';
import { SUBSCRIBING_SUCCESS, UNSUBSCRIBING_SUCCESS } from '../actions/payments';

const initialState = {
  loading: false,
  pin: '',
  jwt: false,
  user: { name: 'Please login' },
  role: { admin: false, manager: false },
  restaurant: '',
  membership: false
};

const getJWTInfo = (jwt) => {
  let role = { admin: false, manager: false };
  let membership = false; // eslint-disable-line
  let restaurant = '';

  if (jwt) {
    const currentTime = Date.now() / 1000;
    const decodedJwt = jwtDecode(jwt);

    if (decodedJwt.exp < currentTime) {
      localStorage.removeItem('jwt');
    } else {
      role = decodedJwt.role; // eslint-disable-line prefer-destructuring
      restaurant = decodedJwt.restaurant; // eslint-disable-line prefer-destructuring
      membership = decodedJwt.membership; // eslint-disable-line prefer-destructuring
    }
  }
  return { jwt, role, membership, restaurant };
};

const AuthReducer = (auth = initialState, action) => {
  switch (action.type) {
    case AUTH_LOADING:
      return { ...auth, loading: true };

    case SET_INITIAL_AUTH:
      const jwt = localStorage.getItem('jwt');

      return { ...auth, ...getJWTInfo(jwt) };

    case GETTING_CURRENT_USER_SUCCESS:
      return { ...auth, loading: false, user: action.payload };

    case GETTING_CURRENT_USER_ERROR:
      return { ...auth, loading: false };

    case LOGIN_SUCCESS:
      return {
        ...auth,
        ...getJWTInfo(action.payload.jwt),
        loading: false
      };

    case LOGIN_FAILURE:
      return { ...auth, loading: false };

    case CHANGE_PASSWORD_SUCCESS:
      return { ...auth, loading: false };

    case REGISTRATION_SUCCESS:
      return { ...auth, loading: false, pin: action.payload };

    case REGISTRATION_FAILURE:
      return { ...auth, loading: false };

    case EMPLOYEE_LOGIN_SUCCESS:
      return {
        ...auth,
        loading: false,
        jwt: action.payload.jwt,
        role: action.payload.role
      };

    case EMPLOYEE_LOGIN_FAILURE:
      return { ...auth, loading: false };

    case EMPLOYEE_LOGOUT_SUCCESS:
      return {
        ...auth,
        restaurant: action.payload.restaurant,
        membership: action.payload.membership,
        user: action.payload.user,
        pin: action.payload.pin,
        role: action.payload.role,
        jwt: action.payload.jwt,
        loading: false
      };

    case EMPLOYEE_LOGOUT_FAILURE:
      return { ...auth, loading: false };

    case RESTAURANT_AUTH:
      return {
        ...auth,
        ...getJWTInfo(action.payload.jwt),
        loading: false
      };

    case EMPLOYEE_REGISTER_SUCCESS:
      return { ...auth, loading: false, pin: action.payload };

    case EMPLOYEE_REGISTER_FAILURE:
      return { ...auth, loading: false };

    case SUBSCRIBING_SUCCESS:
      return { ...auth, jwt: action.payload };

    case UNSUBSCRIBING_SUCCESS:
      return { ...auth };

    default:
      return auth;
  }
};

export default AuthReducer;
