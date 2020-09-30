/* Miscellaneous */

export function add_tag_to_text_input(input, tag_name, attr_dict = {}, value = "") {
    var inner = "<" + tag_name;
    for (var attr in attr_dict) {
        inner += [" ", attr, "=\"", attr_dict[attr], "\""].join("");
    }
    inner += ">";

    var start = input.selectionStart,
        end = input.selectionEnd,
        lth = input.value.length;
    var pos = start + inner.length;

    inner += [value, "</", tag_name, ">"].join("");

    input.value = input.value.slice(0, start) + inner + input.value.slice(end, lth);
    input.selectionEnd = pos;
    input.focus();
}

export function date_US_to_EU(date_US) {
    var date = new Date(date_US);
    if (!date.toJSON()) return ""; // Invalid date

    var day = date.getDate(),
        month = date.getMonth() + 1,
        year = date.getFullYear();
    var date_EU = (day < 10 ? "0" : "") + day + "." + (month < 10 ? "0" : "") + month + "." + year;

    return date_EU;
}

export function get_children(element, skip = 0) {
    var children = element.children;

    var elements = [];
    if (children.length <= skip) return elements;

    for (var i = skip; i < children.length; i++) elements[i - skip] = children[i];

    return elements;
}

export function save_file(content_str, name) {
    var file = new Blob([content_str], {type: "text/plain;charset=utf-8"});
    saveAs(file, name);
}

export function unused_id(prefix = "") {
    var id = prefix + Math.random();
    while (document.getElementById(id)) id = prefix + Math.random();

    return id;
}

export function update_img_label(img, label_idx = 0) {
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
