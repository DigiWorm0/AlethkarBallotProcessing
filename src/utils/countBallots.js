import Candidate from "../candidate.js";
import SingleVote from "../singleVote.js";

/**
 * Count the ballots and returns a list of candidates and their vote percentages.
 * @param {SingleVote[]} votes - An array of SingleVote objects.
 * @param {string[]} eliminatedCandidates - An array of candidate names that have been eliminated from the election.
 * @returns {Candidate[]} An array of Candidate objects, sorted by vote percentage in descending order.
 */
export default function countBallots(votes, eliminatedCandidates) {
    const voteCounts = {};
    const firstChoiceVoteCounts = {};

    // Iterate through each vote.
    let totalVotes = 0;
    votes.forEach(vote => {

        // Get the highest-ranked candidate that hasn't been eliminated.
        const candidateChoice = findCandidateFromSingleVote(vote, eliminatedCandidates);

        // If they didn't vote for any remaining candidates, skip this vote.
        if (!candidateChoice)
            return;

        // If the candidate hasn't been seen before, add them to the list.
        if (!voteCounts[candidateChoice])
            voteCounts[candidateChoice] = 0;
        if (!firstChoiceVoteCounts[candidateChoice])
            firstChoiceVoteCounts[candidateChoice] = 0;

        // Increment the candidate's vote count.
        voteCounts[candidateChoice]++;
        totalVotes++;

        // If this is the voter's first choice, increment the first choice vote count.
        if (vote.getCandidateChoices()[0] === candidateChoice)
            firstChoiceVoteCounts[candidateChoice]++;
    });

    // Convert the vote counts into percentages.
    for (let candidate in voteCounts)
        voteCounts[candidate] /= totalVotes;

    // Convert the vote counts into Candidate objects.
    const candidateObjects = [];
    for (let candidate in voteCounts)
        candidateObjects.push(new Candidate(candidate, firstChoiceVoteCounts[candidate], voteCounts[candidate]));

    // Sort the candidates by vote percentage in descending order.
    candidateObjects.sort((a, b) => b.getVotePercentage() - a.getVotePercentage());

    return candidateObjects;
}

/**
 * Finds the highest-ranked candidate that hasn't been eliminated from a single vote.
 * @param {SingleVote} vote - A single vote object.
 * @param {string[]} eliminatedCandidates - An array of candidate names that have been eliminated from the election.
 * @returns - The highest-ranked candidate that hasn't been eliminated, or null if the voter didn't vote for any remaining candidates.
 */
function findCandidateFromSingleVote(vote, eliminatedCandidates) {
    return vote.getCandidateChoices().find(choice => !eliminatedCandidates.includes(choice) && choice);
}