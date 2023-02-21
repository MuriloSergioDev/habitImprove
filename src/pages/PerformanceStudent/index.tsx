import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Clipboard, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BarChart } from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import Button from '../../components/Button';
import { db } from '../../config/Firebase';
import AuthContext from '../../context/auth';
import { DesempenhoInterface } from '../../interface/interface';
import styles from './style';


const PerformanceStudent = ({ route }) => {

    const navigation = useNavigation();

    const { user } = useContext(AuthContext);
    const desempenhoTemp: DesempenhoInterface[] = []
    const bimestresTemp = []
    const [bimestres, setBimestres] = useState([])
    const [bimestre, setBimestre] = useState('');
    const [desempenho, setDesempenho] = useState<DesempenhoInterface[]>()    
    
    const screenWidth = Dimensions.get("window").width;
    const [dataChart, setDataChart] = useState({
        labels: ["Facil", "Medio", "Dificil"],
        datasets: [
            {
                data: [0, 0, 0,]
            }
        ],
        barColors: ["red", "yellow", "blue"]
    })
    const chartConfig = {
        backgroundGradientFrom: "rgba(229, 229, 229, 0.55)",
        backgroundGradientTo: "rgba(229, 229, 229, 0.55)",
        fillShadowGradientOpacity: 1,
        color: (opacity = 1) => `#6556A0`,
        strokeWidth: 3, // optional, default 3
        barPercentage: 1,
        useShadowColorFromDataset: false // optional
    };


    useEffect(() => {
        getDesempenho()
    }, [])

    function navigateBack() {
        navigation.goBack();
    }

    async function getDesempenho() {
        try {
            const data = await db
                .collection('desempenho')
                .where('uid', '==', user.uid)
                .get()

            data.forEach((doc) => {

                const data = {
                    facil: doc.get("facil"),
                    medio: doc.get("medio"),
                    dificil: doc.get("dificil"),
                    bimestre: doc.get("bimestre"),
                }
                //console.log(turma)
                desempenhoTemp.push(data)
            })

            desempenhoTemp.map((value) => {
                const data = {
                    value: `${value.bimestre.toString()}º Bimestre`,
                    label: `${value.bimestre.toString()}º Bimestre`,
                }
                bimestresTemp.push(data)
            })
            setBimestres(bimestresTemp)
            setDesempenho(desempenhoTemp)
        }
        catch (error) {
            alert(error)
        }
    }

    function setChart() {
        if (desempenho && bimestre) {
            const data = desempenho.find(value => value.bimestre.toString() === bimestre.substr(0, 1))

            const values = [{
                data: [data.facil, data.medio, data.dificil]
            }]
            setDataChart(prevState => { return { ...prevState, datasets: values } })

        } else {
            const values = [{
                data: [0, 0, 0]
            }]
            setDataChart(prevState => { return { ...prevState, datasets: values } })
        }
    }
    return (
        <View style={styles.container}>
            <Image
                style={styles.logo}
                source={require("../../../assets/logo.png")}></Image>
            <View>

                <Text style={styles.text}>Aluno : {user.name}</Text>
                <TouchableOpacity onPress={()=>{Clipboard.setString(user.uid)}}>
                    <Text style={styles.textUid}>UID : {user.uid}</Text>
                </TouchableOpacity>
                <View style={styles.inputBox}>
                    <Text style={styles.textTurma}>Bimestre</Text>
                    <RNPickerSelect
                        placeholder={{ label: 'Selecione um bimestre', value: null }}
                        value={bimestre}
                        onValueChange={(value) => {
                            setBimestre(value)
                            setChart()
                        }}
                        items={bimestres}
                        style={pickerSelectStyles}
                    />
                </View>

            </View>
            <ScrollView style={styles.scroll}>
                <Text style={styles.textScroll}>% de Acertos</Text>

                <BarChart
                    style={styles.chart}
                    data={dataChart}
                    width={screenWidth}
                    height={320}
                    yAxisLabel=""
                    yAxisSuffix="%"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                    fromZero={true}
                    withInnerLines={true}
                    showValuesOnTopOfBars={true}
                    showBarTops={false}
                />
            </ScrollView>

            <View style={styles.buttonBox}>
                <Button
                    color='#6556A0'
                    underlayColor='#514580'
                    textColor='white'
                    label="VOLTAR"
                    onPress={() => { navigateBack() }}>

                </Button>
            </View>

        </View>
    )
}

export default PerformanceStudent;

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});