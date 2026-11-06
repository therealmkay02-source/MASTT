import React, { useState, useContext, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { MenuContext } from '../context/MenuContext';

export default function MenuScreen({ navigation }) {
  const { menuItems, deleteItem } = useContext(MenuContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Combined Search and Filter Logic
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCourse = selectedCourse === 'All' || item.course === selectedCourse;
      return matchesSearch && matchesCourse;
    });
  }, [menuItems, searchQuery, selectedCourse]);

  const confirmDelete = (id) => {
    Alert.alert('Delete Item', 'Are you sure you want to remove this item?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => deleteItem(id) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.name}</Text>
        <Text style={styles.cardPrice}>R {parseFloat(item.price).toFixed(2)}</Text>
      </View>
      <Text style={styles.cardCourse}>{item.course}</Text>
      <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
      
      <View style={styles.actions}>
        <TouchableOpacity style={styles.editBtn} onPress={() => navigation.navigate('Form', { itemToEdit: item })}>
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteBtn} onPress={() => confirmDelete(item.id)}>
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Form')}>
        <Text style={styles.addBtnText}>+ Add New Menu Item</Text>
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search dish by name..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterRow}>
        {['All', 'Starters', 'Mains', 'Desserts'].map((course) => (
          <TouchableOpacity
            key={course}
            style={[styles.filterBtn, selectedCourse === course && styles.filterBtnActive]}
            onPress={() => setSelectedCourse(course)}
          >
            <Text style={[styles.filterText, selectedCourse === course && styles.filterTextActive]}>{course}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No menu items found. Add some or clear your search!</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5dc', padding: 15 },
  addBtn: { backgroundColor: '#8b0000', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 15 },
  addBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  searchInput: { backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 },
  filterRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  filterBtn: { paddingVertical: 8, paddingHorizontal: 12, backgroundColor: '#e0e0e0', borderRadius: 20 },
  filterBtnActive: { backgroundColor: '#8b0000' },
  filterText: { color: '#333', fontSize: 14 },
  filterTextActive: { color: '#fff', fontWeight: 'bold' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 2 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', flex: 1 },
  cardPrice: { fontSize: 16, fontWeight: 'bold', color: '#8b0000' },
  cardCourse: { fontSize: 12, color: '#8b0000', backgroundColor: '#f0e6d2', alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 5, marginBottom: 8, overflow: 'hidden' },
  cardDesc: { fontSize: 14, color: '#666', marginBottom: 10 },
  actions: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 10 },
  editBtn: { backgroundColor: '#4682b4', padding: 8, borderRadius: 5, marginRight: 10 },
  deleteBtn: { backgroundColor: '#dc143c', padding: 8, borderRadius: 5 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  emptyText: { textAlign: 'center', color: '#777', fontStyle: 'italic', marginTop: 20 }
});