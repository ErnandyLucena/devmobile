import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },

  agendaSection: {
    marginTop: 25,
    paddingHorizontal: 20,
  },

  agendaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  agendaTitle: { 
    fontSize: 16, 
    fontWeight: "600",
    color: "#4E4E4E",
  },

  agendaLink: { 
    color: "#2D3ED6", 
    fontWeight: "600",
    fontSize: 14,
  },

  infoPanelsSection: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 20,
    gap: 10,
  },
});