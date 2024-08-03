import {
  View,
  Text,
  TextInput,
  Pressable,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {styles} from '../../constants/utils/styles';
import {COLORS, SIZES} from '../../constants';
import {getCurrentUser, signIn, type SignInInput} from 'aws-amplify/auth';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setUserState} from '../../redux/userRedux';
import {useToast} from 'react-native-toast-notifications';
import {StackParamList} from '../../navigations/navigations';

type NavigationProp = StackNavigationProp<StackParamList>;

interface Inputs {
  username: String;
  password: String;
}

const Login = () => {
  const navigation = useNavigation<NavigationProp>();

  const dispatch = useDispatch();

  const toast = useToast();

  const [inputs, setInputs] = useState<Inputs | any>();
  const [loading, setLoading] = useState(false);

  const handleChange = (name: any, value: any) => {
    setInputs((prev: any) => {
      return {...prev, [name]: value};
    });
  };

  const handleSignIn = async ({username, password}: SignInInput) => {
    setLoading(true);
    try {
      const {isSignedIn, nextStep} = await signIn({username, password});

      // console.log(nextStep.signInStep);

      if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
        toast.show('Please confirm your account.', {
          type: 'warning',
          placement: 'top',
          duration: 3000,
          animationType: 'slide-in',
        });

        setTimeout(() => {
          navigation.navigate('ConfirmEmail', {email: inputs.username});
        }, 3000);
      }

      setLoading(false);

      const {userId} = await getCurrentUser();
      dispatch(setUserState(userId));
    } catch (error: any) {
      setLoading(false);
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
          Sign In To Your account
        </Text>

        <TextInput
          placeholder="Enter Your Email"
          placeholderTextColor={COLORS.light.primary}
          onChangeText={value => handleChange('username', value)}
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

        <Pressable style={styles.button} onPress={() => handleSignIn(inputs)}>
          {loading ? (
            <ActivityIndicator color={COLORS.light.white} />
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </Pressable>

        <Text style={[styles.smallText, {color: COLORS.light.primary}]}>
          Don't have an account?{' '}
          <Text
            style={{color: COLORS.light.link}}
            onPress={() => navigation.navigate('Signup')}>
            Sign up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Login;
