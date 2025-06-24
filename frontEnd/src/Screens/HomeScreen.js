import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const HomeScreen = () => {
  const [aiSummary, setAiSummary] = useState([
    'Loading summary from AI...'
  ]);

  useEffect(() => {
    fetch('http://YOUR IP ADDRESS:5000/generate-ai-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: 'Summarize receipts: Starbucks $12.90, Chick-fil-A $18.35, Target $25.00',
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.summary) {
          setAiSummary(data.summary.split('\n')); // Format into lines if needed
        } else {
          setAiSummary(['No summary received from AI']);
        }
      })
      .catch((error) => {
        console.error('Error fetching AI summary:', error);
        setAiSummary(['Failed to fetch AI summary']);
      });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>Welcome Ashmit</Text>

      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.header}>Recent Cards used</Text>
          <Image source={require('../../assets/card1.png')} style={styles.cardImage} />
          <Image source={require('../../assets/card2.png')} style={styles.cardImage} />
        </View>

        <View style={styles.column}>
          <Text style={styles.header}>Recent Receipts</Text>
          <Image source={require('../../assets/receipt1.png')} style={styles.receiptImage} />
        </View>
      </View>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Smart AI Summary</Text>
        {aiSummary.map((item, index) => (
          <Text key={index} style={styles.summaryText}>{item}</Text>
        ))}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    alignSelf: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  header: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
  },
  cardImage: {
    width: 150,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  receiptImage: {
    width: 140,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  summaryContainer: {
    marginTop: 30,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});
