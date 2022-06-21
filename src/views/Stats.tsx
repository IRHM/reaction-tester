import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function Stats() {
  const gameState = useSelector((state: RootState) => state.game.value);

  console.log(gameState.previousTests);

  const currDate = new Date();
  const lastWeek = new Date(currDate.setDate(currDate.getDate() - 6));
  const week = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

  const days: string[] = [];
  for (let i = 0; i < 7; ++i) {
    let d = lastWeek.getDay() + i;
    if (d >= 7) d = d - 7;
    days.push(week[d]);
  }

  const lw = gameState.previousTests.filter((e) => {
    const eDte = new Date(e.dateTime);
    return eDte.getTime() >= lastWeek.getTime() && eDte.getTime() <= currDate.getTime();
  });

  console.log(gameState.previousTests, lw);

  return (
    <View>
      <LineChart
        data={{
          labels: days,
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100
              ]
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
}
