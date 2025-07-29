const express = require("express");
const bcrypt = require("bcryptjs");
const { upload } = require("../../middlewares/upload");
const router = express.Router();
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, authToken);

// Create a new user
// router.post('/', upload.single('profile_img'), async (req, res) => {
//   try {
//     const { name, email, phone, countryCode, password, role, company, address, status, zipCode } = req.body;

//     if (!req.body) {
//       return res.status(400).json({ error: 'User data is required' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // Save image path if uploaded
//     const profileImgPath = req.file ? `/uploads/${req.file.filename}` : null;

//     const fullPhoneNumber = `${countryCode}${phone}`;

//     const newUser = await global.db.models.User.create({
//       name,
//       email,
//       phone: fullPhoneNumber,
//       countryCode,
//       company,
//       password: hashedPassword,
//       role: role,
//       address: address,
//       zipCode: zipCode,
//       profile_img: profileImgPath,
//       status: status,
//     });

//     res.status(201).json({
//       id: newUser.id,
//       name: newUser.name,
//       email: newUser.email,
//       phone: newUser.phone,
//       company: newUser.company,
//       address: newUser.address,
//       profile_img: newUser.profile_img,
//       role: newUser.role,
//       status: newUser.status,
//       created_at: newUser.created_at,
//       zipCode: newUser.zipCode
//     });
//   } catch (error) {
//     console.error('Error creating user:', error);
//     if (error.name === 'SequelizeUniqueConstraintError') {
//       return res.status(409).json({ error: 'Email already exists' });
//     }
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// Create a new user
router.post("/", upload.single("profile_img"), async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      countryCode,
      password,
      role,
      company,
      address,
      status,
      zipCode,
    } = req.body;

    if (!req.body) {
      return res.status(400).json({ error: "User data is required" });
    }

    const existingUser = await global.db.models.User.findOne({
      where: {
        email: email,
        deleted_at: null,
      },
    });

    if (existingUser) {
      return res.status(409).json({ error: "User already Registered" });
    }

    const fullPhone = `${countryCode}${phone}`;
    const otpRecord = await global.db.models.OtpVerification.findOne({
      where: { phone: fullPhone, verified: true },
    });

    if (!otpRecord) {
      return res
        .status(403)
        .json({ error: "Phone number not verified via OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profileImgPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = await global.db.models.User.create({
      name,
      email,
      phone: fullPhone,
      countryCode,
      company,
      password: hashedPassword,
      role,
      address,
      zipCode,
      profile_img: profileImgPath,
      status,
    });

    // Optionally: delete OTP record
    // await otpRecord.destroy();

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      company: newUser.company,
      address: newUser.address,
      profile_img: newUser.profile_img,
      role: newUser.role,
      status: newUser.status,
      created_at: newUser.created_at,
      zipCode: newUser.zipCode,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Email or phone already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all buyers
router.get("/buyers", async (req, res) => {
  try {
    const buyers = await global.db.models.User.findAll({
      where: { role: "buyer" },
    });
    res.status(200).json(buyers);
  } catch (error) {
    console.error("Error fetching buyers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await global.db.models.User.findAll({
      where: {
        deleted_at: null,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get user by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await global.db.models.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update user details

router.put("/:id", upload.single("profile_img"), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      phone,
      countryCode,
      role,
      company,
      address,
      status,
      zipCode,
    } = req.body;

    const user = await global.db.models.User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const fullPhone = `${countryCode}${phone}`;

    if (fullPhone !== user.phone) {
      const verifyNumber = await global.db.models.OtpVerification.findOne({
        where: {
          phone: fullPhone,
          verified: true,
        },
      });

      if (!verifyNumber) {
        return res
          .status(400)
          .json({ error: "New phone number is not verified" });
      }
    }

    // Update user details
    await user.update({
      name,
      email,
      phone: fullPhone,
      company,
      role,
      address,
      status,
      zipCode,
      profile_img: req.file
        ? `/uploads/${req.file.filename}`
        : user.profile_img,
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await global.db.models.User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Soft delete
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Send OTP for phone verification

router.post("/send-otp", async (req, res) => {
  const { phone_number } = req.body;

  if (!phone_number)
    return res.status(400).json({ error: "Phone number is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60000);

  // const fullPhone = `${countryCode}${phone}`;

  // Check if OTP already exists for this phone number
  const existingUser = await global.db.models.OtpVerification.findOne({
    where: { phone: phone_number, verified: true },
  });

  if (existingUser) {
    return res.status(400).json({ error: "User number already Verified" });
  }

  const transaction = await global.db.sequelizeConfig.transaction();

  try {
    await global.db.models.OtpVerification.create(
      {
        phone: phone_number,
        otp,
        expires_at: expiresAt,
        verified: false,
      },
      { transaction }
    );

    try {
      await client.messages.create({
        body: `Welcome to Conversion Studio! Your OTP is ${otp}. It will expire in 5 minutes. Please do not share it with anyone.`,
        from: twilioPhone,
        to: phone_number,
      });
    } catch (twilioError) {
      console.error("Twilio error:", twilioError);
      await transaction.rollback();
      return res.status(500).json({ error: "Failed to send OTP via SMS" });
    }
    await transaction.commit();
    console.log(`OTP sent to ${phone_number}: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Failed to send OTP:", err);
    await transaction.rollback();
    res.status(500).json({ error: "Failed to send OTP" });
  }
});

// otp verification routes

router.post("/verify-otp", async (req, res) => {
  const { phone_number, otp } = req.body;

  // const fullPhone = `${countryCode}${phone}`;

  const otpRecord = await global.db.models.OtpVerification.findOne({
    where: { phone: phone_number },
  });

  if (!otpRecord || otpRecord.otp !== otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  if (otpRecord.expires_at < new Date()) {
    return res.status(400).json({ error: "OTP has expired" });
  }

  await otpRecord.update({ verified: true });

  res.status(200).json({ message: "OTP verified successfully" });
});

module.exports = router;
