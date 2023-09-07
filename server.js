import app from './app.js';
import config from './config/config.js';
import sequelize from './config/database.js';

sequelize.sync().then(()=>{
  console.log("Synced db.");
  app.listen(config.port, (err) => {
    if (err) {
      console.log(err)
    }
    console.info('Server started on port %s.', config.port)
  })
}).catch((error)=>{
  console.log("Server not initiated")
  console.log(console.log("Failed to sync db: " + error.message))
})
