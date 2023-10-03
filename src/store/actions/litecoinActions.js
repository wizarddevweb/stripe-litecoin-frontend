import {
  ADD_TO_LTC,
  GET_LTC_FROM_STORAGE,
  CLEAR_LTC,
  SUBTRACT_FROM_LTC,
  REMOVE_FROM_LTC,
  GET_LTC_RATE,
  GET_PAY_LTCBLOCK,
  IS_LOADING,
} from "./types";
import Axios from "../../axios";
export const addToLTC = (product) => ({
  type: ADD_TO_LTC,
  payload: product,
});
export const getRate = () => ({
  type: GET_LTC_RATE,
});

export function isLoading(isLoading = false) {
  return {
    type: IS_LOADING,
    isLoading: isLoading,
  };
}
export const getLtcBlock = async (dispatch) => {
  const { data } = await Axios.get("/api/litecoin");
};

export const subtractFromLTC = (product) => ({
  type: SUBTRACT_FROM_LTC,
  payload: product,
});

export const removeFromLTC = (product) => ({
  type: REMOVE_FROM_LTC,
  payload: product,
});

export const getLTCFromStorage = () => ({
  type: GET_LTC_FROM_STORAGE,
});

export const clearLTC = () => ({
  type: CLEAR_LTC,
});
