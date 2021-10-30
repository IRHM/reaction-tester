import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ReactionGame from "../libs/reactionGame";
import { GameStatus } from "../types";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function Reaction() {
  const [game, setGame] = useState<ReactionGame | null>(null);

  // TODO: Move to an actual store
  // const [backgroundColor, setBackgroundColor] = useState("#fff");
  // const [reactionResult, setReactionResult] = useState<string | null>(null);
  // const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Instructions);

  const gameState = useSelector((state: RootState) => state.game.value);

  useEffect(() => {
    setGame(new ReactionGame(gameState));
  }, []);

  let onClickAction: any;
  let stepToRender: any;

  console.log(gameState.gameStatus);

  if (game) {
    switch (gameState.gameStatus) {
      case GameStatus.Instructions:
        if (game) onClickAction = game.start;
        stepToRender = <Instructions />;
        break;
      case GameStatus.Reacting:
        if (game) onClickAction = game.getReactionTime;
        stepToRender = <Result result={gameState.reactionResult} />;
        break;
      default:
        stepToRender = <Text>Game status unknown, please reload.</Text>;
        break;
    }
  }

  const onClick = () => {
    // if (onClickAction && game) onClickAction();
    switch (gameState.gameStatus) {
      case GameStatus.Instructions:
        if (game) game.start();
        break;
      case GameStatus.Reacting:
        if (game) game.getReactionTime();
        break;
    }
  };

  if (game) {
    return (
      <View style={[styles.app, { backgroundColor: gameState.backgroundColor }]} onTouchStart={onClick}>
        {stepToRender}
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

function Instructions() {
  return (
    <View style={styles.instructionsBox}>
      <Text style={styles.header}>Reaction Time Test</Text>
      <Text style={styles.centered}>
        Tap the screen as quickly as you can when you see the colour green.
        <Text style={{ fontWeight: "bold" }}>Tap to begin.</Text>
      </Text>
    </View>
  );
}

function Result(props: any) {
  return <View>{props.result != null && <Text style={styles.reactionResult}>{props.result}</Text>}</View>;
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
