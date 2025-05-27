const { check , validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    active: "login",
    title: "login",
    isLoggedIn: false,
    oldInput: {
      username: "",
    },
  });
};

exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ userName: username })
  if (!user) {
    return res.status(400).render("auth/login", {
      active: "login",
      title: "Login",
      isLoggedIn: false,
      errors: ["User not found"],
      oldInput: {
        username: username,
      }
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  
  if (!isMatch) {
    return res.status(400).render("auth/login", {
      active: "login",
      title: "Login",
      isLoggedIn: false,
      errors: ["Invalid password"],
      oldInput: {
        username: username,
      }
    });
  }
  
  req.session.isLoggedIn = true;

  req.session.user = user;
  console.log("isMatch:", req.session.user);
  await req.session.save();
      res.redirect("/host");
    }
  


exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/auth/login");
  })
}

exports.getSignUp = 
  (req, res, next) => {
  res.render("auth/signUp", {
    active: "signUp",
    title: " Sign Up",
    isLoggedIn: false,
    oldInput: {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      userType: ""
    },
  });
}

exports.postSignUp = [
  check("firstname")
    .isLength({ min: 3 })
    .withMessage("First Name must be at least 3 characters long")
    .trim()
    .matches(/^[A-Za-z]+$/)
    .withMessage("First Name must contain only letters"),
  
  check("lastname")
    // * ka matlab hai ki 0 ya zyada baar ho sakta hai
    .matches(/^[A-Za-z]*$/)
    .withMessage("Last Name must contain only letters"),
  
  check("username")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one Uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one Lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character")
    .trim(),
  
  // for custom validation to check if confirmPassword matches password
  check("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  
  check('userType')
    .notEmpty()
    .withMessage("User Type is required")
    .isIn(['host', 'guest'])
    .withMessage("User Type must be either 'host' or 'guest'"),
  
  check('terms')
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value, {req}) => {
      if (!value) {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),
  
  
  
  
  
  (req, res, next) => {
    const { firstname, lastname, username, password, userType } = req.body;

    //validationResult provide errors if any validation fails
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("auth/signUp", {
        active: "signUp",
        title: "Sign Up",
        isLoggedIn: false,
        errors: errors.array().map(err => err.msg),
        oldInput: {
          firstname,
          lastname,
          username,
          password,
          userType
        }
      });
    }

 bcrypt.hash(password, 12)
    .then(hashedPassword => {
      // Create a new user with the hashed password
      const user = new User({
        firstName: firstname,
        lastName: lastname,
        userName: username,
        password: hashedPassword,
        userType: userType
      });
      user.save()
      .then(() => {
        res.redirect("/auth/login");
      })
      .catch(err => {
        console.error("Error saving user:", err);
        res.status(500).render("auth/signUp", {
          active: "signUp",
          title: "Sign Up",
          isLoggedIn: false,
          errors: ["An error occurred while signing up. Please try again."],
          oldInput: {
            firstname,
            lastname,
            username,
            password,
            userType
          }
        });
      });
    })

  
      
}
]



