import {Text, Pressable} from 'react-native';
import React from 'react';
import {generateClient} from 'aws-amplify/api';
import {COLORS, SIZES} from '..';
import {styles} from './styles';
import {deleteUser, getCurrentUser} from '@aws-amplify/auth';
import {deleteOneUser} from './mutations';
import {useDispatch} from 'react-redux';
import {setUserState} from '../../redux/userRedux';
import useUser from '../hooks/useUser';

const client = generateClient();

const AccountDeletion = () => {
  const dispatch = useDispatch();
  const {user} = useUser();

  const handleDeleteUser = async () => {
    try {
      // delete from the db
      await client.graphql({
        query: deleteOneUser,
        variables: {input: {id: user}},
      });

      // delete from aws cognito
      await deleteUser();

      dispatch(setUserState(null));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Pressable
      onPress={handleDeleteUser}
      style={{
        padding: 15,
        marginTop: 10,
        backgroundColor: COLORS.light.red,
      }}>
      <Text
        style={[
          styles.smallText,
          {
            fontSize: SIZES.large,
            // color: COLORS.light.primary,
            fontWeight: 'bold',
            textAlign: 'center',
          },
        ]}>
        Delete Account
      </Text>
    </Pressable>
  );
};

export default AccountDeletion;
