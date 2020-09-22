import React, { useState, useEffect, useContext } from 'react'
import { Image, View, ActivityIndicator, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native'
import { Card } from 'react-native-paper'
import { DictionaryContext } from '../context/DictionaryContext'

const Home = ({ navigation }) => {

    let count = 0
    let { words, fetchWords, deleteWord } = useContext(DictionaryContext)
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleteVisible, setIsVisible] = useState(false)
    const [numberOfTimesPressed, setNumberOfTimesPressed] = useState(0)

    const LeftContent = () => {
        return (
            <View>
                <Image source={require('../assets/icons/book.png')} />
            </View>
        )
    }
    const RightContent = ({ item, index }) => {
        if (isDeleteVisible) {
            return (
                <View style={styles.editIcon} >
                    <TouchableOpacity onPress={() => {
                        deleteWord(item.id)
                    }}>
                        <Image source={require('../assets/icons/delete.png')}
                        />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={styles.editIcon} >
                    <TouchableOpacity onPress={() => navigation.navigate('DictionaryForm',
                        {
                            'mEditFlag': true,
                            'editWordItem': item,
                            'index': index
                        })
                    }>
                        <Image source={require('../assets/icons/edit.png')}
                        />
                    </TouchableOpacity>
                </View>
            )
        }
    }
    useEffect(() => {
        navigation.addListener('didFocus', () => {
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            fetchWords()
        })
    }, [])

    if (isLoading) {
        return (
            <View style={[styles.loaderContainer, styles.horizontal]}>
                <ActivityIndicator size="large" color="#484f4f" />
            </View>
        )
    } else {
        if (words.length !== 0) {
            return (
                <View style={styles.container}>
                    <FlatList
                        data={words}
                        keyExtractor={(item, index) => {
                            index.toString();
                        }}
                        renderItem={({ item, index }) =>
                            <Card
                                onPress={() => {
                                    navigation.navigate('DictionaryForm', {
                                        'showCard': true,
                                        'showItem': item
                                    })
                                }}
                                onLongPress={
                                    () => {
                                        setNumberOfTimesPressed(count++)
                                        if (count % 2 === 0) {
                                            setIsVisible(false)
                                        } else {
                                            setIsVisible(true)
                                        }
                                    }}
                                key={index}
                                style={styles.list}>
                                <Card.Title
                                    title={item.word}
                                    subtitle={item.meaning}
                                    left={LeftContent}
                                    right={() => RightContent({ item, index })} />
                            </Card>}
                    />

                    <TouchableOpacity onPress={() => {
                        navigation.navigate('DictionaryForm')
                    }} style={styles.fab}>
                        <Image source={require("../assets/icons/add.png")} />
                    </TouchableOpacity>

                </View>
            )
        }
        else {
            return (
                <>
                    <View style={styles.emptyContainer}>
                        <View >
                            <Text style={styles.emptyText} >Your Dictionary is empty!</Text>
                        </View>
                        <TouchableOpacity onPress={() => navigation.navigate('DictionaryForm')} style={styles.fabEmptyContainer}>
                            <Image source={require("../assets/icons/add.png")} />
                        </TouchableOpacity>
                    </View>
                </>
            )
        }
    }
}

export default Home

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#8ca3a3",
        flex: 1
    },
    loaderContainer: {
        backgroundColor: "#8ca3a3",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    horizontal: {
        flexDirection: "column",
        justifyContent: "center",
        padding: 10
    },
    editIcon: {
        marginRight: 10
    },
    emptyContainer: {
        backgroundColor: "#8ca3a3",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    emptyText: {
        fontSize: 30,
        color: "#fff"
    },
    fabEmptyContainer: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    },
    list: {
        marginTop: 3,
        marginLeft: 5,
        marginRight: 3,
        height: 80,
        justifyContent: 'space-around',
        paddingLeft: 10,
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    }
});

