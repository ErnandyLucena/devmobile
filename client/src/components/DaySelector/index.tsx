import { View, Text, ScrollView } from "react-native";
import { styles } from "./styles";

interface DaySelectorProps {
  days: Array<{
    day: string;
    date: string;
    isToday?: boolean;
  }>;
}

export function DaySelector({ days }: DaySelectorProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {days.map((day, index) => (
        <View 
          key={index} 
          style={[
            styles.dayItem,
            day.isToday && styles.todayItem
          ]}
        >
          <Text style={[
            styles.dayText,
            day.isToday && styles.todayText
          ]}>
            {day.day}
          </Text>
          <Text style={[
            styles.dateText,
            day.isToday && styles.todayText
          ]}>
            {day.date}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
