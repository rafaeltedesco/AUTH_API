const {config} = require('./config')
require('./src/database/').dbConnection(config)
const app = require('./app')

const PORT = config.PORT || 3000


app.listen(PORT, ()=> {
  console.log(`Server up and running on:
  http://localhost:${PORT}/api/v1/usuarios`)})