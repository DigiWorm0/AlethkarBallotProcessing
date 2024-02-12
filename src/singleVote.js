
/**
 * Represents a single vote in an election.
 */
export default class SingleVote {

    /**
     * Creates a new vote with the given choices and voter ID.
     * @param {string[]} candidateChoices - An array of the voter's choices, in order of preference.
     * @param {string} voterID - The ID of the voter.
     */
    constructor(candidateChoices, voterID) {
        this.candidateChoices = candidateChoices;
        this.voterID = voterID;
    }

    /**
     * Returns the voter's choices.
     * @returns {string[]} The voter's choices.
     */
    getCandidateChoices() {
        return this.candidateChoices;
    }

    /**
     * Returns the voter's ID.
     * @returns {string} The voter's ID.
     */
    getVoterID() {
        return this.voterID;
    }
}