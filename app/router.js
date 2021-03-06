import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  "use strict";
  this.route('login');
  this.route('contacts');
  this.route('admin');
});

export default Router;
