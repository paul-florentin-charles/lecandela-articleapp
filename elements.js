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

function add_subtitle() {}

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
