import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage';

export const DictionaryContext = createContext();
const DictionaryContextProvider = (props, { navigation }) => {
    const key = "WORDS"
    const [words, setWords] = useState([])

    const fetchWords = () => {
        AsyncStorage.getItem(key.toString())
            .then(result => setWords(JSON.parse(result)))
            .catch(err => console.log(err))
    }

    const addWords = ({ wordObj }) => {
        AsyncStorage.setItem(key.toString(), JSON.stringify([...words, wordObj]))
            .then(() => console.log('Done'))
            .catch(err => console.log(err))
    }

    const deleteWord = async (id) => {
        try {
            let wordsJSON = await AsyncStorage.getItem(key.toString());
            let wordsArray = JSON.parse(wordsJSON);
            newWordArray = wordsArray.filter((e) => {
                return e.id !== id
            })
            AsyncStorage.setItem(key.toString(), JSON.stringify(newWordArray));
            setWords(newWordArray)
        }
        catch (error) {
            console.log(error)
        }
    };

    const editWord = async ({ wordObj, index }) => {
        newWordArray = words.splice(index, 1);
        AsyncStorage.setItem(key.toString(), JSON.stringify([...words, wordObj]))
            .then(() => console.log('Done'))
            .catch(err => console.log(err))
        setWords(words)
    }

    return (
        <DictionaryContext.Provider
            value={{
                words,
                fetchWords,
                deleteWord,
                addWords,
                editWord
            }}>
            {props.children}
        </DictionaryContext.Provider>
    )

}

export default DictionaryContextProvider
