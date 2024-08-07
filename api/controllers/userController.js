const user = require("../models/User");
const jwt = require("jsonwebtoken");
const e = require("cors");
const argon2 = require("argon2");
const constants = require("../config/constants");
const resetToken = require("../models/resetToken");
const userRoles = require("../models/Role");
// const emailhelper = require('../config/sendEmail');
//const registerToken = require('../models/registerToken');
const crypto = require("crypto");
const { resetPasswordEmail } = require("../config/sendEmail");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: constants.cloud_name,
  api_key: constants.api_key,
  api_secret: constants.api_secret,
});
module.exports = {
  //log user in
  login(req, res) {
    const { email, password } = req.body;

    user
      .findOne({ email: email, isActive: true, isEnabled: true })
      .populate("role")
      .then((data) => {
        //if user is in database
        if (data) {
          //compare hashed password
          argon2
            .verify(data.password, password)
            .then((result) => {
              console.log(result);
              if (result) {
                const payload = {
                  _id: data._id,
                  name: data.name,
                  email: data.email,
                  role: data.role?.role || null,
                };
                //generate token
                jwt.sign(
                  { payload },
                  constants.JWT_SECRET,
                  { expiresIn: "1d" },
                  (err, token) => {
                    res.json({
                      success: true,
                      data: {
                        _id: data._id,
                        name: data.name,
                        email: data.email,
                        role: data.role?.role || null,
                        token: token,
                      },
                    });
                  }
                );
              } else {
                return res.json({
                  success: false,
                  data: "Username or Password is not correct",
                });
              }
            })
            .catch((err) => {
              return res.json({
                success: false,
                data: `${err.message} Argon`,
              });
            });
        } else {
          //No user registered with the email.
          return res.json({
            success: false,
            data: "Login failed Try again",
          });
        }
      })
      .catch((err) => {
        res.json({
          success: false,
          data: err.message,
        });
      });
  },
  //generate token for reseting password
  resetPassword(req, res) {
    clientURL = constants.clientUrl;
    const { email } = req.body;
    user
      .findOne({ email: email })
      .then((userdetails) => {
        if (!userdetails) {
          return res.json({
            success: false,
            data: "Invalid email address",
          });
        } else {
          resetToken
            .findOne({ userId: userdetails._id })
            .then((data) => {
              let resetTokenString = crypto.randomBytes(32).toString("hex");
              if (data) {
                //token exist
                //delete token
                resetToken
                  .deleteOne({ userId: userdetails._id })
                  .then(function (d) {
                    //hash token
                    argon2
                      .hash(resetTokenString)
                      .then((hashedtoken) => {
                        const newToken = new resetToken({
                          userId: userdetails._id,
                          token: hashedtoken,
                          createdAt: Date.now(),
                        });
                        //creating new token
                        return newToken
                          .save()
                          .then((d) => {
                            const link = `${clientURL}/passwordReset/${resetTokenString}/${userdetails._id}`;
                            console.log(link);

                            //	email Password
                            resetPasswordEmail(
                              userdetails.email,
                              "Reset Password",
                              { name: userdetails.name, link: link }
                            );
                            res.json({
                              success: true,
                              data: "success",
                            });
                          })
                          .catch((err) =>
                            res.json({
                              success: false,
                              data: "Saving token" + err.message,
                            })
                          );
                      })
                      .catch((err) => {
                        return res.json({
                          success: false,
                          data: "Argon" + err.message,
                        });
                      });
                  })
                  .catch(function (err) {
                    return res.json({
                      success: false,
                      data: err.message,
                    });
                  });
              } else {
                argon2
                  .hash(resetTokenString)
                  .then((hashedtoken) => {
                    const newToken = new resetToken({
                      userId: userdetails._id,
                      token: hashedtoken,
                      createdAt: Date.now(),
                    });
                    //creating new token
                    return newToken
                      .save()
                      .then((d) => {
                        const link = `${clientURL}/passwordReset/${resetTokenString}/${userdetails._id}`;
                        //	console.log(link);
                        //email Password reset link
                        // emailhelper.resetPasswordEmail(
                        // 	userdetails.email,
                        // 	'Reset Password',
                        // 	{ name: userdetails.name, link: link }
                        // );
                        res.json({
                          success: true,
                          data: "Success",
                        });
                      })
                      .catch((err) =>
                        res.json({
                          success: false,
                          data: "Saving token" + err.message,
                        })
                      );
                  })
                  .catch((err) => {
                    return res.json({
                      success: false,
                      data: "Argon" + err.message,
                    });
                  });
              }
            })
            .catch((err) => {
              return res.json({
                success: false,
                data: err.message,
              });
            });
        }
      })
      .catch((err) => {
        res.json({
          success: false,
          data: err.message,
        });
      });
  },
  //register user
  addUser(req, res) {
    const { name, password, email } = req.body;
    let emailDomain = email.split("@");
    let domain = emailDomain[1];
	if(!constants.allowedDomains.includes(domain)){
		return res.json({
			success:false,
			data:"You are not allowed to register using that email."
		})
	}

    user
      .findOne({ email: email })
      .then((data) => {
        if (data)
          return res.json({
            success: false,
            data: "Account already registered",
          });
        else {
          argon2
            .hash(password)
            .then((hashedPassword) => {
              const newuser = new user({
                name: name,
                email: email,
                password: hashedPassword,
                isActive: false,
                isEnabled: false,
              });
              //save new user
              return newuser
                .save()
                .then((data) => {
                  // TO DO Send email
                  //registerAccount(data, req, res);
                  return res.json({
                    success: true,
                    //data: data,
                  });
                })
                .catch((err) => {
                  return res.json({
                    success: false,
                    data: "USER ACCOUNT" + err.message,
                  });
                  console.log("User Validation failed");
                });
            })
            .catch((err) => {
              return res.json({
                success: false,
                data: "Argon" + err.message,
              });
            });
        }
      })
      .catch((err) => {
        return res.json({
          success: false,
          data: "Find Account" + err.message,
        });
      });
  },
  // Add user by administrator
  addNewUser(req, res) {
    const { name, roleid, email, isActive, isEnabled } = req.body;
	let emailDomain = email.split("@");
    let domain = emailDomain[1];
	if(!constants.allowedDomains.includes(domain)){
		return res.json({
			success:false,
			data:"You are not allowed to register using that email."
		})
	}
    user
      .findOne({ email: email })
      .then((data) => {
        if (data)
          return res.json({
            success: false,
            data: "Account already registered",
          });
        else {
          argon2
            .hash("password")
            .then((hashedPassword) => {
              const newuser = new user({
                name: name,
                email: email,
                role: roleid,
                password: hashedPassword,
                isActive: true,
                isEnabled: true,
              });
              //save new user
              return newuser
                .save()
                .then((data) => {
                  // TO DO Send email
                  //registerAccount(data, req, res);
                  return res.json({
                    success: true,
                  });
                })
                .catch((err) => {
                  return res.json({
                    success: false,
                    data: "USER ACCOUNT" + err.message,
                  });
                  console.log("User Validation failed");
                });
            })
            .catch((err) => {
              return res.json({
                success: false,
                data: "Argon" + err.message,
              });
            });
        }
      })
      .catch((err) => {
        return res.json({
          success: false,
          data: "Find Account" + err.message,
        });
      });
  },
  //Get more users from
  findAll(req, res) {
    user
      .find()
      .select("-password")
      .populate("role")
      .exec((err, users) => {
        if (err) return res.json(err);
        res.json(users);
      });
  },
  //get user
  findSingleUser(req, res) {
    const { id } = req.params;
    user
      .findById(id)
      .select("-password")

      .populate("role")

      .exec((err, data) => {
        if (err) return res.json(err);
        res.json(data);
      });
  },
  //get user
  findloggedInUser(req, res) {
    const { id } = req.params;
    user
      .findById(id)
      .select("-password")
      .populate("role")
      .exec((err, data) => {
        if (err) return res.json(err);
        res.json(data);
      });
  },
  //get users by role
  getUsersByRole(req, res) {
    const { role } = req.body;
    userRoles
      .find({ role: role })
      .then((foundRole) => {
        if (foundRole.length > 0) {
          user
            .find({ role: foundRole[0]._id })
            .select("-password")
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          res.json({ message: "Role not found" });
        }
      })
      .catch((err) => res.json(err));
  }, //get users by role
  getAdmins(req, res) {
    const rolesToSearch = ["Admin", "Agent"]; // Specify the roles to search

    userRoles
      .find({ role: { $in: rolesToSearch } }) // Search for roles in the specified array
      .then((foundRoles) => {
        if (foundRoles.length > 0) {
          const roleIds = foundRoles.map((role) => role._id);

          user
            .find({ role: { $in: roleIds } })
            .select("-password")
            .populate("role")
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          res.json({ message: "Roles not found" });
        }
      })
      .catch((err) => res.json(err));
  },
  //get clients
  getClients(req, res) {
    const rolesToSearch = ["User"]; // Specify the roles to search

    userRoles
      .find({ role: { $in: rolesToSearch } }) // Search for roles in the specified array
      .then((foundRoles) => {
        if (foundRoles.length > 0) {
          const roleIds = foundRoles.map((role) => role._id);

          user
            .find({ role: { $in: roleIds } })
            .select("-password")

            .populate("role")

            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        } else {
          res.json({ message: "Roles not found" });
        }
      })
      .catch((err) => res.json(err));
  },
  //updateUserDetails
  updateUserDetails(req, res) {
    const { id } = req.params;
    const { name, role, email, isActive, isEnabled } = req.body;
    user
      .updateOne(
        { _id: id },
        {
          $set: {
            name: name,
            email: email,
            role: role,
            isActive: isActive,
            isEnabled,
          },
        }
      )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //update user signature
  addUserSignature(req, res) {
    const { id } = req.params;
    const { signature } = req.body;
    user
      .updateOne(
        { _id: id },
        {
          $set: {
            signature: signature,
          },
        }
      )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //update user role
  addUserRole(req, res) {
    const { email, role } = req.body;
    user
      .updateOne(
        { email: email },
        {
          $set: {
            role: role,
          },
        }
      )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //Update user details
  updateUser(req, res) {
    const { id } = req.params;
    const { name, company, role, email, isActive } = req.body;
    user
      .findOne({ email: email })
      .then((data) => {
        token = "";
        if (data)
          return res.json({
            msg: "Username Already taken ...Plz Try another one",
          });
        else {
          //update user
          user
            .updateOne(
              { _id: id },
              {
                $set: {
                  name: name,
                  email: email,
                  role: role,
                  isActive: isActive,
                },
              }
            )
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
        }
      })
      .catch((err) => res.json(err.message));
  },
  //removes user
  deleteUser(req, res) {
    const { id } = req.params;
    user
      .deleteOne({ _id: id })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
  //Resets users password
  passwordReset(req, res) {
    const { token, userId, password } = req.body;
    resetToken
      .findOne({ userId })
      .then((savedToken) => {
        //token with this user not found
        if (!savedToken) {
          return res.json({
            success: false,
            data: "Invalid or expired password reset token",
          });
        }
        //token available compare tokens
        argon2
          .verify(savedToken.token, token)
          .then((result) => {
            if (!result) {
              return res.json({
                success: false,
                data: "Invalid or expired password reset token",
              });
            }
            //hashes are the same hash ..so hash new pasword
            argon2
              .hash(password)
              .then((hashedPassword) => {
                //update users password in the database
                user
                  .updateOne(
                    { _id: userId },
                    {
                      $set: {
                        password: hashedPassword,
                      },
                    }
                  )
                  .then((data) => {
                    if (data.modifiedCount > 0) {
                      resetToken
                        .deleteOne({ userId: userId })
                        .then((result) => {
                          if (result.deletedCount > 0) {
                            return res.json({
                              success: true,
                              data: "Pass",
                            });
                          }
                        })
                        .catch((err) => {
                          return res.json({
                            success: false,
                            data: "Here" + err.message,
                          });
                        });
                    }
                  })
                  .catch((err) => {
                    return res.json({
                      success: false,
                      data: err.message,
                    });
                  });
              })
              .catch((err) => {
                return res.json({
                  success: false,
                  data: "Argon" + err.message,
                });
              });
          })
          .catch((err) => {
            return res.json({
              success: false,
              data: "Argon" + err.message,
            });
          });
      })
      .catch((err) => {
        return res.json({
          success: false,
          data: err.message,
        });
      });
  },
};
