import JSONAPIAdapter from '@ember-data/adapter/json-api';
import ENV from 'drag-drop-animations/config/environment';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = ENV.rootURL;
  namespace = '/api';
}
