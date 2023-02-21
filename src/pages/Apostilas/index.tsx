import { AntDesign, Feather, Foundation } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, View } from 'react-native';
import AlertModal from '../../components/AlertModal';
import SearchBox from '../../components/SearchBox';
import Separator from '../../components/Separator';
import TurmaModal from '../../components/TurmaModal';
import { db } from '../../config/Firebase';
import { TurmaInterface } from '../../interface/interface';
import styles from './style';

type Props = {

}

const Apostilas = ({ }: Props) => {

    const navigation = useNavigation();
    const [search, setSearch] = useState<string>('')
    const [turmas, setTurmas] = useState<TurmaInterface[]>()
    const [modalAlertVisible, setModalAlertVisible] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const turmasTemp = []

    useEffect(() => {
        getTurmas()
    }, [])

    function navigateBack() {
        navigation.goBack();
    }

    function navigateToCreateTurma() {
        navigation.navigate('CreateTurma');
    }

    function navigateToTurmaDetail(turma: TurmaInterface ) {
        
        navigation.navigate('TurmaDetail',{
            id: turma.id,
            title: turma.title,
            status: turma.status
        });
    }

    function navigateToMenu(data) {
        navigation.navigate('Menu', {
            turma: data.turma,
        });
    }

    async function getTurmas() {
        try {
            const data = await db
                .collection('turmas')
                .get()

            data.forEach((doc) => {

                const turma: TurmaInterface = {
                    id : doc.id,
                    title : doc.get("title"),
                    start : doc.get("start"),
                    end : doc.get("end"),
                    status : doc.get("status"),
                }
                //console.log(turma)
                turmasTemp.push(turma)
            })
            setTurmas(turmasTemp)
        }
        catch (error) {
            alert(error)
        }
    }

    function filterBySearch(Turma: TurmaInterface) {
        if (Turma.title?.toLocaleLowerCase()?.indexOf(search.toLowerCase()) !== -1)
            return Turma
    }

    const filtered = turmas?.filter(filterBySearch)
    let modalIcon = messageAlert== 'Turma excluida com sucesso' ? <AntDesign name="checkcircle" size={24} color="green" /> : <Foundation name="alert" size={24} color="#e6d927" />

    return (
        <View style={styles.container}>
            <View style={styles.nav}>
                <View style={styles.navUp}>
                    <Feather name="arrow-left" size={30} color="white" onPress={() => { navigateBack() }} />
                    <Image
                        style={styles.logo}
                        source={require("../../../assets/logoalt.png")}></Image>
                    <Feather name="plus-square" size={30} color="white" onPress={() => { navigateToCreateTurma() }} />
                </View>
            </View>

            <SearchBox onChangeText={(text) => setSearch(text)} value={search} />
            <AlertModal
                header={messageAlert}
                comfirmationString='Ok'
                isVisible={modalAlertVisible}
                close={() => {
                    setModalAlertVisible(false)
                }}>
                {modalIcon}
            </AlertModal>
            {
                filtered != null ?
                    <FlatList
                        data={filtered}
                        keyExtractor={item => item.id}
                        ItemSeparatorComponent={() => <Separator />}
                        renderItem={({ item }) => (
                            <TurmaModal
                                showAlertModalSucess={()=>{
                                    setMessageAlert('Turma excluida com sucesso')
                                    setModalAlertVisible(true)
                                    getTurmas()
                                }}
                                showAlertModalFail={()=>{
                                    setMessageAlert('Erro ao excluir turma')
                                    setModalAlertVisible(true)
                                }}
                                turma={item}
                                colorStatus={item.status ? 'green' : 'black'}
                                onPress={() => { navigateToTurmaDetail(item)}}></TurmaModal>
                        )}
                    />
                    : <ActivityIndicator animating={true} color='#6556A0' size={50}/>
            }
        </View>
    )
}

export default Apostilas;