const router = require("express").Router();
const Director = require("../models/director.model");

router.get("/", (req, res) => {
  Director.find()
  .then((directors) => {
    res.render("directors/index", { directors })
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/create", (req, res) => {
  res.render("directors/create");
});

router.post("/create", (req, res) => {
  let directorData = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };

  let director = new Director(directorData);

  director.save()
  .then(() => {
    res.redirect("/directors");
  })
  .catch((err) => {
    console.log(err);
  });
});

router.get("/show/:id", (req, res) => {
  Director.findById(req.params.id)
  .then((director) => {
    res.render("directors/show", { director });
  })
  .catch((err) => {
    console.log(err);
  });
});

// edit director at edit director page
router.get("/edit/:id", (req, res) => {
  Director.findById(req.params.id)
  .then((director) => {
    res.render("directors/edit", { director });
  }) 
  .catch((err) => {
    console.log(err);
  });
});

router.post("/edit/:id", (req, res) => {
  // req.body
  Director.findByIdAndUpdate(req.params.id, req.body)
  .then(() => {
    res.redirect("/directors");
    console.log("edit success");
  })
  .catch((err) => {
    console.log(err);
  });
});

// delete director at director index page
router.get("/delete/:id", (req, res) => {
  Director.findByIdAndDelete(req.params.id)
  .then(() => {
    res.redirect("/directors");
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;