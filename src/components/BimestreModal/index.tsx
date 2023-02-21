import React from 'react';
import { View, Text } from 'react-native';
import styles from './style'
import { Ionicons } from '@expo/vector-icons';
import Button from '../Button'
import { useNavigation } from '@react-navigation/native';
import { UserInterface } from '../../interface/interface';


type Props = {
    onPress?: any
    permission: number
    user: UserInterface
}

const BimestreModal = ({ onPress, permission, user }: Props) => {

    const navigation = useNavigation();

    function navigateToListStudents() {
        if (permission === 1) {
            navigation.navigate('PerformanceStudent', {
                name: user.name,
                email: user.email,
                password: user.password,
                turma: user.turma,
                permission: user.permission
            });
        } else {
            navigation.navigate('ListStudents', {
                turma: user.turma
            });
        }
    }

    return (
        <View style={styles.container} >
            <View style={styles.viewBox}>
                <Text style={styles.textTitle}>Escolha o Bimestre</Text>
                <Ionicons name="close" size={24} color="white" style={styles.icon} onPress={onPress} />
            </View>
            <View style={styles.buttonBox}>
                <Button
                    label="1º Bimestre"
                    color="white"
                    textColor="#6556A0"
                    borderColor="white"
                    underlayColor="#f0efeb"
                    onPress={() => { navigateToListStudents() }}></Button>
            </View>
            <View style={styles.buttonBox}>
                <Button
                    label="2º Bimestre"
                    color="white"
                    textColor="#6556A0"
                    borderColor="white"
                    underlayColor="#f0efeb"
                    onPress={() => { navigateToListStudents() }}></Button>
            </View>
            <View style={styles.buttonBox}>
                <Button
                    label="3º Bimestre"
                    color="white"
                    textColor="#6556A0"
                    borderColor="white"
                    underlayColor="#f0efeb"
                    onPress={() => { navigateToListStudents() }}></Button>
            </View>
            <View style={styles.buttonBox}>
                <Button
                    label="4º Bimestre"
                    color="white"
                    textColor="#6556A0"
                    borderColor="white"
                    underlayColor="#f0efeb"
                    onPress={() => { navigateToListStudents() }}></Button>
            </View>
            <View style={styles.buttonBox}>
                <Button
                    label="5º Bimestre"
                    color="white"
                    textColor="#6556A0"
                    borderColor="white"
                    underlayColor="#f0efeb"
                    onPress={() => { navigateToListStudents() }}></Button>
            </View>
        </View>
    );

}



export default BimestreModal;


