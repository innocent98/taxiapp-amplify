import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../constants/utils/styles';
import {COLORS, SIZES} from '../../constants/theme';
import {signUp} from '@aws-amplify/auth';
import {useToast} from 'react-native-toast-notifications';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {StackParamList} from '../../navigations/navigations';

type NavigationProp = StackNavigationProp<StackParamList>;

interface Inputs {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  username: String;
}
const Signup = () => {
  const toast = useToast();

  const navigation = useNavigation<NavigationProp>();

  const [inputs, setInputs] = useState<Inputs | any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (name: any, value: any) => {
    setInputs((prev: any) => {
      return {...prev, [name]: value};
    });
  };

  const handleSignup = async () => {
    if (
      !inputs.firstName ||
      !inputs.lastName ||
      !inputs.email ||
      !inputs.password
    ) {
      toast.show('Please fill all inputs', {
        type: 'warning',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else if (inputs.password.length < 8) {
      toast.show('Password length must not be less than 8', {
        type: 'warning',
        placement: 'top',
        duration: 4000,
        animationType: 'slide-in',
      });
    } else {
      setLoading(true);
      try {
        const {isSignUpComplete, userId, nextStep} = await signUp({
          password: inputs.password,
          username: inputs.email,
          options: {
            userAttributes: {
              email: inputs.email,
              given_name: inputs.firstName,
              family_name: inputs.lastName,
            },
            autoSignIn: false,
          },
        });

        setLoading(false);

        navigation.navigate('ConfirmEmail', {email: inputs.email});
      } catch (error: any) {
        setLoading(false);

        toast.show(error.toString().replace('UsernameExistsException: ', ''), {
          type: 'danger',
          placement: 'top',
          duration: 4000,
          animationType: 'slide-in',
        });
      }
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
          Register An Account
        </Text>

        <TextInput
          placeholder="Enter Your First Name"
          placeholderTextColor={COLORS.light.primary}
          onChangeText={value => handleChange('firstName', value)}
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

        <TextInput
          placeholder="Enter Your Last Name"
          placeholderTextColor={COLORS.light.primary}
          onChangeText={value => handleChange('lastName', value)}
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

        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor={COLORS.light.primary}
          onChangeText={value => handleChange('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
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

        <TextInput
          placeholder="Enter Your Password"
          placeholderTextColor={COLORS.light.primary}
          onChangeText={value => handleChange('password', value)}
          secureTextEntry={true}
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

        <Pressable style={styles.button} onPress={handleSignup}>
          {loading ? (
            <ActivityIndicator color={COLORS.light.white} />
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </Pressable>

        <Text style={[styles.smallText, {color: COLORS.light.primary}]}>
          Already have an account?{' '}
          <Text
            style={{color: COLORS.light.link}}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
