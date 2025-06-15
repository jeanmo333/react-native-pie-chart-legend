import React from "react";
import { View } from "react-native";
import PieChartLegend from "./PieChartLegend";
//import { PieChartLegend } from "react-native-pie-chart-legend";

const data = [
  { label: "Product A", value: 40 },
  { label: "Product B", value: 30 },
  { label: "Product C", value: 20 },
  { label: "Product D", value: 50 },
  { label: "Product E", value: 80 },
  { label: "Product F", value: 50 },
];

export default function App() {
  return (
    <View
      style={{
        backgroundColor: "#f3f3f3",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10
      }}
    >
      <PieChartLegend
        size={250}
        data={data}
        maxLabelLength={10}
        showPercentage={true}
        defaultColors={[
          "#F44336",
          "#2196F3",
          "#FFEB3B",
          "#4CAF50",
          "#FF9800",
          "#9C27B0",
          "#00BCD4",
        ]} // default
        containerStyle={{
          backgroundColor: "#fff",
          padding: 10,
          borderRadius: 10,
        }}
        legendStyle={{ marginTop: 30 }}
        //legendTextStyle={{ fontSize: 14, color: "#000" }}
        // legendItemStyle={{ marginVertical: 8 }}
        // colorBoxLegendStyle={{ width: 20, height: 20, borderRadius: 4 }}
      />
    </View>
  );
}
