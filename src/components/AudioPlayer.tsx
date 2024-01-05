import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../shared/colors';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

type AudioPlayerProps = {
    isPlaying: boolean;
    onPress: () => void;
    time: string;
};

type IconProps = {
    isPlaying: boolean;
}

const Icon = ({ isPlaying }: IconProps) => {
    return isPlaying
    ? <IconAntDesign name='pausecircle' size={30} />
    : <IconAntDesign name='play' size={30} />
}

export const AudioPlayer = ({ isPlaying, onPress, time }: AudioPlayerProps) => {
    return (
        <TouchableOpacityButton onPress={onPress}>
            <Icon isPlaying={isPlaying} />
            <TitleBold>{time}</TitleBold>
        </TouchableOpacityButton>
    );
};

const TitleBold = styled.Text`
    font-weight: bold;
    margin-left: 10px;
`;

const TouchableOpacityButton = styled.TouchableOpacity`
        width: 95%;
        background-color: ${colors.background.imageBackground};
        justify-content: left;
        align-items: center;
        border-radius: 20px;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 4px;
        padding: 8px;
        flex-direction: row;
`;