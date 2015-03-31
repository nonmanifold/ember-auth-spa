/**
 * Created by manifold on 30.03.2015.
 */
import Ember from 'ember';

import API from '../api';

export default Ember.Route.extend({
  actions: {
    logout: function () {
      var route = this;

      API.logout().then(function () {
        route.session.set('user', null);
        route.transitionTo('index');
      });
    },
    openLoginModal: function (modalName, message, transition) {
      var loginController = this.controllerFor(modalName);
      loginController.setProperties({
        message: message,
        transition: transition,
        onSuccess: this.closeModal
      });
      return this.render(modalName, {
        into: 'application',
        outlet: 'modal'
      });
    },
    closeModal: function () {
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
    error: function (error, transition) {
      if (error.status === 'Unauthorized') {
        this.transitionTo('login');
        this.openLoginModal('login', error.message, transition);
      } else {
        // Allow other error to bubble
        return true;
      }
    }
  }
});
