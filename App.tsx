import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Reaction from "./src/views/Reaction";

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Reaction />

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}
