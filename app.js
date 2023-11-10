const Elevator = require('./elevator');

const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

function collectInput(floor, elevator) {
    if (floor === numFloors) {
        // Exit the function if we've reached the desired number of floors.
        console.log(`Collected input for all floors...`);
        console.log(elevator.upQueue,elevator.downQueue);
        readline.close();
        elevator.start();
        return;
      }
    readline.question(`Enter the number of people on floor ${floor} (0 to skip): `, (numPeople) => {
    numPeople = parseInt(numPeople);
    // If numPeople = 0, skip the current floor and move to the next one.
    if (numPeople === 0) {
      console.log(`Skipping floor ${floor}`);
      collectInput(floor + 1, elevator);
      return;
    }
  // Function to collect destination floors for each person on the current floor.
    function collectPeople(i) {
      if (i === numPeople) {
        // If all people on the floor have been processed, move to the next floor.
        collectInput(floor + 1, elevator);
        return;
      }

      readline.question(`Enter the destination floor for person ${i + 1} on floor ${floor}: `, (destination) => {
        destination = parseInt(destination);
        
        if (destination === floor) {
            console.log(`Invalid destination. Destination floor cannot be the same as the current floor.`);
            // Try again for the current person.
            collectPeople(i);
          } else {
            // Add the person's destination floor to the elevator's queues.
            elevator.addPerson(floor, destination);
            // Recursively collect destination floors for the next person.
            collectPeople(i + 1);
          }
      });
    }
     // Start collecting destination floors for people on the current floor.
    collectPeople(0);
  });
}

// Generate random capacity and number of floors.
const capacity = 2; //Random capacity between 1 and 10.
const numFloors = 3; // Random number of floors between 2 and 11.

const elevator = new Elevator(capacity, numFloors);

console.log(`Elevator capacity: ${capacity}`);
console.log(`Number of floors: ${numFloors}`);
//Run collectInput for the ground floor
collectInput(0, elevator)