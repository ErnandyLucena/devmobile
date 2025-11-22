import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  tabBar: {
    height: 80,
    paddingBottom: 8,
    paddingTop: 8,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "500",
    marginTop: 2,
  },

  tabBarIconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  tabBarIcon: {
    marginBottom: 2,
  },

  activeIcon: {
    transform: [{ scale: 1.1 }],
  },
});