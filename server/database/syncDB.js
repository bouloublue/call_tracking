
// async function syncDb() {
//   if (process.env.SYNC_DB === 'true') {
//     const modelNames = Object.keys(global.db.models);
//     for(let i = 0; i < modelNames.length; i += 1) {
//       const key = modelNames[i];
//       global.logger.db.info(`Syncing db: Current ${key}`);
//       // await global.db.models[key].sync({ alter: true });
//       await global.db.models[key].sync();
//     };
//     global.logger.db.info('Syncing db: Done');
//   }
// }

// module.exports = syncDb;

async function syncDb() {
  const shouldSync = process.env.SYNC_DB === 'true';
  const useAlter = process.env.SYNC_DB_ALTER === 'true';

  if (shouldSync) {
    const modelNames = Object.keys(global.db.models);
    
    for (let i = 0; i < modelNames.length; i += 1) {
      const key = modelNames[i];
      global.logger.db.info(`Syncing DB model: ${key}`);

      await global.db.models[key].sync({
        alter: useAlter,
        // force: true // 🔄 Reflect changes automatically if enabled
      });
    }

    global.logger.db.info('✅ All DB models synced successfully');
  }
}

module.exports = syncDb;

