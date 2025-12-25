const express = require('express');
const app = express();
app.use(express.json());

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

const posts = []

app.get("/posts", (req, res) => {
    res.send(posts);
});

app.get("/posts/:id/comments", (req, res) => {
    const post_id = parseInt(req.params.id);
    const post = posts.find(p => p.id === post_id);
    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }
    res.json(post.comments);
})

app.post("/posts", (req, res) => {
    const post = {
        id: posts.length + 1,
        title: req.body.title,
        content: req.body.content,
        comments: []
    }
    posts.push(post);

    console.log(`new post ${JSON.stringify(post)}`);
    console.log(`Posts: ${JSON.stringify(posts)}`);
    res.status(201).json(post);
});

app.post("/posts/:id/comments", (req, res) => {
    const post_id = parseInt(req.params.id);
    const post = posts.find(p => p.id === post_id);
    if (!post) {
        return res.status(404).end();
    }
    const comment = {
        id: Date.now().toString(),
        content: req.body.content
    };
    post.comments.push(comment);
    res.status(201).json(comment);
})
