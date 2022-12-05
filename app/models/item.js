import Model, { attr, belongsTo } from '@ember-data/model';

export default class ItemModel extends Model {
  @attr('string') title;
  @attr('string') imageURL;
  @attr('string') introducedDate;
}
