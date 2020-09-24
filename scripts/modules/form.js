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
