import React from 'react';
import styled from 'styled-components/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC<Props> = () => {
  return (
    <Container>
      <HeaderTitle>Meu Perfil</HeaderTitle>
      <Content>
        <ProfileInfo>
          <Avatar source={{ uri: 'https://i.pravatar.cc/150' }} />
          <InfoText>
            <Name>Seu Nome Aqui</Name>
            <Email>seu.email@exemplo.com</Email>
          </InfoText>
        </ProfileInfo>
      </Content>
    </Container>
  );
};

export default ProfileScreen;

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
  margin: 16px;
`;

const Content = styled.ScrollView`
  flex: 1;
  padding: 16px;
`;

const ProfileInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

const InfoText = styled.View`
  margin-left: 16px;
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const Email = styled.Text`
  font-size: 16px;
  color: #666;
`;
