describe('Movie', function() {
  it('creates a new movie with its name, release date, and showtimes', function() {
    var testMovie = createTestMovie();
    expect(testMovie.name).to.equal('Revenge of the Nerds');
    expect(testMovie.releaseDate.toUTCString()).to.equal('Wed, 09 Mar 2016 00:00:00 GMT');
    expect(testMovie.showtimes).to.eql([]);
  });

  it('returns how long a movie has been available at a particular date', function() {
    var testMovie = createTestMovie();
    var testShowtime = createTestShowtime();
    expect(testMovie.daysAvailable(testShowtime)).to.equal(8);
  });

  it('returns whether or not it is a new release at a particular date', function() {
    var testMovie = createTestMovie();
    var testShowtime = createTestShowtime();
    var testNewReleaseShowtime = new Date('2016-03-15T03:24:00');
    expect(testMovie.isNewRelease(testShowtime)).to.equal(false);
    expect(testMovie.isNewRelease(testNewReleaseShowtime)).to.equal(true);
  });
});

describe('Date', function() {
  it('creates a date object with a showtime', function() {
    var testShowtime = createTestShowtime();
    var testMovie = createTestMovie();
    testMovie.showtimes.push(testShowtime);
    expect(testMovie.showtimes).to.eql([testShowtime]);
  });
});

describe('Ticket', function() {
  it('creates a ticket with a movie and showtime', function() {
    var testShowtime = createTestShowtime();
    var testMovie = createTestMovie();
    var testTicket =  new Ticket(testMovie, testShowtime);
    expect(testTicket.movie).to.equal(testMovie);
    expect(testTicket.showtime).to.equal(testShowtime);
  });

  it('returns a price based on showtime, release date, and patron age', function() {
    var testTicket = createTestTicket();
    expect(testTicket.getPrice(50)).to.equal(7);
  });
});

describe('Number', function() {
  describe('toDollarString()', function() {
    it('returns a fixed point number as a string dollar value', function() {
      expect((6).toDollarString()).to.equal('$6.00');
    });
  });
});

describe('showtimeArray', function() {
  it('returns a series of showtimes at the specified increment', function() {
    expect(showtimeArray('00:15', '1:00', 15)).to.eql([15, 30, 45, 60]);
  });
});

var createTestMovie = function() {
  return new Movie('Revenge of the Nerds', '2016-03-09');
};

var createTestShowtime = function() {
  return new Date('2016-03-17T03:24:00');
};

var createTestTicket = function() {
  var testShowtime = createTestShowtime();
  var testMovie = createTestMovie();
  return new Ticket(testMovie, testShowtime);
};
