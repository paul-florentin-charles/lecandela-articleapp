import * as __utls from './utils.js';
import * as __cfg from './config.js';
import * as __form from './form.js';

/** GETTERS **/

export function get_article() {
  var art =  __utls.byId('article').cloneNode(true);

  // Removing all ids of elements and sections
  for (var par of art.getElementsByClassName('a-paragraph')) {
    par.removeAttribute('id');
  }
  for (var sub of art.getElementsByClassName('a-subtitle')) {
    sub.removeAttribute('id');
  }
  for (var fig of art.getElementsByClassName('a-figure')) {
    fig.removeAttribute('id');
  }
  for (var quo of art.getElementsByClassName('a-blockquote')) {
    quo.removeAttribute('id');
  }
  for (var sec of art.getElementsByClassName('a-section')) {
    sec.removeAttribute('id');
  }

  return art.innerHTML;
}

/** ARTICLE SECTIONS **/

export function remove_section(section_id) { __utls.byId(section_id).remove(); }

export function add_section(section_id, name) {
  var title = document.createElement('h2');
  title.setAttribute('class', 'a-title');
  title.innerHTML = name;

  var section = document.createElement('div');
  section.setAttribute('class', 'a-section');
  section.id = section_id;

  section.appendChild(title);

  // Adding section to core of article
  var core = __utls.byId('a-core');

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
  var section = __utls.byId(section_id);
  var title = section.children[0];

  title.innerHTML = new_name;
  section.id = section_new_id;

  // Re-adding section to core of article
  var core = __utls.byId('a-core');

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

export function remove_element(element_id) { __utls.byId(element_id).remove(); }

export function add_paragraph(content, section_id) {
  var section = __utls.byId(section_id);

  var paragraph = document.createElement('p'); // Create a paragraph
  paragraph.innerHTML = content;

  paragraph.id = __utls.unused_id(section_id + '_'); // Set up a random id

  paragraph.setAttribute('class', 'a-paragraph');
  section.appendChild(paragraph);
}

export function add_subtitle(content, section_id) {
  var section = __utls.byId(section_id);

  var subtitle = document.createElement('h3');
  subtitle.innerHTML = content;

  subtitle.id = __utls.unused_id(section_id + '_'); // Set up a random id

  subtitle.setAttribute('class', 'a-subtitle');
  section.appendChild(subtitle);
}

export function add_figure(img_name, caption, section_id) {
  var section = __utls.byId(section_id);

  // Create and set up img tag
  var img = document.createElement('img');
  img.src = __cfg.get_img_path() + img_name;
  img.alt = "There should be this image here: " + img_name;

  // Create and set up figcaption tag
  var fig_cap = document.createElement('figcaption')
  fig_cap.innerHTML = caption;

  // Create and set up figure tag
  var figure = document.createElement('figure');
  figure.id = __utls.unused_id(section_id + '_'); // Set up a random id
  figure.setAttribute('class', 'a-figure');

  // Append tags
  figure.appendChild(img);
  figure.appendChild(fig_cap);
  section.appendChild(figure);
}

export function add_blockquote(content, section_id) {
  var section = __utls.byId(section_id);

  var quote = document.createElement('blockquote'); // Create a blockquote
  quote.innerHTML = content;

  quote.id = __utls.unused_id(section_id + '_'); // Set up a random id

  quote.setAttribute('class', 'a-blockquote');
  section.appendChild(quote);
}

/** ARTICLE REFERENCES **/

export function add_reference(ref_id, name, author, src, year, url) {
  var ref = document.createElement('li');
  ref.id = ref_id;

  var refs = __utls.byId('a-references');
  refs.appendChild(ref);

  modify_reference(ref_id, name, author, src, year, url);
}

export function modify_reference(ref_id, name, author, src, year, url) {
  var ref = __utls.byId(ref_id);

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

  ref.innerHTML = info.join('');
}

export function remove_reference(ref_id) { __utls.byId(ref_id).remove(); }
