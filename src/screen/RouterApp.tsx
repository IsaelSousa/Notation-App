import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator as createStack } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';

import { Splash } from './Splash/Splash';
import { HomePage } from './HomePage/HomePage';

const Stack = createStack();

export const RouterApp: React.FC<any> = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='HomePage' component={HomePage} />
            </Stack.Navigator>
            <FlashMessage position='center' />
        </NavigationContainer>
    );
}