/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
/*
 * SERVER
 */
(function () {
  "use strict";

  var steve = require('./steve')
    , path = require('path')
    , connect = require('connect')
    , _ = require('underscore')
    , forEachAsync = require('forEachAsync')
    , app = connect.createServer()
    , Storage = require('dom-storage')
    , localStorage = new Storage(path.join(__dirname, '..', 'var', 'db.json'))
    , JsonStorage = require('json-storage')
    , store = JsonStorage.create(localStorage, 'mmt')
    , mailer = require('./mailer')
    ;

  function postInfo(req, res) {
    var newData = req.body || {}
      , curData
      ;

    if (!newData.email) {
      res.error("no e-mail address provided");
      res.json();
    }

    curData = store.get(newData.email);
    if (!curData) {
      curData = {};
      mailer.newTall(newData);
    }

    Object.keys(newData).forEach(function (key) {
      curData[key] = newData[key];
    });

    store.set(newData.email, curData);
    
    res.json(curData);
  }

  function getInfo(req, res) {
    res.json(store.get(req.params.email));
  }

  function router(rest) {
    rest.post('/info', postInfo);
    //rest.put('/info', postInfo);
    //rest.patch('/info', postInfo);
    rest.get('/info/:email', getInfo);
  }

  app
    .use(steve)
    .use(connect.router(router))
    ;

  module.exports = app;
}());
