# How to use the tool

Go to terminal and type “node 1+1.js” and type 2 to create teams (the first time the tool is used). Then, run the file and type 1 to get the pairings for the current week.

# Strategy

The strategy used in this tool uses the following invariant. Every pair has either met up x or x+1 times, where x is an integer greater than or equal to 0. What this means is that each person in an organization must be paired up with all of his/her teammates for the nth time before he/she pairs up with one of them for the (n+1)th time. This is done by keeping track of the minimum number of times any pair was chosen and only choosing from that subset (randomly, if need be) until that subset becomes empty (and then the process is repeated for that minimum number + 1). Additionally, the tool makes sure that the same two people are not paired in consecutive weeks and that each person has at most one 1+1 pair per week. This allows for three conditions to be satisfied (which will be elaborated upon further in the comments section):

1. Every person in the organization either does not have a 1+1 pair or has exactly one, per week.
2. The same two teammates should not be paired together in consecutive weeks.
3. Teammates should be paired with equal frequency.

# Testing

The following cases are tested:
1. A “normal” case (specifically, the example provided)
2. 1 team with only 1 person
3. 1 team with 2 people
4. 1 team with more than 2 people
5. 2 teams with 2 people each

The specific inputs that were presented is located in “Tests.txt” and the tested pickles are located in “/saved_pickles/”.

# Comments

What was interesting about this project was that there is no solution that satisfies everything that I wanted - trade-offs were necessary.

One problem I ran into was trying to have everyone in the organization participating in a 1+1 pair each week. Suppose there is a team with only two people, with one person (Person A) not being in any other team and the other person (Person B) being in N-1 other teams. We want Person A to participate in a 1+1 pair each week, but Person B needs to be paired up with teammates from his other teams. A solution would be to have Person B have more than one pairing each week, but say the N-1 other teams Person B is also of size 2. Then Person B would have N pairings each week to satisfy the condition that everyone in the organization should participate in a 1+1 pair each week (But now when will he have the time to do work for all N teams?!) This problem caused me not to be able to satisfy the condition that every person in the organization should participate in a 1+1 pair each week. Likewise, every person should only participate in a single 1+1 pair per week could not be satisfied either.

Though some of the suggested conditions could not be satisfied, I created conditions that made sense to me and made sense for an organization to actually follow.

1. Every person in the organization either does not have a 1+1 pair or has exactly one, per week.

This makes sense because we want people to get to know the other people on their team better, but we also want them to have time to do work, rather than being overwhelmed by 1+1 pairs. Also, if one person were to have more than one pair some week, a person that has no pairs that week would not be too happy (as 0 pairs vs 2+ pairs is psychologically a striking difference), and I’m sure IFTTT would like to keep its employees happy :)

2. The same two teammates should not be paired together in consecutive weeks.

This was employed to mix things up as much as possible. The point of 1+1 pairings is to get people on a team knowing each other better, while strengthening the team as a whole. Two cases show this reason. First, for a team of size > 2, having the same two teammates paired together in consecutive weeks causes a part of the team to grow stronger, that is, a “sub-team” of this team grows stronger, but that does not necessarily make the team as a whole stronger - if a pair continues to get paired up more often than with their other teammates, then this could create factions within the team (extreme case, but a valid concern - similar to Federalist No. 10 mentality). Second, for a team of size 2, the teammates are working with each other constantly and do not need to have consecutive 1+1 pairings with each other.

3. Teammates should be paired with equal frequency.

This builds off of number 2 along with its own concerns. For example, if one person on a team is not paired with the rest of the team as much as the rest of the team is paired amongst themselves, then this person will naturally feel left out. The team grows without this person, and he/she will feel less and less part of the team, which is not conducive to a work environment.