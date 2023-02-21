import { AntDesign, Entypo, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from "react";
import CreateHabit from "../pages/CreateHabit";
import Menu from '../pages/Menu';

const AuthRoutes = () => {

    const Tab = createBottomTabNavigator();
    const MenuStack = createStackNavigator();
    const CreateHabitStack = createStackNavigator();


    function MenuStackScreen() {
        return (
            <MenuStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Menu">
                <MenuStack.Screen name="Menu" component={Menu} />                
            </MenuStack.Navigator>
        );
    }

    function CreateHabitStackScreen() {
        return (
            <CreateHabitStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="CreateHabit">
                <CreateHabitStack.Screen name="CreateHabit" component={CreateHabit}/>
            </CreateHabitStack.Navigator>
        );
    }

    const color = 'black';    
    const size = 25; 

    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={MenuStackScreen} options={{
                    tabBarLabel: '' , tabBarIcon: () => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }} />
                <Tab.Screen name="Add"  component={CreateHabitStackScreen} options={{
                    tabBarLabel: '' , tabBarIcon: () => (
                        <Entypo name="bar-graph" size={24} color={color}  />
                    ),
                }}/>
                <Tab.Screen name="Settings 3"  component={CreateHabitStackScreen} options={{
                    tabBarLabel: '' , tabBarIcon: () => (
                        <AntDesign name="pluscircle" color={color} size={size}  />
                    ),
                }}/>
                <Tab.Screen name="Settings 4"  component={CreateHabitStackScreen} options={{
                    tabBarLabel: '' , tabBarIcon: () => (
                        <FontAwesome5 name="calendar-check" size={24} color={color}  />
                    ),
                }}/>
                <Tab.Screen name="Settings 5"  component={CreateHabitStackScreen} options={{
                    tabBarLabel: '' , tabBarIcon: () => (
                        <FontAwesome name="group" size={24} color={color} />
                    ),
                }}/>
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default AuthRoutes;