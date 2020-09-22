/* Events */

// Ask the user for confirmation when leaving the page (not to lose any data by mistake)
// Event is triggered when leaving the page (refreshing or closing it)
window.onbeforeunload = function() { return ""; };

// Load several elements in the article preview and reset form values
// Event is triggered when loading the page (refreshing or opening it)
window.onload = function() {
  init_article();
  init_form();
}

/* Init functions */

function init_article() {
  // Creating the 3 main sections of article (header, core and footer)
  var header = document.createElement('div');
  header.id = 'a_header';
  var core = document.createElement('div');
  core.id = 'a_core';
  var footer = document.createElement('div');
  footer.id = 'a_footer';

  // Header init
  var title = document.createElement('h1');
  title.id = 'a_title';
  header.appendChild(title);

  // Footer init
  var author = document.createElement('span');
  author.id = 'a_author';
  var date = document.createElement('span');
  date.id = 'a_date';
  footer.appendChild(author);
  footer.appendChild(document.createTextNode(" "));
  footer.appendChild(date);

  // Appending the 3 main sections to article
  var article = document.getElementById('article');
  article.appendChild(header);
  article.appendChild(core);
  article.appendChild(footer);
}

function init_form() {
  // Flushing input fields of form
  var ids = ['f_title', 'f_author', 'f_date', 'f_sctn_name', 'f_sctn_rank'];
  for (id of ids) {
    document.getElementById(id).value = null;
  }

  // Reset select tag used for section selection
  document.getElementById('f_sctn_lst').length = 0;

  // Checking rank displayal checkbox by default
  document.getElementById('f_sctn_display_rank').checked = true;
}
