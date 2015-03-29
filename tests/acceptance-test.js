/**
 * Created by manifold on 29.03.2015.
 */
import { module, test } from 'qunit';
import Ember from 'ember';
import startApp from './helpers/start-app';

import API from 'auth-spa/api';
import 'auth-spa/mock-server';

var application;

function clickLink(text) {
  click('a:contains(' + text + ')');
}

module('Acceptance test', {
  beforeEach: function() {
    API.token = null;
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('Visiting the index page', function(assert) {

  visit('/');

  andThen(function() {
    assert.equal( currentURL(), '/' );
    assert.equal( find('h2').text(), 'Ember.js auth SPA' );
  });

});
