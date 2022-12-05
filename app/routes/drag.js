import Route from '@ember/routing/route';

export default class DragRoute extends Route {
  model() {
    return this.store.findAll('item');
  }
}
