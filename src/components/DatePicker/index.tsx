import { FontAwesome } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import styles from './style';

type Props = {
    setDate: Function,
    value: string,
    color ?: string
}

const DatePicker = ({ setDate, value, color = 'white'}: Props) => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        //console.warn("A date has been picked: ", date);
        let dataFormatada = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear()
        console.log(dataFormatada)
        setDate(dataFormatada)
        hideDatePicker();
    };

    return (
        <TouchableOpacity onPress={showDatePicker}>
            <View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                {
                    value === '' ?
                        // <View style={[styles.container, {backgroundColor: '#10f1f0'}]}>
                        <View style={styles.container}>
                            <FontAwesome name="calendar" size={24} color="black" />
                            <Text style={ {color: color, marginLeft: 10}}>Selecione a data</Text>
                        </View>
                        :
                        <View>
                            <Text style={ {color: color,fontWeight: 'bold'}}>{value}</Text>
                        </View>
                }
            </View>
        </TouchableOpacity>
    );
}

export default DatePicker;


