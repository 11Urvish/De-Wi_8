const app = require('express').Router();

module.exports = (function () {

    //Admin Route
    var AdminRoutes = require("./admin/router");
    app.use('/admin', AdminRoutes);

    //User Route
    var AdminRoutes = require("./user/router");
    app.use('/user', AdminRoutes);

   //Device Route
   var AdminRoutes = require("./device/router");
   app.use('/device', AdminRoutes);


   var AssignDeviceRoutes = require("./assignDevice/router");
   app.use('/assignDevice', AssignDeviceRoutes);

//Department Route
var DepartmentRoutes = require("./department/router");
app.use('/department', AdminRoutes);

    return app;
})();
