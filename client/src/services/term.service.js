import http from '../http-common'

class TermDataService {
    getAll() {
        return http.get('/terms')
    }
    get(termName) {
        return http.get(`/term/${termName}`)
    }
}

export default new TermDataService();