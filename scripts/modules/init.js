import * as __utls from './utils.js';

/* Init functions */

/** Main function **/

export function init_document(article_id, checkboxes_ids = [], inputs_ids = []) {
  init_article(article_id);
  init_form(checkboxes_ids, inputs_ids);
}

/** Sub-functions **/

function init_article(article_id) {
  // Creating the 3 main sections of article (header, core and footer)
  var header = __utls.crEl('div');
  header.id = 'a-header';
  var core = __utls.crEl('div');
  core.id = 'a-core';
  var footer = __utls.crEl('div');
  footer.id = 'a-footer';

  // Header init
  var metadata = __utls.crEl('ul');
  metadata.id = 'a-metadata';

  var title = __utls.crEl('li');
  title.id = 'a-meta-title';
  var author = __utls.crEl('li');
  author.id = 'a-meta-author';
  var date = __utls.crEl('li');
  date.id = 'a-meta-date';

  metadata.appendChild(title);
  metadata.appendChild(author);
  metadata.appendChild(date);

  header.appendChild(metadata);

  // Footer init
  var references = __utls.crEl('ol');
  references.id = 'a-references';

  footer.appendChild(references);

  // Appending the 3 main sections to article
  var article = __utls.byId(article_id);

  article.appendChild(header);
  article.appendChild(core);
  article.appendChild(footer);
}

function init_form(checkboxes_ids = [], inputs_ids = []) {
  for (var id of checkboxes_ids) __utls.byId(id).checked = true; // Checking all by default
  for (var id of inputs_ids) __utls.byId(id).value = null; // Flushing desired inputs
}
