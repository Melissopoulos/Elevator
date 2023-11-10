class Elevator {
  constructor(capacity, numFloors) {
    this.currentFloor = 0;
    this.capacity = capacity;
    this.numFloors = numFloors;
    this.upQueue = Array(numFloors).fill([]);
    this.downQueue = Array(numFloors).fill([]);
  }
  
  addPerson(sourceFloor, destinationFloor) {
    if (destinationFloor > sourceFloor) {
      this.upQueue[sourceFloor].push(destinationFloor);
      this.upQueue[sourceFloor].sort((a, b) => a - b);
    } else if (destinationFloor < sourceFloor) {
      this.downQueue[sourceFloor].push(destinationFloor);
      this.downQueue[sourceFloor].sort((a, b) => b - a);
    }
  }

  getCurrentFloor() {
    return this.currentFloor;
  }
}

module.exports = Elevator;

