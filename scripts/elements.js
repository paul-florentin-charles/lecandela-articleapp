function add_paragraph() {
  // Get id of selected section
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;
  var s_id = lst.children[idx].value;

  // Get content of textarea input
  var content = document.getElementById('f_prgrph').value.trim();
  if (!content) {
    alert("Text area for paragraph is empty, please fill it.")
    return 0;
  }

  _add_paragraph(content, s_id);
}

function _add_paragraph(content, s_id) {
  var section = document.getElementById(s_id);
  var paragraph = document.createElement('p');
  paragraph.innerHTML = content;

  var id = Math.random();
  while (document.getElementById(id)) id = Math.random();
  paragraph.id = id;

  paragraph.setAttribute('class', 'paragraph');
  section.appendChild(paragraph);

  _update_modified_section(s_id);
}

function add_subtitle() {
  // Get id of selected section
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;
  var s_id = lst.children[idx].value;

  // Get content of input
  var content = document.getElementById('f_sbttl').value.trim();
  if (!content) {
    alert("Input for subtitle is empty, please fill it.")
    return 0;
  }

  _add_subtitle(content, s_id);
}

function _add_subtitle(content, s_id) {
  var section = document.getElementById(s_id);
  var subtitle = document.createElement('h3');
  subtitle.innerHTML = content;

  var id = Math.random();
  while (document.getElementById(id)) id = Math.random();
  subtitle.id = id;

  subtitle.setAttribute('class', 'subtitle');
  section.appendChild(subtitle);

  _update_modified_section(s_id);
}

function add_figure() {}

function add_quote() {}

function add_list() {}

function remove_element() {
  var lst = document.getElementById('f_el_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no element to remove or you haven\'t selected one");
    return 0;
  }

  if (!confirm("This cannot be undone, are you sure ?")) {
    return 0;
  }

  _remove_element(lst, idx);
}

function _remove_element(lst, idx) {
  var el_id = lst.children[idx].value;

  // Removing element from list
  lst.removeChild(lst.children[idx]);
  // Selecting previous item, if there is one
  if (lst.children[idx-1]) {
    lst.children[idx-1].selected = true;
  }
  // Removing element from article
  document.getElementById(el_id).remove();
}

function copy_element() {
  var lst = document.getElementById('f_el_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no element to copy or you haven\'t selected one");
    return 0;
  }

  var el_id = lst.children[idx].value;
  var el = document.getElementById(el_id);

  if (el.getAttribute('class') != 'paragraph') return 0; //Only paragraph are treated so far
  document.getElementById('f_prgrph').value = el.innerHTML;
}
