const router=require('express').Router()

const { enroll__course__controller } = require('../controllers/enrollController')
const {requireLogin}=require('../middlewares/requireLogin')


router.put('/',enroll__course__controller)

module.exports=router