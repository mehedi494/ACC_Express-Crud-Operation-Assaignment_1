const express = require("express");
const controler = require("../../user.controlers/user.controler");
const router = express.Router();

router
    .route("/random")
    /**
        * @api {get} /random   -  
        * @apidDescription get single random user 
         
        * @apiHeader {String} 
        * 
        * @apiSuccess  status(200){Object} get a user randomly 
       
        */
    .get(controler.getAUser)

router
    .route("/all")
    /**
        * @api {get} /all   -  all user 
        * @apidDescription get all user 
        * @apiPermission admin
        * 
        * @apiHeader {String} 
        * @apiQuery {?limit=1-12} 
        
        * 
        * @apiSuccess  {Object[]} all the user
        * 
        * @apiError  {(limit Execced 417)
        */
    .get(controler.getAllUser)

router
    .route("/save")
    /**
       * @api {get} /save  -  save a user 
       * @apidDescription save a single user 
       * @apiPermission admin
       * 
       * @apiBody {json}  and must be required id,
        gender,
        name,
        contact,
        address,
       
       
       * 
       * @apiSuccess  save user data to db and response messege is "Saved"
       * 
       * @apiError  {if some user property are blank send message  "property are blank"}
       * @apiError  {not implement 501}  some property are blank or missing
       * 
       */
    .post(controler.saveAuser)

router
    .route("/update/:id")
    /**
       * @api {get} /update/:id   update user info
       * @apidDescription Update a single user info
       * @apiPermission admin
       * 
       * @apiHeader {String} 
       * @apiParam {id{1-}} 
        
       * @apiSuccess  {Object[]} (response (status code 200))
       * 
       * @apiError  {not inplement 502[]} Id not found
       
       * 
       */
    .patch(controler.updateAUser)


router.route("/bulk-update")
    /**
       * @api {get} /tools/bulk-update   - bulk update
       * @apidDescription update array of object type multiple user
       * @apiPermission admin
       * 
       * @apiHeader {String} 
       * @apiBody [{}] body filled array of object and  id,
        gender,
        name,
        contact,
        address,
        are must be filled
       
       * 
       * @apiSuccess save those id matching with db and response statuscode(200) message "save"
       * 
       * @apiError  {not implement  502} invalid data 
       
       * 
       */
    .patch(controler.updateBulkUser)

router.route("/delete/:id")
    /**
       * @api {delete} /delete 
       * @apidDescription delete a user; 
       * @apiPermission admin
       * 
       * @apiHeader {String} 
       * @apiParam {id{1-}} 
       
       * 
       * @apiSuccess  delete form db and response message "deleted"
       * 
       * @apiError  {not implement 502} those id not found to Db 
       
       * 
       */
    .delete(controler.deleteUser)

module.exports = router;
