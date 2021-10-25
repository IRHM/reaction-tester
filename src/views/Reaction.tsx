import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ReactionGame from "../libs/reactionGame";

// let game: ReactionGame;

export default function Reaction() {
  const [game, setGame] = useState<ReactionGame | null>(null);

  // TODO: Move to actual store
  const [backgroundColor, setBackgroundColor] = useState("#fff");
  const [reactionResult, setReactionResult] = useState<string | null>(null);
  const [gameStatus, setGameStatus] = useState<"instructions" | "playing">("instructions");

  useEffect(() => {
    console.log("useEffect");

    setGame(new ReactionGame(setBackgroundColor, setReactionResult, setGameStatus));
  }, []);

  const onClick = () => {
    if (game) {
      switch (gameStatus) {
        case "instructions":
          game.start();
          break;
        case "playing":
          game.getReactionTime();
          break;
      }
    }
  };

  if (game) {
    return (
      <View style={[styles.app, { backgroundColor: backgroundColor }]} onTouchStart={onClick}>
        {gameStatus == "instructions" && (
          <View style={styles.instructionsBox}>
            <Text style={styles.header}>Reaction Time Test</Text>
            <Text style={styles.centered}>
              Tap the screen as quickly as you can when you see the colour green.{" "}
              <Text style={{ fontWeight: "bold" }}>Tap to begin.</Text>
            </Text>
          </View>
        )}

        {gameStatus == "playing" && (
          <View>{reactionResult != null && <Text style={styles.reactionResult}>{reactionResult}</Text>}</View>
        )}
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
