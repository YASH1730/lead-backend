const db = require('../../database/knex');
const bcrypt = require('bcrypt');

const register = async (req, res) => {

  const {
    user_name,
    mobile,
    aadhar_card,
    driving_licence,
    upi_id,
    password,
  } = req.body;



  if (!user_name || !mobile || !aadhar_card || !password) {
    return res.status(400).json({ error: 'Required fields are missing' });
  }

  try {
    // Check if user already exists by mobile
    const existingUser = await db('users').where({ mobile }).first();
    if (existingUser) {
      return res
        .status(409)
        .json({ error: 'User already exists with this mobile number' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is salt rounds

    // Insert new user
    const [user] = await db('users')
      .insert({
        user_name,
        mobile,
        aadhar_card,
        driving_licence,
        upi_id,
        password: hashedPassword,
        datetime: new Date(),
        status: 'active',
      })
      .returning(['user_id', 'user_name', 'mobile', 'status']);

    res
      .status(201)
      .json({ message: 'User registered successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

const login = async (req, res) => {
  const { mobile, password } = req.body;

  if (!mobile || !password) {
    return res
      .status(400)
      .json({ error: 'Mobile and password are required' });
  }

  try {
    const user = await db('users').where({ mobile }).first();

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        mobile: user.mobile,
        status: user.status,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error during login' });
  }
};

module.exports = {
  register,
  login,
};
