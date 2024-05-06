import React, { useState, useEffect } from 'react';
import { View, Text, Image, Animated, TouchableOpacity } from 'react-native';
import AppStyle from '../../theme';
import Icons from '../../assest/icons';

export default function WellcomeScreen({ navigation }) {
  const [slideTopAnim] = useState(new Animated.Value(-250)); // Giá trị ban đầu của animation topView
  const [buttonOpacity] = useState(new Animated.Value(0)); // Giá trị ban đầu của opacity

  useEffect(() => {
    Animated.timing(slideTopAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(buttonOpacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
      delay: 1000, 
    }).start();
  }, []);

  return (
    <View style={AppStyle.WellcomereenStyle.container}>
      <Animated.View style={[AppStyle.WellcomereenStyle.topView, { transform: [{ translateY: slideTopAnim }] }]}>
        <Image
          source={Icons.Appicon}
          style={AppStyle.WellcomereenStyle.iconAppStyle} 
        />
        <Text style={AppStyle.WellcomereenStyle.appNameStyle}>ToDo</Text>
      </Animated.View>
      
      <Animated.View style={[AppStyle.WellcomereenStyle.bottomView, { opacity: buttonOpacity }]}>
        <TouchableOpacity 
        onPress={() => navigation.navigate('Home')}
        style={AppStyle.WellcomereenStyle.buttomStyle}
        >
          <Text style={AppStyle.WellcomereenStyle.buttomTextStyle}>Khám Phá</Text>
        </TouchableOpacity>

      </Animated.View>
    </View>
  );
}
