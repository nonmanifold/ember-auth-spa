/**
 * Created by manifold on 29.03.2015.
 */
/* globals Pretender */
var server = new Pretender(function() {

  this.post('/session', function(request) {
    switch(request.requestBody) {
      case 'username=user&password=secret':
        return [201, {'Content-Type': 'application/json'}, '{"token":"user","user":{"role":"user","name":"User"}}'];

      default:
        return [401, {}, 'Incorrect username/password'];
    }
  });

  this.delete('/session', function() {
    return [200, {}, 'You are logged out'];
  });

  this.get('/contacts', function() {
    return [200, {}, 'Lorem ipsum dolor sit amet, contacts'];
  });

  this.get('/protected', function(request) {
    switch (request.requestHeaders['Authorization']) {
      case 'Token token=user':
        return [200, {}, 'Since you can see this, you must be logged in!'];

      case 'Token token=expired':
        return [401, {}, 'Your session has expired'];

      default:
        return [401, {}, 'Please login to access this page'];
    }
  });

  this.get('/secret', function(request) {
    switch (request.requestHeaders['Authorization']) {
      case 'Token token=user':
        return [403, {}, 'You are not allowed to access this page'];

      case 'Token token=expired':
        return [401, {}, 'Your session has expired'];

      default:
        return [401, {}, 'Please login to access this page'];
    }
  });

});
export default server;
