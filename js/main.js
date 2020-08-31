// https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
/** "response": [
 * {"name": "capodanno",
 * "date": "2018-01-01"}
 * ] */

$(document).ready(function () {
  // start date
  var startDate = moment("2018-01-01");
  console.log(startDate);
  var daysMonth = startDate.daysInMonth();
  var month = startDate.format("MMMM");
  console.log(daysMonth);
  $("h1.calndar-month").html(month + " " + startDate.format("YYYY"));
  for (var i = 1; i <= daysMonth; i++) {
    var source = $("#days").html();
    var template = Handlebars.compile(source);
    var context = {
      day: i,
      month: month,
    };
    var html = template(context);
    $(".container-calnedar").append(html);
  }
});
