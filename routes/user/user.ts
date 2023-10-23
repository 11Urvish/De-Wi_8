const path = require('path')
import UserController from "../../controllers/user.controller";
import commonHelper from "../../helpers/common";
import * as UserValidation from '../../helpers/validation/user.validation';
const { CreateUser, Login, GetUser, GetDepartment,GetUserById, UpdateUser, DeleteUser } = new UserController();
const  uploadFile = require('../../helpers/Intercepter');
const { CheckValidationError ,VerifyToken} = new commonHelper();

module.exports = function (router) {
    
    router.post('/v1/create',VerifyToken,uploadFile.single('vUserImage'),UserValidation['UserValidation'],CheckValidationError,CreateUser);
    //router.post('/v1/create', VerifyToken,CreateUser);
    router.post('/v1/login', Login);
    router.get('/v1/get', VerifyToken,GetUser);
    router.get('/v1/get2',GetDepartment);
    router.get('/v1/get/:iUserId',VerifyToken, GetUserById);
    router.patch('/v1/update/:iUserId', VerifyToken,UpdateUser);
    router.patch('/v1/delete/:iUserId',VerifyToken, DeleteUser);
}
