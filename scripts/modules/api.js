import * as __utils from './utils.js';
import * as __init from './init.js';
import * as __form from './form.js';
import * as __art from './article.js';
import * as __cfg from './config.js';

/*** INIT ***/

export function init() { __init.init_document('article', ['f-sctn-show-nbr'], ['f-sctn-nbr']); }

/*** UPDATES ***/

export function update_title() { __art.set_inner_html('a-meta-title', __form.get_value('f-title')); }

export function update_author() { __art.set_inner_html('a-meta-author', __form.get_value('f-author')); }

export function update_date() { __art.set_inner_html('a-meta-date', __form.get_value('f-date')); }

export function update_section() {
  if (__form.update_section('f-el', 'f-sctn-lst'))  {
    __form.update_element('f-sctn-lst', 'f-el-lst');
  }
}

export function update_img_button() { __form.update_img_button('f-el-img'); }

/*** SECTIONS ***/

export function add_section() {
  var sctn_info = __form.add_section('f-sctn-name', 'f-sctn-nbr', 'f-sctn-show-nbr', 'f-sctn-lst');
  if (sctn_info) {
    __art.add_section.apply(null, sctn_info);
    update_section(); // Display list of element corresponding to newly added section
  }
}

export function remove_section() {
  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  var sctn_id = __form.remove_section('f-sctn-lst');
  if (sctn_id) {
    __art.remove_section(sctn_id);
    update_section(); // Display list of element corresponding to newly selected section
  }
}

export function modify_section() {
  var sctn_new_info = __form.modify_section('f-sctn-name', 'f-sctn-nbr', 'f-sctn-show-nbr', 'f-sctn-lst');
  if (sctn_new_info) {
    __art.modify_section.apply(null, sctn_new_info);
    update_section();
  }
}

/*** ELEMENTS ***/

export function add_paragraph() {
  var content = __form.get_value('f-el-par');
  if (content) {
    __art.add_paragraph(content, __form.get_selected_item_id('f-sctn-lst')); // Add paragraph to article
    __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
  }
}

export function add_subtitle() {
  var content = __form.get_value('f-el-subttl');
  if (content) {
    __art.add_subtitle(content, __form.get_selected_item_id('f-sctn-lst')); // Add subtitle to article
    __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
  }
}

export function add_figure() {
  // Get file in file input
  var file = document.getElementById('f-el-img');
  var img_file = file.files[0];

  if (!img_file) {
    alert("No file has been uploaded yet, upload one please.");
    return 0;
  }

  var caption = __form.get_value('f-el-caption');

  // Clear file and text inputs
  file.value = null;

  __art.add_figure(img_file.name, caption, __form.get_selected_item_id('f-sctn-lst')); // Add figure to article
  __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
  __form.update_img_button('f-el-img');
}

export function add_blockquote() {
  var content = __form.get_value('f-el-quote');
  if (content) {
    __art.add_blockquote(content, __form.get_selected_item_id('f-sctn-lst')); // Add quote to article
    __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
  }
}

export function remove_element() {
  var lst = document.getElementById('f-el-lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no element to remove or you haven\'t selected one");
    return 0;
  }

  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  __art.remove_element(lst, idx);
  __form.update_element('f-sctn-lst', 'f-el-lst'); // Update list of elements
}

export function copy_element_content() {
  var element = __form.copy_element_content('f-el-lst');
  if (element) {
    switch (element.getAttribute('class')) {
      case 'a-paragraph':
        document.getElementById('f-el-par').value = element.innerHTML;
        break;
      case 'a-subtitle':
        document.getElementById('f-el-subttl').value = element.innerHTML;
        break;
      case 'a-figure':
        document.getElementById('f-el-caption').value = element.children[1].innerHTML;
        break;
      case 'a-blockquote':
        document.getElementById('f-el-quote').value = element.innerHTML;
        break;
      default:
        alert("Unknown element !");
    }
  }
}


/*** REFERENCES ***/

export function add_reference() {
  var name = document.getElementById('f-ref-name').value;
  var author = document.getElementById('f-ref-author').value;
  var src = document.getElementById('f-ref-src').value;
  var year = document.getElementById('f-ref-year').value;
  var url = document.getElementById('f-ref-url').value;

  if (!name || !src) {
    alert("Name and source must be filled, other fields are optional");
    return 0;
  }

  var ref_id = 'ref-' + (__form.get_list_size('f-ref-lst') + 1);

  __art.add_reference(ref_id, name, author, src, year, url);
  __form.add_reference(ref_id, name, src);
}

export function modify_reference() {
  var lst = document.getElementById('f-ref-lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no reference to remove or you haven\'t selected one");
    return 0;
  }

  var name = document.getElementById('f-ref-name').value;
  var author = document.getElementById('f-ref-author').value;
  var src = document.getElementById('f-ref-src').value;
  var year = document.getElementById('f-ref-year').value;
  var url = document.getElementById('f-ref-url').value;

  if (!name || !src) {
    alert("Name and source must be filled, other fields are optional");
    return 0;
  }

  __art.modify_reference(__form.get_selected_item_id('f-ref-lst'), name, author, src, year, url);
  __form.modify_reference(name, src);
}

export function remove_reference() {
  var lst = document.getElementById('f-ref-lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no reference to remove or you haven\'t selected one");
    return 0;
  }

  if (confirm("This cannot be undone, are you sure ?") == 0) return 0;

  __art.remove_reference(__form.get_selected_item_id('f-ref-lst'));
  __form.remove_reference();
  __form.update_reference();
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

export function export_html() { __utils.save_file(__art.get_article(), __cfg.get_html_fname()); }

/*** TAG INSERTION FOR PARAGRAPH ***/

export function add_italic() { __form.add_italic_to_text_input('f-el-par'); }

export function add_bold() { __form.add_bold_to_text_input('f-el-par'); }

export function add_quote() { __form.add_quote_to_text_input('f-el-par'); }

export function add_link() { __form.add_link_to_textarea('f-el-par'); }

export function add_ref() { __form.add_ref_to_textarea('f-el-par'); }
