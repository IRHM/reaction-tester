import React from "react";
import Helpers from "./helpers";

export default class ReactionGame {
  constructor(
    private setBackgroundColor: React.Dispatch<React.SetStateAction<string>>,
    private setReactionResult: React.Dispatch<React.SetStateAction<string | null>>,
    private setGameStatus: React.Dispatch<React.SetStateAction<"instructions" | "playing">>
  ) {}

  private greenBackgroundIsShowing = false;
  private timeStarted: Date | null = null;

  public async start() {
    console.log("start");

    this.setGameStatus("playing");

    await Helpers.sleep(Helpers.randomNumFromRange(1500, 2000));
    this.showGreenBackground();
  }

  public getReactionTime() {
    if (this.greenBackgroundIsShowing && this.timeStarted) {
      let diff = new Date().getTime() - this.timeStarted.getTime();

      this.setReactionResult(`${diff}ms`);
    } else {
      this.setReactionResult("Too Soon!");
    }
  }

  private showGreenBackground() {
    this.greenBackgroundIsShowing = true;
    this.setBackgroundColor("#49FF00");
    this.timeStarted = new Date();
  }
}
