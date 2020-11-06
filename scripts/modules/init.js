/* Init functions */

/** Main function **/

export function init_document(article_id, checkboxes_ids = [], inputs_ids = []) {
  init_article(article_id);
  init_form(checkboxes_ids, inputs_ids);
}

/** Sub-functions **/

function init_article(article_id) {
  // Creating the 3 main sections of article (header, core and footer)
  var header = $('<div>');
  $(header).attr('id', 'a-header');
  var core = $('<div>');
  $(core).attr('id', 'a-core');
  var footer = $('<div>');
  $(footer).attr('id', 'a-footer');

  // Header init
  var metadata = $('<ul>');
  $(metadata).attr('id', 'a-metadata');

  var title = $('<li>');
  $(title).attr('id', 'a-meta-title');
  var author = $('<li>');
  $(author).attr('id', 'a-meta-author');
  var date = $('<li>');
  $(date).attr('id', 'a-meta-date');

  $(metadata).append(title);
  $(metadata).append(author);
  $(metadata).append(date);

  $(header).append(metadata);

  // Footer init
  var references = $('<ol>');
  $(references).attr('id', 'a-references');

  $(footer).append(references);

  // Appending the 3 main sections to article
  var article = $('#' + article_id);

  $(article).append(header);
  $(article).append(core);
  $(article).append(footer);
}

function init_form(checkboxes_ids = [], inputs_ids = []) {
  for (var id of checkboxes_ids) $("#" + id).prop('checked', true); // Checking all by default
  for (var id of inputs_ids) $("#" + id).prop('value', null); // Flushing desired inputs
}
