import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import IdeasScreen from "./IdeasScreen";
import SubmitScreen from "./SubmitScreen";
import DetailsScreen from "./DetailsScreen";
import LeaderboardScreen from "./LeaderboardScreen";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* Auth Screens */}
         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />

           {/* App Screens */} 
           <Stack.Screen name="Home" component={IdeasScreen} options={{ headerShown: false }} /> 
           <Stack.Screen name="Leaderboard" component={LeaderboardScreen} options={{ title: 'Leaderboard'}} /> 
           <Stack.Screen name="Submit" component={SubmitScreen} options={{ title: 'Submit Idea' }} /> 
           <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Idea Details' }} /> 
           </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
