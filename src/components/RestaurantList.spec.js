import {render, screen} from '@testing-library/react';
import {RestaurantList} from './RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];
  let loadRestaurants;

  function renderComponent(propOverrides = {}) {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      loading: false,
      error: false,
      restaurants,
      ...propOverrides,
    };
    loadRestaurants = props.loadRestaurants;
    render(<RestaurantList {...props} />);
  }

  it('loads restaurants on first render', () => {
    renderComponent();
    expect(loadRestaurants).toHaveBeenCalled();
  });

  it('displays the loading indicator while loading', () => {
    renderComponent({loading: true});
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it.todo('hides the error message while loading')

  describe('when loading succeeds', () => {
    it('does not display the loading indicator while not loading', () => {
      renderComponent();
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });

    it('displays the restaurants', () => {
      renderComponent();
      expect(screen.getByText('Sushi Place')).toBeInTheDocument();
      expect(screen.getByText('Pizza Place')).toBeInTheDocument();
    });

    it.todo('hide the error message')
  });

  describe('when loading fails', () => {
    it('displays the error message', () => {
      renderComponent({error: true});
      expect(screen.getByText('An error occured')).toBeInTheDocument();
    });
  });
});
