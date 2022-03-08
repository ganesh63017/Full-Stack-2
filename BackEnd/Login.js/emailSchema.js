let a = {
  _id: "6225f5ab816941d992bc7d8d",
  updatedAt: "2022-03-07T12:08:11.193Z",
  createdAt: "2022-03-07T12:08:11.193Z",
  fileId: "6225f5a9816941d992bc7d8a",
  unsignedDocument:
    "http://filesuat.esignfor.us/2022-3/7/6225f5a9816941d992bc7d8a.pdf",
  title: "fbxb",
  email: "ameya.ghatkar@angularminds.in",
  userId: "6221f3f4816941d992bc7c98",
  thumbnail: "https://apiuat.pdfdoc.io/thumbnails/6225f5a9816941d992bc7d8a.jpg",
  __v: 0,
  archived: [],
  scaleFactor: 1.3,
  digitallySigned: false,
  documentHistory: [
    {
      file: "http://filesuat.esignfor.us/2022-3/7/6225f5a9816941d992bc7d8a.pdf",
      fileId: "6225f5a9816941d992bc7d8a",
      timestamp: "2022-03-07T12:08:11.167Z",
      by: "ameya.ghatkar@angularminds.in",
      _id: "6225f5ab816941d992bc7d8e",
      legalData: {
        location: {
          country: "IN",
          countryCode: "IN",
          region: "Maharashtra",
          regionCode: "",
          city: "Pune",
          postal: "411001",
          ip: "175.100.138.135",
          latitude: 18.5196,
          longitude: 73.8554,
          timezone: "Asia/Kolkata",
        },
        SSN: "",
        OTP: "",
        token:
          "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7Il9pZCI6IjYyMjFmM2Y0ODE2OTQxZDk5MmJjN2M5OCIsInVwZGF0ZWRBdCI6IjIwMjItMDMtMDRUMTE6MTI6MjEuODcwWiIsImNyZWF0ZWRBdCI6IjIwMjItMDMtMDRUMTE6MTE6NDguMjE1WiIsIm5hbWUiOiJBbWV5YSIsImVtYWlsIjoiYW1leWEuZ2hhdGthckBhbmd1bGFybWluZHMuaW4iLCJwaG9uZSI6IjA5ODc2NTQzMjEiLCJnZW5kZXIiOiJtYWxlIiwicHJvZmlsZVBpY3R1cmUiOiIiLCJfX3YiOjAsInN0YXR1cyI6IkFjdGl2ZSJ9LCJleHAiOjE2NDY3MTI5MTMyNjJ9.rIck4KE6bEhOE-qNKpew-YGM5AKRFj_JwHMl7NWM44U",
        ip: "175.100.138.135",
      },
    },
  ],
  signers: [
    {
      email: "ameya.ghatkar@angularminds.in",
      coordinates: [],
    },
    {
      email: "ganeshchilkala11@gmail.com",
      coordinates: [],
    },
  ],
};

const mongoose = require("mongoose");

const emailsSchema = mongoose.Schema(
  {
    fileId: { type: String },
    unsignedDocument: { type: String },
    title: { type: String },
    email: { type: String },
    userId: { type: String },
    thumbnail: { type: String },
    archived: [],
    scaleFactor: { type: String },
    digitallySigned: false,
    documentHistory: [
      {
        file: { type: String },
        fileId: { type: String },
        timestamp: { type: String },
        by: { type: String },
        _id: { type: String },
      },
    ],
    signers: [
      {
        email: { type: String },
        coordinates: [],
      },
    ],
  },
  { timestamp: true }
);

module.exports = mongoose.model("sendemaildata", emailsSchema);
