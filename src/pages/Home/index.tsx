import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ImageBackground, View } from 'react-native';
import Button from '../../components/Button';
import styles from './styles';

// import { Container } from './styles';

type Props = {

}

const Home = ({ }: Props) => {

    const navigation = useNavigation();

    function navigateToLogin() {
        navigation.navigate('Login');
    }

    function navigateToSignUp() {
        navigation.navigate('SignUp');
    }

    console.log(process.env.REACT_APP_API_KEY)

    return (
        <ImageBackground source={require("../../../assets/backimg.jpg")} style={styles.backgroundimage}>
            <LinearGradient
                colors={['transparent', 'rgba(157, 113, 52, 0.8)']}
                start={[0, 0.1]}
                style={styles.layer}
            >
                <View style={styles.container}>
                    
                    <View style={styles.buttonBox}>


                        <Button
                            color='transparent'
                            underlayColor='transparent'
                            textColor='white'
                            borderColor='white'
                            label="CADASTRAR"
                            onPress={() => { navigateToSignUp() }}></Button>
                    </View>
                    <View style={styles.buttonBox}>
                        <Button
                            color='white'
                            underlayColor='#f0efeb'
                            textColor='#FE9D2A'
                            borderColor='white'
                            label="LOGIN"
                            onPress={() => { navigateToLogin() }}></Button>
                    </View>
                    {/* <StatusBar style={"auto"} /> */}
                </View>
            </LinearGradient>
        </ImageBackground>
    )
}

export default Home;