import React, { useState, useEffect } from 'react';
import { Text, View, Image, Pressable, ScrollView, StyleSheet, SafeAreaView, TextInput} from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import styles from './Styles';
import customData from '../storydata.json';
import openai, {getImagesOAI} from '../models/OpenAI';
import AppTextInput from '../components/TextInputWrapper';
import LoadingSpinner from "../components/LoadingSpinner";

const item = {
  "name": "A Cat Adventure",
  "description": "Test Description",
  "image": "../assets/copernicus_and_margot.jpeg",
  "storyInput": "Tell me a story about a cat named Copernicus who is a small brown tabby with ear tufts and a loving personality.",
  "description": "You need to create the story first!",
  "imageInput": "the wisest cat in all the galaxy brown tabby exploring the vastness of space with strange and wonderful creatures meeting friendly aliens",
  "hiddenInput": ", cat, oil painting, highly detailed, global illumination, fantasy"
}

function CreateStory({navigation}) {

  const [fetchedState,setFetchedState]=useState(null);
  const [imageData,setImageData]=useState({"created":1673128176,"data":[{"url":"https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="}]});
  const [userInputState,setUserInputState]=useState(item);

  useEffect(() => {
     setFetchedState('idle')
   },[])

   const [textName, onChangeName] = React.useState(item.name);
   const [textContent, onChangeContent] = React.useState(item.description);
   const [textInput, onChangeStoryInput] = React.useState(item.storyInput);
   const [imagePrompt, onChangeImagePrompt] = React.useState(item.imageInput);

  return (
    <LinearGradient {...styles.gradientProps}>
      <SafeAreaView style={{ flex: 1, width: '100%'}}>
        <ScrollView>
          <View style={{ flex: 1, alignItems: 'left', margin: 20}}>

          <View style={styles2.inputWrapper}>
            <Text style={{color: '#424242', marginBottom: 10}} >What will you name the Story?</Text>
            <TextInput style={styles2.input} autoComplete='false'
              onChangeText={onChangeName} value={textName}
              placeholder={(item.name)}

            />
          </View>

            <View style={styles2.inputWrapper}>
              <Text style={{color: '#424242', marginBottom: 10}} >AI Story Input</Text>
              <AppTextInput
                style={styles2.input}
                onChangeText={onChangeStoryInput}
                value={textInput}
                placeholder={(item.storyInput)}
                onFocus
                autoComplete='false'
                multiline
              />

            </View>

            <Pressable onPress={() => alert('Create Coming Soon!')} >
              <View style={{backgroundColor: '#424242AA', marginTop: 0, marginBottom: 20, borderRadius: 5 }}>
                <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Create Story!{'\t\t\t\t'}FREE</Text>
              </View>
            </Pressable>

            <View style={{border: 1, borderColor: '#AAA', marginBottom: 15, borderWidth: 1, width: '100%', padding: 5, backgroundColor: 'white'}}>
              <Text style={{color: '#424242', marginBottom: 10}} >AI Picture Input</Text>
              <TextInput
                style={styles2.input}
                onChangeText={onChangeImagePrompt}
                value={imagePrompt}
                placeholder={(item.imageInput)}
                autoComplete='false'
                multiline
              />
            </View>

            <Pressable onPress={() => {
                setFetchedState('loading'); //setTimeout( () => getImages(), 10000);
                getImagesOAI(imagePrompt.concat(item.hiddenInput), setFetchedState, setImageData);
                }} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 10, borderRadius: 5 }}>
              <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Give the Story a Picture{'\t\t'}$0.09</Text>
              </View>
            </Pressable>

          </View>

          <View style={styles.container}>
            { // if
              (fetchedState === 'idle') ?
                <Image source={{uri: imageData.data[0].url}} resizeMode={'cover'} style={styles.storyListSquare}></Image>
              : // else if
                (fetchedState === 'loading') ? ( LoadingSpinner() )
              : // else
                <Image source={{uri: imageData.data[0].url}} resizeMode={'cover'} style={styles.imageDetail}></Image>
            }
          </View>

          <View style={{ flex: 1, width: '100%', marginTop: 30, backgroundColor: 'white'}}>
            <View style={{ flex: 1, alignItems: 'left', margin: 15}}>
              <Text style={styles.Heading}>{(item.name)}</Text>
              <Image source={{ uri: imageData.data[0].url }} resizeMode={'cover'} style={styles.imageDetail}></Image>
              <Text style={styles.body}>{(item.description)}</Text>
            </View>
          </View>

          <View style={{ flex: 1, alignItems: 'left', margin: 20}}>
            <Pressable onPress={() => alert('Save Coming Soon!')} >
              <View style={{backgroundColor: '#424242AA', alignItems: "center", marginTop: 0, marginBottom: 20, borderRadius: 5 }}>
                <Text style={{color: 'white', fontWeight: 'bold', padding: 10}}>Wonderful, save it!{'\t\t\t\t'}FREE</Text>
              </View>
            </Pressable>
          </View>

        </ScrollView>
      </SafeAreaView>
      </LinearGradient>
  );
}

export default CreateStory;

const styles2 = StyleSheet.create({
  input: {
    borderColor: '#AAAAAFF',
    borderWidth: 0,
    width: '100%',
    color: 'black',
    fontSize: 18,
  },
  inputWrapper: {
    border: 1,
    borderColor: '#AAA',
    marginBottom: 15,
    borderWidth: 1,
    width: '100%',
    padding: 5,
    backgroundColor: 'white'
  }
});


/*
async function query(data) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/deepset/roberta-base-squad2",
        {
            headers: { Authorization: `Bearer ${API_TOKEN}` },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.json();
    return result;
}
query({inputs:{question:"What is my name?",context:"My name is Clara and I live in Berkeley."}}).then((response) => {
    console.log(JSON.stringify(response));
});
// {"score":0.933128833770752,"start":11,"end":16,"answer":"Clara"}

*/
