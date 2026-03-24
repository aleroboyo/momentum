import mongoose from 'mongoose';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongoose: MongooseCache | undefined;
}

const rawURI = process.env.MONGODB_URI;
if (!rawURI) throw new Error('MONGODB_URI missing');

const [, username, password, cluster] = rawURI.match(/\/\/(.+):(.+)@(.+)/) || [];
if (!username || !password || !cluster) {
  throw new Error('Invalid MONGODB_URI format');
}

const encodedPassword = encodeURIComponent(password);
const MONGODB_URI = `mongodb+srv://${username}:${encodedPassword}@${cluster}`;

const cached = global.mongoose ?? { conn: null, promise: null };

async function dbConnect() {
  if (cached.conn) return cached.conn;
  
  console.log('🔗 Using URI:', MONGODB_URI.substring(0, 50) + '...');
  
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      console.log('✅ MongoDB Connected!');
      return mongoose;
    }).catch((error) => {
      console.error('❌ MongoDB Connection Error:', error.message);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  global.mongoose = cached;
  return cached.conn;
}

export default dbConnect;

