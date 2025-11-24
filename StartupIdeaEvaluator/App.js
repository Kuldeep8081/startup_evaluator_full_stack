
import AppNavigator from "./components/AppNavigator";
import ThemeProvider from "./components/ThemeContext";

export default function App() {

  
  return (
    
      <ThemeProvider>
        <AppNavigator/>
      </ThemeProvider>
  );
}


