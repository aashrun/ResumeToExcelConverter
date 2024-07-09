const express = require('express');
const router = express.Router();
const parsePdf = require("../ParsePdf/parsePdf")
const multer = require('multer');
let upload = multer({ dest: 'uploads/' });




router.post("/convert", upload.array('pdfs'), parsePdf.pdfParseFunc)




//====================================  Invalid API  ==========================================//
router.all("/**", function (req, res) {
    res.status(404).send({
        message: "The api you requested is not available!"
    })
})




module.exports = router;