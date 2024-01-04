import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAwesome from 'react-native-vector-icons/FontAwesome6';
import { Notation } from '../models/types';
import { v4 as uuidv4 } from 'uuid';
import { colors } from '../shared/colors';
import realmdb from '../services/realmdb';
import { GalleryPicker } from '../utils/ImagePickerGallery';
import RecordAudio from '../utils/RecordAudio';

type NotationSenderProps = {
    getData: (data: Notation[]) => void;
}

export const NotationSender = ({
    getData
}: NotationSenderProps) => {

    const [inputText, setInputText] = useState<string>('');
    const [startRecord, setStartRecord] = useState<boolean>(false);

    const uuid = uuidv4();

    const handleAddNotation = () => {
        if (inputText) {
            realmdb.addData({ id: uuid, message: inputText, createAt: new Date() });
            setInputText('');
            getData(realmdb.getAllData());
        }
    };

    return (
        <Container>
            <InputContainer>
                <InputText value={inputText} onChangeText={(e) => setInputText(e)} placeholder='Say anything!' />

                <IconButton onPress={async () => {
                    const result = await GalleryPicker();
                    if (result.assets && result.assets?.length > 0) {
                        realmdb.addData({
                            id: uuid, message: inputText, createAt: new Date(), image: {
                                height: result.assets[0].height ?? 0,
                                width: result.assets[0].width ?? 0,
                                mime: result.assets[0].type ?? '',
                                path: result.assets[0].uri ?? ''
                            }
                        });
                        setInputText('');
                        getData(realmdb.getAllData());
                    }
                }} >
                    <IconAwesome name='image' color='#969696' size={29} />
                </IconButton>

            </InputContainer>
            {
                inputText.length > 0
                    ? <Send onPress={() => handleAddNotation()}>
                        <Icon name='send' color='#FFF' size={40} />
                    </Send>
                    : (
                        <>
                            {startRecord ?
                                <SendRecord onPress={async () => {
                                    setStartRecord(!startRecord);

                                    realmdb.addData({ id: uuid, message: '', createAt: new Date(), audio: (await RecordAudio.stopRecording()).toString() });
                                    
                                    getData(realmdb.getAllData());
                                }}>
                                    <IconEntypo name='controller-stop' color='#ffffff' size={40} />
                                </SendRecord>
                                :
                                <SendRecord onPress={() => {
                                    setStartRecord(!startRecord);
                                    RecordAudio.startRecording();
                                }}>
                                    <IconEntypo name='controller-record' color='#ffffff' size={40} />
                                </SendRecord>}
                        </>
                    )

            }
        </Container>
    );
};

const Container = styled.View`
        flex-direction: row;
        height: 50px;
        margin-bottom: 10px;
        margin-top: 5px;
`;

const InputContainer = styled.View`
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        background-color: #FFF;
        margin-left: 13px;
        margin-right: 13px;
        border-radius: 20px;
        width: 78%;
        padding: 12px;
        font-size: 20px;
        elevation: 8;
        height: 50px;
`;

const InputText = styled.TextInput`
        font-size: 20px;
        color: black;
        height: 50px;
        width: 90%;
`;

const Send = styled.TouchableOpacity`
        background-color: ${colors.background.imageBackground};
        padding: 5px;
        border-radius: 20px;
        elevation: 8;
        height: 50px;
`;

const SendRecord = styled.TouchableOpacity`
        background-color: ${colors.background.imageBackground};
        padding: 5px;
        border-radius: 20px;
        elevation: 8;
        height: 50px;
`;

const IconButton = styled.TouchableOpacity`
    height: 30px;
`;