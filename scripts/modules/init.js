/* Init functions */

export function init_article() {
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
  footer.appendChild(document.createTextNode("\t"));
  footer.appendChild(date);

  // Appending the 3 main sections to article
  var article = document.getElementById('article');
  article.appendChild(header);
  article.appendChild(core);
  article.appendChild(footer);
}

export function init_form() {
  // Flushing input fields of form
  var ids = ['f_title', 'f_author', 'f_date', 'f_sctn_name', 'f_sctn_nbr'];
  for (var id of ids) {
    document.getElementById(id).value = null;
  }

  // Reset select tag used for section selection
  document.getElementById('f_sctn_lst').length = 0;

  // Checking rank displayal checkbox by default
  document.getElementById('f_sctn_show_nbr').checked = true;

  // Flushing textarea and inputs of element manager
  ids = ['f_el_par', 'f_el_subttl', 'f_el_caption', 'f_el_quote'];
  for (var id of ids) {
    document.getElementById(id).value = null;
  }

  // Flushing file input of element manager, for images
  document.getElementById('f_el_img').files = null;
  document.getElementById('f_el_img').value = null;

  // Setting textarea properties
  var textarea = document.getElementById('f_el_par');
  textarea.rows = 14;
  textarea.cols = 100;
}
