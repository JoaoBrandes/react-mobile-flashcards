import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import Loader from '../../utils/Loader';

export default class QuizDeck extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
          loading: true,
          questions: [],
          totalQuestions: 0,
          currentQuestionNum: 0,
          currentQuestionText: '',
          correctAnswers: 0,
          showAnswer: false,
          currentAnswerText: ''
         };
      }

    componentDidMount = async () => {
        this.props.navigation.addListener('willFocus', this.resetState)        
    }

    resetState = () => {
        const { navigation } = this.props;
        const deck = navigation.getParam('deck', {});
        const { questions } = deck
        this.setState((currState) => ({
            loading: false,
            questions,
            totalQuestions: questions.length,
            currentQuestionText: questions[0].Question,
            currentAnswerText: questions[0].Answer,
            currentQuestionNum: 0,
            correctAnswers: 0,
            showAnswer: false,
        }))
      }

    handleButtonClick = (correct) => {
        const { questions, currentQuestionNum, correctAnswers, totalQuestions } = this.state
        let updatedCorrectAnswers = correct ? correctAnswers + 1 : correctAnswers
        if (currentQuestionNum + 1 === totalQuestions) {
            const deck = this.props.navigation.getParam('deck', {});
            this.props.navigation.navigate('quizResults', {
                correctAnswers: updatedCorrectAnswers,
                totalQuestions,
                deck
            })
        } else {
            this.setState((currState) => ({
                currentQuestionText: questions[currentQuestionNum+1].Question,
                currentQuestionNum: currentQuestionNum + 1,
                correctAnswers: updatedCorrectAnswers,
                currentAnswerText: questions[currentQuestionNum+1].Answer,
                showAnswer: false
            }))
        }
    }

    handleShowAnswer = () => {
        this.setState((currState) => ({
            showAnswer: !currState.showAnswer
        }))
    }

    renderQuestion = () => {
        const {currentQuestionText} = this.state
        return  (
            <View style={{flex:2, justifyContent:'center'}}>
                <Text style={styles.question}>{currentQuestionText}</Text>
                <TouchableOpacity
                    onPress={this.handleShowAnswer}
                >
                    <Text style={styles.answer}>Answer</Text>
                </TouchableOpacity>
            </View>
        );
      }

    renderAnswer = () => {
        const {currentAnswerText} = this.state
        return  (
            <View style={{flex:2, justifyContent:'center'}}>
                <Text style={styles.question}>{currentAnswerText}</Text>
                <TouchableOpacity
                    onPress={this.handleShowAnswer}
                >
                    <Text style={styles.answer}>Question</Text>
                </TouchableOpacity>
            </View>
        );
      }

    
    render() {
        const { totalQuestions, currentQuestionNum, 
              loading, showAnswer } = this.state
        if (loading) {
            return ( 
                <Loader/>
            )
        }
        return(
            <View style={{flex:1}}>
                <View style={{flex:1}}>
                    <Text style={styles.quantities}>{currentQuestionNum+1}/{totalQuestions}</Text>
                </View>
                {showAnswer ? this.renderAnswer() : this.renderQuestion()}
                <View style={styles.buttonArea}>
                    <Button
                        onPress={() => { this.handleButtonClick(true) }}
                        title="Correct"
                        raised
                        buttonStyle = {{backgroundColor: '#55CF55'}}
                        titleStyle = {[
                            styles.buttonText, {color: '#fff'}
                        ]}
                        type = 'solid'
                        containerStyle = {styles.buttonContainer}
                    />
                    <Button
                        onPress={() => { this.handleButtonClick(false) }}
                        title="Incorrect"
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
    question: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    answer: {
        fontSize: 14,
        color: '#F65555',
        alignSelf: 'center'
    },
    quantities: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: '5%',
        marginTop: '2%'
    },
    buttonText: {
        fontSize: 20
    },
    buttonContainer: {
        width: '80%',
        margin: 5
    }
   
  })