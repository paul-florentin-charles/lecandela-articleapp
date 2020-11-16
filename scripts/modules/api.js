import * as __utls from './utils.js';
import * as __init from './init.js';
import * as __form from './form.js';
import * as __art from './article.js';
import * as __cfg from './config.js';

/*** INIT ***/

export function init(jQid_article) { __init.init_document(jQid_article); }

/*** UPDATES ***/

export function update_title(jQid_title) { __art.set_title(__utls.get_tag_value(jQid_title)); }

export function update_author(jQid_author) { __art.set_author(__utls.get_tag_value(jQid_author)); }

export function update_date(jQid_date) { __art.set_date(__utls.get_tag_value(jQid_date, __utls.date_US_to_EU)); }

export function update_section(jQid_s_lst, jQid_e_mng, jQid_e_lst) {
  if (__form.update_section(jQid_e_mng, jQid_s_lst))  {
    __form.update_element(jQid_s_lst, jQid_e_lst);
  }
}

export function update_img_button(jQid_e_img) { __utls.update_img_label(jQid_e_img); }

/*** SECTIONS ***/

export function add_section(jQid_s_name, jQid_s_nbr, jQid_s_shownbr, jQid_s_lst, jQid_e_mng, jQid_e_lst) {
  var s_info = __form.add_section(jQid_s_name, jQid_s_nbr, jQid_s_shownbr, jQid_s_lst);
  if (s_info) {
    __art.add_section(...s_info);
    update_section(jQid_s_lst, jQid_e_mng, jQid_e_lst); // Display list of element corresponding to newly added section
  }
}

export function remove_section(jQid_s_lst, jQid_e_mng, jQid_e_lst) {
  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  var sec = __form.remove_section(jQid_s_lst);
  if (sec) {
    __art.remove_section(sec);
    update_section(jQid_s_lst, jQid_e_mng, jQid_e_lst); // Display list of element corresponding to newly selected section
  }
}

export function modify_section(jQid_s_name, jQid_s_nbr, jQid_s_show_nbr, jQid_s_lst, jQid_e_lst) {
  var s_new_info = __form.modify_section(jQid_s_name, jQid_s_nbr, jQid_s_show_nbr, jQid_s_lst);
  if (s_new_info) {
    __art.modify_section(...s_new_info);
  }
}

/*** elementS ***/

export function add_paragraph(jQid_e_par, jQid_s_lst, jQid_e_lst) {
  var content = __utls.get_tag_value(jQid_e_par),
      s = __utls.get_selected_item_value(jQid_s_lst);
  if (content) {
    __art.add_paragraph(content, s); // Add paragraph to article
    __form.update_element(s, jQid_e_lst); // Update list of elements
  }
}

export function add_subtitle(jQid_e_subttl, jQid_s_lst, jQid_e_lst) {
  var content = __utls.get_tag_value(jQid_e_subttl),
      s = __utls.get_selected_item_value(jQid_s_lst);
  if (content) {
    __art.add_subtitle(content, s); // Add subtitle to article
    __form.update_element(s, jQid_e_lst); // Update list of elements
  }
}

export function add_figure(jQid_e_img, jQid_e_cap, jQid_s_lst, jQid_e_lst) {
  var img_name = __utls.get_finput_fname(jQid_e_img),
      caption = __utls.get_tag_value(jQid_e_cap),
      s = __utls.get_selected_item_value(jQid_s_lst);
  if (img_name) {
    __art.add_figure(img_name, caption, s); // Add figure to article
    __form.update_element(s, jQid_e_lst); // Update list of elements
    update_img_button(jQid_e_img);
  }
}

export function add_blockquote(jQid_e_quote, jQid_s_lst, jQid_e_lst) {
  var content = __utls.get_tag_value(jQid_e_quote),
      s = __utls.get_selected_item_value(jQid_s_lst);
  if (content) {
    __art.add_blockquote(content, s); // Add quote to article
    __form.update_element(s, jQid_e_lst); // Update list of elements
  }
}

export function remove_element(jQid_s_lst, jQid_e_lst) {
  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  var element = __utls.get_selected_item_value(jQid_e_lst),
      s = __utls.get_selected_item_value(jQid_s_lst);
  if (element) {
    __art.remove_element(element);
    __form.update_element(s, jQid_e_lst); // Update list of elements
  }
}

export function copy_element_content(jQid_e_lst, jQid_e_par, jQid_e_subttl, jQid_e_caption, jQid_e_quote) {
  var jQid_element = __form.copy_element(jQid_e_lst);
  if ($(jQid_element).length) {
    __art.copy_element(jQid_element, jQid_e_par, jQid_e_subttl, jQid_e_caption, jQid_e_quote);
  }
}

/*** REFERENCES ***/

export function add_reference(jQid_r_lst, jQid_r_name, jQid_r_auth, jQid_r_src, jQid_r_year, jQid_r_url) {
  var name = __utls.get_tag_value(jQid_r_name);
  var author = __utls.get_tag_value(jQid_r_auth);
  var src = __utls.get_tag_value(jQid_r_src);
  var year = __utls.get_tag_value(jQid_r_year);
  var url = __utls.get_tag_value(jQid_r_url);

  if (name && src) {
    var jQid_reference = '#ref-' + ($(jQid_r_lst).children().length + 1);
    __art.add_reference(jQid_reference, name, author, src, year, url);
    __form.add_reference(jQid_r_lst, jQid_reference, name, src);

    $.each([jQid_r_name, jQid_r_auth, jQid_r_src, jQid_r_year, jQid_r_url], function(idx, value) {
      $(value).val(null);
    });
  }
}

export function modify_reference(jQid_r_lst, jQid_r_name, jQid_r_auth, jQid_r_src, jQid_r_year, jQid_r_url) {
  var name = __utls.get_tag_value(jQid_r_name);
  var author = __utls.get_tag_value(jQid_r_auth);
  var src = __utls.get_tag_value(jQid_r_src);
  var year = __utls.get_tag_value(jQid_r_year);
  var url = __utls.get_tag_value(jQid_r_url);

  if ($(jQid_r_lst).children().length && name && src) {
    __art.modify_reference(__utls.get_selected_item_value(jQid_r_lst), name, author, src, year, url);
    __form.modify_reference(jQid_r_lst, name, src);

    $.each([jQid_r_name, jQid_r_auth, jQid_r_src, jQid_r_year, jQid_r_url], function(idx, value) {
      $(value).val(null);
    });
  }
}

export function remove_reference(jQid_r_lst) {
  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  if ($(jQid_r_lst).children().length) {
    __art.remove_reference(__utls.get_selected_item_value(jQid_r_lst));
    __form.remove_reference(jQid_r_lst);
    __form.update_reference(jQid_r_lst);
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

export function add_italic(jQid_e_par) { __form.add_italic_to_text_input(jQid_e_par); }

export function add_bold(jQid_e_par) { __form.add_bold_to_text_input(jQid_e_par); }

export function add_quote(jQid_e_par) { __form.add_quote_to_text_input(jQid_e_par); }

export function add_link(jQid_e_par) { __form.add_link_to_textarea(jQid_e_par); }

export function add_ref(jQid_e_par) { __form.add_ref_to_textarea(jQid_e_par); }
