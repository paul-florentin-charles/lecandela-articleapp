/* Miscellaneous */

export function add_tag_to_text_input(jQid_input, tag_name, attr_dict = {}, value = "") {
  var inner = `<${tag_name}`;
  for (let attr in attr_dict) inner += ` ${attr}="${attr_dict[attr]}"`;
  inner += `>`;

  var input = $(jQid_input);
  var start = input.prop('selectionStart'),
      end = input.prop('selectionEnd');
  var pos = start + inner.length;

  inner += `${value}</${tag_name}>`

  input.val(`${input.val().slice(0, start)}${inner}${input.val().slice(end)}`);
  input.prop('selectionEnd', pos);
  input.focus();
}

export function date_US_to_EU(date_US) {
    var date = new Date(date_US);
    if (!date.toJSON()) return ""; // Invalid date

    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    var date_EU = `${day < 10 ? "0" : ""}${day}.${month < 10 ? "0" : ""}${month}.${year}`;

    return date_EU;
}

export function get_finput_fname(jQid_file) {
  var file = $($(jQid_file).prop('files')[0]);
  if (!file.length) return null;

  return file.prop('name');
}

export function get_selected_item_value(jQid_lst) {
  var lst = $(jQid_lst);
  var idx = lst.prop('selectedIndex');
  if (idx == undefined || idx == -1) return null;

  return $(lst.children()[idx]).val();
}

export function get_tag_innerHTML(jQid_tag) {
  var inner = $(jQid_tag).html();
  if (!inner) return null;

  return inner;
}

export function get_tag_value(jQid_tag, format = function(x) {return x; }) {
  var value = $(jQid_tag).val();
  if (!value) return null;

  return format(value.trim());
}

export function save_file(content, name) {
    var file = new Blob([content], {type: "text/plain;charset=utf-8"});
    saveAs(file, name);
}

export function set_tag_innerHTML(jQid_tag, content) {
  $(jQid_tag).html(content);
}

export function set_tag_value(jQid_input, content, format = function(x) {return x; }) {
  $(jQid_input).val(format(content.trim()));
}

export function str_to_int(str, start = 0, end = str.length) {
  return parseInt(str.slice(start, end));
}

export function unused_id(prefix = "") {
    var jQid = `${prefix}${Math.random()}`.replace("0.", "");
    while ($(jQid).length) jQid = `#${prefix}${Math.random()}`.replace("0.", "");

    return jQid.slice(1);
}

export function update_img_label(jQid_img, label_idx = 0) {
  var img = $(jQid_img);

  var label = $(img.prop('labels')[label_idx]);
  label.html(img.prop('files').length ? img.prop('files')[0].name : "Déposer une image");
}

/* Dictionaries */

export var class2name = {
    "a-paragraph": "Paragraphe",
    "a-subtitle": "Sous-titre",
    "a-figure": "Figure",
    "a-blockquote": "Citation"
};
