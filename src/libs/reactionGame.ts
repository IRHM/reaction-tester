import React from "react";
import Helpers from "./helpers";
import { GameStatus, BackgroundColor } from "../types";
import {
  updateGameStatus,
  updateBackground,
  updateReactionResult,
  addScore,
  resetScores,
  saveTest
} from "../slices/gameSlice";
import { store } from "./../store";

export default class ReactionGame {
  private greenBackgroundIsShowing = false;
  private timeStarted: Date | null = null;
  // private scores = new Array<Number>();
  private round: number = 0;
  private tries: number = 0;

  public handleGameClick(gameStatus: GameStatus) {
    switch (gameStatus) {
      case GameStatus.Instructions:
        this.start();
        break;
      case GameStatus.Reacting:
        this.getReactionTime();
        break;
      case GameStatus.ReactionResult:
        this.startNextRound();
        break;
      case GameStatus.FinalResult:
        this.start();
        break;
    }
  }

  /**
   * Start a new game.
   */
  public async start() {
    console.log("start");

    // Reset game values
    store.dispatch(resetScores());
    this.round = 0;

    await this.startNextRound();
  }

  /**
   * Continue to next round in current game.
   */
  public async startNextRound() {
    if (this.round >= 3) {
      store.dispatch(updateGameStatus(GameStatus.FinalResult));
      store.dispatch(saveTest());
      return;
    }

    // Store `this.tries` current value before running timer, so we can compare
    // it with the `this.tries` after the timer returns, if they are different,
    // the user must have tried and come back with a 'Too Soon' result, which means we
    // shouldn't show the green background from the previous round. Sorta like a nonce, but very simplified.
    const currentTriesBeforeTimer = this.tries;

    store.dispatch(updateGameStatus(GameStatus.Reacting));

    // Sleep before showing green background
    await Helpers.sleep(Helpers.randomNumFromRange(1500, 2000));

    // Don't do anything if GameStatus was changed since sleep started.
    // This avoids background changing to green if the user clicked too soon
    // and the Result screen is showing before the sleep timer above stopped.
    if (store.getState().game.value.gameStatus == GameStatus.Reacting && currentTriesBeforeTimer == this.tries) {
      store.dispatch(updateBackground(BackgroundColor.Green));
      this.greenBackgroundIsShowing = true;
      this.timeStarted = new Date();
    }
  }

  /**
   * Get reaction time from click after reaction colour is shown.
   */
  public getReactionTime() {
    let diff = -1;

    if (this.greenBackgroundIsShowing && this.timeStarted) {
      diff = new Date().getTime() - this.timeStarted.getTime();

      store.dispatch(updateReactionResult(`${diff}ms`));

      // Only add score/advance to next round if didn't click too soon
      this.round++;
      store.dispatch(addScore(diff));
    } else {
      store.dispatch(updateReactionResult(`Too Soon!`));
    }

    // Always add to tries, no matter what.
    this.tries++;

    this.greenBackgroundIsShowing = false;
    store.dispatch(updateBackground(BackgroundColor.White));
    store.dispatch(updateGameStatus(GameStatus.ReactionResult));
  }

  public getAverageReactionTime() {
    const scores = store.getState().game.value.scores;

    return `${Helpers.avg(scores)}ms`;
  }
}
