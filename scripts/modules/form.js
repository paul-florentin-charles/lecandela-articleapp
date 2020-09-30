import * as __utils from './utils.js';

/** GETTERS **/

export function get_value(input_id) { return document.getElementById(input_id).value.trim(); }

export function get_selected_item_id(lst_id) {
  var lst = document.getElementById(lst_id);
  var idx = lst.selectedIndex;

  return lst.children[idx].value; // Return id of selected section
}

export function get_list_size(lst_id) { return document.getElementById(lst_id).children.length; }

export function get_section_nbr(section_id) { return parseInt(section_id.slice(2, section_id.length)); }

export function get_reference_nbr(ref_id) { return parseInt(ref_id.slice(4, ref_id.length)); }

/** SECTION MANAGER **/

export function add_section(sctn_name_id, sctn_nbr_id, sctn_show_nbr_id, sctn_lst_id) {
  var name = document.getElementById(sctn_name_id).value;
  var nbr = document.getElementById(sctn_nbr_id).value;

  if (!name || !nbr || isNaN(nbr) || parseInt(nbr) < 0) return null; // Fields incomplete or incorrectly filled

  var section_id = 's-' + nbr;
  if (document.getElementById(section_id)) return null; // Section already exists

  var show_nbr = document.getElementById(sctn_show_nbr_id).checked;
  var name = (show_nbr ? nbr + ' - ' : '') + name;

  var lst = document.getElementById(sctn_lst_id); // Getting list of sections

  // Creating option with its right attributes
  var option = document.createElement('option');
  option.value = section_id;
  option.innerHTML = name;

  var inserted = false;
  for (var opt of lst.children) {
    if (get_section_nbr(opt.value) > get_section_nbr(option.value)) {
      lst.insertBefore(option, opt); // Insert before higher rank option
      inserted = true;
      break;
    }
  }
  if (!inserted) lst.appendChild(option); // Insert as last option

  document.getElementById(sctn_name_id).value = null; // Flushing name input
  document.getElementById(sctn_nbr_id).value = parseInt(document.getElementById(sctn_nbr_id).value) + 1; // Setting next value ready for section number

  return [section_id, name];
}

export function remove_section(sctn_lst_id) {
  var lst = document.getElementById(sctn_lst_id);
  var idx = lst.selectedIndex;
  var sctn_id = lst.children[idx].value;

  if (idx == -1) return null;

  lst.removeChild(lst.children[idx]); // Removing section from section list
  if (lst.children[idx-1]) lst.children[idx-1].selected = true; // Selecting previous item, if there is one

  return sctn_id;
}

export function modify_section(sctn_name_id, sctn_nbr_id, sctn_show_nbr_id, sctn_lst_id) {
  var lst = document.getElementById(sctn_lst_id);
  var idx = lst.selectedIndex;

  if (idx == -1) return null;

  var new_name = document.getElementById(sctn_name_id).value,
      new_nbr = document.getElementById(sctn_nbr_id).value;
  if (!new_name || !new_nbr || isNaN(new_nbr) || parseInt(new_nbr) < 0) return null; // Fields incomplete or incorrectly filled

  var section_id = lst.children[idx].value,
      section_new_id = 's-' + new_nbr;
  if (section_id != section_new_id && document.getElementById(section_new_id)) return null; // New id correspond to a distinct already existing section

  lst.removeChild(lst.children[idx]); // Removing section from section list

  var show_nbr = document.getElementById(sctn_show_nbr_id).checked;
  new_name = (show_nbr ? new_nbr + ' - ' : '') + new_name;

  // Creating option with its right attributes
  var option = document.createElement('option');
  option.value = section_new_id;
  option.innerHTML = new_name;

  var inserted = false;
  for (var opt of lst.children) {
    if (get_section_nbr(opt.value) > get_section_nbr(option.value)) {
      lst.insertBefore(option, opt); // Insert before higher rank option
      inserted = true;
      break;
    }
  }
  if (!inserted) lst.appendChild(option); // Insert as last option

  document.getElementById(sctn_name_id).value = null; // Flushing name input

  return [section_id, section_new_id, new_name];
}

export function update_section(f_el_mng_id, f_sctn_lst_id) {
  var no_section = (document.getElementById(f_sctn_lst_id).selectedIndex == -1);
  document.getElementById(f_el_mng_id).style.display = (no_section ? 'none' : 'block');

  return !no_section;
}

