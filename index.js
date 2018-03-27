const R = require('ramda');

const sortInc = R.sortBy(Math.min);
const toLength = R.prop('length');

const ranks = [...R.map(String, R.range(1, 11)), 'j', 'q', 'k', 'a'];

const getFaces = R.map(R.head);
const getSuits = R.map(R.tail);
const countGroups = R.compose(sortInc, R.values, R.countBy(R.identity));
const hasGroups = pattern => R.compose(R.equals(pattern), countGroups);

const hasFaceGroups = pattern => hand => hasGroups(pattern)(getFaces(hand));
const hasSuitGroups = pattern => hand => hasGroups(pattern)(getSuits(hand));

const getSequences = hand =>
  R.groupWith(
    (a, b) => b - a === 1,
    sortInc(R.map(R.indexOf(R.__, ranks), getFaces(hand)))
  );

const hands = {
  'royal-flush': hand =>
    R.allPass([
      hand => hands.flush(hand),
      hand => R.equals(getSequences(hand), [[9, 10, 11, 12, 13]])
    ])(hand),

  'straight-flush': hand => hands.straight(hand) && hands.flush(hand),

  'four-of-a-kind': hasFaceGroups([1, 4]),

  'full-house': hasFaceGroups([2, 3]),

  flush: hasSuitGroups([5]),

  straight: R.compose(
    R.anyPass([
      R.compose(R.equals(1), toLength),
      R.equals([[1, 2, 3, 4], [13]])
    ]),
    getSequences
  ),

  'three-of-a-kind': hasFaceGroups([1, 1, 3]),

  'two-pair': hasFaceGroups([1, 2, 2]),

  'one-pair': hasFaceGroups([1, 1, 1, 2]),

  'high-card': R.compose(R.maxBy(R.nth(ranks)), getFaces),

  invalid: R.T
};

function getHand(input) {
  return input.split(/\s+/);
}

function getCard(input) {
  const suit = R.last(input);
  return [R.init(input), suit];
}

module.exports = function(input) {
  const hand = R.map(getCard, getHand(input));
  return R.head(R.find(([_, predicate]) => predicate(hand), R.toPairs(hands)));
};
