// https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0
/** "response": [
 * {"name": "capodanno",
 * "date": "2018-01-01"}
 * ] */

$(document).ready(function () {
  // start date
  var startDate = moment("2018-01-01");
  console.log(startDate);
  createCal(startDate);
  holiday(startDate)
});
function holiday (data){
    $.ajax({
        url: 'https://flynn.boolean.careers/exercises/api/holidays',
        method: 'GET',
        data: {
            year:data.year(),
            month:data.month()
        },
        success: function(risposta){
            for(var i=0;i<risposta.response.length;i++){
                var item = $('div[data-complete="'+risposta.response[i].date+ '"]');
                item.append(risposta.response[i].name);
                item.addClass('holiday');
            }
        },
        error: function(){
            alert('could not load calendar');
        }
    });
}
function createCal (data){
    var daysMonth = data.daysInMonth();
    var month = data.format("MMMM");
    var monthNumber =  data.format("MM");
    var year = data.format("YYYY");
    $("h1.calndar-month").html(month + " " + data.format("YYYY"));
    for (var i = 1; i <= daysMonth; i++) {
      var source = $("#days").html();
      var template = Handlebars.compile(source);
      var context = {
        day: addZero(i),
        month: month,
        dataCompleta: year +'-'+monthNumber+'-'+addZero(i)
      };
      var html = template(context);
      $(".container-calnedar").append(html);
    }
};
function addZero(n){
    if (n < 10){
        return 0 +''+n;
    }else{
        return n
    }
};
