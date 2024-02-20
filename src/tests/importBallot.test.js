const importBallot = require('../utils/importBallot.js');

const TEST_BALLOT_FILE = 'testBallot.csv'

test('importBallot', () => {

    const ballots = importBallot(TEST_BALLOT_FILE);

    // Length of the array should be 10
    expect(ballots.length).toBe(10);

    // Each ballot should have 3 properties: name, firstChoiceVotes, and votePercentage
    ballots.forEach(ballot => {
        expect(ballot).toHaveProperty('name');
        expect(ballot).toHaveProperty('firstChoiceVotes');
        expect(ballot).toHaveProperty('votePercentage');
    });

    // The first ballot should be for "Alice"
    expect(ballots[0].name).toBe('Dalinar Kholin');
});
