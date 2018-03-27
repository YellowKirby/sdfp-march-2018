const test = require('ava');

const poker = require('..');

function macro(t, input, expected) {
  t.is(poker(input), expected);
}

macro.title = (title, input, expected) => `${title} ${input} => ${expected}`;

test(macro, '2♥ 2♦ 2♣ k♣ q♦', 'three-of-a-kind');
test(macro, '2♥ 5♥ 7♦ 8♣ 9♠', 'high-card');
test(macro, 'a♥ 2♦ 3♣ 4♣ 5♦', 'straight');
test(macro, '10♥ j♦ q♣ k♣ a♦', 'straight');
test(macro, '2♥ 3♥ 2♦ 3♣ 3♦', 'full-house');
test(macro, '2♥ 7♥ 2♦ 3♣ 3♦', 'two-pair');
test(macro, '2♥ 7♥ 7♦ 7♣ 7♠', 'four-of-a-kind');
test(macro, '4♥ 5♥ 2♥ 3♥ 6♥', 'straight-flush');
test(macro, '10♥ j♥ q♥ k♥ a♥', 'royal-flush');
test(macro, '4♥ 4♠ k♠ 5♦ 10♠', 'one-pair');
test(macro, 'q♣ 10♣ 7♣ 6♣ 4♣', 'flush');
