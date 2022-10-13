import http from '../http-common'

class TermDataService {
    getAll() {
        return http.get('/terms')
    }
}

export default new TermDataService();