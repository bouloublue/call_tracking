const express = require("express");
const bcrypt = require("bcryptjs");
const { upload } = require("../../middlewares/upload");
const router = express.Router();
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../../middlewares/auth");
const { Op } = require("sequelize");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_NUMBER;
const client = twilio(accountSid, authToken);

// Create a new user
// router.post("/", upload.single("profile_img"), async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       phone,
//       countryCode,
//       password,
//       role,
//       company,
//       address,
//       status,
//       zipCode,
//     } = req.body;

//     if (!req.body) {
//       return res.status(400).json({ error: "User data is required" });
//     }

//     const existingUser = await global.db.models.User.findOne({
//       where: {
//         email: email,
//         deleted_at: null,
//       },
//     });

//     if (existingUser) {
//       return res.status(409).json({ error: "User already Registered" });
//     }

//     const fullPhone = `${countryCode}${phone}`;
//     const otpRecord = await global.db.models.OtpVerification.findOne({
//       where: { phone: fullPhone, verified: true },
//     });

//     if (!otpRecord) {
//       return res
//         .status(403)
//         .json({ error: "Phone number not verified via OTP" });
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);
//     const profileImgPath = req.file ? `/uploads/${req.file.filename}` : null;

//     const newUser = await global.db.models.User.create({
//       name,
//       email,
//       phone: fullPhone,
//       countryCode,
//       company,
//       password: hashedPassword,
//       role,
//       address,
//       zipCode,
//       profile_img: profileImgPath,
//       status,
//     });

//     // Optionally: delete OTP record
//     // await otpRecord.destroy();

//     const token = jwt.sign(
//       { id: user.id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
//     );

//     res.status(201).json({
//       message: "User registered successfully",
//       token,
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
//       zipCode: newUser.zipCode,
//     });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     if (error.name === "SequelizeUniqueConstraintError") {
//       return res.status(409).json({ error: "Email or phone already exists" });
//     }
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

router.post("/", upload.single("profile_img"), async (req, res) => {
  const t = await global.db.sequelizeConfig.transaction();
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
        email,
        deleted_at: null,
      },
      transaction: t,
    });

    if (existingUser) {
      await t.rollback();
      return res.status(409).json({ error: "User already Registered" });
    }

    const fullPhone = `${countryCode}${phone}`;
    const otpRecord = await global.db.models.OtpVerification.findOne({
      where: { phone: fullPhone, verified: true },
      transaction: t,
    });

    if (!otpRecord) {
      await t.rollback();
      return res
        .status(403)
        .json({ error: "Phone number not verified via OTP" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profileImgPath = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = await global.db.models.User.create(
      {
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
      },
      { transaction: t }
    );

    // Optionally delete OTP record (within transaction)
    // await otpRecord.destroy({ transaction: t });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    );

    await t.commit();

    res.status(201).json({
      message: "User registered successfully",
      token,
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
    await t.rollback();
    console.error("Error creating user:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({ error: "Email or phone already exists" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all buyers
router.get("/buyers", authMiddleware, async (req, res) => {
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

router.get("/pagination/buyers", authMiddleware, async (req, res) => {
  try {
    // Get query parameters
    const { page = 1, limit = 10, search = "" } = req.query;
    const offset = (page - 1) * limit;

    // Build the where clause
    const where = { 
      role: "buyer",
      ...(search && {
        [Op.or]: [
          { 
            name: { 
              [Op.like]: `%${search.toLowerCase()}%` 
            } 
          },
          { 
            email: { 
              [Op.like]: `%${search.toLowerCase()}%` 
            } 
          },
          { 
            phone: { 
              [Op.like]: `%${search.toLowerCase()}%` 
            } 
          },
          { 
            company: { 
              [Op.like]: `%${search.toLowerCase()}%` 
            } 
          }
        ]
      })
    };

    // Get buyers with pagination and filtering
    const { count, rows } = await global.db.models.User.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [['created_at', 'DESC']]
    });

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        totalItems: count,
        totalPages: Math.ceil(count / limit),
        currentPage: parseInt(page),
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error("Error fetching buyers:", error);
    res.status(500).json({ 
      success: false,
      error: "Internal server error" 
    });
  }
});

// Get all users
router.get("/", authMiddleware, async (req, res) => {
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


router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: "Invalid token payload. User ID missing." });
    }

    const user = await global.db.models.User.findByPk(userId, {
      attributes: { exclude: ["password"] }
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user });
  } catch (err) {
    console.error("Profile route error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get user by ID
router.get("/:id", authMiddleware, async (req, res) => {
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

router.put("/:id", authMiddleware, upload.single("profile_img"), async (req, res) => {
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

router.delete("/:id", authMiddleware, async (req, res) => {
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
router.post("/send-otp", authMiddleware, async (req, res) => {
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
router.post("/verify-otp", authMiddleware, async (req, res) => {
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
