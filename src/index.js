import importBallot from './utils/importBallot.js';
import countBallots from './utils/countBallots.js';

// Import the ballot data from the CSV file.
const votes = importBallot('SmallListBallots.csv');

// An array of candidate names that have been eliminated from the election.
const eliminatedCandidates = [];

// Iterate through the rounds of the election.
while (true) {

    // Count the ballots and get the vote counts for each candidate.
    const voteCounts = countBallots(votes, eliminatedCandidates);

    // Check for an empty ballot file.
    if (voteCounts.length === 0) {
        console.log('Ballot file is empty. Please check the file and try again.');
        break;
    }

    // Check for a winner with over 50% of the vote.
    if (voteCounts[0].getVotePercentage() > 0.5) {
        console.log(`Winner: ${voteCounts[0].getName()} with over 50% of the vote.`);
        break;
    }

    // Iterate through remaining candidates
    voteCounts.forEach(candidate => {

        // Skip candidates that have already been eliminated.
        if (eliminatedCandidates.includes(candidate.getName()))
            return;

        // Eliminate candidates with 0 votes.
        if (candidate.getVotePercentage() === 0) {
            console.log(`Eliminating ${candidate.getName()} with 0 votes.`);
            eliminatedCandidates.push(candidate.getName());
        }
    });

    // Get Candidates with a first-choice vote percentage.
    const candidatesWithFirstChoiceVotes = voteCounts.filter(candidate => candidate.getFirstChoiceVotes() > 0);

    // Get the lowest first-choice vote percentage.
    const lowestFirstChoiceVotes = candidatesWithFirstChoiceVotes[candidatesWithFirstChoiceVotes.length - 1].getFirstChoiceVotes();

    // Get all candidates with the lowest first-choice vote percentage.
    const candidatesWithLowestFirstChoiceVotes = candidatesWithFirstChoiceVotes.filter(candidate => candidate.getFirstChoiceVotes() === lowestFirstChoiceVotes);

    // Don't eliminate candidates if it would eliminate all remaining candidates.
    if (candidatesWithLowestFirstChoiceVotes.length === voteCounts.length) {
        if (voteCounts.length === 1)
            console.log(`Winner: ${voteCounts[0].getName()}`);
        else
            console.log(`Tie between ${voteCounts.map(candidate => candidate.getName()).join(' and ')}.`);
        break;
    }
    // Otherwise, eliminate candidates with the lowest first-choice vote percentage.
    else if (candidatesWithLowestFirstChoiceVotes.length > 0) {
        candidatesWithLowestFirstChoiceVotes.forEach(candidate => {
            console.log(`Eliminating ${candidate.getName()} with the lowest first-choice vote percentage.`);
            eliminatedCandidates.push(candidate.getName());
        });
    }
}

console.log('Election complete.');