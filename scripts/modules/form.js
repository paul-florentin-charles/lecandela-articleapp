import * as __utils from './utils.js';

/** GETTERS **/

export function get_title() { return document.getElementById('f_title').value.trim(); }

export function get_author() { return document.getElementById('f_author').value.trim(); }

export function get_date() { return __utils.date_US_to_EU(document.getElementById('f_date').value.trim()); }

export function get_section_id() {
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;

  return lst.children[idx].value; // Return id of selected section
}

export function get_section_nbr(section_id) { return parseInt(section_id.slice(2, section_id.length)); }

export function get_element_id() {
  var lst = document.getElementById('f_el_lst');
  var idx = lst.selectedIndex;

  return lst.children[idx].value; // Return id of selected element
}

/** SECTION MANAGER **/

export function add_section(section_id, name) {
  var lst = document.getElementById('f_sctn_lst'); // Getting list of sections

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
  if (!inserted) lst.appendChild(option);

  document.getElementById('f_sctn_name').value = null; // Flushing name input
  document.getElementById('f_sctn_nbr').value = parseInt(document.getElementById('f_sctn_nbr').value) + 1; // Setting next value ready for section number
}

export function remove_section() {
  var lst = document.getElementById('f_sctn_lst'); // Getting list of sections
  var idx = lst.selectedIndex;

  lst.removeChild(lst.children[idx]); // Removing section from section list
  if (lst.children[idx-1]) lst.children[idx-1].selected = true; // Selecting previous item, if there is one
}

export function modify_section(section_new_id, new_name) {
  remove_section();
  add_section(section_new_id, new_name);
}

/* ELEMENT MANAGER */

export function copy_element_content(element_id) {
  var element = document.getElementById(element_id);
  switch (element.getAttribute('class')) {
    case 'paragraph':
      document.getElementById('f_el_par').value = element.innerHTML;
      break;
    case 'subtitle':
      document.getElementById('f_el_subttl').value = element.innerHTML;
      break;
    case 'figure':
      document.getElementById('f_el_caption').value = element.children[1].innerHTML;
      break;
    case 'quote':
      document.getElementById('f_el_quote').value = element.innerHTML;
      break;
    default:
      alert("Unknown element !");
  }
}
