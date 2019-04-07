import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { addCardToDeck } from '../../utils/api'
import { addCard } from '../../Home/actions'
import { connect } from 'react-redux'

class NewCard extends React.Component {

    state = {
        question: '',
        answer: '',
        loading: false
    }

    handleOnSubmit = async () => {
        const { navigation } = this.props;
        const deck = navigation.getParam('deck', '');
        const { title } = deck
        const { question, answer } = this.state
        this.setState((currState) => ({
            loading:true
        }))
        try {
            let card = {'Question':question, "Answer":answer}
            await addCardToDeck(title, card)
            this.props.addCard(title, card)
            this.props.navigation.navigate(
                'DeckDetails', 
                {
                    deck
                }
            )
        } catch (error) {
            console.error("Error adding card: ", error)
        } finally {
            this.setState((currState) => ({
                loading:false
            }))
        }
    }
    render() {
        const { question, answer, loading } = this.state
        if (loading) {
            return ( 
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" /> 
              </View>
            )
        }
        return (
            <View style={styles.main}>
                <View style={{flex:1}}>
                    
                    <Input
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChangeText={(question) => {
                            this.setState({question})
                        }}
                        multiline = {true}
                        numberOfLines = {4}
                    />
                 
                    <Input
                        type="text"
                        placeholder="Answer"
                        value={answer}
                        onChangeText={(answer) => {
                            this.setState({answer})
                        }}
                        multiline = {true}
                        numberOfLines = {4}
                    />
                </View>
                <Button
                    onPress={this.handleOnSubmit}
                    title="Submit"
                    raised
                    buttonStyle = {{backgroundColor: '#000'}}
                    titleStyle = {
                        styles.buttonText
                    }
                    type='solid'
                    containerStyle = {styles.buttonContainer}
                />
            </View>
        )
    }

}

const mapDispatchToProps = {
    addCard
  }
  
export default connect(null, mapDispatchToProps)(NewCard)

const styles = StyleSheet.create({
    main: {
        flex:1,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        width: '70%',
        flex: 1,
    },
    buttonText: {
        fontSize: 20
    },
    buttonContainer: {
        width: '80%',
        margin: 5,
        alignSelf: 'center'
    },

})