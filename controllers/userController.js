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

export function isItAdmin(req){
  let isAdmin = false;

  if(req.user != null){
    if(req.user.role == "admin"){
      isAdmin = true;
    }
  }

  return isAdmin;
}


// piyumal.doe@example.com - securePassword123 - customer - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6InBpeXVtYWwuZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6ImFkbWluIiwicHJvZmlsZVBpY3R1cmUiOiJodHRwczovL3d3dy5leGFtcGxlLmNvbS9pbWFnZXMvcHJvZmlsZS9qb2huX2RvZS5qcGciLCJpYXQiOjE3Mzg0NjU0NTN9.ZMTYclaizlQ3B2FjuWkksLTpRoGGOmd9x0HYrGiB5O0
// john.doe@example.com - securePassword123 - admin - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwicm9sZSI6ImN1c3RvbWVyIiwicHJvZmlsZVBpY3R1cmUiOiJodHRwczovL3d3dy5leGFtcGxlLmNvbS9pbWFnZXMvcHJvZmlsZS9qb2huX2RvZS5qcGciLCJpYXQiOjE3MzgyNTkwODh9.1d5Afk8N00PatNcBxvPjj571D19nJfh-i7vV51JCqr8
// customer1@example.com - securePassword123 - customer - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImN1c3RvbWVyMUBleGFtcGxlLmNvbSIsInJvbGUiOiJjdXN0b21lciIsInByb2ZpbGVQaWN0dXJlIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9wcm9maWxlLmpwZyIsImlhdCI6MTczODQ2ODc2Nn0.Oz4iVTe3C_eQO9Ca4AgAw_D7HIEStb-6Wc3sOGUVrPI
//admin1@example.com - securePassword123 - customer - eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJKb2huIiwibGFzdE5hbWUiOiJEb2UiLCJlbWFpbCI6ImFkbWluMUBleGFtcGxlLmNvbSIsInJvbGUiOiJhZG1pbiIsInByb2ZpbGVQaWN0dXJlIjoiaHR0cHM6Ly9leGFtcGxlLmNvbS9wcm9maWxlLmpwZyIsImlhdCI6MTczODQ2ODg0M30.ZBbJeXHUUDmuMjFTAMTVT_KjEFNL-t9eRQJqZMOi6CE