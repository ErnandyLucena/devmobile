// styles.ts
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 4,
    flexDirection: "row",
    alignItems: "flex-start",
    borderLeftWidth: 4,
    borderLeftColor: "#2D3ED6",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  timeContainer: {
    backgroundColor: "#ECF1FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 12,
    minWidth: 50,
    alignItems: "center",
  },
  hourText: {
    color: "#2D3ED6",
    fontWeight: "600",
    fontSize: 16,
  },
  appointmentInfo: {
    flex: 1,
  },
  title: { 
    color: "#2D3748", 
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 2,
  },
  patient: { 
    color: "#718096", 
    fontSize: 12,
    fontWeight: "400",
  },
    arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  arrow: {
    color: "#2260FF",
    fontSize: 16,
    fontWeight: "bold",
  },
});