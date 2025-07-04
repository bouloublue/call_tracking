const express = require('express');
const bcrypt = require('bcryptjs');
const {upload} = require('../../middlewares/upload');
const router = express.Router();

// Create a new user
router.post('/', upload.single('profile_img'), async (req, res) => {
  try {
    const { name, email, phone, password, role, address, status } = req.body;

    if (!req.body) {
      return res.status(400).json({ error: 'User data is required' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save image path if uploaded
    const profileImgPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = await global.db.models.User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      role: role,
      address: address ,
      profile_img: profileImgPath,
      status: status,
    });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      profile_img: newUser.profile_img,
      role: newUser.role,
      status: newUser.status,
      created_at: newUser.created_at
    });
  } catch (error) {
    console.error('Error creating user:', error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all clients

router.get('/clients', async (req, res) => {
  try {
    const clients = await global.db.models.User.findAll({
      where: { role: 'client' },
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await global.db.models.User.findAll({
      where: { 
        deleted_at : null
       },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await global.db.models.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user details

router.put('/:id', upload.single('profile_img'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, role, address, status } = req.body;

    const user = await global.db.models.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    await user.update({
      name,
      email,
      phone,
      role,
      address,
      status,
      profile_img: req.file ? `/uploads/${req.file.filename}` : user.profile_img,
    });

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await global.db.models.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Soft delete
    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
