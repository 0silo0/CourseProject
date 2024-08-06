import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  isbn: DS.attr('string'),
  publishDate: DS.attr('date-string'),

  author: DS.attr('author'),
  reviews: DS.attr('review')
});
