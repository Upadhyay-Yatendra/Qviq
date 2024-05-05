const express = require('express')
const multer = require('multer');
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const linkTree = require('../database/models/linkTree')

const storage = multer.diskStorage({
    destination: './static/images',
    filename: function (req, file, cb) {
        cb(null, `${req.header.username}.${file.mimetype.split('/')[1]}`);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage, fileFilter })


router.post('/edit', fetchUser, async (req, res) => {
    const data = await linkTree.updateOne({ username: req.body.username }, req.body).catch((e) => {
        res.json({
            'error': "Something went wrong"
        })
    }
    )
    res.json({
        'msg': "data submitted",
        'data': data
    })
})

router.post('/uploadImage', fetchUser, upload.single("photo"), async (req, res) => {
    // console.log(req.file.path)
    const data = await linkTree.updateOne({ username: req.header.username }, {photo : req.file.path}).catch((e) => {
        res.json({
            'error': "image not saved"
        })
    }
    )

    if (data) {
        res.json({
            'msg': "image saved"
        })
    } else {
        res.status(400).json({
            'msg': "image not saved"
        });
    }
})

router.get('/image', async (req, res) => {
    // console.log(req.file.path)
    const data = await linkTree.findOne({ username: req.header.username }).catch((e) => {
        res.status(404).json({
            'msg': "not found"
        })
    }
    )
    if (data) {
        res.json({
            'img': data.photo,
            'msg' : "found"
        })
    } else {
        res.status(404).json({
            'msg': "not found"
        })
    }
})


router.post('/view', fetchUser, async (req, res) => {
    const data = await linkTree.findOne({ username: req.body.username });
    // console.log(req.body.username)
    if (data) {
        res.json({
            "msg": "data found",
            "data": data
        })
    } else {
        res.json({ "msg": "data missing" })
    }
})

module.exports = router