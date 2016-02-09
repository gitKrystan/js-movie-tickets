function Movie(name, releaseDate, showtimes) {
  this.name = name;
  this.releaseDate = new Date(releaseDate);
  this.showtimes = [];
}

Movie.prototype.daysAvailable = function(showtime) {
  var millisecondsInADay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
  var differenceInMilliseconds = showtime.getTime() - this.releaseDate.getTime();
  return Math.round(Math.abs((differenceInMilliseconds)/millisecondsInADay));
};

Movie.prototype.isNewRelease = function (showtime) {
  daysAvailable = this.daysAvailable(showtime);
  return daysAvailable < 8;
};

function Ticket(movie, showtime) {
  this.movie = movie;
  this.showtime = showtime;
}

Ticket.prototype.getPrice = function (patronAge) {
  defaultPrice = 8.00;

  // newReleaseModifier
  var newReleaseModifier = 0;
  var movie = this.movie;
  var showtime = this.showtime;
  if (movie.isNewRelease(showtime)) {
    newReleaseModifier = 1.00;
  }

  // matineeModifier
  var matineeModifier = 0;
  if (showtime.isMatinee()) {
    matineeModifier = -1.00;
  }

  // patronAgeModifier
  var patronAgeModifier = 0;
  if (patronAge > 54) {
    patronAgeModifier = -1.00;
  }

  return defaultPrice + newReleaseModifier + matineeModifier + patronAgeModifier;
};

Number.prototype.toDollarString = function () {
  var priceFixed = this.toFixed(2);
  return "$" + priceFixed.toString();
};

Date.prototype.isMatinee = function() {
  var hour = this.getUTCHours();
  return hour < 16;
};

$(document).ready(function() {
  $("form#new-movie").submit(function(event) {
    event.preventDefault();

    var newTitle = $("input#new-title").val();
    var newReleaseDate = $("input#new-release-date").val();
    var newMovie = new Movie(newTitle, newReleaseDate);

    $("ul#movies").append("<li>" + newMovie.name + "</li>");
  });

});
