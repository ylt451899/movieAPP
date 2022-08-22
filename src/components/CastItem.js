import React from 'react';
import { StyleSheet, Text, Image, View } from 'react-native';
import { getPoster } from '../function/Movie';

export const CastItem = ({poster_path,original_name, character}) => {
    return(
      <View style={{marginTop:5,marginRight:15}}>
        <Image source={{uri: getPoster(poster_path)}} style={styles.poster}/>
        <Text style={styles.originalName} numberOfLines={2}>{original_name}</Text>
        <Text style={styles.characterName} numberOfLines={2}>{character}</Text>
      </View>
    )
  }
  const styles = StyleSheet.create({
    poster:{
      width:80,
      height:120,
      borderRadius:10,
    },
    originalName:{
      fontWeight:'bold',
      width: 80,
      fontSize:12,
    },
    characterName:{
      width: 80,
      fontSize:10,
      color:'#9D9D9D'
    }
  });