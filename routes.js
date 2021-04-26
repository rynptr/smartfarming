'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    /*app.route('/')
        .get(todoList.index);*/

    app.get("/", function (request, resolve) {
        resolve.render("index")
    });
    

    app.get("/listpegawai/", function (request, resolve) {
        resolve.render("listpegawai")
    });

};