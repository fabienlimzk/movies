const router = require("express").Router();
const Actor = require("../models/actor.model");

router.get("/", (req, res) => {
  Actor.find()
  .then((actors) => {
    res.render("actors/index", { actors })
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/create", (req, res) => {
  res.render("actors/create");
});

router.post("/create", (req, res) => {
  let actorData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  let actor = new Actor(actorData);

  actor.save()
  .then(() => {
    res.redirect("/actors");
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/show/:id", (req, res) => {
  Actor.findById(req.params.id)
  .then((actor) => {
    res.render("actors/show", { actor });
  })
  .catch((err) => {
    console.log(err);
  });
});

// edit actor at edit actor page
router.get("/edit/:id", (req, res) => {
  Actor.findById(req.params.id)
  .then((actor) => {
    res.render("actors/edit", { actor });
  }) 
  .catch((err) => {
    console.log(err);
  });
});

router.post("/edit/:id", (req, res) => {
  // req.body
  Actor.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect("/actors");
    console.log("edit success");
  })
  .catch((err) => {
    console.log(err);
  });
});

// delete actor at actor index page
router.get("/delete/:id", (req, res) => {
  Actor.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/actors");
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;