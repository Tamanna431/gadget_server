import mongoose from 'mongoose';

async function main() {
  await mongoose.connect("mongodb+srv://gadgetverse:cFtiec47u1dOvcgb@cluster0.qz80zv3.mongodb.net/?appName=Cluster0");
  const adminDb = mongoose.connection.db!.admin();
  const dbs = await adminDb.listDatabases();
  console.log("Databases in cluster:", dbs.databases.map(d => d.name));

  for (const dbInfo of dbs.databases) {
    const dbName = dbInfo.name;
    if (['admin', 'local'].includes(dbName)) continue;
    const db = mongoose.connection.client.db(dbName);
    const collections = await db.listCollections().toArray();
    console.log(`\nDatabase: ${dbName}`);
    for (const col of collections) {
      const count = await db.collection(col.name).countDocuments();
      console.log(`  Collection: ${col.name} | Count: ${count}`);
    }
  }

  await mongoose.disconnect();
}
main();
