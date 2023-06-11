import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  Ionicons
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import TabCreate from "../components/TabCreate";
import ChatRede from "../pages/ChatRede";
import CreateHabit from "../pages/CreateHabit";
import CreateReward from "../pages/CreateReward";
import EditHabit from "../pages/EditHabit";
import Estatisticas from "../pages/Estatisticas";
import Goals from "../pages/Goals";
import Menu from "../pages/Menu";
import Recompensa from "../pages/Recompensa";
import Rede from "../pages/Rede";

const AuthRoutes = () => {
  const Tab = createBottomTabNavigator();
  const MenuStack = createStackNavigator();
  const CreateHabitStack = createStackNavigator();
  const RedeHabitStack = createStackNavigator();
  const RewardStack = createStackNavigator();
  const EstatisticaStack = createStackNavigator();

  function MenuStackScreen() {
    return (
      <MenuStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Menu"
      >
        <MenuStack.Screen name="Menu" component={Menu} />
        <MenuStack.Screen
          name="Goals"
          component={Goals}
          initialParams={{ habito: undefined }}
        />

      <MenuStack.Screen
          name="EditHabit"
          component={EditHabit}
          initialParams={{ habit: undefined }}
        />
      </MenuStack.Navigator>
    );
  }

  function CreateHabitStackScreen() {
    return (
      <CreateHabitStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="CreateHabit"
      >
        <CreateHabitStack.Screen
          name="CreateHabit"
          component={CreateHabit}
          initialParams={{ id: undefined}}
        />
      </CreateHabitStack.Navigator>
    );
  }

  function RedeStackScreen() {
    return (
      <RedeHabitStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="RedeSuporte"
      >
        <RedeHabitStack.Screen
          name="RedeSuporte"
          component={Rede}
          initialParams={{ id: undefined }}
        />

        <RedeHabitStack.Screen
          name="ChatRede"
          component={ChatRede}
          initialParams={{ news: undefined }}
        />
      </RedeHabitStack.Navigator>
    );
  }

  function RewardStackScreen() {
    return (
      <RewardStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Recompensa"
      >
        <RewardStack.Screen
          name="Recompensa"
          component={Recompensa}
          initialParams={{ id: undefined }}
        />

        <RewardStack.Screen
          name="CreateReward"
          component={CreateReward}
          initialParams={{ id: undefined }}
        />
      </RewardStack.Navigator>
    );
  }

  function EstatisticaStackScreen() {
    return (
      <EstatisticaStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Estatisticas"
      >
        <EstatisticaStack.Screen
          name="Estatisticas"
          component={Estatisticas}
          initialParams={{ id: undefined }}
        />
      </EstatisticaStack.Navigator>
    );
  }

  const color = "#c3c7c4";
  const colorSelected = "white";
  const size = 25;

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false ,tabBarStyle: {
      paddingHorizontal: 5,
      paddingTop: 10,
      backgroundColor: 'rgba(34,36,40,1)',
      position: 'absolute',
      borderTopWidth: 0,
  },}} >
        <Tab.Screen
          name="Home"
          component={MenuStackScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ focused }) =>
            <Ionicons name="home" color={focused ? colorSelected : color} size={size} />
          }}
        />
        <Tab.Screen
          name="Add"
          component={EstatisticaStackScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({focused}) => (
              <FontAwesome5 name="calendar-check" size={24} color={focused ? colorSelected : color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings 3"
          component={CreateHabitStackScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({focused}) => (
              <TabCreate focused={focused} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings 4"
          component={RewardStackScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({focused}) => (
              <Entypo name="briefcase" size={24} color={focused ? colorSelected : color}/>
            ),
          }}
        />
        <Tab.Screen
          name="Rede"
          component={RedeStackScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({focused}) => (
              <FontAwesome name="group" size={24} color={focused ? colorSelected : color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AuthRoutes;
