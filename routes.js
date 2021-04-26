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

    app.get("/info_api", function (request, resolve) {
        resolve.render("info_api")
    });

    app.get("/dashboard/", function (request, resolve) {
        resolve.render("dashboard")
    });   

    app.get("/monitoring/:id", function (request, resolve) {
        resolve.render("jembatan")
    });

    app.get("/monitoring/", function (request, resolve) {
        resolve.render("monitoring")
    });

    app.get("/pembangunan/", function (request, resolve) {
        resolve.render("pembangunan")
    });

    app.get("/add_pembangunan/", function (request, resolve) {
        resolve.render("add_pembangunan")
    });

    app.get("/view_pembangunan/:id", function (request, resolve) {
        resolve.render("view_pembangunan")
    });

    app.route("/listusulan").get(todoList.usulan);


};