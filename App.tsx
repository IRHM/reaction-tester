import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Reaction from "./src/views/Reaction";
import { store } from "./src/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <SafeAreaView>
      <Provider store={store}>
        <View>
          <StatusBar style="auto" />

          <Reaction />
        </View>
      </Provider>
    </SafeAreaView>
  );
}
