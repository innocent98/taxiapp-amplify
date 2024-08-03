import {
  View,
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from '../../constants/utils/styles';
import {COLORS, SIZES} from '../../constants';
import {generateClient} from 'aws-amplify/api';
import {createCar, updateUser} from '../../src/graphql/mutations';
import useUser from '../../constants/hooks/useUser';
import {useToast} from 'react-native-toast-notifications';
import SelectDropdown from 'react-native-select-dropdown';
import {getUser} from '../../src/graphql/queries';
import {StackNavigationProp} from '@react-navigation/stack';
import {StackParamList} from '../../navigations/navigations';
import {useNavigation} from '@react-navigation/native';

const client = generateClient();

type NavigationProp = StackNavigationProp<StackParamList>;

interface User {
  data: {getUser: {userRole: any}};
}

const RegisterCar = () => {
  const {user} = useUser();

  const toast = useToast();

  const navigation = useNavigation<NavigationProp>();

  const [loading, setLoading] = useState(false);
  const [type, setType] = useState('');

  const carTypes = ['UberX', 'Comfort', 'UberXL'];

  const handleCreateCar = async () => {
    if (type !== '') {
      const newCar = {
        id: user,
        type: type,
        userId: user,
      };

      setLoading(true);
      try {
        await client.graphql({
          query: createCar,
          variables: {input: newCar},
        });

        setLoading(false);

        toast.show('Car registered successfully.', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        });

        setTimeout(() => {
          navigation.navigate('Home');
        }, 3000);
      } catch (error: any) {
        setLoading(false);

        toast.show(error?.toString(), {
          type: 'danger',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        });
      }
    } else {
      toast.show('Please select a car type to continue', {
        type: 'warning',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
    }
  };

  // automatically update user's info the first time after registration
  const updateUserProfile = async () => {
    const userData = (await client.graphql({
      query: getUser,
      variables: {id: user},
    })) as User;

    if (!userData.data.getUser.userRole) {
      await client.graphql({
        query: updateUser,
        variables: {
          input: {id: user, wallet: 0, userRole: 'Driver', country: 'Nigeria'},
        },
      });
    }
  };

  useEffect(() => {
    updateUserProfile();
  }, []);

  return (
    <SafeAreaView style={[styles.safeArea, {}]}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          gap: 10,
          padding: 20,
        }}>
        <Text
          style={[
            styles.mediumText,
            {color: COLORS.light.primary, fontSize: SIZES.xxxl},
          ]}>
          Register Your Car
        </Text>

        <SelectDropdown
          buttonStyle={[
            styles.input,
            {
              borderWidth: 1,
              borderColor: COLORS.light.primary,
              backgroundColor: COLORS.light.white,
              width: '100%',
            },
          ]}
          rowTextStyle={{textAlign: 'left', color: COLORS.light.primary}}
          defaultButtonText="Select car type"
          data={carTypes}
          onSelect={selectedItem => {
            setType(selectedItem);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
        />

        <Pressable style={styles.button} onPress={handleCreateCar}>
          {loading ? (
            <ActivityIndicator color={COLORS.light.white} />
          ) : (
            <Text style={styles.buttonText}>Register car</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default RegisterCar;
