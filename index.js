const R = require('ramda');

const sortInc = R.sortBy(Math.min);
const toLength = R.prop('length');

const ranks = [...R.map(String, R.range(1, 11)), 'j', 'q', 'k', 'a'];

const getFaces = R.map(R.head);
const count = R.groupBy(R.identity);
const countFaces = R.compose(count, getFaces);
const groupByFaces = R.compose(sortInc, R.values, R.map(toLength), countFaces);
const hasGroups = pattern => R.compose(R.equals(pattern), groupByFaces);

const hands = {
  'four-of-a-kind': hasGroups([1, 4]),

  'full-house': hasGroups([2, 3]),

  straight: hand => {
    const sorted = sortInc(
      R.map(x => R.findIndex(R.equals(x), ranks) % 13, getFaces(hand))
    );
    return R.equals(
      R.map(x => parseInt(x, 10) - parseInt(sorted[0], 10), sorted),
      R.range(0, 5)
    );
  },

  'three-of-a-kind': hasGroups([1, 1, 3]),

  'two-pair': hasGroups([1, 2, 2]),

  'high-card': R.compose(R.maxBy(number => ranks[number]), getFaces),

  invalid: R.T
};

function getHand(input) {
  return input.split(' ');
}

function getCard(input) {
  const suit = R.last(input);
  return [R.init(input), suit];
}

module.exports = function(input) {
  const hand = R.map(getCard, getHand(input));
  return R.head(R.find(([_, predicate]) => predicate(hand), R.toPairs(hands)));
};
