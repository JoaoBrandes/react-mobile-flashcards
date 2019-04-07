import React from 'react';
import { Text, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

export default class DeckDetails extends React.Component {
    render() {
        const { navigation } = this.props;
        const deck = navigation.getParam('deck', {});
        const { title, questions } = deck
        const questionsNum = questions.length
        return (
            <View style={styles.main} >
                <View style={styles.header}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{questionsNum} cards</Text>
                </View>
                <View style={styles.buttonArea}>
                    <Button
                        onPress={()=>{
                            this.props.navigation.navigate('newCard', {
                                deck
                            })
                        }}
                        title="Add Card"
                        raised
                        titleStyle = {[
                            styles.buttonText, {color: '#000'}
                        ]}
                        type = 'outline'
                        containerStyle = {styles.buttonContainer}
                    />
                    <Button
                        onPress={() => {
                                this.props.navigation.navigate("quiz", { deck })
                            }}
                        title="Start Quiz"
                        raised
                        buttonStyle = {{backgroundColor: '#000'}}
                        titleStyle = {
                            styles.buttonText
                        }
                        type='solid'
                        disabled = {questionsNum == 0} 
                        containerStyle = {styles.buttonContainer}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex:1,
    },
    header: {
        flex:2,
        justifyContent: 'center'
    },
    buttonArea: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    subTitle: {
        fontSize: 14,
        color: '#aaa',
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 20
    },
    buttonContainer: {
        width: '80%',
        margin: 5
    }
   
  })