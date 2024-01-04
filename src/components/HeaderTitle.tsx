import React from 'react';
import styled from 'styled-components/native';
import { colors } from '../shared/colors';

type HeaderTitleProps = {
    children?: React.ReactNode;
}

export const HeaderTitle = ({ children }: HeaderTitleProps) => {
    return (
        <Container>
            <Title>{children}</Title>
        </Container>
    )
};

const Container = styled.View`
    height: 40px;
    width: 100%;
    background-color: ${colors.background.headerAndFooter};
    justify-content: center;
    padding-left: 15px;
`;

const Title = styled.Text`
    color: white;
    font-weight: bold;
    font-size: 30px;
    font-family: 'Arial';
`;