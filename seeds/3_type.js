
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        { type: 'MENTOR'},
        { type: 'CLIENT'}
      ]);
    });
};
