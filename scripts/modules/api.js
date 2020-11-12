import * as __utls from './utils.js';
import * as __init from './init.js';
import * as __form from './form.js';
import * as __art from './article.js';
import * as __cfg from './config.js';

/*** INIT ***/

export function init(article_id) { __init.init_document(article_id); }

/*** UPDATES ***/

export function update_title(f_title_id) { __art.set_title(__utls.get_tag_value(f_title_id)); }

export function update_author(f_author_id) { __art.set_author(__utls.get_tag_value(f_author_id)); }

export function update_date(f_date_id) { __art.set_date(__utls.get_tag_value(f_date_id, __utls.date_US_to_EU)); }

export function update_section(f_sctn_lst_id, f_el_mng_id, f_el_lst_id) {
  if (__form.update_section(f_el_mng_id, f_sctn_lst_id))  {
    __form.update_element(f_sctn_lst_id, f_el_lst_id);
  }
}

export function update_img_button() {
  __utls.update_img_label('f-el-img');
}

/*** SECTIONS ***/

export function add_section(f_sctn_name_id, f_sctn_nbr_id, f_sctn_show_nbr_id, f_sctn_lst_id, f_el_mng_id, f_el_lst_id) {
  var sctn_info = __form.add_section(f_sctn_name_id, f_sctn_nbr_id, f_sctn_show_nbr_id, f_sctn_lst_id);
  if (sctn_info) {
    __art.add_section.apply(null, sctn_info);
    update_section(f_sctn_lst_id, f_el_mng_id, f_el_lst_id); // Display list of element corresponding to newly added section
  }
}

export function remove_section(f_sctn_lst_id, f_el_mng_id, f_el_lst_id) {
  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  var sctn_id = __form.remove_section('f-sctn-lst');
  if (sctn_id) {
    __art.remove_section(sctn_id);
    update_section(f_sctn_lst_id, f_el_mng_id, f_el_lst_id); // Display list of element corresponding to newly selected section
  }
}

export function modify_section(f_sctn_name_id, f_sctn_nbr_id, f_sctn_show_nbr_id, f_sctn_lst_id, f_el_mng_id, f_el_lst_id) {
  var sctn_new_info = __form.modify_section(f_sctn_name_id, f_sctn_nbr_id, f_sctn_show_nbr_id, f_sctn_lst_id);
  if (sctn_new_info) {
    __art.modify_section.apply(null, sctn_new_info);
    update_section(f_sctn_lst_id, f_el_mng_id, f_el_lst_id);
  }
}

/*** ELEMENTS ***/

export function add_paragraph() {
  var content = __utls.get_tag_value('f-el-par');
  if (content) {
    __art.add_paragraph(content, __utls.get_selected_item_value('f-sctn-lst')); // Add paragraph to article
    __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
  }
}

export function add_subtitle() {
  var content = __utls.get_tag_value('f-el-subttl');
  if (content) {
    __art.add_subtitle(content, __utls.get_selected_item_value('f-sctn-lst')); // Add subtitle to article
    __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
  }
}

export function add_figure() {
  var img_name = __utls.get_finput_fname('f-el-img');
  var caption = __utls.get_tag_value('f-el-caption');
  if (img_name) {
    __art.add_figure(img_name, caption, __utls.get_selected_item_value('f-sctn-lst')); // Add figure to article
    __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
    update_img_button('f-el-img');
  }
}

export function add_blockquote() {
  var content = __utls.get_tag_value('f-el-quote');
  if (content) {
    __art.add_blockquote(content, __utls.get_selected_item_value('f-sctn-lst')); // Add quote to article
    __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
  }
}

export function remove_element() {
  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  var element_id = __utls.get_selected_item_value('f-el-lst');
  if (element_id) {
    __art.remove_element(element_id);
    __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
  }
}

export function copy_element_content() {
  var element = __form.copy_element('f-el-lst');
  if (element.length) {
    switch (element.prop('class')) {
      case 'a-paragraph':
        __utls.set_tag_value('f-el-par', element.html());
        break;
      case 'a-subtitle':
        __utls.set_tag_value('f-el-subttl', element.html());
        break;
      case 'a-figure':
        __utls.set_tag_value('f-el-caption', $(element.children()[1]).html());
        break;
      case 'a-blockquote':
        __utls.set_tag_value('f-el-quote', element.html());
        break;
      default:
        alert("Unknown element !");
        break;
    }
  }
}

/*** REFERENCES ***/

export function add_reference() {
  var name = __utls.get_tag_value('f-ref-name');
  var author = __utls.get_tag_value('f-ref-author');
  var src = __utls.get_tag_value('f-ref-src');
  var year = __utls.get_tag_value('f-ref-year');
  var url = __utls.get_tag_value('f-ref-url');

  if (name && src) {
    var ref_id = 'ref-' + ($('#f-ref-lst').children().length + 1);
    __art.add_reference(ref_id, name, author, src, year, url);
    __form.add_reference('f-ref-lst', ref_id, name, src);
    // Flushing input fields
    var ids = ['f-ref-name', 'f-ref-author', 'f-ref-src', 'f-ref-year', 'f-ref-url']
    for (let id of ids) $(`#${id}`).val(null);
  }
}

export function modify_reference() {
  var name = __utls.get_tag_value('f-ref-name');
  var author = __utls.get_tag_value('f-ref-author');
  var src = __utls.get_tag_value('f-ref-src');
  var year = __utls.get_tag_value('f-ref-year');
  var url = __utls.get_tag_value('f-ref-url');

  if ($('#f-ref-lst').children().length > 0 && name && src) {
    __art.modify_reference(__utls.get_selected_item_value('f-ref-lst'), name, author, src, year, url);
    __form.modify_reference('f-ref-lst', name, src);
    // Flushing input fields
    var ids = ['f-ref-name', 'f-ref-author', 'f-ref-src', 'f-ref-year', 'f-ref-url']
    for (let id of ids) $(`#${id}`).val(null);
  }
}

export function remove_reference() {
  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  if ($('#f-ref-lst').children().length > 0) {
    __art.remove_reference(__utls.get_selected_item_value('f-ref-lst'));
    __form.remove_reference('f-ref-lst');
    __form.update_reference('f-ref-lst');
  }
}

/*** SAVES ***/

export function export_json() {
  var json_data = {
    "title": __art.get_title(),
    "author": __art.get_author(),
    "date": __art.get_date(),
    "content": __art.get_article()
  };

  __utls.save_file(JSON.stringify(json_data), __cfg.get_json_fname());
}

export function export_html() { __utls.save_file(__art.get_article(), __cfg.get_html_fname()); }

/*** TAG INSERTION FOR PARAGRAPH ***/

export function add_italic() { __form.add_italic_to_text_input('f-el-par'); }

export function add_bold() { __form.add_bold_to_text_input('f-el-par'); }

export function add_quote() { __form.add_quote_to_text_input('f-el-par'); }

export function add_link() { __form.add_link_to_textarea('f-el-par'); }

export function add_ref() { __form.add_ref_to_textarea('f-el-par'); }
