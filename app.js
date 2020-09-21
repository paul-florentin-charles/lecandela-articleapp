// For debugging purpose
var form = document.getElementById('form');
var article = document.getElementById('article');

// Submit article
function submit_article() {
  var article_raw_html = document.getElementById('article').outerHTML;
  // TODO: Send a JSON with raw HTML, title, author (optional) and date
}

// Export html
function export_html(name) {
  var article_raw_html = document.getElementById('article').outerHTML;
  var html_file = new Blob([article_raw_html], {type: "text/plain;charset=utf-8"});
  saveAs(html_file, name);
}

function init_article() {
  // Confirm reloading not to lose form data unpurposely
  window.onbeforeunload = function() {
      return "Confirm leaving/refreshing, not to lose form data";
    }

  // Header init
  var header = document.getElementById('a_header');
  var title = document.createElement('h1');
  title.id = 'a_title';
  header.appendChild(title);

  // Footer init
  var footer = document.getElementById('a_footer');
  var author = document.createElement('span');
  author.id = 'a_author';
  var date = document.createElement('span');
  date.id = 'a_date';
  footer.appendChild(document.createTextNode("Par "));
  footer.appendChild(author);
  footer.appendChild(document.createTextNode(", le "));
  footer.appendChild(date);

  // Flushing basic informations (title, author and date)
  document.getElementById('f_title').value = "";
  document.getElementById('f_author').value = "";
  document.getElementById('f_date').value = "";
  // Rechecking boxes
  document.getElementById('f_sctn_display_rank').checked = true;
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
  var date_obj = new Date(date);
  if (date_obj.toDateString() != "Invalid Date") {
    date = date_obj.getDate() + "." + (date_obj.getMonth() + 1) + "." + date_obj.getFullYear();
    document.getElementById('a_date').innerHTML = date;
  } else {
    document.getElementById('a_date').innerHTML = "";
  }
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
