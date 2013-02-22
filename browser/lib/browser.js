/*jshint strict:true browser:true node:true es5:true onevar:true laxcomma:true laxbreak:true*/
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
    , userEmail
    ;

  function submitForm(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    submitValues(function (err) {
      if (!err) {
        window.alert('Thanks for the info, we\'ll use it wisely!');
      }
    });
  }

  function takeEmailForm(ev) {
    ev.preventDefault();
    ev.stopPropagation();

    var data = serializeForm('form#js-email-only')
      ;

    userEmail = data.email;
    
    $('.js-modal-form-components').show();
    request.post('/info', null, data).when(function (err, ahr2, data) {
      if (!data || !data.success) {
        $('.js-modal-form-components').hide();
        window.alert('Actually... there was an error saving your e-mail address. Will you double check that please?');
      }
    });
  }

  function submitValues(fn) {
    var data = serializeForm('form#js-tall')
      ;

    data.email = userEmail;

    request.post('/info', null, data).when(function (err, ahr2, data) {
      if (!data || !data.success) {
        err = err || new Error('Saving info failed.');
        window.alert('There was an error in saving your data. Try again in just a second.');
      }
      if (fn) {
        fn(err);
      }
    });
  }

  function init() {
    $('body').delegate('form#js-email-only', 'submit', takeEmailForm);
    $('body').delegate('.js-big-a-button', 'click', takeEmailForm);

    $('body').delegate('form#js-optional-info', 'submit', submitForm);
    /*
    $('body').delegate('form#js-tall', 'change', submitValues);
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
    */
  }

  domReady(init);
}());
