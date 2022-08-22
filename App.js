import React from 'react';
import { StyleSheet} from 'react-native';
import { MovieStack } from './src/screens/StackTabs';

export default function App({ navigation }) {
  
  return (
    <MovieStack/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
