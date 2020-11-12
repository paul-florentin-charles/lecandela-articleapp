/* Init functions */

/** Main function **/

export function init_document(article_id) {
  init_article(article_id);
  init_form();
}

/** Sub-functions **/

function init_article(article_id) {
  // Creating the 3 main sections of article (header, core and footer)
  var header = $('<div id="a-header">');
  var core = $('<div id="a-core">');
  var footer = $('<div id="a-footer">');

  // Header init
  var metadata = $('<ul id="a-metadata">');

  var title = $('<li id="a-meta-title">');
  var author = $('<li id="a-meta-author">');
  var date = $('<li id="a-meta-date">');

  metadata.append(title);
  metadata.append(author);
  metadata.append(date);

  header.append(metadata);

  // Footer init
  var references = $('<ol id="a-references">');

  footer.append(references);

  // Appending the 3 main sections to article
  var article = $(`#${article_id}`);

  article.append(header);
  article.append(core);
  article.append(footer);
}

function init_form() { /* TODO ? */ }
