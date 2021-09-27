/* eslint-disable jsx-quotes */
import Taro, { useReady } from "@tarojs/taro";
import React, { FC, useEffect, useState } from "react";
import { View, Text, Image } from "@tarojs/components";
import { AtCountdown, AtDivider, AtButton } from "taro-ui";
// import moment from "moment";
// import "taro-ui/dist/style/components/button.scss"; // 按需引入
import "./index.less";

export interface Holiday {
  year: number;
  month: number;
  date: number;
  yearweek: number;
  yearday: number;
  lunar_year: number;
  lunar_month: number;
  lunar_date: number;
  lunar_yearday: number;
  week: number;
  weekend: number;
  workday: number;
  holiday: number;
  holiday_or: number;
  holiday_overtime: number;
  holiday_today: number;
  holiday_legal: number;
  holiday_recess: number;
  year_cn: string;
  month_cn: string;
  date_cn: string;
  yearweek_cn: string;
  yearday_cn: string;
  lunar_year_cn: string;
  lunar_month_cn: string;
  lunar_date_cn: string;
  lunar_yearday_cn: string;
  week_cn: string;
  weekend_cn: string;
  workday_cn: string;
  holiday_cn: string;
  holiday_or_cn: string;
  holiday_overtime_cn: string;
  holiday_today_cn: string;
  holiday_legal_cn: string;
  holiday_recess_cn: string;
}

export interface LastDate {
  day: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const holidatImags = {
  "88":
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp5.img.cctvpic.com%2FphotoAlbum%2Fpage%2Fperformance%2Fimg%2F2013%2F10%2F1%2F1380611667865_62.jpg&refer=http%3A%2F%2Fp5.img.cctvpic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635314630&t=5b4ba8fe6247950042c0b99482c5096e"
};
const now = new Date();
const year = now.getFullYear();
const getDayOfYear = (date: Date) =>
  Math.floor(
    (date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) /
      1000 /
      60 /
      60 /
      24
  );
const url = `https://api.apihubs.cn/holiday/get?holiday_recess=1&cn=1&year=${year}&holiday_today=1`;
const Index: FC = () => {
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [recentHoliday, setRecentHoliday] = useState<Holiday>();
  const [last, setLast] = useState<LastDate>();
  useReady(() => {
    Taro.request({
      url: url, //仅为示例，并非真实的接口地址

      success: function(res) {
        const { data, msg } = res.data;

        if (msg === "ok") {
          setHolidays(data.list);
        }
      }
    });
  });

  function dateDiffInDays(a, b) {
    // Discard the time and time-zone information.
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  const getRecentHolidayDate = () => {
    const dayOfYear = getDayOfYear(new Date());
    if (holidays.length) {
      let recent = holidays[0];
      let min = Infinity;
      holidays.forEach(v => {
        if (v.yearday - dayOfYear > 0 && v.yearday - dayOfYear < min) {
          min = v.yearday - dayOfYear;
          recent = v;
        }
      });
      setRecentHoliday(recent);
      now.getMinutes();
      let subtract = {
        day: Math.floor((min * 24 - now.getHours()) / 24),
        hours: ((min * 24 - now.getHours()) % 24) - 1,
        minutes: 60 - now.getMinutes(),
        seconds: 60 - now.getSeconds()
      };
      setLast(subtract);
    } else {
    }
  };
  useEffect(() => {
    if (holidays.length) {
      getRecentHolidayDate();
    }
  }, [holidays]);

  return (
    <View className="index col">
      <Image
        style={{ width: 320, height: 240 }}
        src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp5.img.cctvpic.com%2FphotoAlbum%2Fpage%2Fperformance%2Fimg%2F2013%2F10%2F1%2F1380611667865_62.jpg&refer=http%3A%2F%2Fp5.img.cctvpic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635314630&t=5b4ba8fe6247950042c0b99482c5096e"
      />
      <View className="at-row at-row__justify--center mt-2 mb-2">
        <Text>
          距离
          {recentHoliday && (
            <Text className="bold">『{recentHoliday.holiday_cn}』🎉</Text>
          )}
          放假还有
        </Text>
      </View>
      <View className="at-row at-row__justify--center">
        {last && (
          <AtCountdown
            className="my-countdown"
            isShowDay
            day={last.day}
            hours={last.hours}
            minutes={last.minutes}
            seconds={last.seconds}
          />
        )}
      </View>
    </View>
  );
};

export default Index;
