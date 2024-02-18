import {View, Text, Pressable} from 'react-native';
import React from 'react';
import UberType from '../../components/uberType/UberType';
import {uberType} from '../../assets/UberAssets/data/types';
import {styles} from '../../constants/utils/styles';

interface ScreenProps {
  selectedType: any;
  setSelectedType: (value: any) => void;
  onSubmit: () => void;
}

const UberTypes: React.FC<ScreenProps> = ({
  selectedType,
  setSelectedType,
  onSubmit,
}) => {
  return (
    <View>
      {uberType.map((item, index) => (
        <UberType
          key={index}
          item={item}
          isSelected={item.type === selectedType}
          onPress={() => setSelectedType(item.type)}
        />
      ))}

      <Pressable
        onPress={onSubmit}
        disabled={!selectedType}
        style={styles.button}>
        <Text style={styles.buttonText}>Confirm Uber</Text>
      </Pressable>
    </View>
  );
};

export default UberTypes;