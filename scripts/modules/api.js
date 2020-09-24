import * as __utils from './utils.js';
import * as __init from './init.js';
import * as __form from './form.js';
import * as __art from './article.js';
import * as __cfg from './config.js';
import * as __upd from './update.js';

/*** INIT ***/

export function init() { __init.init_document(); }

/*** UPDATES ***/

export function update_title() { __art.set_title(__form.get_title()); }

export function update_author() { __art.set_author(__form.get_author()); }

export function update_date() { __art.set_date(__form.get_date()); }

export function update_section() { __upd.update_section(); }

/*** ADD/REMOVE ***/

export function add_section() {
  var name = document.getElementById('f_sctn_name').value;
  var nbr = document.getElementById('f_sctn_nbr').value;

  if (!name || !nbr) {
    alert('Name and number must be filled');
    return 0;
  }

  if (isNaN(nbr) || nbr < 0) {
    alert('Section number must be a positive number');
    return 0;
  }

  var section_id = 's_' + nbr;
  if (document.getElementById(section_id)) {
    alert('There is already a section ' + nbr);
    return 0;
  }

  var show_nbr = document.getElementById('f_sctn_show_nbr').checked;
  __art.add_section(section_id, (show_nbr ? nbr + '- ' : '') + name);

  // Flushing input fields
  document.getElementById('f_sctn_name').value = null;
  document.getElementById('f_sctn_nbr').value = null;

  update_section(); // Updating modified section
}

export function remove_section() {
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no section to remove or you haven\'t selected one");
    return 0;
  }

  if (!confirm("This cannot be undone, are you sure ?")) return 0;

  __art.remove_section(__form.get_section_id());

  lst.removeChild(lst.children[idx]); // Removing section from section list
  if (lst.children[idx-1]) lst.children[idx-1].selected = true; // Selecting previous item, if there is one

  update_section(); // Updating modified section
}

/*** ELEMENTS ***/

export function add_paragraph() {
  var textarea = document.getElementById('f_el_par'); // Get content of textarea

  var content = textarea.value.trim();
  if (!content) {
    alert("Text area for paragraph is empty, please fill it.");
    return 0;
  }
  textarea.value = null; // Clear textarea content

  __art.add_paragraph(content, __form.get_section_id()); // Add paragraph to article
  __upd.update_element(); // Update list of elements
}

export function add_subtitle() {
  var input = document.getElementById('f_el_subttl'); // Get content of text input

  var content = input.value.trim();
  if (!content) {
    alert("Input for subtitle is empty, please fill it.");
    return 0;
  }
  input.value = null; // Clear input content

  __art.add_subtitle(content, __form.get_section_id()); // Add subtitle to article
  __upd.update_element(); // Update list of elements
}

export function add_figure() {
  // Get file in file input
  var file = document.getElementById('f_el_img');
  var img_file = file.files[0];

  if (!img_file) {
    alert("No file has been uploaded yet, upload one please.");
    return 0;
  }

  var input = document.getElementById('f_el_caption'); // Get content of text input

  var caption = input.value.trim();
  if (!caption) {
    alert("Input for caption is empty, please fill it.")
    return 0;
  }

  // Clear file and text inputs
  file.value = null;
  input.value = null;

  __art.add_figure(img_file.name, caption, __form.get_section_id()); // Add figure to article
  __upd.update_element(); // Update list of elements
}

export function add_quote() {
  var input = document.getElementById('f_el_quote'); // Get content of input

  var content = input.value.trim();
  if (!content) {
    alert("Input for quote is empty, please fill it.");
    return 0;
  }
  input.value = null; // Clear input content

  __art.add_quote(content, __form.get_section_id()); // Add quote to article
  __upd.update_element(); // Update list of elements
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

  __art.remove_element(lst, idx);
  __upd.update_element(); // Update list of elements
}

export function modify_element() {
  console.log("TODO: modify_element()")
  // TODO:
}

/*** SAVES ***/

export function export_json() {
  var json_data = {
    "title": __form.get_title(),
    "author": __form.get_author(),
    "date": __form.get_date(),
    "content": __art.get_article()
  };

  __utils.save_file(JSON.stringify(json_data), __cfg.get_json_fname());
}

export function export_html() {
  __utils.save_file(document.getElementById('article').innerHTML, __cfg.get_html_fname());
}

/*** UTILS ***/

export function add_italic_to_textarea() { __utils.add_italic(document.getElementById('f_el_par')); }

export function add_bold_to_textarea() { __utils.add_bold(document.getElementById('f_el_par')); }

export function add_quote_to_textarea() { __utils.add_quote(document.getElementById('f_el_par')); }

export function add_link_to_textarea() { __utils.add_link(document.getElementById('f_el_par')); }

export function add_ref_to_textarea() { __utils.add_ref(document.getElementById('f_el_par')); }
