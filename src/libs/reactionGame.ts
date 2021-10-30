import React from "react";
import Helpers from "./helpers";
import { GameStatus, BackgroundColor } from "../types";
// import { RootState } from "./../store";
// import { useSelector, useDispatch } from "react-redux";
import { updateGameStatus, updateBackground, updateReactionResult } from "../slices/gameSlice";
import { store } from "./../store";

export default class ReactionGame {
  constructor(private store: any) {}

  private greenBackgroundIsShowing = false;
  private timeStarted: Date | null = null;

  public async start() {
    console.log("start");

    // this.setGameStatus(GameStatus.Reacting);
    store.dispatch(updateGameStatus(GameStatus.Reacting));

    await Helpers.sleep(Helpers.randomNumFromRange(1500, 2000));
    this.showGreenBackground();
  }

  public getReactionTime() {
    if (this.greenBackgroundIsShowing && this.timeStarted) {
      let diff = new Date().getTime() - this.timeStarted.getTime();

      // this.setReactionResult(`${diff}ms`);
      store.dispatch(updateReactionResult(`${diff}ms`));
    } else {
      // this.setReactionResult("Too Soon!");
      store.dispatch(updateReactionResult(`Too Soon!`));
    }
  }

  private showGreenBackground() {
    this.greenBackgroundIsShowing = true;
    // this.setBackgroundColor("#49FF00");
    // const dispatch = useDispatch();
    store.dispatch(updateBackground(BackgroundColor.Green));
    this.timeStarted = new Date();
  }
}
