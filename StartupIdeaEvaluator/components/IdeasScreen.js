import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
  Share,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';


import styles from '../styles'

import Topview from './Topview';

const IDEAS_KEY='startup_ideas_list';
const VOTES_KEY_PREFIX=process.env.VOTES_KEY_PREFIX;

export default function IdeasScreen({ navigation }) {
  const [ideas, setIdeas] = useState([]);
  const [sortBy, setSortBy] = useState('newest'); 

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadIdeas();
    });
    loadIdeas();
    return unsubscribe;
  }, [navigation]);

  const loadIdeas = async () => {
    try {
      const raw = await AsyncStorage.getItem(IDEAS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      setIdeas(arr);
    } catch (e) {
      console.error(e);
    }
  };

  const upvote = async (id) => {
    try {
      const votedKey = VOTES_KEY_PREFIX + id;
      const already = await AsyncStorage.getItem(votedKey);
      if (already) {
        Alert.alert('Vote', 'You have already voted for this idea');
        return;
      }
      const raw = await AsyncStorage.getItem(IDEAS_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      const idx = arr.findIndex((i) => i.id === id);
      if (idx >= 0) {
        arr[idx].votes = (arr[idx].votes || 0) + 1;
        await AsyncStorage.setItem(IDEAS_KEY, JSON.stringify(arr));
        await AsyncStorage.setItem(votedKey, '1');
        setIdeas(arr.slice());
        Alert.alert('Thanks!', 'Your vote was counted');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const shareIdea = async (idea) => {
    const text = `${idea.name} — ${idea.tagline}\n\n${idea.description}\n\nRating: ${idea.rating} | Votes: ${idea.votes}`;

    try {
      const result = await Share.share({
        message: text,
        title: 'Check out this startup idea!', 
      });

      if (result.action === Share.sharedAction) {

        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dialog was dismissed.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to share the idea.');
      console.error('Share failed:', error.message);
    }
  };

  const sorted = [...ideas].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'votes') return (b.votes || 0) - (a.votes || 0);
    return b.createdAt - a.createdAt;
  });

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={[styles.cardTitle,{width:250}]}>Startup Name: {item.name}</Text>
        <Text style={[styles.rating,{marginRight:20}]}>⭐ {item.rating}</Text>
      </View>
      <Text style={styles.tagline}>Tagline: {item.tagline}</Text>
      <Text numberOfLines={2} style={styles.desc}>
        description: {item.description}
      </Text>
      <View style={styles.cardFooter}>
        <Text style={styles.votes}>❤️ {item.votes || 0} votes</Text>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.smallButton} onPress={() => upvote(item.id)}>
            <Text style={styles.smallButtonText}>Upvote</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => navigation.navigate('Details', { idea: item })}>
            <Text style={styles.smallButtonText}>Read more</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallButton} onPress={() => shareIdea(item)}>
            <Text style={styles.smallButtonText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <>
    <Topview/>
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Submit')}>
          <Text style={styles.headerButtonText}>+ Submit Idea</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Leaderboard')}>
          <Text style={styles.headerButtonText}>🏆 Leaderboard</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sortRow}>
        <Text style={{fontWeight:'bold'}}>Sort by:</Text>
        <TouchableOpacity onPress={() => setSortBy('newest')} style={[styles.sortOpt, sortBy === 'newest' && styles.sortActive]}>
          <Text style={{fontWeight:'bold'}}>Newest</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy('rating')} style={[styles.sortOpt, sortBy === 'rating' && styles.sortActive]}>
          <Text style={{fontWeight:'bold'}}>Rating</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSortBy('votes')} style={[styles.sortOpt, sortBy === 'votes' && styles.sortActive]}>
          <Text style={{fontWeight:'bold'}}>Votes</Text>
        </TouchableOpacity>
      </View>

      <FlatList data={sorted} keyExtractor={(i) => i.id} renderItem={renderItem} contentContainerStyle={{ paddingBottom: 40 }} />
    </SafeAreaView>
    </>
  );
}


