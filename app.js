// For debugging purpose
var form = document.getElementById('form');
var article = document.getElementById('article');

// Submit article
function submit_article() {
  var article_raw_html = document.getElementById('article').innerHTML;
  // TODO: Send a JSON with raw HTML, title, author (optional) and date
}

function init_article() {
  console.log("...");
}

function update_title() {
  var title = document.getElementById('f_title').value;
  document.getElementById('a_title').innerHTML = title;
  console.log(title);
}

function update_author() {
  var author = document.getElementById('f_author').value;
  document.getElementById('a_author').innerHTML = author;
  console.log(author);
}

function update_date() {
  var date = document.getElementById('f_date').value;
  var date_obj = new Date(date);
  date = date_obj.getDate() + "." + (date_obj.getMonth() + 1) + "." + date_obj.getFullYear();
  document.getElementById('a_date').innerHTML = "<i>" + date + "</i>";
  console.log(date);
}
