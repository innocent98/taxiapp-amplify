import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  confirmSignUp,
  type ConfirmSignUpInput,
  resendSignUpCode,
} from 'aws-amplify/auth';
import {styles} from '../../constants/utils/styles';
import {COLORS, SIZES} from '../../constants';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useToast} from 'react-native-toast-notifications';
import { StackParamList } from '../../navigations/navigations';

type NavigationProp = StackNavigationProp<StackParamList>;

interface Inputs {
  username: String;
  confirmationCode: String;
}

interface Route {
  route: RouteProp<StackParamList, 'ConfirmEmail'>;
}
const ConfirmEmail: React.FC<Route> = ({route}) => {
  const {email} = route.params;

  const toast = useToast();

  const navigation = useNavigation<NavigationProp>();

  const [inputs, setInputs] = useState<Inputs | any>();
  const [loading, setLoading] = useState(false);

  const handleChange = (name: any, value: any) => {
    setInputs((prev: any) => {
      return {...prev, [name]: value};
    });
  };

  useEffect(() => {
    handleChange('username', email);
  }, []);

  const handleSignUpConfirmation = async ({
    username,
    confirmationCode,
  }: ConfirmSignUpInput) => {
    setLoading(true);
    try {
      const {isSignUpComplete, nextStep, userId} = await confirmSignUp({
        username: inputs.username,
        confirmationCode: inputs.confirmationCode,
      });

      // console.log(isSignUpComplete, nextStep);

      setLoading(false);

      navigation.navigate('Login');
    } catch (error: any) {
      console.log('error confirming sign up', error);
      setLoading(false);

      toast.show(error.toString().replace('CodeMismatchException: ', ''), {
        type: 'warning',
        placement: 'top',
        duration: 3000,
        animationType: 'slide-in',
      });
    }
  };

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
          Confirm Your Account
        </Text>

        <Text style={[styles.smallText, {color: COLORS.light.textSoft}]}>
          We have a sent a confirmation code to your email.
        </Text>

        <TextInput
          placeholder="Enter the code sent to your email"
          placeholderTextColor={COLORS.light.primary}
          onChangeText={value => handleChange('confirmationCode', value)}
          style={[
            styles.input,
            {
              borderWidth: 1,
              borderColor: COLORS.light.primary,
              backgroundColor: COLORS.light.white,
              width: '100%',
              color: COLORS.light.primary,
            },
          ]}
        />

        <Pressable
          style={styles.button}
          onPress={() => handleSignUpConfirmation(inputs)}>
          {loading ? (
            <ActivityIndicator color={COLORS.light.white} />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ConfirmEmail;
