import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | favourites/favourite', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:favourites/favourite');
    assert.ok(route);
  });
});
