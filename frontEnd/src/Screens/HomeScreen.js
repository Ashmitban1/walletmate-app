import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';


const { width } = Dimensions.get('window');


const HomeScreen = () => {
  const [aiSummary, setAiSummary] = useState(['Loading summary from AI...']);


  const baseUrl = Platform.OS === 'android'
    ? 'http://10.0.2.2:5000'
    : 'http://YOURIPADDRESS:5000';


  useEffect(() => {
    fetch(`${baseUrl}/generate-ai-summary`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: 'Summarize receipts: Starbucks $12.90, Chick-fil-A $18.35, Target $25.00',
      }),
    })
      .then(res => res.json())
      .then(data => {
        setAiSummary(data.summary ? data.summary.split('\n') : ['No summary received from AI']);
      })
      .catch(err => {
        console.error('AI summary error:', err);
        setAiSummary(['Failed to fetch AI summary']);
      });
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.welcome}>Welcome, Ashmit</Text>


          <View style={styles.section}>
            <Text style={styles.header}>Recent Cards</Text>
            <View style={styles.cardBox}>
              <Image source={require('../../assets/card1.png')} style={styles.cardImage} />
            </View>
            <View style={styles.cardBox}>
              <Image source={require('../../assets/card2.png')} style={styles.cardImage} />
            </View>
          </View>


          <View style={styles.section}>
            <Text style={styles.header}>Receipts</Text>
            <View style={styles.cardBox}>
              <Image source={require('../../assets/receipt1.png')} style={styles.receiptImage} />
            </View>
          </View>


          <View style={styles.summaryContainer}>
            <Text style={styles.summaryTitle}>Smart AI Summary</Text>
            {aiSummary.map((line, index) => (
              <Text key={index} style={styles.summaryText}>{line}</Text>
            ))}
          </View>
        </ScrollView>


        <View style={styles.tabBar}>
          <TouchableOpacity>
            <Ionicons name="home" size={26} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="receipt" size={26} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="credit-card" size={26} color="#999" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="person-outline" size={26} color="#999" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


export default HomeScreen;


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fdfdfd',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  welcome: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  header: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#222',
  },
  cardBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 15,
    padding: 10,
  },
  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  receiptImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    borderRadius: 12,
  },
  summaryContainer: {
    marginTop: 20,
    backgroundColor: '#eef1f5',
    padding: 16,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444',
  },
  summaryText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 6,
  },
  tabBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopColor: '#ddd',
    borderTopWidth: 1,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: -2 },
    shadowRadius: 6,
    elevation: 10,
  },
});



