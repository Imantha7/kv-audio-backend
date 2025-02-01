import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export function registerUser(req, res) {
  const data = req.body;

  data.password = bcrypt.hashSync(data.password, 10);
  //#
  const newUser = new User(data);

  newUser
    .save()
    .then(() => {
      res.json({ message: "User registered successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "User registration failed" });
    });
}

export function loginUser(req, res) {
  const data = req.body;

  User.findOne({
    email: data.email,
  }).then(
    (user) => {

    if (user == null) {
      res.status(404).json({ error: "User not found" });
    } else {      
      const isPasswordCorrect = bcrypt.compareSync(data.password, user.password);

      if (isPasswordCorrect) {
        const token = jwt.sign({
          firstName : user.firstName,
          lastName : user.lastName,
          email : user.email,
          role : user.role,
          profilePicture : user.profilePicture
        },process.env.JWT_SECRET);

        res.json({ message: "Login successful" , token : token});

      } else {
        res.status(401).json({ error: "Login failed" });
      }
    }
  });

}


// piyumal.doe@example.com - securePassword123 - customer
// john.doe@example.com - securePassword123 - admin - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwicHJvZmlsZVBpY3R1cmUiOiJodHRwczovL3d3dy5leGFtcGxlLmNvbS9pbWFnZXMvcHJvZmlsZS9qb2huX2RvZS5qcGciLCJpYXQiOjE3MzgyNTkwODh9.1d5Afk8N00PatNcBxvPjj571D19nJfh-i7vV51JCqr8