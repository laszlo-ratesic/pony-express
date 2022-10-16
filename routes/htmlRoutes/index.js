const path = require("path");
const router = require("express").Router();

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get("/success", (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/success.html"));
});

router.get('/cancel', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
});

router.get('/checkout', (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/checkout.html"));
});

module.exports = router;
