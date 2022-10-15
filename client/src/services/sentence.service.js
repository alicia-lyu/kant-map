import authHttp from './auth/auth-common'
import http from './http-common'

class SentenceDataService {
    // public data
    adding(termName) {
        return http.get(`${termName}/add-sentence`)
    }
    // private data involved
    getAll(termName) {
        return authHttp.get(`${termName}/sentences`)
    }
    get(termName, sentenceId) {
        return authHttp.get(`/${termName}/${sentenceId}`)
    }
    add(termName, data) {
        return authHttp.post(`${termName}/sentences`, data)
    }
    delete(termName, sentenceId) {
        return authHttp.delete(`/${termName}/${sentenceId}`)
    }
}

export default new SentenceDataService();