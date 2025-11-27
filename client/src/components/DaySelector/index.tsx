import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface DaySelectorProps {
  days: Array<{ day: string; date: string; isToday?: boolean }>;
  onSelectDay?: (day: { day: string; date: string }) => void;
  selectedDate?: string;
}

export function DaySelector({ days, onSelectDay, selectedDate }: DaySelectorProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {days.map((day, index) => {
        const isSelected = selectedDate === day.date;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.dayItem, (day.isToday || isSelected) && styles.todayItem]}
            onPress={() => onSelectDay && onSelectDay(day)}
          >
            <Text style={[styles.dayText, (day.isToday || isSelected) && styles.todayText]}>
              {day.day}
            </Text>
            <Text style={[styles.dateText, (day.isToday || isSelected) && styles.todayText]}>
              {day.date}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
