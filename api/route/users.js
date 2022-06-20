const express = require("express");
const router = express.Router();

const sequelize = require("../util/database");
const User = require("../models/user");

//-------------------------------------------------------signup
router.post("/", async (req, res) => {
  try {
    const temUserName = req.body.name;
    const temUserEmail = req.body.email;
    const temUserPhone = req.body.phone;
    if (temUserName && temUserEmail && temUserPhone) {
      if (
        temUserName.length > 0 &&
        temUserEmail.length > 0 &&
        temUserPhone.length > 0
      ) {
        sequelize.sync().then(async () => {
          const isExist = await User.findOne({
            where: { email: temUserEmail },
          });
          if (isExist) {
            res.status(401).json({
              error: " email already signedup  ",
            });
          } else {
            const newUser = await User.create({
              name: temUserName,
              email: temUserEmail,
              phone: temUserPhone,
            });
            res.status(200).json({
              message: "contact created successfully!",
            });
          }
        });
      } else {
        res.status(401).json({
          error: " name ,email and phone can not be empty",
        });
      }
    } else {
      res.status(401).json({
        error: "enter name ,email and phone",
      });
    }
  } catch {
    res.status(500).json({
      message: "signup failed",
    });
  }
});
//-------------------------------------------------------login
// router.post("/login", async (req, res) => {
//   try {
//     const temUserName = req.body.name;

//     const temUserPhone = req.body.phone;

//     if (temUserName && temUserPhone) {
//       sequelize.sync().then(async () => {
//         const isExist = await User.findOne({
//           where: { name: temUserName },
//         });
//         if (isExist) {
//           const isValidPassword = bcrypt.compareSync(
//             temUserPhone,
//             isExist.password
//           );
//           if (isValidPassword) {
//             //..................generate token
//             const token = jwt.sign(
//               {
//                 username: isExist.name,
//                 userId: isExist.id,
//               },
//               process.env.JWT_SECRET,
//               { expiresIn: "24h" }
//             );
//             res.status(200).json({
//               access_token: token,
//               message: "Login successful!",
//             });
//           } else {
//             res.status(401).json({
//               error: "User name and password did not match",
//             });
//           }
//         } else {
//           res.status(401).json({
//             error: "This user name is not signed up ",
//           });
//         }
//       });
//     } else {
//       res.status(401).json({
//         error: "enter name and password ",
//       });
//     }
//   } catch {
//     res.status(500).json({
//       error: "Authentication failed",
//     });
//   }
// });

// router.get("/all", checkLogin, async (req, res) => {
//   try {
//     sequelize.sync().then(async () => {
//       const allUser = await User.findAll();
//       res.status(200).json({
//         data: allUser,
//       });
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "There are no user data!!",
//     });
//   }
// });
module.exports = router;
