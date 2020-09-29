import * as __utils from './utils.js';
import * as __cfg from './config.js';
import * as __form from './form.js';

/** GETTERS **/

export function get_article() {
  var art =  document.getElementById('article').cloneNode(true);

  // Removing all ids of elements and sections
  for (var par of art.getElementsByClassName('paragraph')) {
    par.removeAttribute('id');
  }
  for (var sub of art.getElementsByClassName('subtitle')) {
    sub.removeAttribute('id');
  }
  for (var fig of art.getElementsByClassName('figure')) {
    fig.removeAttribute('id');
  }
  for (var quo of art.getElementsByClassName('blockquote')) {
    quo.removeAttribute('id');
  }
  for (var sec of art.getElementsByClassName('section')) {
    sec.removeAttribute('id');
  }

  return art.innerHTML;
}

/** SETTERS **/

export function set_title(title) { document.getElementById('a_title').innerHTML = title; }

export function set_author(author) { document.getElementById('a_author').innerHTML = author; }

export function set_date(date) { document.getElementById('a_date').innerHTML = date; }

/** ARTICLE SECTIONS **/

export function remove_section(section_id) { document.getElementById(section_id).remove(); }

export function add_section(section_id, name) {
  var title = document.createElement('h2');
  title.setAttribute('class', 'title');
  title.innerHTML = name;

  var section = document.createElement('div');
  section.setAttribute('class', 'section');
  section.id = section_id;

  section.appendChild(title);

  // Adding section to core of article
  var core = document.getElementById('a_core');

  var inserted = false;
  for (var sctn of core.children) {
    if (__form.get_section_nbr(sctn.id) > __form.get_section_nbr(section.id)) {
      core.insertBefore(section, sctn); // Insert before higher number section
      inserted = true;
      break;
    }
  }
  if (!inserted) core.appendChild(section);
}

export function modify_section(section_id, section_new_id, new_name) {
  var section = document.getElementById(section_id);
  var title = section.children[0];

  title.innerHTML = new_name;
  section.id = section_new_id;

  // Re-adding section to core of article
  var core = document.getElementById('a_core');

  var inserted = false;
  for (var sctn of core.children) {
    if (__form.get_section_nbr(sctn.id) > __form.get_section_nbr(section.id)) {
      core.insertBefore(section, sctn); // Insert before higher number section
      inserted = true;
      break;
    }
  }
  if (!inserted) core.appendChild(section);
}

/** ARTICLE ELEMENTS **/

export function remove_element(el_lst, el_idx) { document.getElementById(el_lst.children[el_idx].value).remove(); }

export function add_paragraph(content, section_id) {
  var section = document.getElementById(section_id);

  var paragraph = document.createElement('p'); // Create a paragraph
  paragraph.innerHTML = content;

  paragraph.id = __utils.unused_id(section_id + '_'); // Set up a random id

  paragraph.setAttribute('class', 'paragraph');
  section.appendChild(paragraph);
}

export function add_subtitle(content, section_id) {
  var section = document.getElementById(section_id);

  var subtitle = document.createElement('h3');
  subtitle.innerHTML = content;

  subtitle.id = __utils.unused_id(section_id + '_'); // Set up a random id

  subtitle.setAttribute('class', 'subtitle');
  section.appendChild(subtitle);
}

export function add_figure(img_name, caption, section_id) {
  var section = document.getElementById(section_id);

  // Create and set up img tag
  var img = document.createElement('img');
  img.src = __cfg.get_img_path() + img_name;
  img.alt = "There should be this image here: " + img_name;

  // Create and set up figcaption tag
  var fig_cap = document.createElement('figcaption')
  fig_cap.innerHTML = caption;

  // Create and set up figure tag
  var figure = document.createElement('figure');
  figure.id = __utils.unused_id(section_id + '_'); // Set up a random id
  figure.setAttribute('class', 'figure');

  // Append tags
  figure.appendChild(img);
  figure.appendChild(fig_cap);
  section.appendChild(figure);
}

export function add_quote(content, section_id) {
  var section = document.getElementById(section_id);

  var quote = document.createElement('blockquote'); // Create a blockquote
  quote.innerHTML = content;

  quote.id = __utils.unused_id(section_id + '_'); // Set up a random id

  quote.setAttribute('class', 'blockquote');
  section.appendChild(quote);
}

/** ARTICLE REFERENCES **/

export function add_reference(ref_id, name, author, src, year, url) {
  var ref = document.createElement('li');
  ref.id = ref_id;

  var refs = document.getElementById('a_references');
  refs.appendChild(ref);

  modify_reference(ref_id, name, author, src, year, url);
}

export function modify_reference(ref_id, name, author, src, year, url) {
  var ref = document.getElementById(ref_id);

  var info = [];

  var href = '<a href="#' + ref_id + '_txt">&uarr;</a>';
  info.push(href);
  if (url) name = '<a href="' + url + '" target="_blank">' + name + '</a>';
  name = '<span class="ref_name">' + name + '</span>';
  info.push(name);
  if (author) {
    author = '<span class="ref_author">' + author + '</span>';
    info.push(author);
  }
  src = '<span class="ref_src">' + src + '</span>';
  info.push(src);
  if (year) {
    year = '<span class="ref_year">' + year + '</span>';
    info.push(year);
  }

  ref.innerHTML = info.join('');
}

export function remove_reference(ref_id) {
  document.getElementById(ref_id).remove();
}
