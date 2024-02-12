/**
 * Represents a candidate in an election.
 */
export default class Candidate {

    /**
     * Creates a new candidate with the given name.
     * @param {string} name - The name of the candidate.
     * @param {number} firstChoiceVotes - The number of first-choice votes the candidate received.
     * @param {number} votePercentage - The percentage of votes the candidate received. A number between 0 and 1.
     */
    constructor(name, firstChoiceVotes, votePercentage) {
        this.name = name;
        this.firstChoiceVotes = firstChoiceVotes;
        this.votePercentage = votePercentage;
    }

    /**
     * Returns the name of the candidate.
     * @returns {string} The name of the candidate.
     */
    getName() {
        return this.name;
    }

    /**
     * Returns the number of first-choice votes the candidate received.
     * @returns {number} The number of first-choice votes the candidate received.
     */
    getFirstChoiceVotes() {
        return this.firstChoiceVotes;
    }

    /**
     * Returns the percentage of votes the candidate received.
     * @returns {number} The percentage of votes the candidate received.
     */
    getVotePercentage() {
        return this.votePercentage;
    }
}