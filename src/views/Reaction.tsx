import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ReactionGame from "../libs/reactionGame";

// let game: ReactionGame;

export default function Reaction() {
  const [game, setGame] = useState<ReactionGame | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [reactionResult, setReactionResult] = useState<string | null>(null);

  useEffect(() => {
    console.log("useEffect");

    setGame(new ReactionGame(setBackgroundColor, setReactionResult));

    // if (game) game.start();
  }, []);

  const onClick = () => {
    if (game) game.getReactionTime();
  };

  if (game) {
    return (
      <View style={[styles.app, { backgroundColor: backgroundColor }]} onTouchStart={onClick}>
        <View style={styles.instructionsBox}>
          <Text style={styles.header}>Reaction Time Test</Text>
          <Text style={styles.centered}>Tap the screen as quickly as you can when you see the colour green.</Text>
        </View>

        {/* {reactionResult != null && <Text style={styles.reactionResult}>{reactionResult}</Text>} */}
      </View>
    );
  } else {
    return (
      <View>
        <Text>Please wait sir</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    minHeight: "100%"
  },
  instructionsBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto"
  },
  header: {
    fontSize: 20
  },
  centered: {
    textAlign: "center"
  },
  reactionResult: {
    alignSelf: "center",
    fontSize: 30
  }
});
