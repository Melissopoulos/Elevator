

class Elevator {
  constructor(totalCapacity, numFloors) {
    this.currentFloor = 0;
    this.peopleInElevator = [];
    this.currentCapacity = totalCapacity;
    this.totalCapacity = totalCapacity;
    this.numFloors = numFloors;
    this.upQueue = Array(numFloors).fill(null).map(() => []);
    this.downQueue = Array(numFloors).fill(null).map(() => []);
  }
  //Adds a person in the correct Queue (upQueue and downQueue)
  addPerson(sourceFloor, destinationFloor) {
    if (destinationFloor > sourceFloor) {
      this.upQueue[sourceFloor].push(destinationFloor);
      this.upQueue[sourceFloor].sort((a, b) => a - b);
      console.log(this.upQueue,this.downQueue);
    } else if (destinationFloor < sourceFloor) {
      this.downQueue[sourceFloor].push(destinationFloor);
      this.downQueue[sourceFloor].sort((a, b) => b - a);
      console.log(this.upQueue,this.downQueue);
    }
  }

  move() {
    console.log(`Elevator is on floor ${this.currentFloor}`);
    // If there is a person that leaves the elevator on current floor
    if(this.peopleInElevator.some(person => person === this.currentFloor)){
      //Array of people that left the elevator
      const peopleExitElevator = this.peopleInElevator.filter(person => person === this.currentFloor)
      this.currentCapacity += peopleExitElevator.length;
      //People that stay in elevator
      this.peopleInElevator = this.peopleInElevator.filter(person => !peopleExitElevator.includes(person))
    }
    
    // Check if there are any people in the elevator going up to floors above the current floor.
    if (this.upQueue[this.currentFloor].length > 0 && this.currentCapacity > 0) {
      
      const destinationFloor = this.upQueue[this.currentFloor][0];
      this.peopleInElevator = this.upQueue[this.currentFloor].splice(0, this.currentCapacity);
      this.currentCapacity = this.totalCapacity - this.peopleInElevator.length;
      console.log(`Going up to floor ${destinationFloor} with ${this.peopleInElevator.length} people inside`);
      this.currentFloor = destinationFloor;
      this.move(); // Call move recursively.
    
    }
    // Check if there are any people in the elevator going down to floors below the current floor.
    else if (this.downQueue[this.currentFloor].length > 0 && this.currentCapacity > 0) {
      const destinationFloor = this.downQueue[this.currentFloor][0];
      this.peopleInElevator = this.downQueue[this.currentFloor].splice(0, this.currentCapacity);
      this.currentCapacity = this.totalCapacity - this.peopleInElevator.length;
      console.log(`Going down to floor ${destinationFloor} with ${this.peopleInElevator.length} people inside`);
      this.currentFloor = destinationFloor;
      this.move(); // Call move recursively.
    }
    // If there are no more requests, return to the ground floor.
    else if (this.currentFloor !== 0) {
      console.log(`Returning to ground floor`);
      this.currentFloor = 0;
      this.move();
    } else {
      console.log(`Elevator is idle`);
      return;
    }
  }

  start() {
    this.move();
  }

  getCurrentFloor() {
    return this.currentFloor;
  }
}

module.exports = Elevator;

