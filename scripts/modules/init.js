/* Init functions */

export function init_document() {
  init_article();
  init_form();
}

function init_article() {
  // Creating the 3 main sections of article (header, core and footer)
  var header = document.createElement('div');
  header.id = 'a_header';
  var core = document.createElement('div');
  core.id = 'a_core';
  var footer = document.createElement('div');
  footer.id = 'a_footer';

  // Header init
  var metadata = document.createElement('ul');
  metadata.id = 'a_metadata';
  var title = document.createElement('li');
  title.id = 'a_title';
  var author = document.createElement('li');
  author.id = 'a_author';
  var date = document.createElement('li');
  date.id = 'a_date';
  metadata.appendChild(title);
  metadata.appendChild(author);
  metadata.appendChild(date);
  header.appendChild(metadata);

  // Footer init
  var references = document.createElement('ol');
  references.id = 'a_references';
  footer.appendChild(references);

  // Appending the 3 main sections to article
  var article = document.getElementById('article');
  article.appendChild(header);
  article.appendChild(core);
  article.appendChild(footer);
}

function init_form() {
  // Flushing input fields of form
  var ids = ['f_title', 'f_author', 'f_date', 'f_sctn_name', 'f_sctn_nbr'];
  for (var id of ids) document.getElementById(id).value = null;

  // Reset select tag used for section selection
  document.getElementById('f_sctn_lst').length = 0;

  // Checking rank displayal checkbox by default
  document.getElementById('f_sctn_show_nbr').checked = true;

  // Flushing textarea and inputs of element manager
  ids = ['f_el_par', 'f_el_subttl', 'f_el_caption', 'f_el_quote'];
  for (var id of ids) document.getElementById(id).value = null;

  // Flushing file input of element manager, for images
  document.getElementById('f_el_img').files = null;
  document.getElementById('f_el_img').value = null;

  // Flushing reference manager inputs
  ids = ['f_ref_name', 'f_ref_author', 'f_ref_src', 'f_ref_year', 'f_ref_url']
  for (var id of ids) document.getElementById(id).value = null;
}
