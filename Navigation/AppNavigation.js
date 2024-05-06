import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/homeScreens/homeScreen';
import WellcomeScreen from '../screens/wellcomeScreens/wellcomeScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
    return (
        <Stack.Navigator  initialRouteName = "Wellcome">
            <Stack.Screen options={{ headerShown: false }} name="Wellcome" component={WellcomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

export default AppNavigation

