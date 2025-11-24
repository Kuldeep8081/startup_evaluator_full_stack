import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', padding: 12},
  topBar: { height: 120, justifyContent: 'center' },
  form: { marginTop: 12 },
  label: { fontWeight: '700', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 12, backgroundColor: '#fff' },
  submitButton: { backgroundColor: '#2b8cff', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '700' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  headerButton: { backgroundColor: '#eee', padding: 8, borderRadius: 8 },
  headerButtonText: { fontWeight: '700',fontSize:18 },
  sortRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 ,justifyContent:'space-evenly'},
  sortOpt: { marginLeft: 8, padding: 6, borderRadius: 6 },
  sortActive: { backgroundColor: '#dbeafe' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10, shadowColor: '#000', shadowOpacity: 0.05, elevation: 2 },
  cardLarge: { backgroundColor: '#fff', padding: 16, borderRadius: 10 },
  cardTitle: { fontSize: 16, fontWeight: '800' },
  tagline: { opacity: 0.85 },
  desc: { marginTop: 8, color: '#333' },
  cardFooter: { marginTop: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  votes: { fontWeight: '700' },
  smallButton: { marginLeft: 8, paddingHorizontal: 10, paddingVertical: 6, backgroundColor: '#eef2ff', borderRadius: 8 },
  smallButtonText: { fontWeight: '700' },
  rating: { fontWeight: '700' },
  leaderCard: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 8 },
  leaderFirst: { borderColor: '#ffd700', borderWidth: 1.5 },
  meta: { opacity: 0.8, marginTop: 8 },

  button: {
    padding:3,
    margin:4,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  
});

export const lightTheme = {
  backgroundColor: '#FFFFFF',
  textColor: '#000000',
  buttonColor: '#4CAF50',
};

export const darkTheme = {
  backgroundColor: '#333333',
  textColor: '#FFFFFF',
  buttonColor: '#8BC34A',
};