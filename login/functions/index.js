const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const {admin, db} = require("./firebase-config");

const app = express();
app.use(bodyParser.json());

// Middleware untuk verifikasi Firebase ID token
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({error: "Unauthorized"});
  }

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken; // Menyimpan informasi token ke dalam req.user
    next();
  } catch (error) {
    return res.status(401).json({error: "Invalid token"});
  }
};

// Endpoint untuk registrasi pengguna
app.post("/register", async (req, res) => {
  const {email, password, displayName} = req.body;

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName,
    });

    await db.collection("users").doc(userRecord.uid).set({
      email,
      displayName,
      createdAt: new Date(),
      age: null,
      gender: null,
      height: null,
      weight: null,
    });

    res.status(201).json({message: "User registered successfully"});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Endpoint untuk login
app.post("/backend-login", async (req, res) => {
  const {idToken} = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const uid = decodedToken.uid;

    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const user = userDoc.data();

    res.status(200).json({
      message: "Login successful",
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
      },
    });
  } catch (error) {
    res.status(400).json({error: "Invalid token or user not found"});
  }
});

// Endpoint untuk melihat profil pengguna
app.get("/profile", authenticate, async (req, res) => {
  const {uid} = req.user; // Ambil UID pengguna dari token

  try {
    const userDoc = await db.collection("users").doc(uid).get();
    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    const user = userDoc.data();

    res.status(200).json({
      message: "Profile fetched successfully",
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
      },
    });
  } catch (error) {
    res.status(400).json({error: "User not found"});
  }
});

// Endpoint untuk mengedit data pengguna
app.put("/user/:uid", authenticate, async (req, res) => {
  const {uid} = req.params;
  const {age, gender, height, weight} = req.body;

  // Pastikan hanya pemilik data yang bisa mengedit profilnya
  if (req.user.uid !== uid) {
    return res.status(403).json({
      error: "You are not authorized to update this profile",
    });
  }

  try {
    await db.collection("users").doc(uid).update({
      age,
      gender,
      height,
      weight,
      updatedAt: new Date(),
    });

    res.status(200).json({message: "User updated successfully"});
  } catch (error) {
    res.status(400).json({error: error.message});
  }
});

// Endpoint untuk logout
app.post("/logout", (req, res) => {
  // Logout logic biasanya ditangani di frontend
  res.status(200).json({message: "Logout successful"});
});

// Menyajikan API sebagai Firebase Cloud Function
exports.api = functions.https.onRequest(app);
