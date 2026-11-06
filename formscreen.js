import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MenuContext } from '../context/MenuContext';

export default function FormScreen({ route, navigation }) {
  const { addItem, updateItem } = useContext(MenuContext);
  
  // Check if we are editing (passed via navigation params)
  const itemToEdit = route.params?.itemToEdit;

  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters');
  const [price, setPrice] = useState('');

  // Populate form if editing
  useEffect(() => {
    if (itemToEdit) {
      setDishName(itemToEdit.name);
      setDescription(itemToEdit.description);
      setCourse(itemToEdit.course);
      setPrice(itemToEdit.price.toString());
    }
  }, [itemToEdit]);

  const handleSave = () => {
    // Validation
    if (!dishName.trim() || !description.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in all required fields.');
      return;
    }
    if (isNaN(price) || parseFloat(price) <= 0) {
      Alert.alert('Error', 'Price must be a valid number greater than 0.');
      return;
    }

    const itemData = {
      name: dishName,
      description,
      course,
      price: parseFloat(price).toFixed(2),
    };

    if (itemToEdit) {
      updateItem(itemToEdit.id, itemData);
      Alert.alert('Success', 'Menu item updated!');
    } else {
      addItem(itemData);
      Alert.alert('Success', 'Menu item added!');
    }

    navigation.goBack(); // Return to the list
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <Text style={styles.header}>{itemToEdit ? 'Edit Menu Item' : 'Add New Menu Item'}</Text>

        <Text style={styles.label}>Dish Name *</Text>
        <TextInput style={styles.input} value={dishName} onChangeText={setDishName} placeholder="e.g. Grilled Kingklip" />

        <Text style={styles.label}>Description *</Text>
        <TextInput style={[styles.input, { height: 100 }]} value={description} onChangeText={setDescription} placeholder="Describe the dish..." multiline textAlignVertical="top" />

        <Text style={styles.label}>Course *</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={course} onValueChange={setCourse}>
            <Picker.Item label="Starters" value="Starters" />
            <Picker.Item label="Mains" value="Mains" />
            <Picker.Item label="Desserts" value="Desserts" />
          </Picker>
        </View>

        <Text style={styles.label}>Price (R) *</Text>
        <TextInput style={styles.input} value={price} onChangeText={setPrice} placeholder="e.g. 150.00" keyboardType="numeric" />

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>{itemToEdit ? 'Update Item' : 'Save Item'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5dc', padding: 20 },
  header: { fontSize: 22, fontWeight: 'bold', color: '#8b0000', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#555', marginBottom: 5 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16, marginBottom: 15 },
  pickerContainer: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd', borderRadius: 8, marginBottom: 15, overflow: 'hidden' },
  saveBtn: { backgroundColor: '#8b0000', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10, marginBottom: 40 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});
