/* eslint-disable jsx-quotes */
import { View, Text } from "@tarojs/components";
import React, { FC } from "react";
import "./index.less";

export interface PanelProps {
  title: string;
}
const Panel: FC<PanelProps> = ({ children, title }) => {
  return (
    <View className="panel">
      <View className="mb-2">
        <Text className="panel-line">{title}</Text>
      </View>

      <View>{children}</View>
    </View>
  );
};

export default Panel;
