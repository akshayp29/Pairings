var readline = require('readline');
var fs = require('fs');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Press 1 to generate pairings or 2 to create teams (any other key to exit): ", function(decision) {
    if (decision == 2) {
        createTeams();
    } else if (decision == 1) {
        generatePairings();
        rl.close();
    } else {
        rl.close();
    }
});

function createTeams() {
    var personToTeam = {};
    var teamToPerson = {};
    rl.question("Enter the number of teams: ", function(numOfTeams) {
        recursivePrompt(1, numOfTeams, personToTeam, teamToPerson);
    });
}

function recursivePrompt(i, iterator, personToTeam, teamToPerson) {
    if (i <= iterator) {
        rl.question("Enter the name of team " + i + ": ", function(nameOfTeam) {
            rl.question("Enter the number of people in " + nameOfTeam + ": ", function(numPeople) {
                recursiveEmail(1, numPeople, i, iterator, personToTeam, teamToPerson, [], nameOfTeam);
            });
        });
    } else {
        rl.close();
        generatePersonToTeammates(personToTeam, teamToPerson);
    }
}

function recursiveEmail(i, iterator, j, promptIterator, personToTeam, teamToPerson, peopleInTeam, nameOfTeam) {
    if (i <= iterator) {
        rl.question("Enter the email of person " + i + ": ", function(person) {
            peopleInTeam.push(person);
            if (person in personToTeam) {
                personToTeam[person].push(nameOfTeam);
            } else {
                personToTeam[person] = [nameOfTeam];
            }
            recursiveEmail(i + 1, iterator, j, promptIterator, personToTeam, teamToPerson, peopleInTeam, nameOfTeam);
        });
    } else {
        teamToPerson[nameOfTeam] = peopleInTeam;
        recursivePrompt(j + 1, promptIterator, personToTeam, teamToPerson);
    }
}

function generatePersonToTeammates(personToTeam, teamToPerson) {
    var personToTeammates = {};
    for (var i in personToTeam) {
        personToTeammates[i] = {};
        for (var j = 0; j < personToTeam[i].length; j++) {
            var currArr = teamToPerson[personToTeam[i][j]];
            for (var k = 0; k < currArr.length; k++) {
                if (currArr[k] != i && !(currArr[k] in personToTeammates[i])) {
                    personToTeammates[i][currArr[k]] = 0;
                }
            }
        }
    }
    fs.writeFile("data", JSON.stringify([personToTeammates, {},
        0
    ]), function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("The teams were saved!");
        }
    });
}

function generatePairings() {
    fs.readFile("data", 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var data = JSON.parse(data);
            var personToTeammates = data[0];
            var lastPair = data[1];
            var minNum = data[2];
            var pairings = {};
            var minHasChanged = true;
            for (i in personToTeammates) {
                var pair = [];
                for (j in personToTeammates[i]) {
                    if (personToTeammates[i][j] == minNum) {
                        if (!(j in pairings)) {
                            pair.push(j);
                        } else if (pairings[j] != i) {
                            minHasChanged = false;
                        }
                    }
                }
                if (pair.length > 0) {
                    if (pair.length > 1) {
                        minHasChanged = false;
                    }
                    if (!(i in pairings)) {
                        if (i in lastPair) {
                            var prevPair = lastPair[i];
                        } else {
                            var prevPair = null;
                        }
                        var personToPair = pair[Math.floor(Math.random() * pair.length)];
                        var breakCount = 0;
                        while (personToPair == prevPair && breakCount < 10) {
                            personToPair = pair[Math.floor(Math.random() * pair.length)];
                            breakCount += 1;
                        }
                        if (breakCount != 10) {
                            pairings[i] = personToPair;
                            personToTeammates[i][personToPair] = personToTeammates[i][personToPair] + 1;
                            pairings[personToPair] = i;
                            personToTeammates[personToPair][i] = personToTeammates[personToPair][i] + 1
                        } else {
                            minHasChanged = false;
                        }
                    }
                }
            }
            if (minHasChanged) {
                minNum += 1;
            }

            fs.writeFile("data", JSON.stringify([personToTeammates, pairings, minNum]), function(err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Pairings for this week");
                    for (var i in pairings) {
                        console.log(i + " is paired with " + pairings[i]);
                    }
                }
            });

        }
    });

}