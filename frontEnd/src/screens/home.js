import { Text, View, StyleSheet, TouchableOpacity, Button} from "react-native";

const Home = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>Home</Text>
            <Button
                title="Camera"
                onPress={() => navigation.navigate("Camera")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Home;