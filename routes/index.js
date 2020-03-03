const express = require("express");
const router = express.Router();

function hexToRgb(hex, cb) {
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;
  var obj = {
    red: r,
    green: g,
    blue: b
  };
  cb(obj);
}

function rgbTohex(red, green, blue, cb) {
  var rgb = blue | (green << 8) | (red << 16);
  var result = (0x1000000 + rgb).toString(16).slice(1);
  cb(result);
}

router.get("/", (req, res) => {
  var result = {
    red: "0,128,192"
  };
  var r = "fdf9f9";
  res.render("app", { result: result, r: r });
});

router.post("/", (req, res) => {
  var regex = /["\(\)"]+/gm;
  var hex = req.body.hex.replace("#",'');
  var rgb = req.body.rgb.replace(regex,'');
  var arr = rgb.split(",");
  if (hex.length > 0) {
    hexToRgb(hex, result => {
      res.render("app", { result: result });
    });
  } else {
    rgbTohex(arr[0], arr[1], arr[2], r => {
      res.render("app", { r: r });
    });
  }
});
module.exports = router;
