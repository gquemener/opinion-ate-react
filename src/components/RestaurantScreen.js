import {Card, CardContent, Typography} from '@mui/material';
import RestaurantList from './RestaurantList';

export default function RestaurantScreen() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurants</Typography>
        <RestaurantList />
      </CardContent>
    </Card>
  );
}
