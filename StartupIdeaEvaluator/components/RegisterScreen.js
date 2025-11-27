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
import React, { useState } from "react";
import { MaterialIcons,Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const navigation = useNavigation();

  // ---------------------------
  // ✅ CONNECT FRONTEND → BACKEND
  // ---------------------------
  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Validation Error", "Please fill all fields.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.EXPO_PUBLIC_API_URL}/api/auth/register`,
        { name, email, password }
      );

      console.log("REGISTER RESPONSE:", response.data);

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token) {
        Alert.alert("Error", "No token received from server.");
        return;
      }

      // 👉 Save token & user in AsyncStorage
      await AsyncStorage.setItem("authToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      Alert.alert("Success", "Registered successfully!");

      navigation.replace("Home");
    } catch (error) {
      console.log("REGISTER ERROR:", error);

      const errorMessage =
        error?.response?.data?.message ||
        "Registration failed. Please try again.";

      Alert.alert("Error", errorMessage);
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

      <KeyboardAvoidingView>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Register to Your Account</Text>
          </View>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <Ionicons name="person" size={24} color="gray" />
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholder="Enter Your Name"
              />
            </View>
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputBox}>
              <MaterialIcons name="email" size={24} color="gray" />
              <TextInput
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
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
                style={styles.input}
                placeholder="Enter Your Password"
              />
            </View>
          </View>

          <View style={styles.optionsContainer}>
            <Text style={styles.keepLoggedInText}>Keep me logged in</Text>
            <Text style={styles.forgotPasswordText}>Forget Password</Text>
          </View>

          {/* Register button */}
          <Pressable onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </Pressable>

          {/* Go back to Login */}
          <Pressable onPress={() => navigation.goBack()} style={styles.signInLink}>
            <Text style={styles.signInText}>
              Already have an account? Sign In
            </Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
  registerButton: {
    marginTop: 50,
    width: 200,
    backgroundColor: "#F19ED2",
    padding: 15,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto"
  },
  registerButtonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  signInLink: {
    marginTop: 15
  },
  signInText: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 18,
    color: "gray"
  }
});
