import * as __utls from './utils.js';
import * as __cfg from './config.js';

/** GETTERS **/

export function get_title() { return __utls.get_tag_innerHTML('#a-meta-title'); }

export function get_author() { return __utls.get_tag_innerHTML('#a-meta-author'); }

export function get_date() { return __utls.get_tag_innerHTML('#a-meta-date'); }

export function get_article() {
  var art = $('#article').clone();

  $('.a-paragraph, .a-subtitle, .a-figure, .a-blockquote, .a-section', art).each(function() {
    $(this).removeAttr('id');
  });

  return art.html();
}

/** SETTERS **/

export function set_title(jQid_title) { $('#a-meta-title').html($(jQid_title).val()); }

export function set_author(jQid_author) { $('#a-meta-author').html($(jQid_author).val()); }

export function set_date(jQid_date) { $('#a-meta-date').html(__utls.date_US_to_EU($(jQid_date).val())); }

/** ARTICLE SECTIONS **/

export function remove_section(jQid_section) { $(jQid_section).remove(); }

export function add_section(jQid_section, name) {
  var section = $(`<div class="a-section" id="${jQid_section.slice(1)}">`);
  var title = $(`<h2 class="a-title">${name}</h2>`);

  section.append(title);
  insert_section(section);
}

export function modify_section(jQid_section_old, jQid_section_new, name) {
  var section = $(jQid_section_old);
  section.attr('id', jQid_section_new.slice(1));

  var title = $(section.children()[0]);
  title.html(name);

  insert_section(section);
}

function insert_section(section) {
  var core = $('#a-core');

  for (let sec of core.children()) {
    if (__utls.str_to_int($(sec).attr('id'), 2) > __utls.str_to_int(section.attr('id'), 2)) {
      $(sec).before(section); // Insert before higher number section
      return;
    }
  }

  core.append(section);
}

/** ARTICLE ELEMENTS **/

export function remove_element(jQid_element) { $(jQid_element).remove(); }

export function copy_element(jQid_element, jQid_e_par, jQid_e_subttl, jQid_e_cap, jQid_e_quote) {
  var element = $(jQid_element);
  switch (element.prop('class')) {
    case 'a-paragraph':
      __utls.set_tag_value(jQid_e_par, element.html());
      break;
    case 'a-subtitle':
      __utls.set_tag_value(jQid_e_subttl, element.html());
      break;
    case 'a-figure':
      __utls.set_tag_value(jQid_e_cap, $(element.children()[0]).html());
      break;
    case 'a-blockquote':
      __utls.set_tag_value(jQid_e_quote, element.html());
      break;
    default:
      alert("Unknown element !");
      break;
  }
}

export function add_paragraph(content, jQid_section) {
  var paragraph = $(`<p id="${__utls.unused_id()}" class="a-paragraph">${content}</p>`);

  $(jQid_section).append(paragraph);
}

export function add_subtitle(content, jQid_section) {
  var subtitle = $(`<h3 id="${__utls.unused_id()}" class="a-subtitle">${content}</h3>`);

  $(jQid_section).append(subtitle);
}

export function add_figure(img_name, caption, jQid_section) {
  var fig_cap = $(`<figcaption>${caption}</figcaption>`);
  var img = $(`<img src="${__cfg.get_img_path()}${img_name}" alt="${img_name}">`);

  var figure = $(`<figure id="${__utls.unused_id()}" class="a-figure">`);
  figure.append(fig_cap, img);

  $(jQid_section).append(figure);
}

export function add_blockquote(content, jQid_section) {
  var quote = $(`<blockquote id="${__utls.unused_id()}" class="a-blockquote">${content}</blockquote>`);

  $(jQid_section).append(quote);
}

/** ARTICLE REFERENCES **/

export function add_reference(jQid_reference, name, author, src, year, url) {
  var ref = $(`<li id="${jQid_reference.slice(1)}">`);
  $('#a-references').append(ref);

  modify_reference(jQid_reference, name, author, src, year, url);
}

export function modify_reference(jQid_reference, name, author, src, year, url) {
  var ref = $(jQid_reference);

  var href = `<a class="link--internal" href="#ast-${jQid_reference.slice(5)}">&uarr;</a>`;

  if (url) name = `<a class="link--external" href="${url}" target="_blank">${name}</a>`;
  name = ` <span class="ref-name">${name}</span>`;
  href += name;
  if (author) {
    author = `, <span class="ref-author">${author}</span>`;
    href += author;
  }
  src = `, <span class="ref-src">${src}</span>`;
  href += src;
  if (year) {
    year = `, <span class="ref-year">${year}</span>`;
    href += year;
  }

  ref.html(href);
}

export function remove_reference(jQid_reference) { $(jQid_reference).remove(); }
