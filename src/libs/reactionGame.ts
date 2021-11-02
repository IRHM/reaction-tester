import React from "react";
import Helpers from "./helpers";
import { GameStatus, BackgroundColor } from "../types";
import { updateGameStatus, updateBackground, updateReactionResult } from "../slices/gameSlice";
import { store } from "./../store";

export default class ReactionGame {
  private greenBackgroundIsShowing = false;
  private timeStarted: Date | null = null;

  public async start() {
    console.log("start");

    await this.startNextRound();
  }

  public async startNextRound() {
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
    if (this.greenBackgroundIsShowing && this.timeStarted) {
      let diff = new Date().getTime() - this.timeStarted.getTime();

      store.dispatch(updateReactionResult(`${diff}ms`));
    } else {
      store.dispatch(updateReactionResult(`Too Soon!`));
    }

    this.greenBackgroundIsShowing = false;
    store.dispatch(updateBackground(BackgroundColor.White));
    store.dispatch(updateGameStatus(GameStatus.ReactionResult));
  }
}
