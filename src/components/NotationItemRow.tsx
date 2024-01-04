import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Image } from '../models/types';
import { colors } from '../shared/colors';
import realmdb from '../services/realmdb';
import { showMessage } from 'react-native-flash-message';
import RNFS from 'react-native-fs';
import VideoPlayer from 'react-native-video-player';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from 'react-native';
import AudioRecorder from '../utils/RecordAudio';
import { AudioPlayer } from './AudioPlayer';

type NotationItemProps = {
    onPress?: () => void;
    title: string;
    image?: Image;
    id: string;
    audio?: string;
    reloadData: () => void;
}

export const NotationItemRow = ({ onPress, title, image, id, reloadData, audio }: NotationItemProps): React.JSX.Element => {

    const deleteMessage = (id: string) => realmdb.deleteData(id);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handleDeleteMessage = () => {
        deleteMessage(id);
        showMessage({
            message: 'Deleted with Success!',
            type: 'success',
            animated: true,
        });
        reloadData();
    };

    const handleDeleteImageFromDevice = () => {
        if (image?.path) {
            RNFS.exists(image?.path)
                .then((img) => {
                    if (img) {
                        return RNFS.unlink(image.path)
                    } else {
                        showMessage({
                            message: 'Image does not exist!',
                            type: 'warning',
                            animated: true,
                        });
                    }
                })
                .then(() => {
                    deleteMessage(id);
                    reloadData();
                    showMessage({
                        message: 'Deleted with Success!',
                        type: 'success',
                        animated: true,
                    });
                })
                .catch(() => showMessage({
                    message: 'Error to delete image!',
                    type: 'danger',
                    animated: true,
                }));
        }
    };

    const startPlaying = async () => {
        setIsPlaying(true);
        return await AudioRecorder.startPlaying();
    };

    const stopPlaying = async () => {
        setIsPlaying(false);
        return await AudioRecorder.stopPlaying();
    };

    const handleImageOrVideo = () => {
        if (image?.mime === 'video/mp4') {
            return (
                <GestureHandlerRootView>
                    <TouchableOpacity onLongPress={() => handleDeleteImageFromDevice()}>
                        <VideoPlayer
                            video={{ uri: image.path }}
                            videoWidth={320}
                            videoHeight={400}
                            style={{
                                borderRadius: 20,
                                borderColor: `${colors.background.imageBackground}`,
                                borderWidth: 4,
                                height: 280,
                                marginBottom: 4
                            }}
                        />
                    </TouchableOpacity>
                </GestureHandlerRootView>
            )
        } else if (image?.mime === 'image/jpeg') {
            return (
                <ImageContainer onLongPress={() => handleDeleteImageFromDevice()}>
                    {image && image.path != null ? <ImageStyled source={{ uri: image.path }} /> : <></>}
                </ImageContainer>
            )
        } else if (title != '') {
            return (
                <Container onPress={onPress} onLongPress={() => handleDeleteMessage()}>
                    <Title>{title}</Title>
                </Container>
            )
        } else if (audio != '') return <AudioPlayer onPress={isPlaying ? stopPlaying : startPlaying} isPlaying={isPlaying} />
    }

    return <>{handleImageOrVideo()}</>;
}

const Container = styled.TouchableOpacity`
        width: 95%;
        background-color: ${colors.background.imageBackground};
        justify-content: center;
        border-radius: 20px;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 4px;
`;

const ImageContainer = styled.TouchableOpacity`
        width: 85%;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 4px;
`;

const Title = styled.Text`
       direction: ltr;
        color: ${colors.text.default};
        font-size: 20px;
        margin: 10px;
`;

const ImageStyled = styled.Image`
    width: 320px;
    height: 400px;
    border-radius: 20px;
    border-color: ${colors.background.imageBackground};
    border-width: 4px;
`;