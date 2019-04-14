import React from 'react';
import { Text, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import {clearLocalNotification, setLocalNotification} from '../../utils/notification'

export default class QuizResults extends React.Component {

    componentDidMount() {
        clearLocalNotification()
            .then(setLocalNotification)
    }
    render() {
        const { navigation } = this.props;
        const totalQuestions = navigation.getParam('totalQuestions', 0);
        const correctAnswers = navigation.getParam('correctAnswers', 0);
        const deck = navigation.getParam('deck', {})
        let percentage = Math.floor((correctAnswers/totalQuestions)*100)
        return(
            <View style={{flex:1}}>
                <View style={{flex:2, justifyContent:'center'}}>
                    <Text style={styles.result}>You got {percentage}% of the questions right!</Text>
                </View>
                <View style={styles.buttonArea}>
                    <Button
                        onPress={() => { this.props.navigation.navigate("quiz", { deck })}}
                        title="Restart Quiz"
                        raised
                        buttonStyle = {{backgroundColor: '#55CF55'}}
                        titleStyle = {[
                            styles.buttonText, {color: '#fff'}
                        ]}
                        type = 'solid'
                        containerStyle = {styles.buttonContainer}
                    />
                    <Button
                        onPress={() => { 
                            navigation.navigate(
                            'DeckDetails', 
                            {
                                deck
                            }
                        ) }}
                        title="Back to Deck start"
                        raised
                        buttonStyle = {{backgroundColor: '#F65555'}}
                        titleStyle = {
                            styles.buttonText
                        }
                        type='solid'
                        containerStyle = {styles.buttonContainer}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    result: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    buttonArea: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 20
    },
    buttonContainer: {
        width: '80%',
        margin: 5
    }
})