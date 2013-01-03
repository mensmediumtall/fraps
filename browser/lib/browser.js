/*jshint strict:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
/*
 * BROWSER
 */
(function () {
  "use strict";

  var $ = require('ender')
    , _ = require('underscore')
    , domReady = require('domready')
    , pure = require('pure').$p
    , request = require('ahr2')
    , forEachAsync = require('forEachAsync')
    , serializeForm = require('serialize-form').serializeFormObject
    ;

  function submitForm(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    submitValues(function () {
      global.alert('Thanks for the info, we\'ll use it wisely!');
    });
  }

  function submitValues(fn) {
    var data = serializeForm('form#js-tall');

    request.post('/info', null, data).when(function (err, ahr2, data) {
      console.log(data);
      if (fn) {
        fn();
      }
    });
  }

  function init() {
    $('body').delegate('form#js-tall', 'submit', submitForm);
    //$('body').delegate('form#js-tall', 'change', submitValues);
    $('body').delegate('button.js-aye', 'click', function () {
      $('#js-menu').hide();
      $('#js-tab-aye').show();
    });
    $('body').delegate('button.js-nay', 'click', function () {
      $('#js-menu').hide();
      $('#js-tab-nay').show();
    });
    $('body').delegate('button.js-meh', 'click', function () {
      $('#js-menu').show();
      $('#js-tab-nay').hide();
    });
    $('#js-tab-nay').hide();
    $('#js-tab-aye').hide();
  }

  domReady(init);
}());
