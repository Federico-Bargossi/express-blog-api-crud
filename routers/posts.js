const express = require("express");
const router = express.Router();
const postsController = require("../controller/postsController")


//index 
router.get("/", postsController.index);

router.get("/search", (req, res) => {
    res.json("questa è la rotta di ricerca")
})

//show
router.get("/:id", postsController.show);

//create - operazione che crea un nuovo elemento nei dati
router.post("/", postsController.create);

//update - aggiornare i dati di un post
router.put("/:id", postsController.update);

router.patch("/:id", postsController.modify);

router.delete("/:id", postsController.destroy);

module.exports = router;