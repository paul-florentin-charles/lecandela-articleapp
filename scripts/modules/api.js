import * as __utils from './utils.js';
import * as __init from './init.js';

/**************
*** INITS ***
**************/

export function init() {
  __init.init_article();
  __init.init_form();
}

/**************
**** SAVES ****
**************/

// Export to JSON
export function export_json() {
  var raw_html = document.getElementById('article').innerHTML;
  var title = document.getElementById('f_title').value;
  var author = document.getElementById('f_author').value;
  var date = __utils.date_US_to_EU(document.getElementById('f_date').value);

  var json_data = {
    "title": title,
    "author": author,
    "date": date,
    "content": raw_html
  };

  __utils.save_file(JSON.stringify(json_data), 'article.json');
}

// Export to html
export function export_html() {
  __utils.save_file(document.getElementById('article').innerHTML, 'article.html');
}

/**************
*** UPDATES ***
**************/

/*** INPUTS ***/

export function update_title() {
  var title = document.getElementById('f_title').value.trim();
  document.getElementById('a_title').innerHTML = title;
}

export function update_author() {
  var author = document.getElementById('f_author').value.trim();
  document.getElementById('a_author').innerHTML = author;
}

export function update_date() {
  var date = document.getElementById('f_date').value.trim();
  document.getElementById('a_date').innerHTML = __utils.date_US_to_EU(date);
}

/*** LISTS ***/

export function update_section() {
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    // Hiding element manager
    document.getElementById('f_el').style.display = 'none';
    return 0;
  }
  // Showing element manager
  document.getElementById('f_el').style.display = 'block';

  var s_id = lst.children[idx].value;
  update_element(s_id); // Update list of elements
}

function update_element(s_id) {
  // Get list of elements of section 's_id' apart from the first one
  var elements = __utils.get_children(document.getElementById(s_id), 1);
  var el_lst = document.getElementById("f_el_lst");
  // Purge element list
  el_lst.length = 0;
  var i = 1;
  for (var element of elements) {
    var option = document.createElement('option');
    option.value = element.id;
    option.innerHTML = i + ". " + __utils.class2name[element.getAttribute('class')];
    el_lst.appendChild(option);
    i++;
  }
}

/***************
** ADD/REMOVE **
***************/

export function add_section() {
  var name = document.getElementById('f_sctn_name').value;
  var nbr = document.getElementById('f_sctn_nbr').value;

  if (!name || !nbr) {
    alert('Name and number must be filled');
    return 0;
  }

  var show_nbr = document.getElementById('f_sctn_show_nbr').checked;

  if (_add_section(nbr, name, show_nbr)) {
    // Flushing values
    document.getElementById('f_sctn_name').value = null;
    document.getElementById('f_sctn_nbr').value = null;
  }
}

function _add_section(nbr, name, show_nbr=true) {
  if (isNaN(nbr) || nbr < 0) {
    alert('Section number must be a positive number');
    return 0;
  }
  var s_id = 's_' + nbr;
  if (document.getElementById(s_id)) {
    alert('There is already a section ' + nbr);
    return 0;
  }

  var core = document.getElementById('a_core');
  var section = document.createElement('div');
  section.setAttribute('class', 'a_section');
  section.id = s_id;

  if (show_nbr) name = nbr + ' - ' + name;

  var title = document.createElement('h2');
  title.setAttribute('class', 's_title');
  title.innerHTML = name;
  section.appendChild(title);

  // Adding section to section list (<select> tag)
  var lst = document.getElementById('f_sctn_lst');

  var option = document.createElement('option');
  option.value = s_id;
  option.innerHTML = name;

  var inserted = false;
  for (var opt of lst.children) {
    if (parseInt(opt.value.slice(2, opt.value.length)) > parseInt(option.value.slice(2, option.value.length))) {
      lst.insertBefore(option, opt); // Insert before higher rank option
      inserted = true;
      break;
    }
  }
  if (!inserted) lst.appendChild(option);

  // Adding section to core of article
  inserted = false;
  for (var sctn of core.children) {
    if (parseInt(sctn.id.slice(2, sctn.id.length)) > parseInt(section.id.slice(2, section.id.length))) {
      core.insertBefore(section, sctn); // Insert before higher number section
      inserted = true;
      break;
    }
  }
  if (!inserted) core.appendChild(section);

  // Updating modified section, only if list was empty (i.e. has one element now)
  if (lst.children.length == 1) update_section();
  return 1;
}

