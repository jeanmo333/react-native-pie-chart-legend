import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import { Svg, G, Path } from "react-native-svg";

export interface IPieChartData {
  label: string;
  value: number;
  color?: string;
}

interface Props {
  size?: number;
  data: IPieChartData[];
  defaultColors?: string[];
  containerStyle?: StyleProp<ViewStyle>;
  legendStyle?: StyleProp<ViewStyle>;
  legendTextStyle?: StyleProp<TextStyle>;
  legendItemStyle?: StyleProp<ViewStyle>;
  colorBoxLegendStyle?: StyleProp<ViewStyle>;
  showPercentage?: boolean;
  maxLabelLength?: number;
}

const truncateLabel = (label: string, maxLength?: number): string => {
  if (!maxLength || label.length <= maxLength) return label;
  return label.substring(0, maxLength) + "...";
};

const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
};

const createArc = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number
) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`,
    `L ${x} ${y}`,
    "Z",
  ].join(" ");
};

const PieChartLegend: React.FC<Props> = ({
  size = 200,
  data,
  defaultColors = [
    "#F44336",
    "#2196F3",
    "#FFEB3B",
    "#4CAF50",
    "#FF9800",
    "#9C27B0",
    "#00BCD4",
  ],
  containerStyle,
  legendStyle,
  legendTextStyle,
  legendItemStyle,
  colorBoxLegendStyle,
  showPercentage = true,
  maxLabelLength,
}) => {
  const radius = size / 2;
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let startAngle = 0;

  const half = Math.ceil(data.length / 2);
  const leftItems = data.slice(0, half);
  const rightItems = data.slice(half);

  return (
    <View style={[{ alignItems: "center", marginVertical: 20 }, containerStyle]}>
      <Svg width={size} height={size}>
        <G>
          {data.map((item, index) => {
            const angle = (item.value / total) * 360;
            const endAngle = startAngle + angle;
            const path = createArc(
              radius,
              radius,
              radius,
              startAngle,
              endAngle
            );
            const color =
              item.color ?? defaultColors[index % defaultColors.length];
            startAngle += angle;
            return <Path key={index} d={path} fill={color} />;
          })}
        </G>
      </Svg>

      <View style={[styles.legendContainer, legendStyle]}>
        <View style={styles.column}>
          {leftItems.map((item, index) => {
            const color =
              item.color ?? defaultColors[index % defaultColors.length];
            const percentage = (item.value / total) * 100;
            return (
              <View key={index} style={[styles.legendItem, legendItemStyle]}>
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: color },
                    colorBoxLegendStyle,
                  ]}
                />
                <Text style={[styles.legendText, legendTextStyle]}>
                  {truncateLabel(item.label, maxLabelLength)}{" "}
                  {showPercentage ? `(${percentage.toFixed(1)}%)` : null}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.column}>
          {rightItems.map((item, index) => {
            const realIndex = index + half;
            const color =
              item.color ?? defaultColors[realIndex % defaultColors.length];
            const percentage = (item.value / total) * 100;
            return (
              <View key={realIndex} style={[styles.legendItem, legendItemStyle]}>
                <View
                  style={[
                    styles.colorBox,
                    { backgroundColor: color },
                    colorBoxLegendStyle,
                  ]}
                />
                <Text style={[styles.legendText, legendTextStyle]}>
                  {truncateLabel(item.label, maxLabelLength)}{" "}
                  {showPercentage ? `(${percentage.toFixed(1)}%)` : null}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  column: {
    flex: 1,
    paddingHorizontal: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  colorBox: {
    width: 14,
    height: 14,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: "#111",
    flexShrink: 1,
  },
});

export default PieChartLegend;