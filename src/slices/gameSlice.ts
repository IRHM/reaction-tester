import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Helpers from "../libs/helpers";
import { Game, BackgroundColor, GameStatus, ReactionTest } from "./../types";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    value: {
      gameStatus: GameStatus.Instructions,
      backgroundColor: BackgroundColor.White,
      previousTests: new Array<ReactionTest>()
    } as Game
  },
  reducers: {
    startNew: (state) => {
      //   state.value = {} as Game;
    },
    updateGameStatus(state, action: PayloadAction<GameStatus>) {
      state.value.gameStatus = action.payload;
    },
    updateBackground(state, action: PayloadAction<BackgroundColor>) {
      state.value.backgroundColor = action.payload;
    },
    updateReactionResult(state, action: PayloadAction<string>) {
      state.value.reactionResult = action.payload;
    },
    addScore(state, action: PayloadAction<number>) {
      state.value.scores.push(action.payload);
    },
    resetScores(state) {
      state.value.scores = [];
    },
    /**
     * Save reaction test results.
     */
    saveTest(state) {
      // todo: add check for if game is actually done,
      // could check if the num of scores = the num of rounds in a test.
      // Num of rounds will be a var in state so can use it from there.
      state.value.previousTests.push({
        avgTime: Helpers.avg(state.value.scores),
        dateTime: Date.now()
      } as ReactionTest);
    }
  }
});

export const { startNew, updateGameStatus, updateBackground, updateReactionResult, addScore, resetScores, saveTest } =
  gameSlice.actions;

export default gameSlice.reducer;
