/**
 * Created by manifold on 30.03.2015.
 */
import Ember from 'ember';

import API from '../api';

export default Ember.Route.extend({
  actions: {
    logout: function() {
      var route = this;

      API.logout().then(function() {
        route.session.set('user', null);
        route.transitionTo('index');
      });
    },

    error: function(error, transition) {
      if (error.status === 'Unauthorized') {
        var loginController = this.controllerFor('login');

        loginController.setProperties({
          message: error.message,
          transition: transition
        });

        this.transitionTo('login');
      } else {
        // Allow other error to bubble
        return true;
      }
    }
  }
});
