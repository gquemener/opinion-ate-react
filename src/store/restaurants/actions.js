export const START_LOADING = 'START_LOADING';
export const ERROR_LOADING = 'ERROR_LOADING';
export const STORE_RESTAURANTS = 'STORE_RESTAURANTS';

export const loadRestaurants = () => async (dispatch, getState, api) => {
  dispatch(startLoading());
  try {
    const records = await api.loadRestaurants();
    dispatch(storeRestaurants(records));
  } catch (err) {
    dispatch(errorLoading());
  }
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
