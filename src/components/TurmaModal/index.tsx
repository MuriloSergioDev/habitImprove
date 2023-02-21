import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import styles from './style'
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { TurmaInterface } from '../../interface/interface';
import { db } from '../../config/Firebase';
import { AntDesign } from '@expo/vector-icons';

type Props = {
    turma?: TurmaInterface
    colorStatus?: string
    onPress?: any
    showAlertModalSucess?: Function
    showAlertModalFail?: Function
}

const TurmaModal = ({ turma, colorStatus = "black", onPress, showAlertModalSucess, showAlertModalFail }: Props) => {

    const navigation = useNavigation();

    function handleTurmaDelete() {
        console.log('deletar aluno')

        // Works on both Android and iOS
        Alert.alert(
            'Deseja mesmo excluir a turma?',
            '',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel'
                },
                {
                    text: 'OK', onPress: () => {
                        
                        db.collection("turmas").doc(turma.id).delete().then(function () {
                            //console.log("Document successfully deleted!");
                            showAlertModalSucess();
                        }).catch(function (error) {
                            //console.error("Error removing document: ", error);
                            showAlertModalFail();
                        });
                    }
                }
            ],
            { cancelable: false }
        );
    }

    function handleTurmaEdit() {
        console.log('editar turma')
        navigation.navigate('EditTurma', {
            id: turma.id,
            title: turma.title,
            start: turma.start,
            end: turma.end,
            status: turma.status,
        });
    }

    function rightActions(progress, dragX) {
        return (
            <>
                <TouchableOpacity onPress={() => { handleTurmaDelete() }}>
                    <View style={styles.deleteAction}>
                        <Text style={styles.textAction}>Excluir</Text>
                        <Feather name="trash-2" size={20} color="white" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { handleTurmaEdit() }}>
                    <View style={styles.editAction}>
                        <Text style={styles.textAction}>Editar</Text>                        
                        <AntDesign name="edit" size={20} color="white" />
                    </View>
                </TouchableOpacity>
            </>
        );
    }

    return (
        <Swipeable renderRightActions={rightActions} >
            <TouchableHighlight onPress={onPress} underlayColor="lightgray">
                <View style={styles.container} >
                    <Feather name="circle" size={20} color={colorStatus} />
                    <View style={styles.viewBox}>
                        <Text style={styles.textTitle}>{turma.title}</Text>
                        <View style={styles.periodBox}>
                            <Text style={styles.textPeriod}>{turma.start}</Text>
                            <Text style={styles.textPeriod}>{turma.end}</Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        </Swipeable>
    );

}



export default TurmaModal;
