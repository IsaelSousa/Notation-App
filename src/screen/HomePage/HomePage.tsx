import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, FlatList } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import 'react-native-get-random-values';
import { Notation } from '../../models/types';
import { showMessage } from "react-native-flash-message";
import { NotationItemRow } from '../../components/NotationItemRow';
import { NotationSender } from '../../components/NotationSender';
import { HeaderTitle } from '../../components/HeaderTitle';
import { colors } from '../../shared/colors';
import realmdb from '../../services/realmdb';

export const HomePage: React.FC<any> = () => {
    const navigation = useNavigation();

    const [data, setData] = useState<Notation[]>([]);

    const handleClipBoard = (value: string) => {
        Clipboard.setString(value);
        showMessage({
            message: 'Copied to Clipboard!',
            type: 'success',
            animated: true,
        });
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', (e) => {
            e.preventDefault();
            const canNavigate = false;
            if (canNavigate) {
                navigation.dispatch(e.data.action);
            }
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        setData(realmdb.getAllData());
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar />
            <HeaderTitle></HeaderTitle>

            <View style={styles.flatListContainer}>
                <FlatList<Notation>
                    data={data}
                    style={{ width: '95%' }}
                    scrollEnabled
                    renderItem={({ item, index }) => {
                        return <NotationItemRow
                            id={item.id}
                            audio={item.audio}
                            title={item.message}
                            onPress={() => handleClipBoard(item.message)}
                            image={item?.image}
                            reloadData={() => {
                                setData(realmdb.getAllData());
                            }}
                        />
                    }}
                />
            </View>

            <NotationSender
                getData={(data) => setData(data)}
            />

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.default,
        flexDirection: 'column',
        height: '100%'
    },
    flatListContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginTop: 10
    }
});