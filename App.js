import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import HomeScreen from "./screens/HomeScreen";
import store from "./store";

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}
