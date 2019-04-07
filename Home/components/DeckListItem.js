import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'


export default class DeckListItem extends React.Component {
    render() {
        const { deck } = this.props
        const { title, questions } = deck
        return (
            <TouchableOpacity onPress={() => this.props.navigation.navigate(
                'DeckDetails', 
                {
                    deck
                }
              )}>
                <Card containerStyle={styles.card}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subTitle}>{questions.length} cards</Text>
                </Card>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        justifyContent: 'flex-start', 
        
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    subTitle: {
        fontSize: 14,
        color: '#aaa',
        alignSelf: 'center'
    }

  })