require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('./models/Users.model');
const Ads = require('./models/ads.model');

const MONGO_URI = process.env.MONGO_URI;

// ---- USERS ----
const usersData = [
  {
    login: 'pandaUser',
    password: 'test123',
    avatar: 'panda-1707050674872.png',
    phone: 123456789,
  },
  {
    login: 'ringUser',
    password: 'test123',
    avatar: 'ring.jpg',
    phone: 987654321,
  },
];

// ---- ADS IMAGES ----
const adsImages = [
  'chair1.jpg','chair2.jpg','chair3.jpg','chair4.jpg',
  'chest.jpg',
  'clock1.jpg','clock2.jpg','clock3.jpg','clock4.jpg',
  'grinder.jpg',
  'hairpin.jpg',
  'hifi.jpg',
  'phone1.jpg','phone2.jpg','phone3.jpg','phone4.jpg',
  'red dress.jpg',
  'table.jpg',
  'typewriter1.jpg','typewriter2.jpg','typewriter3.jpg','typewriter4.jpg',
  'violin1.jpg','violin2.jpg','violin3.jpg','violin4.jpg'
];

const locations = [
  'Gdansk','Sopot','Gdynia','Warsaw',
  'Krakow','Poznan','Wroclaw','Lodz'
];

async function seedDB() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);

    console.log('Cleaning database...');
    await User.deleteMany({});
    await Ads.deleteMany({});

    // ---- CREATE USERS ----
    console.log('Creating users...');

    const createdUsers = [];

    for (const u of usersData) {
      const hashedPassword = await bcrypt.hash(u.password, 10);

      const newUser = await User.create({
        login: u.login,
        password: hashedPassword,
        avatar: u.avatar,
        phone: u.phone,
      });

      createdUsers.push(newUser);
    }

    // ---- CREATE ADS ----
    console.log('Creating ads...');

    let userIndex = 0;

    for (let i = 0; i < adsImages.length; i++) {
      const user = createdUsers[userIndex];

      await Ads.create({
        title: `Amazing item ${i + 1} in perfect condition`,
        content:
          'This is a sample advertisement created automatically by seed script. Item is fully functional and ready to use.',
        date: new Date(),
        picture: adsImages[i],
        price: Math.floor(Math.random() * 900) + 50,
        location: locations[i % locations.length],
        user: user._id.toString(), // zgodne z Twoim modelem (String)
      });

      userIndex = (userIndex + 1) % createdUsers.length;
    }

    console.log('✅ Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err);
    process.exit(1);
  }
}

seedDB();