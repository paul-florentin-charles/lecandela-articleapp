import * as __utls from './utils.js';

/** GETTERS **/

function get_section_nbr(jQid_section) { return __utls.str_to_int(jQid_section, 4); }

/** SECTION MANAGER **/

export function remove_section(jQid_s_lst) {
  var lst = $(jQid_s_lst);
  var idx = lst.prop('selectedIndex');

  if (idx == -1) return null;

  var jQid_section = $(lst.children()[idx]).val();

  $(lst.children()[idx]).remove(); // Removing section from section list
  if (lst.children()[idx-1]) $(lst.children()[idx-1]).prop('selected', true); // Selecting previous item, if there is one

  return jQid_section;
}

export function add_section(jQid_s_name, jQid_s_nbr, jQid_s_shownbr, jQid_s_lst) {
  var name = $(jQid_s_name).val();
  var nbr = $(jQid_s_nbr).val();

  if (!name || !nbr || isNaN(nbr) || parseInt(nbr) < 0) return null; // Fields incomplete or incorrectly filled

  var jQid_section = `#s-${nbr}`;
  if ($(jQid_section).length) return null; // Section already exists

  var show_nbr = $(jQid_s_shownbr).prop('checked');
  var name = `${show_nbr ? `${nbr} - ` : ``}${name}`;

  var lst = $(jQid_s_lst); // Getting list of sections
  var option = $(`<option value="${jQid_section}">${name}</option>`); // Creating option with its right attributes

  insert_section(lst, option);

  $(jQid_s_name).val(null); // Flushing name input
  $(jQid_s_nbr).val(parseInt(nbr) + 1); // Setting next value ready for section number

  return [jQid_section, name];
}

export function modify_section(jQid_s_name, jQid_s_nbr, jQid_s_show_nbr, jQid_s_lst) {
  var lst = $(jQid_s_lst);
  var idx = lst.prop('selectedIndex');

  if (idx == -1) return null;

  var name = $(jQid_s_name).val(),
      nbr = $(jQid_s_nbr).val();
  if (!name || !nbr || isNaN(nbr) || parseInt(nbr) < 0) return null; // Fields incomplete or incorrectly filled

  var jQid_section_old = $(lst.children()[idx]).val(),
      jQid_section_new = `#s-${nbr}`;
  if (jQid_section_old != jQid_section_new && $(jQid_section_new).length) return null; // New id correspond to a distinct already existing section

  $(lst.children()[idx]).remove() // Removing section from section list

  var show_nbr = $(jQid_s_show_nbr).prop('checked');
  name = `${show_nbr ? `${nbr} - ` : ``}${name}`;

  // Creating option with its right attributes
  var option = $(`<option value="${jQid_section_new}">${name}</option>`);

  lst.prop('selectedIndex', insert_section(lst, option));

  $(jQid_s_name).val(null); // Flushing name input

  return [jQid_section_old, jQid_section_new, name];
}

function insert_section(lst, option) {
  var children = lst.children(),
      lth = children.length;
  for (let idx = 0; idx < lth; idx++) {
    if (get_section_nbr($(children[idx]).val()) > get_section_nbr(option.val())) {
      $(children[idx]).before(option); // Insert before higher rank option
      return idx;
    }
  }
  lst.append(option); // Insert as last option

  return lth;
}

export function update_section(jQid_e_mng, jQid_s_lst) {
  var no_section = ($(jQid_s_lst).prop('selectedIndex') == -1);
  $(jQid_e_mng).css('display', no_section ? 'none' : 'block');

  return !no_section;
}

/* ELEMENT MANAGER */

export function copy_element(jQid_e_lst) {
  var lst = $(jQid_e_lst);
  var idx = lst.prop('selectedIndex');

  if (idx == -1) return null;

  var jQid_element = $(lst.children()[idx]).val();

  return jQid_element;
}

export function update_element(jQid_section, jQid_e_lst) {
  var e_lst = $(jQid_e_lst);
  e_lst.prop('length', 0); // Purge element list

  $(jQid_section).children().slice(1).each(function(idx) {
    var option = $(`<option value="#${$(this).attr('id')}">`);
    option.html(`${idx + 1}. ${__utls.class2name[$(this).prop('class')]} : ${$($(this).children()[1] ? $(this).children()[0] : this).html().slice(0, 15)}...`);
    e_lst.append(option);
  });
}

export function add_italic_to_text_input(jQid_input) {
  __utls.add_tag_to_text_input(jQid_input, 'i', {"class": "italic"});
}

export function add_bold_to_text_input(jQid_input) {
  __utls.add_tag_to_text_input(jQid_input, 'b', {"class": "bold"});
}

export function add_quote_to_text_input(jQid_input) {
  __utls.add_tag_to_text_input(jQid_input, 'q', {"class": "quote"});
}

export function add_link_to_textarea(jQid_input) {
  __utls.add_tag_to_text_input(jQid_input, 'a', {"class": "link--external", "href": "", "target": "_blank"});
}

export function add_ref_to_textarea(jQid_input) {
  __utls.add_tag_to_text_input(jQid_input, 'sup', {"class": "asterisk"});
  __utls.add_tag_to_text_input(jQid_input, 'a', {"id": "ast-?", "class": "link--internal", "href": "#ref-?"}, "[?]");
}

/* REFERENCE MANAGER */

export function add_reference(jQid_r_lst, jQid_reference, name, src) {
  var option = $(`<option value="${jQid_reference}">${name} [${src}]</option>`); // Creating option with its right attributes

  $(jQid_r_lst).append(option);
}

export function modify_reference(jQid_r_lst, name, src) {
  var lst = $(jQid_r_lst); // Getting list of references
  var idx = lst.prop('selectedIndex');
  var option = $(lst.children()[idx]);

  option.html(`${name} [${src}]`);
}

export function remove_reference(jQid_r_lst) {
  var lst = $(jQid_r_lst); // Getting list of references
  var idx = lst.prop('selectedIndex');
  var option = $(lst.children()[idx]);

  option.remove(); // Removing reference from reference list
}

export function update_reference(jQid_r_lst) {
  $(jQid_r_lst).children().each(function(idx) {
    var jQid_reference_new = `#ref-${idx + 1}`;

    var reference_old = $($(this).val());
    reference_old.attr('id', jQid_reference_new.slice(1));
    $(reference_old.children()[0]).prop('href', `#ast-${idx + 1}`);

    $(this).val(jQid_reference_new); // Modify option value
  });
}
