require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

mongoose.connect('mongodb+srv://22bec091:Punit091!#@hostelmanagement.egsry85.mongodb.net/?retryWrites=true&w=majority&appName=hostelmanagement', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));

async function createAdmin() {
  const admin = new Admin({
    firstName: "Punit",
    lastName: "Sharma",
    email: "admin@gmail.com",
    password: "admin", 
    role: "admin"
  });

  try {
    await admin.save();
    console.log('Admin created successfully');
  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
