import React from 'react'
import DictionaryContextProvider from './context/DictionaryContext'
import StackNavigator from './navigation/StackNavigation'
const App = () => {
    return (
        <DictionaryContextProvider>
            <StackNavigator />
        </DictionaryContextProvider>
    )
}

export default App
