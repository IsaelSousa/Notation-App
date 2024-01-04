import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { strings } from '../../shared/strings';

export const Splash: React.FC<any> = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('HomePage');
        }, 1500);
    }, [navigation]);

    return (
        <View style={style.container}>
            <Text style={style.text}>{strings.title}</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#c2c2c2'
    },
    text: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 20
    }
});