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

export function update_img_button() { __upd.update_img_button(); }

/*** SECTIONS ***/

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
  var name = (show_nbr ? nbr + '- ' : '') + name;

  __art.add_section(section_id, name);
  __form.add_section(section_id, name);
  __upd.update_section(); // Updating modified section
}

export function remove_section() {
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no section to remove or you haven\'t selected one");
    return 0;
  }

  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  __art.remove_section(__form.get_section_id());
  __form.remove_section();
  __upd.update_section(); // Updating modified section
}

export function modify_section() {
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no section to modify or you haven\'t selected one");
    return 0;
  }

  var new_name = document.getElementById('f_sctn_name').value;
  var new_nbr = document.getElementById('f_sctn_nbr').value;

  if (!new_name || !new_nbr) {
    alert('Name and number must be filled');
    return 0;
  }

  if (isNaN(new_nbr) || new_nbr < 0) {
    alert('Section number must be a positive number');
    return 0;
  }

  var section_id = __form.get_section_id();
  var section_new_id = 's_' + new_nbr;
  if (section_id != section_new_id && document.getElementById(section_new_id)) {
    alert('There is already a section ' + new_nbr);
    return 0;
  }

  var show_nbr = document.getElementById('f_sctn_show_nbr').checked;
  var new_name = (show_nbr ? new_nbr + '- ' : '') + new_name;

  __art.modify_section(section_id, section_new_id, new_name);
  __form.modify_section(section_new_id, new_name);
  __upd.update_section();
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


  // Clear file and text inputs
  file.value = null;
  input.value = null;

  __art.add_figure(img_file.name, caption, __form.get_section_id()); // Add figure to article
  __upd.update_element(); // Update list of elements
  __upd.update_img_button();
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

  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  __art.remove_element(lst, idx);
  __upd.update_element(); // Update list of elements
}

export function copy_element_content() {
  var lst = document.getElementById('f_el_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no element to copy or you haven\'t selected one");
    return 0;
  }

  __form.copy_element_content(__form.get_element_id());
}

/*** REFERENCES ***/

export function add_reference() {
  var name = document.getElementById('f_ref_name').value;
  var author = document.getElementById('f_ref_author').value;
  var src = document.getElementById('f_ref_src').value;
  var year = document.getElementById('f_ref_year').value;
  var url = document.getElementById('f_ref_url').value;

  if (!name || !src) {
    alert("Name and source must be filled, other fields are optional");
    return 0;
  }

  var ref_id = 'ref_' + (__form.get_reference_amnt() + 1);

  __art.add_reference(ref_id, name, author, src, year, url);
  __form.add_reference(ref_id, name, src);
}

export function modify_reference() {
  var lst = document.getElementById('f_ref_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no reference to remove or you haven\'t selected one");
    return 0;
  }

  var name = document.getElementById('f_ref_name').value;
  var author = document.getElementById('f_ref_author').value;
  var src = document.getElementById('f_ref_src').value;
  var year = document.getElementById('f_ref_year').value;
  var url = document.getElementById('f_ref_url').value;

  if (!name || !src) {
    alert("Name and source must be filled, other fields are optional");
    return 0;
  }

  __art.modify_reference(__form.get_reference_id(), name, author, src, year, url);
  __form.modify_reference(name, src);
}

export function remove_reference() {
  var lst = document.getElementById('f_ref_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no reference to remove or you haven\'t selected one");
    return 0;
  }

  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  __art.remove_reference(__form.get_reference_id());
  __form.remove_reference();
  __upd.update_reference();
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
  __utils.save_file(__art.get_article(), __cfg.get_html_fname());
}

/*** UTILS ***/

export function add_italic_to_textarea() { __utils.add_italic(document.getElementById('f_el_par')); }

export function add_bold_to_textarea() { __utils.add_bold(document.getElementById('f_el_par')); }

export function add_quote_to_textarea() { __utils.add_quote(document.getElementById('f_el_par')); }

export function add_link_to_textarea() { __utils.add_link(document.getElementById('f_el_par')); }

export function add_ref_to_textarea() { __utils.add_ref(document.getElementById('f_el_par')); }
