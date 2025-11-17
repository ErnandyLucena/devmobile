import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    maxHeight: 80,
  },
  content: {
    paddingHorizontal: 15,
    gap: 10,
  },
  dayItem: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    minWidth: 60,
  },
  todayItem: {
    backgroundColor: "#2D3ED6",
  },
  dayText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    marginTop: 2,
  },
  todayText: {
    color: "#fff",
  },
});