let CircularBuffer = require('./circular-buffer.js');

describe("CircularBuffer", () => {
  test("write and read back one item", () => {
    const bufferSize = 1;
    const buffer = new CircularBuffer(bufferSize);
    expect(buffer.elements.length).toBe(buffer.size);
    buffer.write("1");
    expect(buffer.read()).toBe("1");
    expect(buffer.elements.length).toBe(buffer.size);
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });

  test("write and read back multiple items", () => {
    const bufferSize = 2;
    const buffer = new CircularBuffer(bufferSize);
    expect(buffer.elements.length).toBe(buffer.size);
    buffer.write("1");
    buffer.write("2");
    expect(buffer.read()).toBe("1");
    expect(buffer.read()).toBe("2");
    buffer.write("3");
    buffer.write("4");
    expect(buffer.read()).toBe("3");
    expect(buffer.read()).toBe("4");
    expect(buffer.elements.length).toBe(buffer.size);
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });

  test("clearing a buffer", () => {
    const bufferSize = 2;
    const buffer = new CircularBuffer(bufferSize);
    buffer.write("1");
    buffer.write("2");
    buffer.clear();
    expect(() => buffer.read()).toThrow("Buffer is empty");
    buffer.write("3");
    buffer.write("4");
    expect(buffer.read()).toBe("3");
    expect(buffer.read()).toBe("4");
  });

  test("alternate write and read", () => {
    const bufferSize = 2;
    const buffer = new CircularBuffer(bufferSize);
    buffer.write("1");
    expect(buffer.read()).toBe("1");
    buffer.write("2");
    expect(buffer.read()).toBe("2");
  });

  test("reads back oldest item", () => {
    const buffer = new CircularBuffer(3);
    buffer.write("1");
    buffer.write("2");
    buffer.read();
    buffer.write("3");
    expect(buffer.read()).toBe("2");
    expect(buffer.read()).toBe("3");
  });

  test("writes of undefined or null don't occupy buffer", () => {
    const buffer = new CircularBuffer(3);
    buffer.write(null);
    buffer.write(undefined);
    [1, 2, 3].map(i => buffer.write(i.toString()));
    expect(buffer.read()).toBe("1");
  });

  test("writing to a full buffer throws a BufferFullError", () => {
    const buffer = new CircularBuffer(2);
    buffer.write("1");
    buffer.write("2");
    expect(() => buffer.write("A")).toThrow("Buffer is full");
  });

  test("forced writes over write oldest item in a full buffer", () => {
    const bufferSize = 2;
    const buffer = new CircularBuffer(bufferSize);
    expect(buffer.elements.length).toBe(buffer.size);
    buffer.write("1");
    buffer.write("2");
    buffer.forceWrite("A");
    expect(buffer.elements.length).toBe(buffer.size);
    expect(buffer.read()).toBe("2");
    expect(buffer.read()).toBe("A");
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });

  test("forced writes act like write in a non-full buffer", () => {
    const buffer = new CircularBuffer(2);
    buffer.write("1");
    buffer.forceWrite("2");
    expect(buffer.read()).toBe("1");
    expect(buffer.read()).toBe("2");
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });

  test("alternate force write and read into full buffer", () => {
    const buffer = new CircularBuffer(5);
    [1, 2, 3].map(i => buffer.write(i.toString()));
    buffer.read();
    buffer.read();
    buffer.write("4");
    buffer.read();
    [5, 6, 7, 8].map(i => buffer.write(i.toString()));
    buffer.forceWrite("A");
    buffer.forceWrite("B");
    expect(buffer.read()).toBe("6");
    expect(buffer.read()).toBe("7");
    expect(buffer.read()).toBe("8");
    expect(buffer.read()).toBe("A");
    expect(buffer.read()).toBe("B");
    expect(() => buffer.read()).toThrow("Buffer is empty");
  });
});