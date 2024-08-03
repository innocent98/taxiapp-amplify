import {useSelector} from 'react-redux';
import {RootState} from '../../redux/rootReducer';

interface Location {
  details: {geometry: {location: {lat: any; lng: any}}};
}

const useLocation = () => {
  const location = useSelector(
    (state: RootState) => state.location.currentLocation,
  ) as Location | null;

  const address = useSelector((state: RootState) => state.location.address);

  return {location, address};
};

export default useLocation;
