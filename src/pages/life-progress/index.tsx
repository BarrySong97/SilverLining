/* eslint-disable jsx-quotes */
import { View, Text } from "@tarojs/components";
import Taro, { useReady } from "@tarojs/taro";
import React, { FC, useRef, useState } from "react";
import { AtProgress } from "taro-ui";
import { getDayOfYear, mGetDate } from "../../../util/date";
import Panel from "../../components/panel";
import "./index.less";

function leapYear(year: number) {
  return !(year % (year % 100 ? 4 : 400));
}
export interface LifeProgressProps {}

const LifeProgress: FC<LifeProgressProps> = () => {
  const now = new Date();
  const query = Taro.createSelectorQuery();
  const dayOfYear: number = getDayOfYear(now);
  const daysOfYear: number = leapYear(now.getFullYear()) ? 366 : 365;
  const dayOfMonth: number = now.getDate();
  const daysOfMonth: number = mGetDate(now.getFullYear(), now.getMonth() + 1);
  const hourOfDay: number = now.getHours();
  const dayPercnt = ((hourOfDay / 24) * 100).toFixed(2);
  const yearPercents = ((dayOfYear / daysOfYear) * 100).toFixed(2);
  const monthPercent = ((dayOfMonth / daysOfMonth) * 100).toFixed(2);
  const [size, setSize] = useState<{ height: number; width: number }>();
  const ref = useRef(null);

  useReady(() => {
    query
      .select(".progress")
      .boundingClientRect(rect => {
        setSize({ width: rect.width, height: rect.height });
      })
      .exec();
  });

  const height = size ? `calc(100% - ${size.height + 50}px)` : "auto";

  // const lifePercent =
  return (
    <View className="lifeProgress">
      <View ref={ref} className="progress">
        {/* 一年进度条 */}
        <View className="mb-2">
          <Panel title={`${now.getFullYear()}进度条`}>
            <AtProgress
              percent={Number.parseFloat(yearPercents)}
              strokeWidth={10}
              className="mb-2"
            />
            <Text>
              今年已过 【{dayOfYear}】 天，还剩 【{daysOfYear - dayOfYear}】 天
            </Text>
          </Panel>
        </View>
        {/* 月进度条 */}
        <View className="mb-2">
          <Panel title={`${now.getMonth() + 1}月进度条`}>
            <AtProgress
              className="mb-2"
              percent={Number.parseFloat(monthPercent)}
              strokeWidth={10}
            />
            <Text>
              本月已过 【{dayOfMonth}】 天，还剩 【{daysOfMonth - dayOfMonth}】
              天
            </Text>
          </Panel>
        </View>
        <View className="mb-2">
          {/* 天进度条 */}
          <Panel title="今日进度条">
            <AtProgress
              className="mb-2"
              percent={Number.parseFloat(dayPercnt)}
              strokeWidth={10}
            />
            <Text>
              今天已过 【{hourOfDay}】 小时，还剩 【{24 - hourOfDay}】 小时
            </Text>
          </Panel>
        </View>
      </View>

      <View className="quotoes" style={{ height: height }}>
        {/* 天进度条 */}
        <Text className="text">一万年太久，只争朝夕</Text>
      </View>
    </View>
  );
};

export default LifeProgress;
