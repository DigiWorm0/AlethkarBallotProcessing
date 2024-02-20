const { default: SingleVote } = require('../singleVote.js');
const countBallots = require('../utils/countBallots.js');

test('countBallots', () => {

    const votes = [
        new SingleVote(["A", "B", "C"], "1"),
        new SingleVote(["A", "B", "C"], "2"),
        new SingleVote(["B", "C", "A"], "3"),
    ];
    const ballot = countBallots(votes);

    expect(ballot).toEqual([
        { name: "A", firstChoiceVotes: 2, votePercentage: 2 / 3 },
        { name: "B", firstChoiceVotes: 1, votePercentage: 1 / 3 }
    ]);
});
