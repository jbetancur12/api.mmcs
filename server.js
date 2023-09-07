import app from './app.js';
import config from './config/config.js';
import sequelize from './config/database.js';
import { createAdminUser } from './create-admin-user.js';

import './models/File.js';
import './models/User.js';
import { User } from './models/User.js';

async function main() {
  sequelize.sync({ force: false }).then(async () => {
    console.log("Connection has been stablished successfully.")
    const userCount = await User.count();

    if (userCount === 0) {
      // Si no hay registros en la tabla 'users', crea el usuario administrador
      createAdminUser();
    }
    app.listen(config.port, (err) => {
      if (err) {
        console.log(err)
      }
      console.info('Server started on port %s.', config.port)
    })
  }).catch((error) => {
    console.log("Server not initiated")
    console.log(console.log("Failed to sync db: " + error.message))
  })
}

// async function main() {
//   try {
//     await sequelize.sync({force: true})
//     console.log("Connection has been stablished successfully.")

//      // Verifica si la tabla 'users' tiene algún registro
//      const userCount = await User.count();

//      if (userCount === 0) {
//        // Si no hay registros en la tabla 'users', crea el usuario administrador
//        await createAdminUser();
//      }

//     app.listen(config.port, (err) => {
//       if (err) {
//         console.log(err)
//       }
//       console.info('Server started on port %s.', config.port)
//     })
//   } catch (error) {
//     console.log("Unable to connect to the database" + error)
//   }
// }

main()