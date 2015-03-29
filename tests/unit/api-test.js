/**
 * Created by manifold on 29.03.2015.
 */
import { module, test } from 'qunit';

import API from 'auth-spa/api';
import 'auth-spa/mock-server';

module('API client', {
  setup: function() {
    API.token = null;
  }
});
/* ---------- LOGIN ---------- */

test('Login with incorrect password', function(assert) {

  return API.login('wrong', 'wrong').catch(function(error) {

    assert.strictEqual(API.token, null);

    assert.equal(error.status, 'Unauthorized');
    assert.equal(error.message, 'Incorrect username/password');

  });

});

test('Login as user', function(assert) {

  return API.login('user', 'secret').then(function(user) {

    assert.equal(API.token, 'user');

    assert.equal(user.name, 'User');
    assert.equal(user.role, 'user');

  });

});

test('Login as user with incorrect password', function(assert) {

  return API.login('user', 'wrong').catch(function(error) {

    assert.strictEqual(API.token, null);

    assert.equal(error.status, 'Unauthorized');
    assert.equal(error.message, 'Incorrect username/password');

  });

});

/* ---------- LOGOUT ---------- */

test('Logout', function(assert) {

  API.token = 'user';

  return API.logout().then(function(message) {
    assert.strictEqual(API.token, null);
  });

});

test('Logout with expired token', function(assert) {

  API.token = 'expired';

  return API.logout().then(function(message) {
    assert.strictEqual(API.token, null);
  });

});

test('Logout without first loggin in', function(assert) {

  return API.logout().then(function(message) {
    assert.strictEqual(API.token, null);
  });

});
/* ---------- PUBLIC PAGE ---------- */

test('Access contacts page as user', function(assert) {

  API.token = 'user';

  return API.get('contacts').then(function(content) {
    assert.equal(content, 'Lorem ipsum dolor sit amet, contacts');
  });

});

test('Access contacts page with expired token', function(assert) {

  API.token = 'expired';

  return API.get('contacts').then(function(content) {
    assert.equal(content, 'Lorem ipsum dolor sit amet, contacts');
  });

});

/* ---------- PROTECTED PAGE ---------- */

test('Access admin page without logging in', function(assert) {

  return API.get('admin').catch(function(error) {

    assert.equal(error.status, 'Unauthorized');
    assert.equal(error.message, 'Please login to access this page');

  });

});

test('Access admin page as user', function(assert) {

  API.token = 'user';

  return API.get('admin').then(function(content) {
    assert.equal(content, 'Since you can see this, you must be logged in!');
  });

});

test('Access admin page with expired token', function(assert) {

  API.token = 'expired';

  return API.get('admin').catch(function(error) {

    assert.equal(error.status, 'Unauthorized');
    assert.equal(error.message, 'Your session has expired');

  });

});

