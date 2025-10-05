import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a365d",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#4a5568",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3182ce",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
    marginVertical: 10,
  },
});
