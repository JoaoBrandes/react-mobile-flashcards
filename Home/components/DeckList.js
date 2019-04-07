import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { getDecks, getDeck } from '../../utils/api'
import { receiveDecks } from '../actions'
import { connect } from 'react-redux'
import DeckListItem from './DeckListItem'
import { Button } from 'react-native-elements'
import Loader from '../../utils/Loader';


//Main View
// Lists all Decks created
class DeckList extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loading: true,
      decksNum: 0
     };
  }

  componentDidMount = async () => {
    this.props.navigation.addListener('willFocus', this.checkForUpdate)
    getDecks().then((decks) => {
      let deckArray = []
      Object.keys(decks).map((key) => {
        const deck = decks[key]
        deckArray.push(deck)
      })
      
      this.props.receiveDecks(deckArray)
      this.setState((currState) => {
        return {
          ...currState,
          loading: false,
          decksNum: deckArray.length
        }
      })
    })
  }
  
  //Needed to update de Decks List when using the back button to return to this screen
  checkForUpdate = () => {
    if (this.props.decks.length !== this.state.decksNum) {
      this.setState((currState) => {
        return {
          ...currState,
          decksNum: this.props.decks.length
        }
      })
      this.forceUpdate();
    }
  }

  render() {
    const { loading } = this.state
    const { decks } = this.props
    if (loading) {
      return (
        <Loader/>
      )
    }
    return (
      <View style={{ flex:1 }}>
        <View style={{ flex:8 }}>
              {(decks === undefined || decks.length === 0) ? 
                <Text>No Decks to show</Text>
              :
              <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column'}}>
                  {Object.keys(decks).map((key) => {
                    const deck = decks[key]
                    return (
                      <DeckListItem key={key} deck={deck} navigation={this.props.navigation}/>
                    )
                  })}
                  
                </View>
              </ScrollView>
              }
        </View>
        <View style={styles.buttonArea}>
          <Button
              title="Create New Deck"
              raised
              buttonStyle = {{backgroundColor: '#000'}}
              titleStyle = {[
                  styles.buttonText, {color: '#fff'}
              ]}
              containerStyle = {styles.buttonContainer}
              onPress={() => this.props.navigation.navigate(
                'newDeck', 
                {
                    title: this.props.title,
                    questionsNum: this.props.questionsNum
                }
              )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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

function mapStateToProps (state) {
  return {
    decks: state.decksList,
  }
}

const mapDispatchToProps = {
  receiveDecks
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeckList)
