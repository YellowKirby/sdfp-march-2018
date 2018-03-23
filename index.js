const R = require('ramda');

const ranks = [...R.map(String, R.range(1, 11)), 'j', 'q', 'k', 'a'];

const getFaces = R.map(R.head);
const count = R.groupBy(R.identity);
const countFaces = R.compose(count, getFaces);

const sortInc = R.sort((a, b) => a - b);

const toLength = R.prop('length');

const hands = [
  {
    name: 'full-house',
    predicate: hand => {
      const groups = new Set(Object.values(R.map(toLength, countFaces(hand))));
      return R.equals(new Set([2, 3]), groups);
    }
  },
  {
    name: 'straight',
    predicate: hand => {
      const sorted = sortInc(
        R.map(x => R.findIndex(R.equals(x), ranks) % 13, getFaces(hand))
      );
      return R.equals(
        R.map(x => parseInt(x, 10) - parseInt(sorted[0], 10), sorted),
        R.range(0, 5)
      );
    }
  },
  {
    name: 'three-of-a-kind',
    predicate: R.compose(
      R.any(R.compose(R.equals(3), toLength)),
      Object.values,
      countFaces
    )
  },
  {
    name: 'two-pair',
    predicate: R.compose(
      R.equals([1, 2, 2]),
      sortInc,
      Object.values,
      R.map(toLength),
      countFaces
    )
  },
  {
    name: 'high-card',
    predicate: R.compose(R.maxBy(number => ranks[number]), getFaces)
  },
  {
    name: 'invalid',
    predicate: _ => true
  }
];

function getHand(input) {
  return input.split(' ');
}

function getCard(input) {
  const suit = R.last(input);
  return [R.init(input), suit];
}

module.exports = function(input) {
  const hand = R.map(getCard, getHand(input));
  const matching = R.find(x => x.predicate(hand), hands);
  return matching.name;
};
