import {
  ADD_TO_LTC,
  CLEAR_LTC,
  GET_LTC_FROM_STORAGE,
  LOCAL_STORAGE_LTC_KEY,
  REMOVE_FROM_LTC,
  SUBTRACT_FROM_LTC,
  GET_LTC_RATE,
  GET_PAY_LTCBLOCK,
  IS_LOADING,
} from "../actions/types";

const initialState = {
  rate: 87,
  newAccount: "",
  isLoading: false,
};

const litecoinReducer = (state = initialState, action) => {
  let LTC;

  switch (action.type) {
    case GET_LTC_FROM_STORAGE:
      return initialState;

    case ADD_TO_LTC:
      return initialState;
    case IS_LOADING:
      LTC = { isLoading: true };
      return LTC;
    case GET_LTC_RATE:
      LTC = { isLoading: true };
      return LTC;
    case GET_PAY_LTCBLOCK:
      LTC = { isLoading: true };
      return LTC;

    case SUBTRACT_FROM_LTC:
      return initialState;

    case REMOVE_FROM_LTC:
      return initialState;

    case CLEAR_LTC:
      return initialState;

    default:
      return state;
  }
};

export default litecoinReducer;
