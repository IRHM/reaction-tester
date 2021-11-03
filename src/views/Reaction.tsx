import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ReactionGame from "../libs/reactionGame";
import { GameStatus } from "../types";
import { RootState } from "../store";
import { useSelector } from "react-redux";

export default function Reaction() {
  const [game, setGame] = useState<ReactionGame | null>(null);
  const gameState = useSelector((state: RootState) => state.game.value);

  useEffect(() => {
    setGame(new ReactionGame());
  }, []);

  let stepToRender: JSX.Element = <View></View>;

  console.log("GameStatus:", gameState.gameStatus);

  if (game) {
    switch (gameState.gameStatus) {
      case GameStatus.Instructions:
        stepToRender = <Instructions />;
        break;
      case GameStatus.Reacting:
        // No need to render anything whilst reacting yet, could add
        // text saying click when see colour green in future
        break;
      case GameStatus.ReactionResult:
        stepToRender = <Result result={gameState.reactionResult} />;
        break;
      case GameStatus.FinalResult:
        stepToRender = <FinalResult result={game.getAverageReactionTime()} />;
        break;
      default:
        stepToRender = <Text>Game status unknown, please reload.</Text>;
        break;
    }
  }

  const onClick = () => {
    if (game) game.handleGameClick(gameState.gameStatus);
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
    <View style={styles.centeredBox}>
      <Text style={styles.header}>Reaction Time Test</Text>
      <Text style={styles.centered}>
        Tap the screen as quickly as you can when you see the colour green.
        <Text style={styles.bold}>Tap to begin.</Text>
      </Text>
    </View>
  );
}

function Result(props: { result?: string }) {
  return (
    <View style={styles.centeredBox}>
      {props.result != null && (
        <View>
          <Text style={styles.reactionResult}>{props.result}</Text>
          <Text style={styles.centered}>Click to continue</Text>
        </View>
      )}
    </View>
  );
}

function FinalResult(props: { result?: string }) {
  return (
    <View style={styles.centeredBox}>
      {props.result != null && (
        <View>
          <Text style={styles.header}>Your Average Reaction Time</Text>
          <Text style={[styles.centered, styles.subTitle]}>{props.result}</Text>
          <Text style={[styles.centered, styles.bold]}>Click to continue</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    minHeight: "100%"
  },
  centeredBox: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto"
  },
  header: {
    fontSize: 20,
    fontWeight: "bold"
  },
  subTitle: {
    fontSize: 20
  },
  centered: {
    textAlign: "center"
  },
  reactionResult: {
    alignSelf: "center",
    fontSize: 30
  },
  bold: {
    fontWeight: "bold"
  }
});
