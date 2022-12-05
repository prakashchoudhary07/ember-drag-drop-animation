import EmberRouter from '@ember/routing/router';
import config from 'drag-drop-animations/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('main');
  this.route('drag');
  this.route('drag-drop');
  this.route('drag-new');
});
