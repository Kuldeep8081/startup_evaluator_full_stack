import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,

} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../styles'

const IDEAS_KEY='startup_ideas_list';
import Topview from './Topview';

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export default function SubmitScreen({ navigation, route }) {
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (route.params?.refresh) {
    }
  }, [route.params]);

  const saveIdea = async () => {
    if (!name.trim() || !tagline.trim()) {
      Alert.alert('Validation', 'Please enter a name and tagline');
      return;
    }

    const rating = Math.floor(Math.random() * 101); 
    const idea = {
      id: generateId(),
      name: name.trim(),
      tagline: tagline.trim(),
      description: description.trim(),
      rating,
      votes: 0,
      createdAt: Date.now(),
    };

    try {
      const raw = await AsyncStorage.getItem(IDEAS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      arr.unshift(idea); 
      await AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(arr));
      Alert.alert('Saved', `Idea saved with AI rating: ${rating}`);
      // clear form
      setName('');
      setTagline('');
      setDescription('');
      navigation.navigate('Home');
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Could not save idea');
    }
  };

  return (

    <>
    <Topview/>
    
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView>
        <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Startup Name</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. QuickCart" />

        <Text style={styles.label}>Tagline</Text>
        <TextInput style={styles.input} value={tagline} onChangeText={setTagline} placeholder="Short catchy line" />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your idea"
          multiline
        />

        <TouchableOpacity style={styles.submitButton} onPress={saveIdea}>
          <Text style={styles.buttonText}>Submit Idea & Get AI Rating</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </>
  );
}

