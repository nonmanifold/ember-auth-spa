/**
 * Created by manifold on 30.03.2015.
 */
import Ember from 'ember';
import API from '../api';

export default Ember.Route.extend({
  model: function() {
      return API.get('contacts');
    }
});
