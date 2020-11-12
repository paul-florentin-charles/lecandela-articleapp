import * as __utls from './utils.js';

/** GETTERS **/

function get_section_nbr(section_id) { return __utls.str_to_int(section_id, 2); }

/** SECTION MANAGER **/

export function remove_section(sctn_lst_id) {
  var lst = $(`#${sctn_lst_id}`);
  var idx = lst.prop('selectedIndex');
  var sctn_id = $(lst.children()[idx]).val();

  if (idx == -1) return null;

  $(lst.children()[idx]).remove(); // Removing section from section list
  if (lst.children()[idx-1]) $(lst.children()[idx-1]).prop('selected', true); // Selecting previous item, if there is one

  return sctn_id;
}

export function add_section(sctn_name_id, sctn_nbr_id, sctn_show_nbr_id, sctn_lst_id) {
  var name = $(`#${sctn_name_id}`).val();
  var nbr = $(`#${sctn_nbr_id}`).val();

  if (!name || !nbr || isNaN(nbr) || parseInt(nbr) < 0) return null; // Fields incomplete or incorrectly filled

  var section_id = `s-${nbr}`;
  if ($(`#${section_id}`).length) return null; // Section already exists

  var show_nbr = $(`#${sctn_show_nbr_id}`).prop('checked');
  var name = `${show_nbr ? `${nbr} - ` : ``}${name}`;

  var lst = $(`#${sctn_lst_id}`); // Getting list of sections
  var option = $(`<option value="${section_id}">${name}</option>`); // Creating option with its right attributes

  insert_section(lst, option);

  $(`#${sctn_name_id}`).val(null); // Flushing name input
  $(`#${sctn_nbr_id}`).val(parseInt(nbr) + 1); // Setting next value ready for section number

  return [section_id, name];
}

export function modify_section(sctn_name_id, sctn_nbr_id, sctn_show_nbr_id, sctn_lst_id) {
  var lst = $(`#${sctn_lst_id}`);
  var idx = lst.prop('selectedIndex');

  if (idx == -1) return null;

  var new_name = $(`#${sctn_name_id}`).val(),
      new_nbr = $(`#${sctn_nbr_id}`).val();
  if (!new_name || !new_nbr || isNaN(new_nbr) || parseInt(new_nbr) < 0) return null; // Fields incomplete or incorrectly filled

  var section_id = $(lst.children()[idx]).val(),
      section_new_id = `s-${new_nbr}`;
  if (section_id != section_new_id && $(`#${section_new_id}`).length) return null; // New id correspond to a distinct already existing section

  $(lst.children()[idx]).remove() // Removing section from section list

  var show_nbr = $(`#${sctn_show_nbr_id}`).prop('checked');
  new_name = `${show_nbr ? `${new_nbr} - ` : ``}${new_name}`;

  // Creating option with its right attributes
  var option = $(`<option value="${section_new_id}">${new_name}</option>`);

  insert_section(lst, option);

  $(`#${sctn_name_id}`).val(null); // Flushing name input

  return [section_id, section_new_id, new_name];
}

function insert_section(lst, option) {
  var inserted = false;
  for (let opt of lst.children()) {
    if (get_section_nbr($(opt).val()) > get_section_nbr(option.val())) {
      $(opt).before(option); // Insert before higher rank option
      inserted = true;
      break;
    }
  }
  if (!inserted) lst.append(option); // Insert as last option
}

export function update_section(f_el_mng_id, f_sctn_lst_id) {
  var no_section = ($(`#${f_sctn_lst_id}`).prop('selectedIndex') == -1);
  $(`#${f_el_mng_id}`).css('display', no_section ? 'none' : 'block');

  return !no_section;
}

/* ELEMENT MANAGER */

export function copy_element(el_lst_id) {
  var lst = $(`#${el_lst_id}`);
  var idx = lst.prop('selectedIndex');

  if (idx == -1) return null;

  var el_id = $(lst.children()[idx]).val();

  return $(`#${el_id}`);
}

export function update_element(f_sctn_lst_id, f_el_lst_id) {
  var s_id = __utls.get_selected_item_value(f_sctn_lst_id);

  // Get list of elements of section 's_id' apart from the first one (which is the title)
  var elements = $(`#${s_id}`).children();
  var el_lst = $(`#${f_el_lst_id}`);

  // Purge element list
  el_lst.prop('length', 0);

  // Add items corresponding to elements, to the list
  for (let idx = 1; idx < elements.length; idx++) {
    var option = $(`<option value="${$(elements[idx]).attr('id')}">`);
    option.html(`${idx}. ${__utls.class2name[$(elements[idx]).prop('class')]} : ${$(($(elements[idx]).children()[1] ? $(elements[idx]).children()[1] : elements[idx])).html().slice(0, 15)}...`);
    el_lst.append(option);
  }
}

export function add_italic_to_text_input(input_id) {
  var tag_name = 'i';
  var attr_dict = {"class": "italic"};

  __utls.add_tag_to_text_input(input_id, tag_name, attr_dict);
}

export function add_bold_to_text_input(input_id) {
  var tag_name = 'b';
  var attr_dict = {"class": "bold"};

  __utls.add_tag_to_text_input(input_id, tag_name, attr_dict);
}

export function add_quote_to_text_input(input_id) {
  var tag_name = 'q';
  var attr_dict = {"class": "quote"};

  __utls.add_tag_to_text_input(input_id, tag_name, attr_dict);
}

export function add_link_to_textarea(input_id) {
  var tag_name = 'a';
  var attr_dict = {"class": "link--external", "href": "", "target": "_blank"};

  __utls.add_tag_to_text_input(input_id, tag_name, attr_dict);
}

export function add_ref_to_textarea(input_id) {
  var tag_name = 'sup';
  var attr_dict = {"class": "asterisk"};

  __utls.add_tag_to_text_input(input_id, tag_name, attr_dict);

  tag_name = 'a';
  attr_dict = {"id": "ast-?", "class": "link--internal", "href": "#ref-?"};

  __utls.add_tag_to_text_input(input_id, tag_name, attr_dict, "[?]");
}

/* REFERENCE MANAGER */

export function add_reference(ref_lst_id, ref_id, name, src) {
  var lst = $(`#${ref_lst_id}`); // Getting list of refrences
  var option = $(`<option value="${ref_id}">${name} [${src}]</option>`); // Creating option with its right attributes

  lst.append(option);
}

export function modify_reference(ref_lst_id, name, src) {
  var lst = $(`#${ref_lst_id}`); // Getting list of references
  var idx = lst.prop('selectedIndex');
  var option = $(lst.children()[idx]);

  option.html(`${name} [${src}]`);
}

export function remove_reference(ref_lst_id) {
  var lst = $(`#${ref_lst_id}`); // Getting list of references
  var idx = lst.prop('selectedIndex');

  $(lst.children()[idx]).remove(); // Removing reference from reference list
}

export function update_reference(ref_lst_id) {
  var lst = $(`#${ref_lst_id}`);

  var cpt = 1;
  for (let opt of lst.children()) {
    var ref_new_id = `ref-${cpt}`;
    // Modify id in article
    var ref = $(`#${$(opt).val()}`);
    ref.attr('id', ref_new_id);
    $(ref.children()[0]).prop('href', `#ast-${cpt}`);

    // Modify option value
    $(opt).val(ref_new_id);

    cpt++;
  }
}
