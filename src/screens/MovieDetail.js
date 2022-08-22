import React from 'react';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView ,TouchableOpacity, ImageBackground, Linking } from 'react-native';
import { getMovieById, getPoster, getVideo } from '../function/Movie';
import { APPEND_TO_RESPONSE as AR } from '../constants/Urls';
import { CastItem } from '../components/CastItem';
import * as Icon from 'react-native-feather';

export default function MovieDetail( {route , navigation} ) {

  const { movieId } = route.params; 
  const [movie, setMovie] = useState({})
  
  useEffect(()=>{
  getMovieById(movieId,`${AR.VIDEOS},${AR.CREDITS},${AR.RECOMMENDATIONS},${AR.SIMILAR}`
    ).then((response) => setMovie(response.data)) 
  },[])
  return (
    <ScrollView style={styles.container}>
      <ImageBackground 
        source={{uri:getPoster(movie.backdrop_path)}} 
        style={styles.moviePosterImage}
        resizeMode='cover'
        >
        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginTop:30,marginLeft:10}}>
          <Icon.ChevronLeft size={35} color={"white"}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.playButton} onPress={()=>Linking.openURL(getVideo(movie.videos.results[0].key))}>
          <Icon.PlayCircle size={100} color='white'/>
        </TouchableOpacity>
      </ImageBackground>
      <Text style={styles.movieTitle}>{movie.original_title}</Text>
      <Text style={styles.movieGenres}>{movie.genres?.map((genre)=> genre.name)?.join(",")} | {" "}{movie.runtime} Min</Text>
      <Text style={styles.movieGenres}>{movie.original_language}</Text>

      <View style={styles.overView}>
        <Text style={styles.overViewTitle}>OverView</Text>
        <View style={styles.overViewTextView}>
          <Text style={styles.overViewText}>{movie.overview}</Text>
        </View>
      </View>

      <View style={{marginTop:10,marginLeft:15}}>
          <Text style={styles.castTitle}>Cast</Text>
          <FlatList
            data={movie.credits?.cast}
            keyExtractor={(item) => item?.credit_id}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem = {({ item })=>(
              <CastItem
                original_name={item?.original_name}
                character={item?.character}
                poster_path={item?.profile_path}
              />
            )}
          />  
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  moviePosterImage:{
    width:'100%',
    height:300,
  },
  playButton:{
    marginLeft:"50%",
    marginTop:80,
  },
  movieTitle:{
    marginTop:10,
    marginLeft:15,
    fontSize:18,
    fontWeight:"700",
  },
  movieGenres:{
    marginTop:5,
    marginLeft:15,
    fontSize:12,
    fontWeight:"500",
    color:'#ADADAD'
  },
  overView:{
    marginTop:10,
    backgroundColor:'#F0F0F0',
    width:'100%'
  },
  overViewTitle:{
    marginTop:10,
    marginLeft:15,
    fontSize:18,
    fontWeight:'600',
  },
  overViewTextView:{
    marginTop:10,
    marginLeft:15,
    marginRight:15,
    marginBottom:15
  },
  overViewText:{
    fontWeight:'bold',
    fontSize: 13,
    textAlign: "justify",
    color:'#8E8E8E'
  },
  castTitle:{
    fontSize:18,
    fontWeight:"600",
  }
});
