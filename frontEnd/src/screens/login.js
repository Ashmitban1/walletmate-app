import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";
import {login} from "../services/auth"

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false); // Track focus state for email input
    const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track focus state for password input

    const handleLogin = async() => {
        if (!email || !password) {
            Alert.alert("Error", "Please enter both email and password");
            return;
        }
        setEmail(email);
        setPassword(password);
        
        const user = await login(email,password)
        if(!user){
            Alert.alert("Incorrect email or password")
            return;
        }
        setEmail("");
        setPassword("")
        navigation.navigate("Home")
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/wallet.png")} // Ensure you have a wallet.png in the assets folder
                style={{ width: 100, height: 100, marginBottom: 20 }}
            />
            <Text style={styles.title}>Welcome to WalletMate</Text>
            <TextInput
                style={[
                    styles.input,
                    isEmailFocused && styles.inputFocused, // Apply focused style conditionally
                ]}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                onFocus={() => setIsEmailFocused(true)} // Set focus state
                onBlur={() => setIsEmailFocused(false)} // Remove focus state
            />
            <TextInput
                style={[
                    styles.input,
                    isPasswordFocused && styles.inputFocused, // Apply focused style conditionally
                ]}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                onFocus={() => setIsPasswordFocused(true)} // Set focus state
                onBlur={() => setIsPasswordFocused(false)} // Remove focus state
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.registerText}>
                    Don't have an account?{" "}
                    <Text
                        style={styles.registerLink}
                        onPress={() => navigation.navigate("Signup")} // Navigate to Signup screen
                    >
                        Sign Up
                    </Text>
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
        width: "100%",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "90%",
        padding: 10,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 13,
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
    },
    inputFocused: {
        backgroundColor: "#ffffff", // Highlight background color when focused
        borderColor: "#3498db", // Highlight border color when focused
        borderWidth: 2,
        
    },
    button: {
        width: "90%",
        padding: 15,
        backgroundColor: "#3498db",
        borderRadius: 15,
        alignItems: "center",
        marginBottom: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    registerText: {
        marginTop: 10,
        fontSize: 14,
        color: "#555",
        textAlign: "center",
    },
    registerLink: {
        color: "#3498db",
        fontWeight: "bold",
    },
});