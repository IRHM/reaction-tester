import React from "react";
import Helpers from "./helpers";
import { GameStatus, BackgroundColor } from "../types";
import { updateGameStatus, updateBackground, updateReactionResult, addScore, resetScores } from "../slices/gameSlice";
import { store } from "./../store";

export default class ReactionGame {
  private greenBackgroundIsShowing = false;
  private timeStarted: Date | null = null;
  // private scores = new Array<Number>();
  private round: number = 0;

  public async start() {
    console.log("start");

    // Reset game values
    store.dispatch(resetScores());
    this.round = 0;

    await this.startNextRound();
  }

  public async startNextRound() {
    if (this.round >= 3) {
      store.dispatch(updateGameStatus(GameStatus.FinalResult));
      return;
    }

    store.dispatch(updateGameStatus(GameStatus.Reacting));

    // Sleep before showing green background
    await Helpers.sleep(Helpers.randomNumFromRange(1500, 2000));

    // Don't do anything if GameStatus was changed since sleep started.
    // This avoids background changing to green if the user clicked too soon
    // and the Result screen is showing before the sleep timer above stopped.
    if (store.getState().game.value.gameStatus == GameStatus.Reacting) {
      store.dispatch(updateBackground(BackgroundColor.Green));
      this.greenBackgroundIsShowing = true;
      this.timeStarted = new Date();
    }
  }

  public getReactionTime() {
    let diff = -1;

    if (this.greenBackgroundIsShowing && this.timeStarted) {
      diff = new Date().getTime() - this.timeStarted.getTime();

      store.dispatch(updateReactionResult(`${diff}ms`));
    } else {
      store.dispatch(updateReactionResult(`Too Soon!`));
    }

    this.greenBackgroundIsShowing = false;
    this.round++;
    store.dispatch(addScore(diff));
    store.dispatch(updateBackground(BackgroundColor.White));
    store.dispatch(updateGameStatus(GameStatus.ReactionResult));
  }

  public getAverageReactionTime() {
    const scores = store.getState().game.value.scores;

    console.log(scores);

    return Math.round(scores.reduce((a, b) => a + b) / scores.length);
  }
}
