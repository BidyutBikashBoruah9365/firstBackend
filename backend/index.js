import mongoose from "mongoose";
import express from "express";
import { MongodbUrl } from "./config.js";
const app = express();
app.use(express.json())
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  body: {
    type: String
  },
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  meta: {
    votes: Number,
    favs: Number
  }
});

const Blog = mongoose.model('Blog', blogSchema);

app.get("/", function (req, res) {
  res.send("Hello people");
});

app.post("/api/blog", async (req, res) =>{
  try {
    const BlogObj = {
      title: req.body.title,
      author: req.body.author,
      body: req.body.body
    }
    const BlogData = await Blog(BlogObj)
    res.status(201).send(BlogData)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

mongoose
  .connect(MongodbUrl)
  .then(() => {
    console.log("Connected to database!");
    app.listen(5000, () => {
      console.log("Server running on port 5000 ");
    });
  })
  .catch((error) => {
    console.log(error);
  });
