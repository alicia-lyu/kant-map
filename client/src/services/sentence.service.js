import http from '../http-common'

class SentenceDataService {
    getAll(termName) {
        return http.get(`${termName}/sentences`)
    }
    get(termName, sentenceId) {
        return http.get(`/${termName}/${sentenceId}`)
    }
    add(termName, data) {
        return http.post(`${termName}/sentences`, data)
    }
    delete(termName, sentenceId) {
        return http.delete(`/${termName}/${sentenceId}`)
    }
}

export default new SentenceDataService();