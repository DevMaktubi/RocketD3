const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];











// MIDDLEWARES

// GET
app.get("/repositories", (req, res) => {
  return res.json(repositories);
});

// POST
app.post("/repositories", (req, res) => {
  const { title, url, techs } = req.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository)

  return res.status(201).json(repository);
});

app.post("/repositories/:id/like", (req, res) => {
  const { id } = req.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  repositories[repositoryIndex].likes++

  return res.status(201).json({likes: repositories[repositoryIndex].likes});
});

// PUT

app.put("/repositories/:id", (req, res) => {
  const { id } = req.params;
  const {title,techs,url} = req.body;

  const updatedRepository = {
    title,
    techs,
    url
  }

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository;

  return res.status(201).json(repository);
});

// DELETE

app.delete("/repositories/:id", (req, res) => {
  const { id } = req.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return res.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return res.status(204).send();
});

module.exports = app;
