import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { TextInput } from 'react-native-paper'
import { DictionaryContext } from '../context/DictionaryContext'

const DictionaryForm = ({ navigation }) => {
    const mEditFlag = navigation.getParam('mEditFlag', false)
    const editWordItem = navigation.getParam('editWordItem', {})
    const index = navigation.getParam('index', 0)

    const [word, setWord] = useState(mEditFlag ? editWordItem.word : '')
    const [meaning, setMeaning] = useState(mEditFlag ? editWordItem.meaning : '')

    const showCard = navigation.getParam('showCard', false)
    const showItem = navigation.getParam('showItem', {})

    const { addWords, editWord } = useContext(DictionaryContext)
    let wordObj = {};

    //To GENERATE RANDOM ID
    const guidGenerator = () => {
        let S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }

    const storeWord = () => {
        wordObj = {
            id: guidGenerator(),
            word: word,
            meaning: meaning
        }
        if (mEditFlag) {
            editWord({ wordObj, index })
        }
        addWords({ wordObj })
        Alert.alert(
            "Success",
            "Done Successfully!",
            [
                {
                    text: "OK", onPress: () => navigation.navigate('Home')
                }
            ],
            { cancelable: false }
        );
    }

    if (showCard) {
        return (
            <>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
                        <Image source={require("../assets/icons/close.png")} />
                    </TouchableOpacity>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>{showItem.word}</Text>
                        </View>
                        <View style={styles.header}>
                            <Text style={{ fontWeight: "normal", fontSize: 18, marginTop: 10 }}>{showItem.meaning}</Text>
                        </View>
                    </View>
                </View>
            </>
        )
    } else {
        return (
            <>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.closeIcon} onPress={() => navigation.goBack()}>
                        <Image source={require("../assets/icons/close.png")} />
                    </TouchableOpacity>
                    <View style={styles.card}>
                        <View style={styles.header}>
                            <Text style={{ fontWeight: "bold", fontSize: 18 }}>New word</Text>
                        </View>
                        <TextInput
                            type='text'
                            mode='outlined'
                            style={{ margin: 5 }}
                            placeholder='Enter Word*'
                            selectionColor={'#F8DE7E'}
                            scrollEnabled={true}
                            editable={true}
                            error={false}
                            multiline={true}
                            value={word}
                            onChangeText={text => setWord(text)}
                        />
                        <TextInput
                            type='text'
                            mode='outlined'
                            style={{ margin: 5 }}
                            placeholder='Enter Meaning*'
                            selectionColor={'#F8DE7E'}
                            scrollEnabled={true}
                            editable={true}
                            error={false}
                            multiline={true}
                            value={meaning}
                            onChangeText={text => setMeaning(text)}

                        />
                        <TouchableOpacity style={styles.createButton} onPress={() => {
                            storeWord()
                        }}>
                            {mEditFlag && <Text style={styles.createButtonText}>Edit</Text>}
                            {!mEditFlag && <Text style={styles.createButtonText}>Create</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </>
        )
    }
}

export default DictionaryForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 30,
        backgroundColor: '#8ca3a3',
        padding: 8,
        alignItems: "center",
    },
    card: {
        width: "80%",
        backgroundColor: "white",
        borderRadius: 15,
        elevation: 10,
        padding: 10
    },
    profileImg: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginRight: 10,
    },
    header: {
        flexDirection: "row",
    },
    createButton: {
        backgroundColor: "#deeaee",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#b1cbbb",
        padding: 8,
    },
    createButtonText: {
        fontSize: 20,
        overflow: "scroll",
        flexWrap: "wrap",
    },
    closeIcon: {
        position: "absolute",
        bottom: 0,
        top: 10,
        right: 10,
    }
});