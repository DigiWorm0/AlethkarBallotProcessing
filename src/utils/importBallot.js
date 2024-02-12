import SingleVote from '../singleVote.js';
import fs from 'fs';

/**
 * Imports a CSV file containing ballot data and returns an array of SingleVote objects.
 * @param {string} fileName - The name of the CSV file to import.
 * @returns {SingleVote[]} An array of SingleVote objects.
 */
export default function importBallot(fileName) {
    // Read File Data
    const ballotFileData = fs.readFileSync(fileName, 'utf8');

    // Split File Data into Lines
    const ballotFileLines = ballotFileData.split('\n');

    // Parse each line into a SingleVote object
    const votes = [];
    ballotFileLines.slice(1).forEach(line => {

        // Choice1, Choice2, Choice3, VoterID
        let choices = line.split(',');

        // Skip empty lines
        if (choices.length <= 1)
            return;

        // Remove the voterID from the array
        const voterID = choices.pop();

        // Replace empty strings with null
        choices = choices.map(choice => choice === '' ? null : choice);

        // Add the vote to the array
        votes.push(new SingleVote(choices, voterID));
    });

    return votes;
}