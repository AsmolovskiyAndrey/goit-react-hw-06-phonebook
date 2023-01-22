import { Title } from './Filter.styled';
import { useSelector, useDispatch } from 'react-redux';
import { addFilter, getFilter } from 'components/redux/contactSlice';

export const Filter = () => {
  const filter = useSelector(getFilter);
  const dispatch = useDispatch();

  const handleInputChanged = evt => {
    dispatch(addFilter(evt.target.value));
  };

  return (
    <>
      <Title>Find contacts by name</Title>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={handleInputChanged}
      />
    </>
  );
};
