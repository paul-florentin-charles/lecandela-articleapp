/* Miscellaneous */

export function date_US_to_EU(date_US) {
  var date = new Date(date_US);
  if (date.toDateString() == "Invalid Date") return "";
  var date_EU = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();

  return date_EU;
}

export function save_file(content_str, name) {
  var file = new Blob([content_str], {type: "text/plain;charset=utf-8"});
  saveAs(file, name);
}

export function get_children(element, skip = 0) {
  var kids = element.children;
  if (kids.length <= skip) return [];

  var elements = [];
  for (var i = skip; i < kids.length; i++) {
    elements[i-skip] = kids[i];
  }

  return elements;
}

/* Styling tools for text fields (text_field, input type="text") */

export function add_italic(text_field) {
  var select_pos = text_field.selectionStart + 3;
  text_field.value = text_field.value.slice(0, text_field.selectionStart) + '<i></i>' + text_field.value.slice(text_field.selectionEnd, text_field.value.length);
  text_field.focus();
  text_field.selectionEnd = select_pos;
}

export function add_bold(text_field) {
  var select_pos = text_field.selectionStart + 3;
  text_field.value = text_field.value.slice(0, text_field.selectionStart) + '<b></b>' + text_field.value.slice(text_field.selectionEnd, text_field.value.length);
  text_field.focus();
  text_field.selectionEnd = select_pos;
}

export function add_quote(text_field) {
  var select_pos = text_field.selectionStart + 3;
  text_field.value = text_field.value.slice(0, text_field.selectionStart) + '<q></q>' + text_field.value.slice(text_field.selectionEnd, text_field.value.length);
  text_field.focus();
  text_field.selectionEnd = select_pos;
}

export function add_link(text_field) {
  var select_pos = text_field.selectionStart + 9;
  text_field.value = text_field.value.slice(0, text_field.selectionStart) + '<a href=""></a>' + text_field.value.slice(text_field.selectionEnd, text_field.value.length);
  text_field.focus();
  text_field.selectionEnd = select_pos;
}

/* Dictionaries */

export var class2name = {
  paragraph: 'Paragraphe',
  subtitle: 'Sous-titre',
  figure: 'Figure',
  quote: 'Citation',
  list: 'Liste'
};

var type2tag = {};

var fr2en = {};
