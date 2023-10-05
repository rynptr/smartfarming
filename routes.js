'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    /*app.route('/')
        .get(todoList.index);*/

    // membuat router untuk "/" dan render file 'index.ejs' ke browser.
    app.get("/", function (request, resolve) {
        resolve.render("index")
    });

    app.get("/soil_sensor", function (request, resolve) {
        resolve.render("soil_sensor")
    });

    app.get("/view_weather_sensor", function (request, resolve) {
        resolve.render("weather_sensor")
    });

    app.get("/polybag", function (request, resolve) {
        resolve.render("polybag")
    });

    app.get("/lokasi", function (request, resolve) {
        resolve.render("lokasi")
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



    //app.route('/login').post(todoList.login);
    app.route('/add_sensor_weather')
        .post(todoList.add_sensor_weather);

    app.route('/add_sensor_npk')
        .post(todoList.add_sensor_npk);

    app.route('/add_sensor_humidity')
        .post(todoList.add_sensor_humidity);

    app.route('/data_weather')
        .get(todoList.data_weather);

    app.route('/data_npk/:id_polybag')
        .get(todoList.data_npk);

    app.route('/data_humidity/:id_polybag')
        .get(todoList.data_humidity);

    app.route('/last_data_npk/:id_polybag')
        .get(todoList.last_data_npk);

    app.route('/last_data_humidity/:id_polybag')
        .get(todoList.last_data_humidity);

    //app.route('/subscribe/:get_topic')
        //.get(todoList.mqtt_data);

        
};
