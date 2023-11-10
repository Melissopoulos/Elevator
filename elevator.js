

class Elevator {
  constructor(capacity, numFloors) {
    this.currentFloor = 0;
    this.capacity = capacity;
    this.numFloors = numFloors;
    this.upQueue = Array(numFloors).fill(null).map(() => []);
    this.downQueue = Array(numFloors).fill(null).map(() => []);
  }
  
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
    
    // Check if there are any people in the elevator going up to floors above the current floor.
    if (this.upQueue[this.currentFloor].length > 0) {

      const destinationFloor = this.upQueue[this.currentFloor][0];
      console.log(`Going up to floor ${this.upQueue[this.currentFloor][0]}`);
      this.upQueue[this.currentFloor].shift(); // Remove the first destination floor from the up queue.
      this.currentFloor = destinationFloor;
      this.move(); // Call move recursively.
    
    }
    // Check if there are any people in the elevator going down to floors below the current floor.
    else if (this.downQueue[this.currentFloor].length > 0) {
      const destinationFloor = this.downQueue[this.currentFloor][0];
      console.log(`Going down to floor ${this.downQueue[this.currentFloor][0]}`);
      this.downQueue[this.currentFloor].shift(); // Remove the first destination floor from the down queue.
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

