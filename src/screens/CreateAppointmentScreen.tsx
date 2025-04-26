import React from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import styled from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { v4 as uuidv4 } from 'uuid';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateAppointment'>;

export const CreateAppointmentScreen = ({ navigation }: Props) => {
  const [date, setDate] = React.useState(new Date());
  const [showDatePicker, setShowDatePicker] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      nome: '',
      descricao: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string().required('Nome é obrigatório'),
      descricao: Yup.string().required('Descrição é obrigatória'),
    }),
    onSubmit: async values => {
      const newAppointment = {
        id: uuidv4(),
        doctor: {
          name: values.nome,
          specialty: values.descricao,
          image: 'https://randomuser.me/api/portraits/lego/1.jpg', // placeholder
        },
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      try {
        const existing = await AsyncStorage.getItem('appointments');
        const parsed = existing ? JSON.parse(existing) : [];
        parsed.push(newAppointment);
        await AsyncStorage.setItem('appointments', JSON.stringify(parsed));
        navigation.goBack();
      } catch (err) {
        console.error('Erro ao salvar consulta:', err);
      }
    },
  });

  const handleDateChange = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <Container>
      <Content>
        <Label>Nome</Label>
        <Input
          value={formik.values.nome}
          onChangeText={formik.handleChange('nome')}
          placeholder="Digite o nome"
        />
        {formik.errors.nome && <ErrorText>{formik.errors.nome}</ErrorText>}

        <Label>Descrição</Label>
        <Input
          value={formik.values.descricao}
          onChangeText={formik.handleChange('descricao')}
          placeholder="Digite a descrição"
        />
        {formik.errors.descricao && <ErrorText>{formik.errors.descricao}</ErrorText>}

        <Label>Data da Consulta</Label>
        <Button title="Selecionar Data" onPress={() => setShowDatePicker(true)} />
        <Text>{date.toLocaleDateString()} - {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        <Button title="Agendar" onPress={formik.handleSubmit as any} />
      </Content>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
  padding: 16px;
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
`;

const Input = styled.TextInput`
  border: 1px solid #ccc;
  padding: 8px;
  margin-top: 4px;
  border-radius: 4px;
`;

const ErrorText = styled.Text`
  color: red;
  font-size: 12px;
  margin-top: 4px;
`;
