import {observable, action, computed, decorate} from 'mobx'
import api from './../services/api'

class QuestionStore {

    @observable productId = ''
    @observable adsId = ''
    @observable question = ''
    @observable questionCode = ''
    @observable answerData = ''
    @observable questionData = {}

    @action saveQuestion = async(questionData) => {

        console.log('saveQuestion', questionData)

        try {

            const response = await api.post('https://megahack-276118.rj.r.appspot.com/Olist/question', questionData)
            const {data} = response

            console.log('saveQuestion RESPONSE', data)
            this.questionData = questionData
            this.questionCode = data.question_code
            this.answerData = {
                question_code: data.question_code,
                answer: data.sugested_answer
            }

            console.log('questioncode', this.questionCode)
    
            return {
                status: 'ok',
                message: response.data
            }
            
        } catch (error) {
            console.log('saveQuestion ERROR ####', error)

            return {
                status: 'error',
                message: error
            }
        }

    }

    @action saveAnswer = async(answerData) => {

        console.log('saveAnswer', answerData)

        try {

            const response = await api.post('https://megahack-276118.rj.r.appspot.com/Olist/answer', answerData)
            const {data} = response

            console.log('saveAnswer RESPONSE', data)

            this.answerData = answerData
    
            return {
                status: 'ok',
                message: response.data
            }
            
        } catch (error) {
            console.log('saveAnswer ERROR ####', error)

            return {
                status: 'error',
                message: error
            }
        }

    }
}

export default new QuestionStore()