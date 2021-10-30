import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Game, BackgroundColor, GameStatus } from "./../types";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    value: { gameStatus: GameStatus.Instructions } as Game
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
    }
  }
});

export const { startNew, updateGameStatus, updateBackground, updateReactionResult } = gameSlice.actions;

export default gameSlice.reducer;