export function remove_section() {
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no section to remove or you haven\'t selected one");
    return 0;
  }

  if (!confirm("This cannot be undone, are you sure ?")) return 0;


  var s_id = lst.children[idx].value;
  _remove_section(s_id);

  // Removing section from section list (<select> tag)
  lst.removeChild(lst.children[idx]);
  // Selecting previous item, if there is one
  if (lst.children[idx-1]) lst.children[idx-1].selected = true;

  // Updating modified section
  update_section();
}

function _remove_section(s_id) {
  var section = document.getElementById(s_id), core = document.getElementById('a_core');
  // Removing section from core of article
  core.removeChild(section);
}

/***************
*** ELEMENTS ***
***************/

export function add_paragraph() {
  // Get id of selected section
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;
  var s_id = lst.children[idx].value;

  // Get content of textarea input
  var textarea = document.getElementById('f_el_par');
  var content = textarea.value.trim();
  if (!content) {
    alert("Text area for paragraph is empty, please fill it.")
    return 0;
  }

  // Clear textarea content
  textarea.value = null;

  _add_paragraph(content, s_id);
}

function _add_paragraph(content, s_id) {
  var section = document.getElementById(s_id);
  var paragraph = document.createElement('p');
  paragraph.innerHTML = content;

  var id = Math.random();
  while (document.getElementById(id)) id = Math.random();
  paragraph.id = id;

  paragraph.setAttribute('class', 'paragraph');
  section.appendChild(paragraph);

  update_element(s_id);
}

export function add_subtitle() {
  // Get id of selected section
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;
  var s_id = lst.children[idx].value;

  // Get content of input
  var input = document.getElementById('f_el_subttl');
  var content = input.value.trim();
  if (!content) {
    alert("Input for subtitle is empty, please fill it.")
    return 0;
  }

  // Clear input content
  input.value = null;

  _add_subtitle(content, s_id);
}

function _add_subtitle(content, s_id) {
  var section = document.getElementById(s_id);
  var subtitle = document.createElement('h3');
  subtitle.innerHTML = content;

  var id = Math.random();
  while (document.getElementById(id)) id = Math.random();
  subtitle.id = id;

  subtitle.setAttribute('class', 'subtitle');
  section.appendChild(subtitle);

  update_element(s_id);
}

export function add_figure() {
  // For img, parse config.json to get 'img_path', then add document.getElementById('f_el_img').files[0].name
  // For caption : easy, same as quote or subtitle
}

export function add_quote() {
  // Get id of selected section
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;
  var s_id = lst.children[idx].value;

  // Get content of input
  var input = document.getElementById('f_el_quote');
  var content = input.value.trim();
  if (!content) {
    alert("Input for quote is empty, please fill it.")
    return 0;
  }

  // Clear input content
  input.value = null;

  _add_quote(content, s_id);
}

function _add_quote(content, s_id) {
  var section = document.getElementById(s_id);
  var quote = document.createElement('blockquote');
  quote.innerHTML = content;

  var id = Math.random();
  while (document.getElementById(id)) id = Math.random();
  quote.id = id;

  quote.setAttribute('class', 'quote');
  section.appendChild(quote);

  update_element(s_id);
}

export function remove_element() {
  var lst = document.getElementById('f_el_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no element to remove or you haven\'t selected one");
    return 0;
  }

  if (!confirm("This cannot be undone, are you sure ?")) {
    return 0;
  }

  _remove_element(lst, idx);
}

function _remove_element(lst, idx) {
  var el_id = lst.children[idx].value;

  // Removing element from list
  lst.removeChild(lst.children[idx]);

  // Removing element from article
  document.getElementById(el_id).remove();

  // Updating list of elements
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;
  var s_id = lst.children[idx].value;

  update_element(s_id);
}

export function modify_element() {
  console.log("TODO: modify_element()")
  // TODO:
}

/**************
**** UTILS ****
**************/

export function add_italic_to_textarea() {
  __utils.add_italic(document.getElementById('f_el_par'));
}

export function add_bold_to_textarea() {
  __utils.add_bold(document.getElementById('f_el_par'));
}

export function add_quote_to_textarea() {
  __utils.add_quote(document.getElementById('f_el_par'));
}

export function add_link_to_textarea() {
  __utils.add_link(document.getElementById('f_el_par'));
}
