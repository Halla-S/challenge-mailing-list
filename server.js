const express = require("express");
const app = express();
const lists = require("./data.json");
app.use(express.json());

app.get("/", (req, res) => {
  res.send("try /list to see the names");
});
// Get the names in the list
app.get("/lists", (req, res) => {
  res.json(lists.map((item) => item.name));
  res.status(200);
});

//GET single list

app.get("/lists/:name", (req, res) => {
  const found = lists.some((item) => item.name == req.params.name);
  let list1 = lists.filter((item) => item.name === req.params.name);
  if (found) {
    res.json(list1.map((item) => item));
  } else {
    res.status(400).json({ msg: `No name : ${req.params.name}` });
  }
});

//DELETE single list
app.delete("/lists/:name", (req, res) => {
  const found = lists.some((item) => item.name == req.params.name);
  let list1 = lists.filter((item) => item.name == req.params.name);
  if (found) {
    res.json({
      msg: "list deleted",
      lists: lists.filter((item) => item.name != req.params.name),
    });
  } else {
    res.status(400).json({ msg: `No name : ${req.params.name}` });
  }
});

// PUT - update single list
app.put("/lists/:name", function (req, res) {
  lists.forEach((item, index) => {
    if (item.name == req.params.name) {
      newList = { ...item, ...req.body };
      oldList = lists[index];
      lists[index] = newList;
    }
  });

  res.json({
    success: true,
    newList: newList,
    oldList: oldList,
  });
});

const PORT = process.env.PORT || 5555;
var listener = app.listen(PORT, function () {
  console.log("Listening on port " + listener.address().port);
});
