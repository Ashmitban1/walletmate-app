import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from "react-native";

export default function Signup({ navigation }) {
    const [name, setName] = useState(""); // Added state for name
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailFocused, setIsEmailFocused] = useState(false); // Track focus state for email input
    const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track focus state for password input
    const [isNameFocused, setIsNameFocused] = useState(false); // Track focus state for Name input

    const handleSignup = () => {
        if (!name || !email || !password) { // Check if name is also entered
            Alert.alert("Error", "Please enter name, email, and password");
            return;
        }
        Alert.alert("Success", `Signed up with name: ${name}, email: ${email}`);
        // Reset fields
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/wallet.png")} // Ensure you have a wallet.png in the assets folder
                style={{ width: 100, height: 100, marginBottom: 20 }}
            />
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                style={[
                    styles.input,
                    isNameFocused && styles.inputFocused, // Apply focused style conditionally
                ]}
                placeholder="Name" // Added Name input
                value={name}
                onChangeText={setName}
                onFocus={() => setIsNameFocused(true)} // Set focus state
                onBlur={() => setIsNameFocused(false)} // Remove focus state
            />
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
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Sign Up</Text> {/* Changed button text */}
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.registerText}>
                    Already have an account?{" "}
                    <Text
                        style={styles.registerLink}
                        onPress={() => navigation.navigate("Login")} // Navigate to Signup screen
                    >
                        Login
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
        height: "6%",
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