const mongoose = require('mongoose');
const Admin = require('./models/Admin');

async function createAdmin() {
  try {
    // Connect to MongoDB Atlas
    await mongoose.connect('mongodb+srv://22bec091:Punit091%21%23@hostelmanagement.egsry85.mongodb.net/hms?retryWrites=true&w=majority&appName=hostelmanagement', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB Atlas');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists, skipping creation');
      return;
    }

    // Create a new admin with a plain password (it will be hashed automatically)
    const admin = new Admin({
      firstName: 'Punit',
      lastName: 'Sharma',
      
      email: 'admin@gmail.com',
      password: 'admin', // HASHED automatically by pre('save')
      role: 'admin',
    });

    await admin.save();
    console.log('✅ Admin created successfully');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
