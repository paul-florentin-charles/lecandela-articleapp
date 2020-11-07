import * as __utls from './utils.js';
import * as __cfg from './config.js';

/** GETTERS **/

export function get_title() { return __utls.get_tag_innerHTML('a-meta-title'); }

export function get_author() { return __utls.get_tag_innerHTML('a-meta-author'); }

export function get_date() { return __utls.get_tag_innerHTML('a-meta-date'); }

export function get_article() {
  var art = $('#article').clone(true);

  // Removing all ids of elements and sections
  for (var el of $('.a-paragraph, .a-subtitle, .a-figure, .a-blockquote, .a-section', art)) {
    $(el).removeAttr('id');
  }

  return art.html();
}

/** ARTICLE SECTIONS **/

export function remove_section(section_id) { $('#' + section_id).remove(); }

export function add_section(section_id, name) {
  var section = $('<div class="a-section" id="' + section_id + '">');
  var title = $('<h2 class="a-title">' + name + '</h2>');

  section.append(title);
  insert_section(section);
}

export function modify_section(section_id, section_new_id, new_name) {
  var section = $('#' + section_id);
  section.attr('id', section_new_id);

  var title = $(section.children()[0]);
  title.html(new_name);

  insert_section(section);
}

function insert_section(section) {
  var core = $('#a-core');

  var inserted = false;
  for (var sctn of core.children()) {
    if (__utls.str_to_int($(sctn).attr('id'), 2) > __utls.str_to_int(section.attr('id'), 2)) {
      $(sctn).before(section); // Insert before higher number section
      inserted = true;
      break;
    }
  }
  if (!inserted) core.append(section);
}

/** ARTICLE ELEMENTS **/

export function remove_element(element_id) { $('#' + element_id).remove(); }

export function add_paragraph(content, section_id) {
  var paragraph = $('<p id="' + __utls.unused_id() + '" class="a-paragraph">' + content + '</p>');

  $('#' + section_id).append(paragraph);
}

export function add_subtitle(content, section_id) {
  var subtitle = $('<h3 id="' + __utls.unused_id() + '" class="a-subtitle">' + content + '</h3>');

  $('#' + section_id).append(subtitle);
}

export function add_figure(img_name, caption, section_id) {
  var img = $('<img src="' + __cfg.get_img_path() + img_name + '" alt="' + img_name + '">');
  var fig_cap = $('<figcaption>' + caption + '</figcaption>')

  var figure = $('<figure id="' + __utls.unused_id() + '" class="a-figure">');
  figure.append(img);
  figure.append(fig_cap);

  $('#' + section_id).append(figure);
}

export function add_blockquote(content, section_id) {
  var quote = $('<blockquote id="' + __utls.unused_id() + '" class="a-blockquote">' + content + '</blockquote>');

  $('#' + section_id).append(quote);
}

/** ARTICLE REFERENCES **/

export function add_reference(ref_id, name, author, src, year, url) {
  var ref = $('<li id="' + ref_id + '">');
  $('#a-references').append(ref);

  modify_reference(ref_id, name, author, src, year, url);
}

export function modify_reference(ref_id, name, author, src, year, url) {
  var ref = $('#' + ref_id);

  var info = [];

  var href = '<a class="link--internal" href="#ast-' + __utls.str_to_int(ref_id, 4) + '">&uarr;</a>';
  info.push(href);
  if (url) name = '<a class="link--external" href="' + url + '" target="_blank">' + name + '</a>';
  name = ' <span class="ref-name">' + name + '</span>';
  info.push(name);
  if (author) {
    author = ', <span class="ref-author">' + author + '</span>';
    info.push(author);
  }
  src = ', <span class="ref-src">' + src + '</span>';
  info.push(src);
  if (year) {
    year = ', <span class="ref-year">' + year + '</span>';
    info.push(year);
  }

  ref.prop('innerHTML', info.join(''));
}

export function remove_reference(ref_id) { $('#' + ref_id).remove(); }
