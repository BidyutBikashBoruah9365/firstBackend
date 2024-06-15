import mongoose from "mongoose";
import express from "express";
import { MongodbUrl } from "./config.js";
import cors from "cors";
const app = express();
app.use(cors())
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
    const BlogData = await Blog.create(BlogObj)
    return res.status(201).send(BlogData)
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

app.get("/api/blog", async (req, res) =>{
  try {
    const Blogs = await Blog.find({})
    return res.status(200).json({
      totalBlogs: Blogs.length,
      data: Blogs
    })
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

app.put("/api/blog/:id", async (req, res) =>{
  try {
    const {id} = req.params
    await Blog.findByIdAndUpdate(id, req.body)
    return res.status(200).json({message:"Blog updated successfully"})
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

app.delete("/api/blog/:id", async (req, res) =>{
  try {
    const {id} = req.params
    await Blog.findByIdAndDelete(id)
    return res.status(200).json({message:"Blog deleted successfully"})
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
