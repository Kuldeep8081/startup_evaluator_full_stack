
import {
  SafeAreaView,
  View,
  Text,
} from 'react-native';

import styles from '../styles'

export default function DetailsScreen({ route }) {
  const { idea } = route.params;
  return (
    <SafeAreaView style={styles.container}>

          <View style={styles.cardLarge}>
            <Text style={styles.cardTitle}>{idea.name}</Text>
            <Text style={styles.tagline}>{idea.tagline}</Text>
            <Text style={[styles.meta]}>AI Rating: {idea.rating} • Votes: {idea.votes || 0}</Text>
            <Text style={[styles.desc, { marginTop: 12 }]}>{idea.description || 'No full description provided.'}</Text>
          </View>
    </SafeAreaView>
  );
}

