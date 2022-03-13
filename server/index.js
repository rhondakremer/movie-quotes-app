const express = require("express");
const cors = require("cors");
const movies = require("./data/movies");

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

app.get("/api/:movieId", (req, res) => {
  const { movieId } = req.params;
  if (movies[movieId]) {
    res.json({ title: movies[movieId].title });
  } else {
    res.status(404).send();
  }
});

app.get("/api/:movieId/blocks", (req, res) => {
  const { movieId } = req.params;
  if (movies[movieId]) {
    res.json({ blocks: movies[movieId].blocks });
  } else {
    res.status(404).send();
  }
});
