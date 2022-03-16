import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Reaction from "./src/views/Reaction";
import Stats from "./src/views/Stats";
import { store, persistor } from "./src/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <SafeAreaView>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        {/* <View> */}
        <StatusBar style="auto" />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName: any;

                // Browse icons here: https://icons.expo.fyi/
                // Make sure to filter for ionicons, since thats the family
                // we are using.
                if (route.name === "Reaction") {
                  iconName = focused ? "flash-sharp" : "flash-outline";
                } else if (route.name === "Stats") {
                  iconName = focused ? "stats-chart" : "stats-chart-outline";
                }

                // You can return any component that you like here!
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: "black",
              tabBarInactiveTintColor: "gray"
            })}
          >
            <Tab.Screen name="Reaction" component={Reaction} />
            <Tab.Screen name="Stats" component={Stats} />
          </Tab.Navigator>
        </NavigationContainer>
        {/* </View> */}
      </PersistGate>
    </Provider>
    // </SafeAreaView>
  );
}
