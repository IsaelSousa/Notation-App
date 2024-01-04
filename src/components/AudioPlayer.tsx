import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../shared/colors';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

type AudioPlayerProps = {
    isPlaying: boolean;
    onPress: () => void;
};

export const AudioPlayer = ({ isPlaying, onPress }: AudioPlayerProps) => {
    return (
        <TouchableOpacityButton onPress={onPress}>
            {
            isPlaying 
            ? <IconAntDesign name='pausecircle' size={30} /> 
            : <IconAntDesign name='play' size={30} />
            }
        </TouchableOpacityButton>
    );
};

const TouchableOpacityButton = styled.TouchableOpacity`
        width: 95%;
        background-color: ${colors.background.imageBackground};
        justify-content: center;
        border-radius: 20px;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 4px;
        padding: 8px;
`;