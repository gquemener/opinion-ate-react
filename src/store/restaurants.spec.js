import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import restaurantsReducer from './restaurants/reducers';
import {createRestaurant, loadRestaurants} from './restaurants/actions';

describe('restaurants', () => {
  describe('initially', () => {
    let store;
    beforeEach(() => {
      const initialState = {};

      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk),
      );
    });

    it('has the loading flag set to false', () => {
      expect(store.getState().loading).toEqual(false);
    });

    it('has the error flag set to false', () => {
      expect(store.getState().error).toEqual(false);
    });

    it('has the records set to an empty array', () => {
      expect(store.getState().records).toEqual([]);
    });
  });

  describe('loadRestaurants action', () => {
    describe('while loading', () => {
      it('sets a loading flag', () => {
        const api = {
          loadRestaurants: () => new Promise(() => {}),
        };

        const initialState = {};

        const store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        store.dispatch(loadRestaurants());

        expect(store.getState().loading).toEqual(true);
      });
    });

    describe('when loading succeeds', () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];
      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.resolve(records),
        };

        const initialState = {
          records: [],
        };

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurants());
      });

      it('stores the restaurants', () => {
        expect(store.getState().records).toEqual(records);
      });

      it('clears the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });

    describe('when loading fails', () => {
      let store;

      beforeEach(() => {
        const api = {
          loadRestaurants: () => Promise.reject('An error occured'),
        };

        const initialState = {
          records: [],
        };

        store = createStore(
          restaurantsReducer,
          initialState,
          applyMiddleware(thunk.withExtraArgument(api)),
        );

        return store.dispatch(loadRestaurants());
      });

      it('sets the error flag', async () => {
        expect(store.getState().error).toEqual(true);
      });

      it('clears the loading flag', () => {
        expect(store.getState().loading).toEqual(false);
      });
    });
  });

  describe('createRestaurant action', () => {
    const newRestaurantName = 'Sushi Place';
    const existingRestaurant = {id: 1, name: 'Pizza Place'};
    const responseRestaurant = {id: 2, name: newRestaurantName};

    let api;
    let store;

    beforeEach(() => {
      api = {
        createRestaurant: jest.fn().mockName('createRestaurant'),
      };

      const initialState = {records: [existingRestaurant]};

      store = createStore(
        restaurantsReducer,
        initialState,
        applyMiddleware(thunk.withExtraArgument(api)),
      );
    });

    it('saves the restaurant to the server', () => {
      store.dispatch(createRestaurant(newRestaurantName));
      expect(api.createRestaurant).toHaveBeenCalledWith(newRestaurantName);
    });

    describe('when save succeeds', () => {
      beforeEach(() => {
        api.createRestaurant.mockResolvedValue(responseRestaurant);
        return store.dispatch(createRestaurant(newRestaurantName));
      });

      it('stores the restaurant in the store', () => {
        expect(store.getState().records).toEqual([
          existingRestaurant,
          responseRestaurant,
        ]);
      });
    });

    describe('when save fails', () => {
      it('rejects', () => {
        api.createRestaurant.mockRejectedValue();
        const promise = store.dispatch(createRestaurant(newRestaurantName));

        return expect(promise).rejects.toBeUndefined();
      });
    });
  });
});
