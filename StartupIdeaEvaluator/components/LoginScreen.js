import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
  Alert,
  ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  // ---------------------------
  // CHECK IF USER ALREADY LOGGED IN
  // ---------------------------
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          navigation.replace("Home"); // or "Main"
        }
      } catch (error) {
        console.log("Error checking token:", error);
      }
    };
    checkLoginStatus();
  }, []);

  // ---------------------------
  // LOGIN FUNCTION
  // ---------------------------
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Validation Error", "Please enter email and password.");
      return;
    }

    const userData = { email, password };

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/login`,
        userData
      );

      console.log("LOGIN RESPONSE:", response.data);

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token) {
        Alert.alert("Error", "No token received from the server.");
        return;
      }

      // SAVE TOKEN & USER IN ASYNC STORAGE
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      Alert.alert("Success", "Logged in successfully!");

      navigation.replace("Home"); // or Main page
    } catch (error) {
      console.log("LOGIN ERROR DETAILS:", error);

      const message =
        error?.response?.data?.message ||
        "Login failed. Please check your credentials.";

      Alert.alert("Login Error", message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.logo}
          source={require("./../assets/Main_logo.png")}
        />
      </View>

      <KeyboardAvoidingView behavior="padding">
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Login To Your Account</Text>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <MaterialIcons name="email" size={24} color="gray" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
                placeholder="Enter Your Email"
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <AntDesign name="lock" size={24} color="black" />
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                style={styles.input}
                placeholder="Enter Your Password"
              />
            </View>
          </View>

          {/* Options Row */}
          <View style={styles.optionsContainer}>
            <Text style={styles.keepLoggedInText}>Keep me logged in</Text>
            <Text style={styles.forgotPasswordText}>Forget Password</Text>
          </View>

          {/* Login Button */}
          <Pressable onPress={handleLogin} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>

          {/* Navigate to Register */}
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.signUpText}>
              Don't have an account? Sign Up
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ---------------------------
// STYLES
// ---------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  logo: {
    width: 250,
    height: 50,
    marginTop: 80,
    borderRadius: 15
  },
  headerContainer: {
    alignItems: "center"
  },
  headerText: {
    fontSize: 20,
    marginTop: 60,
    color: "#E90074"
  },
  inputContainer: {
    marginTop: 10
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#EDEDED",
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    marginTop: 30
  },
  input: {
    color: "gray",
    marginVertical: 10,
    width: 300,
    fontSize: 16
  },
  optionsContainer: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  keepLoggedInText: {
    color: "gray",
    fontSize: 18
  },
  forgotPasswordText: {
    color: "blue",
    fontSize: 18
  },
  loginButton: {
    marginTop: 50,
    width: 200,
    backgroundColor: "#F19ED2",
    padding: 15,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto"
  },
  loginButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  signUpText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    color: "gray"
  }
});
