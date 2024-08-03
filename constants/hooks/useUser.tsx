import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrentUser} from '@aws-amplify/auth';
import {RootState} from '../../redux/rootReducer';
import {setUserState} from '../../redux/userRedux';

interface UserPayload {}
const useUser = () => {
  const user = useSelector(
    (state: RootState) => state.user.currentUser,
  ) as UserPayload | null;

  const dispatch = useDispatch();

  // const checkForUser = async () => {
  //   const {userId} = await getCurrentUser();

  //   dispatch(setUserState(userId));
  // };

  // useEffect(() => {
  //   checkForUser();
  // }, []);

  return {user};
};

export default useUser;
