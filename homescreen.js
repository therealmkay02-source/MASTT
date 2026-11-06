import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { MenuContext } from '../context/MenuContext';

export default function HomeScreen({ navigation }) {
  const { menuItems } = useContext(MenuContext);

  // Calculate Statistics
  const totalItems = menuItems.length;
  const totalPrice = menuItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
  const avgPrice = totalItems > 0 ? (totalPrice / totalItems).toFixed(2) : '0.00';
  
  const countCourse = (courseName) => menuItems.filter(item => item.course === courseName).length;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, Christoffel</Text>
      <Text style={styles.subText}>Here is an overview of your menu.</Text>

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{totalItems}</Text>
          <Text style={styles.statLabel}>Total Items</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>R {avgPrice}</Text>
          <Text style={styles.statLabel}>Avg. Price</Text>
        </View>
      </View>

      <View style={styles.courseContainer}>
        <Text style={styles.sectionTitle}>Items per Course</Text>
        <View style={styles.courseRow}>
          <Text style={styles.courseLabel}>Starters:</Text>
          <Text style={styles.courseValue}>{countCourse('Starters')}</Text>
        </View>
        <View style={styles.courseRow}>
          <Text style={styles.courseLabel}>Mains:</Text>
          <Text style={styles.courseValue}>{countCourse('Mains')}</Text>
        </View>
        <View style={styles.courseRow}>
          <Text style={styles.courseLabel}>Desserts:</Text>
          <Text style={styles.courseValue}>{countCourse('Desserts')}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Go to Menu Manager</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5dc', padding: 20 },
  welcomeText: { fontSize: 26, fontWeight: 'bold', color: '#8b0000', marginTop: 10 },
  subText: { fontSize: 16, color: '#555', marginBottom: 20 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statBox: { flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 10, alignItems: 'center', marginHorizontal: 5, elevation: 3 },
  statNumber: { fontSize: 24, fontWeight: 'bold', color: '#8b0000' },
  statLabel: { fontSize: 14, color: '#777', marginTop: 5 },
  courseContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10, marginBottom: 30, elevation: 3 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  courseRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: '#eee' },
  courseLabel: { fontSize: 16, color: '#555' },
  courseValue: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  primaryButton: { backgroundColor: '#8b0000', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});