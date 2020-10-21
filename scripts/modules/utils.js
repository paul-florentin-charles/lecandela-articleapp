// Useful aliases
export var byId = document.getElementById.bind(document);
export var crEl = document.createElement.bind(document);

/* Miscellaneous */

export function add_tag_to_text_input(input_id, tag_name, attr_dict = {}, value = "") {
  var inner = "<" + tag_name;
  for (var attr in attr_dict) {
      inner += [" ", attr, "=\"", attr_dict[attr], "\""].join("");
  }
  inner += ">";

  var input = byId(input_id);
  var start = input.selectionStart,
      end = input.selectionEnd,
      lth = input.value.length;
  var pos = start + inner.length;

  inner += [value, "</", tag_name, ">"].join("");

  input.value = [input.value.slice(0, start), inner, input.value.slice(end, lth)].join("");
  input.selectionEnd = pos;
  input.focus();
}

export function date_US_to_EU(date_US) {
    var date = new Date(date_US);
    if (!date.toJSON()) return ""; // Invalid date

    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    var date_EU = [(day < 10 ? "0" : ""), day, ".", (month < 10 ? "0" : ""), month, ".", year].join("");

    return date_EU;
}

export function get_children(element_id, skip = 0) {
  var children = byId(element_id).children;

  var elements = [];
  if (children.length <= skip) return elements;

  for (var i = skip; i < children.length; i++) elements[i - skip] = children[i];

  return elements;
}

export function get_children_nbr(tag_id) {
  return byId(tag_id).children.length;
}

export function get_finput_fname(file_id) {
  var file = byId(file_id).files[0];
  if (!file) return null;

  return file.name;
}

export function get_selected_item_value(lst_id) {
  var lst = byId(lst_id);
  var idx = lst.selectedIndex;
  if (idx == undefined || idx == -1) return null;

  return lst.children[idx].value;
}

export function get_tag_value(tag_id, format = function(x) {return x; }) {
  var value = byId(tag_id).value;
  if (!value) return null;

  return format(value.trim());
}

export function save_file(content_str, name) {
    var file = new Blob([content_str], {type: "text/plain;charset=utf-8"});
    saveAs(file, name);
}

export function set_tag_innerHTML(tag_id, content) {
  byId(tag_id).innerHTML = content;
}

export function set_tag_value(input_id, content, format = function(x) {return x; }) {
  byId(input_id).value = format(content.trim());
}

export function str_to_int(str, start = 0, end = str.length) {
  return parseInt(str.slice(start, end));
}

export function unused_id(prefix = "") {
    var id = prefix + Math.random();
    while (byId(id)) id = prefix + Math.random();

    return id;
}

export function update_img_label(img_id, label_idx = 0) {
  var img = byId(img_id);

  var label = img.labels[label_idx];
  label.innerHTML = (img.files[0] ? img.files[0].name : "Déposer une image");
}

/* Dictionaries */

export var class2name = {
    "a-paragraph": "Paragraphe",
    "a-subtitle": "Sous-titre",
    "a-figure": "Figure",
    "a-blockquote": "Citation"
};
