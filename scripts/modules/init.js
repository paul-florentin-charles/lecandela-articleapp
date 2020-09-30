/* Init functions */

/** Main function **/

export function init_document(article_id, checkboxes_ids = [], inputs_ids = []) {
  init_article(article_id);
  init_form(checkboxes_ids, inputs_ids);
}

/** Sub-functions **/

function init_article(article_id) {
  // Creating the 3 main sections of article (header, core and footer)
  var header = document.createElement('div');
  header.id = 'a-header';
  var core = document.createElement('div');
  core.id = 'a-core';
  var footer = document.createElement('div');
  footer.id = 'a-footer';

  // Header init
  var metadata = document.createElement('ul');
  metadata.id = 'a-metadata';

  var title = document.createElement('li');
  title.id = 'a-meta-title';
  var author = document.createElement('li');
  author.id = 'a-meta-author';
  var date = document.createElement('li');
  date.id = 'a-meta-date';

  metadata.appendChild(title);
  metadata.appendChild(author);
  metadata.appendChild(date);

  header.appendChild(metadata);

  // Footer init
  var references = document.createElement('ol');
  references.id = 'a-references';

  footer.appendChild(references);

  // Appending the 3 main sections to article
  var article = document.getElementById(article_id);

  article.appendChild(header);
  article.appendChild(core);
  article.appendChild(footer);
}

function init_form(checkboxes_ids = [], inputs_ids = []) {
  for (var id of checkboxes_ids) document.getElementById(id).checked = true; // Checking all by default
  for (var id of inputs_ids) document.getElementById(id).value = null; // Flushing desired inputs
}
