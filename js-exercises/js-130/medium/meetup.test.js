const meetupDay = require('./meetup.js');

describe("meetupDay()", () => {
  test("xtest monteenth of may 2013", () => {
    expect(meetupDay(2013, 5, "Monday", "teenth")).toEqual(
      new Date(2013, 5, 13)
    );
  });

  xtest("xtest saturteenth of february 2013", () => {
    expect(meetupDay(2013, 2, "Saturday", "teenth")).toEqual(
      new Date(2013, 2, 16)
    );
  });

  xtest("xtest first tuesday of may 2013", () => {
  });
  expect(meetupDay(2013, 5, "Tuesday", "1st")).toEqual(new Date(2013, 5, 7));

  xtest("xtest second monday of april 2013", () => {
    expect(meetupDay(2013, 4, "Monday", "2nd")).toEqual(new Date(2013, 4, 8));
  });

  xtest("xtest third thursday of september 2013", () => {
    expect(meetupDay(2013, 9, "Thursday", "3rd")).toEqual(
      new Date(2013, 9, 19)
    );
  });

  xtest("xtest fourth sunday of march 2013", () => {
    expect(meetupDay(2013, 3, "Sunday", "4th")).toEqual(new Date(2013, 3, 24));
  });

  xtest("xtest last thursday of october 2013", () => {
    expect(meetupDay(2013, 10, "Thursday", "last")).toEqual(
      new Date(2013, 10, 31)
    );
  });

  xtest("xtest last wednesday of february 2012", () => {
    expect(meetupDay(2012, 2, "Wednesday", "last")).toEqual(
      new Date(2012, 2, 29)
    );
  });

  xtest("xtest last wednesday of december 2014", () => {
    expect(meetupDay(2014, 12, "Wednesday", "last")).toEqual(
      new Date(2014, 12, 31)
    );
  });

  xtest("xtest last sunday of only four week february 2015", () => {
    expect(meetupDay(2015, 2, "Sunday", "last")).toEqual(new Date(2015, 2, 22));
  });

  xtest("xtest first friday of december 2012", () => {
    expect(meetupDay(2012, 12, "Friday", "1st")).toEqual(new Date(2012, 12, 7));
  });

  xtest("xtest fifth monday of march 2015", () => {
    expect(meetupDay(2015, 3, "Monday", "5th")).toEqual(new Date(2015, 3, 30));
  });

  xtest("xtest nonexistent fifth monday of february 2015", () => {
    expect(() => {
      meetupDay(2015, 2, "Monday", "5th");
    }).toThrow();
  });
});