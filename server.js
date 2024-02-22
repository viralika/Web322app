const legoData = require("./modules/legoSets");
const express = require("express");
const path = require("path");
const app = express();
const HTTP_PORT = process.env.PORT || 3000;

app.use(express.static("public"));
legoData.initialize();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get("/lego/sets", async (req, res) => {
  const theme = req.query.theme;

  try {
    let data;

    if (theme) {
      data = await legoData.getSetsByTheme(theme);
    } else {
      data = await legoData.getAllSets();
    }

    if (data.length === 0) {
      res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).sendFile(path.join(__dirname, "/views/404.html"));
  }
});

app.get("/lego/sets/:setNum", async (req, res) => {
  const setNum = req.params.setNum;

  try {
    const data = await legoData.getSetByNum(setNum);

    if (data) {
      res.json(data);
    } else {
      res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
    }
  } catch (error) {
    res.status(500).sendFile(path.join(__dirname, "/views/404.html"));
  }
});

// Define a middleware for handling undefined routes (404 page)
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});

app.listen(HTTP_PORT, () => console.log(`Server listening on: http://localhost:${HTTP_PORT}`));
