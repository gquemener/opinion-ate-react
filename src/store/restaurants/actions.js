export const START_LOADING = 'START_LOADING';
export const ERROR_LOADING = 'ERROR_LOADING';
export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';
export const ADD_RESTAURANT = 'ADD_RESTAURANT';

export const loadRestaurants = () => async (dispatch, getState, api) => {
  dispatch(startLoading());
  try {
    const records = await api.loadRestaurants();
    dispatch(storeRestaurants(records));
  } catch (err) {
    dispatch(errorLoading());
  }
};

export const createRestaurant = name => async (dispatch, getState, api) => {
  const record = await api.createRestaurant(name);
  dispatch(addRestaurant(record));
};

const startLoading = () => ({
  type: START_LOADING,
});

const storeRestaurants = records => ({
  type: STORE_RESTAURANTS,
  records,
});

const errorLoading = () => ({
  type: ERROR_LOADING,
});

const addRestaurant = record => ({
  type: ADD_RESTAURANT,
  record,
});
