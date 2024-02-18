import {View, Text, Dimensions} from 'react-native';
import React from 'react';
import {styles} from '../styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RBSheet from 'react-native-raw-bottom-sheet';
import {COLORS, SIZES} from '../../theme';

const ExchangeDetailsTransaction = () => {
  return (
    <View style={[styles.container, {paddingTop: 60}]}>
      <Text style={[styles.mediumTxt, {fontSize: SIZES.xxl, marginBottom: 40}]}>
        Exchange Details
      </Text>

      <View style={[styles.accountNoCon, {alignItems: 'stretch'}]}>
        <Text style={[styles.mediumTxt, {marginBottom: 20}]}>
          $1 -{'>'} ₦ 815
        </Text>

        <View style={[styles.exchangeHistory, {}]}>
          <Text style={[styles.smallTxt, {textAlign: 'left'}]}>
            Amount exchanged
          </Text>

          <Text
            style={[
              styles.mediumTxt,
              {fontSize: SIZES.font, textAlign: 'right'},
            ]}>
            $1
          </Text>
        </View>

        <View style={[styles.exchangeHistory, {marginTop: -10}]}>
          <Text style={[styles.smallTxt, {textAlign: 'left'}]}>
            Amount received
          </Text>

          <View>
            <Text
              style={[
                styles.mediumTxt,
                {fontSize: SIZES.font, textAlign: 'right'},
              ]}>
              ₦ 815
            </Text>
          </View>
        </View>

        <View style={[styles.exchangeHistory, {marginTop: -10}]}>
          <Text style={[styles.smallTxt, {textAlign: 'left'}]}>Status</Text>

          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <Text
                style={[
                  styles.mediumTxt,
                  {fontSize: SIZES.font, textAlign: 'right'},
                ]}>
                Pending
              </Text>

              <Icon name="lens" size={10} color={COLORS.light.yellow} />
            </View>
          </View>
        </View>

        <View style={[styles.exchangeHistory, {marginTop: -10}]}>
          <Text style={[styles.smallTxt, {textAlign: 'left'}]}>
            Account No.
          </Text>

          <View>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 2}}>
              <Text
                style={[
                  styles.mediumTxt,
                  {fontSize: SIZES.font, textAlign: 'right'},
                ]}>
                20940378594
              </Text>

              <Icon name="content-copy" size={14} color={COLORS.light.link} />
            </View>
          </View>
        </View>

        <View style={[styles.exchangeHistory, {marginTop: -10}]}>
          <Text style={[styles.smallTxt, {textAlign: 'left'}]}>Bank</Text>

          <View>
            <Text
              style={[
                styles.mediumTxt,
                {fontSize: SIZES.font, textAlign: 'right'},
              ]}>
              Providus Bank
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const ExchangeDetails = ({refRBSheet}) => {
  const itemHeight = Dimensions.get('window').height;

  return (
    <View>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={itemHeight * 0.66}
        customStyles={{
          draggableIcon: {
            backgroundColor: 'lightgray',
          },
        }}>
        <View style={[styles.exchangeIcon, {top: 10, right: 10}]}>
          <Icon
            name="close"
            size={25}
            color={COLORS.light.primary}
            onPress={() => refRBSheet.current.close()}
          />
        </View>

        <ExchangeDetailsTransaction />
      </RBSheet>
    </View>
  );
};

export default ExchangeDetails;
