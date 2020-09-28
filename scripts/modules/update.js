import * as __utils from './utils.js';
import * as __form from './form.js';
import * as __art from './article.js'

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
  var el_lst = document.getElementById('f_el_lst');

  // Purge element list
  el_lst.length = 0;

  // Add items corresponding to elements, to the list
  for (var [idx, element] of elements.entries()) {
    var option = document.createElement('option');
    option.value = element.id;
    option.innerHTML = (idx + 1) + ". " + __utils.class2name[element.getAttribute('class')] + ' : ' + (element.children[1] ? element.children[1] : element).innerHTML.slice(0, 15) + '...';
    el_lst.appendChild(option);
  }
}

export function update_img_button() {
  var img = document.getElementById('f_el_img');
  var img_label = img.labels[0];

  if (img.files[0]) img_label.innerHTML = img.files[0].name;
  else img_label.innerHTML = "Déposer une image";
}
