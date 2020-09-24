import * as __utils from './utils.js';
import * as __form from './form.js';

export function update_section() {
  if (document.getElementById('f_sctn_lst').selectedIndex == -1) {
    document.getElementById('f_el').style.display = 'none'; // Hiding element manager
    return 0;
  }
  document.getElementById('f_el').style.display = 'block'; // Showing element manager

  update_element(); // Update list of elements
}

export function update_element() {
  var s_id = __form.get_section_id();

  // Get list of elements of section 's_id' apart from the first one (which is the title)
  var elements = __utils.get_children(document.getElementById(s_id), 1);
  var el_lst = document.getElementById("f_el_lst");

  // Purge element list
  el_lst.length = 0;

  // Add items corresponding to elements, to the list
  var i = 1;
  for (var element of elements) {
    var option = document.createElement('option');
    option.value = element.id;
    option.innerHTML = i + ". " + __utils.class2name[element.getAttribute('class')];
    el_lst.appendChild(option);
    i++;
  }
}
