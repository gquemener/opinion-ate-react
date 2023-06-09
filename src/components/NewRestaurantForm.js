import {Alert, Button, TextField} from '@mui/material';
import {useState} from 'react';
import {connect} from 'react-redux';
import {createRestaurant} from '../store/restaurants/actions';

export function NewRestaurantForm({createRestaurant}) {
  const [name, setName] = useState('');
  const [invalidForm, setInvalidForm] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setInvalidForm(false);
    setServerError(false);
    if (!name) {
      setInvalidForm(true);
      return;
    }
    try {
      await createRestaurant(name);
      setName('');
    } catch {
      setServerError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again.
        </Alert>
      )}
      {invalidForm && <Alert severity="error">Name is required</Alert>}
      <TextField
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Add Restaurant"
        fullWidth
        variant="filled"
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
}

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
