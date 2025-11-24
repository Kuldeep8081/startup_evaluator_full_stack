import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  StyleSheet
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles';
import { IDEAS_KEY } from '@env';
import Topview from './Topview';

export default function LeaderboardScreen({ navigation }) {
  const [ideas, setIdeas] = useState([]);
  const [mode, setMode] = useState('votes'); // or 'rating'

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => loadIdeas());
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

  const top = [...ideas]
    .sort((a, b) =>
      mode === 'votes'
        ? (b.votes || 0) - (a.votes || 0)
        : b.rating - a.rating
    )
    .slice(0, 5);

  const getBadge = (index) => {
    switch (index) {
      case 0:
        return '🥇'; // Gold
      case 1:
        return '🥈'; // Silver
      case 2:
        return '🥉'; // Bronze
      default:
        return null;
    }
  };

  return (
    <>
    <Topview/>
    
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={{ fontSize: 14, fontWeight: '700' }}>
          Top 5 — Sorted by {mode}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ marginRight: 8 }}>Rating</Text>
          <Switch
            value={mode === 'votes'}
            onValueChange={(v) => setMode(v ? 'votes' : 'rating')}
          />
          <Text style={{ marginLeft: 8 }}>Votes</Text>
        </View>
      </View>

      {top.map((item, idx) => (
        <View
          key={item.id}
          style={[
            styles.leaderCard,
            idx === 0 && styles.leaderFirst
          ]}
        >
          <Text style={localStyles.nameText}>
            {idx + 1}.{getBadge(idx) && <Text style={localStyles.badge}>{getBadge(idx)} </Text>}
             {item.name}
          </Text>
          <Text style={{ opacity: 0.9 }}>{item.tagline}</Text>
          <Text style={{ marginTop: 6 }}>
            {mode === 'votes'
              ? `Votes: ${item.votes || 0}`
              : `Rating: ${item.rating}`}
          </Text>
        </View>
      ))}
    </SafeAreaView>
    </>
  );
}

const localStyles = StyleSheet.create({
  badge: {
    fontSize: 18
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700'
  }
});
