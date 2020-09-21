import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Home from '../components/Home'
import DictionaryForm from '../components/DictionaryForm'

const StackNavigator = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            headerShown: false
        }
    },
    DictionaryForm: {
        screen: DictionaryForm,
        navigationOptions: {
            headerShown: false
        }
    }
})

export default createAppContainer(StackNavigator)