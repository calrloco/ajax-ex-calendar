$(document).ready(function () {
  // start date
  var startDate = moment("2018-01-01");
  createCal(startDate);
  holiday(startDate);
  // indietro e avanti con la data
  $("i.command").click(function () {
    if ($(this).hasClass("forward") == true) {
      startDate = startDate.add(1, "M");
      if (startDate.year() != 2018) {
        startDate = moment("2018-01-01");
      }
    } else {
      startDate = startDate.subtract(1, "M");
      if (startDate.year() != 2018) {
          startDate = moment("2018-12-01");
      }
    }
    //  svuoto il container
    $(".container-calnedar").empty();
    // faccio riparire le funzioni che lo rienpono
    createCal(startDate);
    holiday(startDate);
  });
});
function holiday(data) {
  $.ajax({
    url: "https://flynn.boolean.careers/exercises/api/holidays",
    method: "GET",
    data: {
      year: data.year(),
      month: data.month(),
    },
    success: function (risposta) {
      // se la lunghezza di risposta e maggiore di 0 allora fai function holiday
      if (risposta.response.length > 0) {
        for (var i = 0; i < risposta.response.length; i++) {
          var item = $(
            'div[data-complete="' + risposta.response[i].date + '"]'
          );
          item.find($('.festa')).append(risposta.response[i].name);
          item.addClass("holiday");
        }
      }
    },
    error: function () {
      alert("could not load calendar");
    },
  });
}
function createCal(data) {
  var daysMonth = data.daysInMonth();
  var month = data.format("MMMM");
  var monthNumber = data.format("MM");
  var year = data.format("YYYY");
  $("h1.calndar-month").html(month + " " + data.format("YYYY"));
  for (var i = 1; i <= daysMonth; i++) {
    var source = $("#days").html();
    var template = Handlebars.compile(source);
    var context = {
      day: addZero(i),
      month: month,
      dataCompleta: year + "-" + monthNumber + "-" + addZero(i),
    };
    var html = template(context);
    $(".container-calnedar").append(html);
  }
}
function addZero(n) {
  if (n < 10) {
    return 0 + "" + n;
  } else {
    return n;
  }
}
