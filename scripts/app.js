// Export JSON
function export_json() {
  var raw_html = document.getElementById('article').innerHTML;
  var title = document.getElementById('f_title').value;
  var author = document.getElementById('f_author').value;
  var date = date_UStoEU(document.getElementById('f_date').value);

  var json_str = {
    "title": title,
    "author": author,
    "date": date,
    "content": raw_html
  };

  var json_file = new Blob([JSON.stringify(json_str)], {type: "text/plain;charset=utf-8"});
  saveAs(json_file, 'article.json');
}

// Export html
function export_html() {
  var article_raw_html = document.getElementById('article').innerHTML;
  var html_file = new Blob([article_raw_html], {type: "text/plain;charset=utf-8"});
  saveAs(html_file, 'article.html');
}

function update_title() {
  var title = document.getElementById('f_title').value;
  document.getElementById('a_title').innerHTML = title;
}

function update_author() {
  var author = document.getElementById('f_author').value;
  document.getElementById('a_author').innerHTML = author;
}

function update_date() {
  var date = document.getElementById('f_date').value;
  document.getElementById('a_date').innerHTML = date_UStoEU(date);
}

function date_UStoEU(date_US) {
  var date = new Date(date_US);
  if (date.toDateString() == "Invalid Date") return "";

  return date_EU = date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear();
}

function add_section() {
  var name = document.getElementById('f_sctn_name').value;
  var rank = document.getElementById('f_sctn_rank').value;

  if (!name || !rank) {
    alert('Name and rank must be filled');
    return;
  }

  var display_rank = document.getElementById('f_sctn_display_rank').checked;

  if (_add_section(rank, name, display_rank)) {
    // Flushing values
    document.getElementById('f_sctn_name').value = "";
    document.getElementById('f_sctn_rank').value = "";
  }
}

function _add_section(rank, name, display_rank=true) {
  if (isNaN(rank) || rank < 0) {
    alert('Section rank must be a positive number');
    return 0;
  }
  if (document.getElementById('s_' + rank)) {
    alert('There is already a section ' + rank);
    return 0;
  }

  var core = document.getElementById('a_core');
  var section = document.createElement('div');
  section.setAttribute('class', 'a_section');
  section.id = 's_' + rank;

  if (display_rank) {
    name = rank + ' - ' + name;
  }
  var title = document.createElement('h2');
  title.setAttribute('class', 's_title');
  title.innerHTML = name;
  section.appendChild(title);

  // Adding section to section list (<select> tag)
  var lst = document.getElementById('f_sctn_lst');

  var option = document.createElement('option');
  option.value = section.id;
  option.innerHTML = name;

  var inserted = false;
  for (opt of lst.children) {
    if (parseInt(opt.value.slice(2, opt.value.length)) > parseInt(option.value.slice(2, option.value.length))) {
      lst.insertBefore(option, opt);
      inserted = true;
      break;
    }
  }
  if (!inserted) lst.appendChild(option);

  // Adding section to core of article
  inserted = false;
  for (sctn of core.children) {
    if (parseInt(sctn.id.slice(2, sctn.id.length)) > parseInt(section.id.slice(2, section.id.length))) {
      core.insertBefore(section, sctn); // Insert before higher rank section
      inserted = true;
      break;
    }
  }
  if (!inserted) core.appendChild(section);

  // Updating modified section, only if list was empty (i.e. has one element now)
  if (lst.children.length == 1) update_modified_section();
  return 1;
}

function remove_section() {
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    alert("There\'s no section to remove or you haven\'t selected one");
    return 0;
  }

  if (!confirm("This cannot be undone, are you sure ?")) {
    return 0;
  }

  var s_id = lst.children[idx].value;
  _remove_section(s_id);

  // Removing section from section list (<select> tag)
  lst.removeChild(lst.children[idx]);
  // Selecting previous item, if there is one
  if (lst.children[idx-1]) {
    lst.children[idx-1].selected = true;
  }

  // Updating modified section
  update_modified_section();
}

function _remove_section(s_id) {
  var section = document.getElementById(s_id);

  // Removing section from core of article
  var core = document.getElementById('a_core');
  core.removeChild(section);
}

function update_modified_section() {
  var lst = document.getElementById('f_sctn_lst');
  var idx = lst.selectedIndex;

  if (idx == -1) {
    // Removing copy of template (modified section)
    if (document.getElementById('f_mod_sctn_cpy')) document.getElementById('f_mod_sctn_cpy').remove();
    return 0;
  }

  var s_id = lst.children[idx].value;
  console.log(s_id, lst.children[idx].innerHTML);
  _update_modified_section(s_id);
}

function _update_modified_section(s_id) {
  if (document.getElementById('f_mod_sctn_cpy')) document.getElementById('f_mod_sctn_cpy').remove();

  var temp = document.getElementById('f_mod_section');
  var temp_copy = document.createElement('div');
  temp_copy.appendChild(temp.content.cloneNode(true));
  temp_copy.id = 'f_mod_sctn_cpy';
  var form = document.getElementById('form');
  form.insertBefore(temp_copy, temp);

  _update_el_lst(s_id); // Update list of elements
}

function _update_el_lst(s_id) {
  elements = _get_el_lst(s_id); // Get list of elements of section 's_id'
  el_lst = document.getElementById("f_el_lst");
  var i = 1;
  for (element of elements) {
    var option = document.createElement('option');
    option.value = element.id;
    option.innerHTML = i + ". " + class2name[element.getAttribute('class')];
    el_lst.appendChild(option);
    i++;
  }
}

function _get_el_lst(s_id) {
  var section_kids = document.getElementById(s_id).children;
  if (section_kids.length <= 1) return [];
  // Skip first element, which is the title of the section
  el_lst = [];
  for (var i = 1; i < section_kids.length; i++) {
    el_lst[i-1] = section_kids[i];
  }
  return el_lst;
}
