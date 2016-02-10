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

Movie.prototype.showtimeList = function () {
  var showtimeList = [];
  this.showtimes.forEach(function(time) {
    showtimeList.push(
      '<button type="button" class="btn btn-link showtime-selection" value="' +
        time.toISOString() + '">' +
        time.toLocaleTimeString() +
      '</button>'
    );
  });
  return showtimeList;
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

var showtimeArray = function(firstShow, lastShow, increment) {
  var firstMinutes = timeStringToMinutes(firstShow);
  var lastMinutes = timeStringToMinutes(lastShow);

  var showtimes = [];
  for (var i = firstMinutes; i < lastMinutes + increment; i += increment) {
    showtimes.push(i);
  }
  return showtimes;
};

var timeStringToMinutes = function(timeString) {
  var hoursMinutes = timeString.split(':');
  return parseInt(hoursMinutes[0]) * 60 + parseInt(hoursMinutes[1]);
};

var showtimeCheckboxes = function(firstShow, lastShow, increment) {
  var showtimes = showtimeArray(firstShow, lastShow, increment);
  var showtimeCheckboxes = [];
  showtimes.forEach(function(showtime) {
    showtimeCheckboxes.push(createShowtimeCheckbox(showtime));
  });
  return showtimeCheckboxes.join('');
};

var createShowtimeCheckbox = function(showtime) {
  var time = new Date(2000, 01, 01, 0, showtime);

  return '<div class="checkbox col-sm-3">' +
    '<label>' +
      '<input class="new-showtime" type="checkbox" value="' + time.toString() + '">' +
      time.toLocaleTimeString() +
    '</label>' +
  '</div>'
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
  $("div#showtime-checkboxes").append(showtimeCheckboxes('00:00', '00:30', 20));
  $("div#showtime-checkboxes").append(showtimeCheckboxes('11:30', '23:30', 20));

  $("form#new-movie").submit(function(event) {
    event.preventDefault();

    var newTitle = $("input#new-title").val();
    var newReleaseDate = $("input#new-release-date").val();
    var newMovie = new Movie(newTitle, newReleaseDate);

    $('.new-showtime:checked').each(function() {
      var newShowtime = $(this).val();
      var newTime = new Date(newShowtime);
      newMovie.showtimes.push(newTime);
    });

    $('#no-movies').hide();
    $("ul#movies").append(
      "<li>" + newMovie.name + newMovie.showtimeList() + "</li>"
    );

    $("input#new-title").val("");
    $("input#new-release-date").val("");

    $(".showtime-selection").click(function() {
      $("ul#movies").append('<p>PICKLE</p>')
      var showtime = $("button.showtime-selection").val()
      $("#selected-time").val(showtime);
    });
  });

  $('form#buy-ticket').submit(function(event) {
    event.preventDefault();

    var patronAge = $("input#patron-age:checked").val() || 0;
    var showtime = $("#selected-time").val();
    
    console.log(patronAge);
    console.log(showtime);
  });

});