/* ELEMENT MANAGER */

export function copy_element_content(el_lst_id) {
  var lst = document.getElementById(el_lst_id);
  var idx = lst.selectedIndex;

  if (idx == -1) return null;

  var el_id = lst.children[idx].value;
  var element = document.getElementById(el_id);

  return element;
}

export function update_element(f_sctn_lst_id, f_el_lst_id) {
  var s_id = get_selected_item_id(f_sctn_lst_id);

  // Get list of elements of section 's_id' apart from the first one (which is the title)
  var elements = __utils.get_children(document.getElementById(s_id), 1);
  var el_lst = document.getElementById(f_el_lst_id);

  // Purge element list
  el_lst.length = 0;

  // Add items corresponding to elements, to the list
  for (var [idx, element] of elements.entries()) {
    var option = document.createElement('option');
    option.value = element.id;
    option.innerHTML = (idx + 1) + ". " + __utils.class2name[element.getAttribute('class')] + ' : ' + (element.children[1] ? element.children[1] : element).innerHTML.slice(0, 15) + '...';
    el_lst.appendChild(option);
  }
}

export function update_img_button(img_id) { __utils.update_img_label(document.getElementById(img_id)); }

export function add_italic_to_text_input(input_id) {
  var input = document.getElementById(input_id);
  var tag_name = 'i';
  var attr_dict = {"class": "italic"};

  __utils.add_tag_to_text_input(input, tag_name, attr_dict);
}

export function add_bold_to_text_input(input_id) {
  var input = document.getElementById(input_id);
  var tag_name = 'b';
  var attr_dict = {"class": "bold"};

  __utils.add_tag_to_text_input(input, tag_name, attr_dict);
}

export function add_quote_to_text_input(input_id) {
  var input = document.getElementById(input_id);
  var tag_name = 'q';
  var attr_dict = {"class": "quote"};

  __utils.add_tag_to_text_input(input, tag_name, attr_dict);
}

export function add_link_to_textarea(input_id) {
  var input = document.getElementById(input_id);
  var tag_name = 'a';
  var attr_dict = {"class": "link--external", "href": "", "target": "_blank"};

  __utils.add_tag_to_text_input(input, tag_name, attr_dict);
}

export function add_ref_to_textarea(input_id) {
  var input = document.getElementById(input_id);
  var tag_name = 'sup';
  var attr_dict = {"class": "asterisk"};

  __utils.add_tag_to_text_input(input, tag_name, attr_dict);

  tag_name = 'a';
  attr_dict = {"id": "ast-?", "class": "link--internal", "href": "#ref-?"};

  __utils.add_tag_to_text_input(input, tag_name, attr_dict, "[?]");
}

/* REFERENCE MANAGER */

export function add_reference(ref_id, name, src) {
  var lst = document.getElementById('f-ref-lst'); // Getting list of refrences

  // Creating option with its right attributes
  var option = document.createElement('option');
  option.value = ref_id;
  option.innerHTML = [name, '[' + src + ']'].join(' ');

  lst.appendChild(option);

  // Flushing input fields
  var ids = ['f-ref-name', 'f-ref-author', 'f-ref-src', 'f-ref-year', 'f-ref-url']
  for (var id of ids) document.getElementById(id).value = null;
}

export function modify_reference(name, src) {
  var lst = document.getElementById('f-ref-lst'); // Getting list of references
  var idx = lst.selectedIndex;
  var option = lst.children[idx];

  option.innerHTML = [name, '[' + src + ']'].join(' ');

  // Flushing input fields
  var ids = ['f-ref-name', 'f-ref-author', 'f-ref-src', 'f-ref-year', 'f-ref-url']
  for (var id of ids) document.getElementById(id).value = null;
}

export function remove_reference() {
  var lst = document.getElementById('f-ref-lst'); // Getting list of references
  var idx = lst.selectedIndex;

  lst.removeChild(lst.children[idx]); // Removing reference from reference list
}

export function update_reference() {
  var lst = document.getElementById('f-ref-lst');

  var cpt = 1;
  for (var opt of lst.children) {
    var ref_new_id = 'ref-' + cpt;
    // Modify id in article
    var ref = document.getElementById(opt.value);
    ref.id = ref_new_id;
    ref.children[0].setAttribute('href', '#ast-' + cpt);

    // Modify option value
    opt.value = ref_new_id;

    cpt++;
  }
}
