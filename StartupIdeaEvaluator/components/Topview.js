
import React, { useContext } from 'react'
import { Platform, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ThemeContext } from './ThemeContext';
import styles from '../styles';

const Topview = () => {
    const { theme, toggleTheme, isDark } = useContext(ThemeContext);
    return (
        <SafeAreaView style={[styles.topBar, { paddingTop: Platform.OS === 'android' ? 40 : 0, backgroundColor: theme.backgroundColor }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 12 }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: theme.textColor, fontSize: 21 }}>Startup Idea Evaluator 🚀</Text>
                <TouchableOpacity onPress={toggleTheme} style={[styles.button, { backgroundColor: theme.buttonColor }]}>
                    <Text style={styles.buttonText}>{isDark ? "Light" : "Dark"}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Topview