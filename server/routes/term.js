// prerequisites
const app = require('./routerApp')
const termRoutes = express.Router();
const Term = require('../db/models/Term')
const connectMongoose = require('../db/conn')
connectMongoose();

// routes
app.get('/terms', async (req, res) => {
   const terms = await Term.find({})
   
})

    
module.exports = termRoutes;