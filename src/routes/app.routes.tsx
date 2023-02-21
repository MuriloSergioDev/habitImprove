import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";

import EditUser from '../pages/EditUser';
import Home from '../pages/Home';
import Login from '../pages/Login';
import RecoverPassword from '../pages/RecoverPassword';
import SignUp from '../pages/SignUp';


const AppRoutes = () => {

    const AppStack = createStackNavigator();

    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">                
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="SignUp" component={SignUp} />
                <AppStack.Screen name="EditUser" component={EditUser} />
                <AppStack.Screen name="RecoverPassword" component={RecoverPassword} />
            </AppStack.Navigator>

        </NavigationContainer>
    );
}

export default AppRoutes;