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
function clickButton(text) {
  click('button:contains(' + text + ')');
}

function login(username, password) {
  if (currentURL() !== '/login') {
    visit('/login');
  }

  fillIn('input[name=username]', username);
  fillIn('input[name=password]', password);

  clickButton('Submit');
}

module('Acceptance test', {
  beforeEach: function () {
    API.token = null;
    application = startApp();
  },

  afterEach: function () {
    Ember.run(application, 'destroy');
  }
});

test('Visiting the index page', function (assert) {

  visit('/');

  andThen(function () {
    assert.equal(currentURL(), '/');
    assert.equal(find('h2').text(), 'Ember.js auth SPA');
  });

});

test('Log in with incorrect username and password', function(assert) {

  visit('/');

  clickButton('Login');

  andThen(function() {
    assert.equal( currentURL(), '/login' );
    assert.equal( find('h4').text(), 'Please login' );
    assert.strictEqual( find('#content').length, 0 );
  });

  login('user', 'wrong');

  andThen(function() {
    assert.equal( currentURL(), '/login' );
    assert.equal( find('#content').text(), 'Incorrect username/password' );
  });

  login('zomg', 'lol');

  andThen(function() {
    assert.equal( currentURL(), '/login' );
    assert.equal( find('#content').text(), 'Incorrect username/password' );
  });

  clickButton('Cancel');

  andThen(function() {
    assert.equal( currentURL(), '/' );
  });

});

test('Log in as user', function(assert) {

  login('user', 'secret');

  andThen(function() {
    assert.equal( currentURL(), '/' );
  });

});

test('Accessing the contacts page', function (assert) {

  visit('/');

  clickLink('Contacts Page');

  andThen(function () {
    assert.equal(currentURL(), '/contacts');
    assert.equal(find('h4').text(), 'Contacts Page');
    assert.equal(find('#content').text(), 'Lorem ipsum dolor sit amet, contacts');
  });

  clickLink('Go back');

  andThen(function () {
    assert.equal(currentURL(), '/');
  });

});

test('Accessing the admin dashboard page as a guest', function (assert) {

  visit('/');

  clickLink('Admin dashboard');

  andThen(function () {
    assert.equal(currentURL(), '/admin');
    assert.equal(find('h4').text(), 'An error has occured!');
    assert.equal(find('#content').text(), 'Please login to access this page');
  });

  clickLink('Go back');

  andThen(function () {
    assert.equal(currentURL(), '/');
  });

});
test('Accessing the admin page as an user', function(assert) {

  login('user', 'secret');

  clickLink('Admin dashboard');

  andThen(function() {
    assert.equal( currentURL(), '/admin' );
    assert.equal( find('h4').text(), 'Admin dashboard' );
    assert.equal( find('#content').text(), 'Since you can see this, you must be logged in!' );
  });

  clickLink('Go back');

  andThen(function() {
    assert.equal( currentURL(), '/' );
  });

});
