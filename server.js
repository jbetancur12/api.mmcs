import app from './app.js';
import config from './config/config.js';
import sequelize from './config/database.js';

// import './models/File.js';
// import './models/User.js';

// sequelize.sync().then(()=>{
//   console.log("Synced db.");
//   app.listen(config.port, (err) => {
//     if (err) {
//       console.log(err)
//     }
//     console.info('Server started on port %s.', config.port)
//   })
// }).catch((error)=>{
//   console.log("Server not initiated")
//   console.log(console.log("Failed to sync db: " + error.message))
// })

async function main() {
  try {
    await sequelize.sync({force: false})
    console.log("Connection has been stablished successfully.")
    app.listen(config.port, (err) => {
      if (err) {
        console.log(err)
      }
      console.info('Server started on port %s.', config.port)
    })
  } catch (error) {
    console.log("Unable to connect to the database" + error)
  }
}

main()