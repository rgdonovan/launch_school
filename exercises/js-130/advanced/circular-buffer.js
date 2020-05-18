class CircularBuffer {
  constructor(bufferSize) {
    this.size = bufferSize;
    this.elements = new Array(this.size).fill(null);
    this.oldestSlot = 0;
    this.emptySlot = 0;
  }

  incrementOldestSlot() {
    this.oldestSlot = (this.oldestSlot + 1) % this.size;
  }

  incrementEmptySlot() {
    this.emptySlot = (this.emptySlot + 1) % this.size;
  }

  isFull() {
    return this.elements.every(element => element !== null);
  }

  isEmpty() {
    return this.elements.every(element => element === null);
  }

  forceWrite(newElement) {
    if (newElement === null || newElement === undefined) return;
  
    if (!this.isFull()) {
      this.write(newElement);
      return;
    } else {
      this.elements[this.oldestSlot] = newElement;
      this.incrementOldestSlot();
    }
  }

  write(newElement) {
    if (this.isFull()) {
      throw new Error("Buffer is full");
    }

    if (newElement === null || newElement === undefined) return;

    this.elements[this.emptySlot] = newElement;
    this.incrementEmptySlot();
  }

  read() {
    if (this.isEmpty()) {
      throw new Error("Buffer is empty");
    }
    let oldestValue = this.elements[this.oldestSlot]
    this.elements[this.oldestSlot] = null;
    this.incrementOldestSlot();
    return oldestValue;
  }

  clear() {
    this.elements.fill(null);
  }
}

module.exports = CircularBuffer;