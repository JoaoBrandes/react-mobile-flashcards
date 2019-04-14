import React from 'react';
import { Text, StyleSheet, View, ActivityIndicator } from 'react-native'
import { Input, Button } from 'react-native-elements';
import { saveDeckTitle } from '../../utils/api'
import { connect } from 'react-redux'
import { addDeck } from '../actions'
import { getDecks, getDeck } from '../../utils/api'


class NewDeck extends React.Component {

    state = {
        title: '',
        loading: false
    }

    handleOnSubmit = async () => {
        const { title } = this.state
        this.setState((currState) => ({
            ...currState,
            loading:true
        }))
        try {
            await saveDeckTitle(title)
            const deck = await getDeck(title)
            this.props.addDeck(deck)
            this.props.navigation.navigate(
                'DeckDetails', 
                {
                   deck
                }
            )
        } catch (error) {
            console.error("Error adding Deck: ", error)
        } finally {
            this.setState((currState) => ({
                ...currState,
                loading:false
            }))
        }
    }
    render() {
        const { title, loading } = this.state
        if (loading) {
            return ( 
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <ActivityIndicator size="large" color="#0000ff" /> 
              </View>
            )
        }
        return (
            
            <View style={styles.main}>
                <Text style={styles.title}>What is the title of your new Deck ?</Text>
                <Input
                    type="text"
                    placeholder="Deck Title"
                    value={title}
                    onChangeText={(title) => {
                        this.setState({title})
                    }}
                    containerStyle = {{flex:1}}
                />
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

const styles = StyleSheet.create({
    main: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
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
        margin: 5
    }
})


const mapDispatchToProps = {
    addDeck
  }
  
export default connect(null, mapDispatchToProps)(NewDeck)