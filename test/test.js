const test = require('ava');

const poker = require('..');

test('does the poker', t => {
  t.is(poker('2♥ 2♦ 2♣ k♣ q♦'), 'three-of-a-kind');
  t.is(poker('2♥ 5♥ 7♦ 8♣ 9♠'), 'high-card');
  t.is(poker('a♥ 2♦ 3♣ 4♣ 5♦'), 'straight');
  t.is(poker('2♥ 3♥ 2♦ 3♣ 3♦'), 'full-house');
  t.is(poker('2♥ 7♥ 2♦ 3♣ 3♦'), 'two-pair');
});
