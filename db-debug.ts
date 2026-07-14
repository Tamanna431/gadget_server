import mongoose from 'mongoose';

async function main() {
  await mongoose.connect("mongodb+srv://gadgetverse:cFtiec47u1dOvcgb@cluster0.qz80zv3.mongodb.net/gadgetverse?appName=Cluster0");
  const db = mongoose.connection.db!;
  console.log("Connected!");

  const sessions = await db.collection("session").find({}).limit(3).toArray();
  console.log("\n--- SESSIONS ---");
  for (const s of sessions) {
    console.log(`  token: "${s.token}" | userId: "${s.userId}" | expires: ${s.expiresAt}`);
  }

  const users = await db.collection("user").find({}).limit(5).toArray();
  console.log("\n--- USERS ---");
  for (const u of users) {
    console.log(`  _id: "${u._id}" | id: "${u.id}" | email: "${u.email}" | name: "${u.name}"`);
  }

  await mongoose.disconnect();
}
main();
