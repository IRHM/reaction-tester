import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ReactionGame from "../libs/reactionGame";

export default function App() {
  ReactionGame.start();

  return (
    <View>
      <Text style={styles.header}>Reaction Test</Text>
      <Text>Tap the screen when you see the colour green</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20
  }
});
