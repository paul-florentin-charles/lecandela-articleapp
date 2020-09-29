import * as __api from './modules/api.js'

/* Main events */

// Ask the user for confirmation when leaving the page (not to lose any data by mistake)
// Event is triggered when leaving the page (refreshing or closing it)
window.onbeforeunload = function() { return ""; };

// Load several elements in the article preview and reset form values
// Event is triggered when loading the page (refreshing or opening it)
window.onload = function() { __api.init(); };

/* Specific events */

/** Basic information **/

// Update title whenever modified
document.getElementById('f_title').onkeyup = function() { __api.update_title(); };
document.getElementById('f_title').onkeydown = function() { __api.update_title(); };

// Update author whenever modified
document.getElementById('f_author').onkeyup = function() { __api.update_author(); };
document.getElementById('f_author').onkeydown = function() { __api.update_author(); };

// Update date whenever modified
document.getElementById('f_date').onchange = function() { __api.update_date(); };

/** Section manager **/

// Update element manager whenever a new section is selected
document.getElementById('f_sctn_lst').onchange = function() { __api.update_section(); };

// Trigger add, modify and remove section buttons on click
document.getElementById('f_sctn_add').onclick = function() { __api.add_section(); };
document.getElementById('f_sctn_mod').onclick = function() { __api.modify_section(); };
document.getElementById('f_sctn_rm').onclick = function() { __api.remove_section(); };

/** Element manager **/

// Trigger paragraph styling buttons (italic, bold, etc.)
document.getElementById('f_el_par_it').onclick = function() { __api.add_italic_to_textarea(); };
document.getElementById('f_el_par_bold').onclick = function() { __api.add_bold_to_textarea(); };
document.getElementById('f_el_par_quote').onclick = function() { __api.add_quote_to_textarea(); };
document.getElementById('f_el_par_link').onclick = function() { __api.add_link_to_textarea(); };
document.getElementById('f_el_par_ref').onclick = function() { __api.add_ref_to_textarea(); };
// Trigger button used to add paragraph, on click
document.getElementById('f_el_add_par').onclick = function() { __api.add_paragraph(); };

// Trigger button used to add subtitle, on click
document.getElementById('f_el_add_subttl').onclick = function() { __api.add_subtitle(); };

// Trigger button used to add image, on change
document.getElementById('f_el_img').onchange = function() { __api.update_img_button(); };
// Trigger button used to add figure, on click
document.getElementById('f_el_add_fig').onclick = function() { __api.add_figure(); };

// Trigger button used to add quote, on click
document.getElementById('f_el_add_quote').onclick = function() { __api.add_quote(); };

// Trigger button used to modify element, on click
document.getElementById('f_el_copy_element').onclick = function() { __api.copy_element_content(); };

// Trigger button used to remove element, on click
document.getElementById('f_el_rm_element').onclick = function() { __api.remove_element(); };

/** Reference manager **/

// Trigger button used to add reference, on click
document.getElementById('f_ref_add').onclick = function() {__api.add_reference(); }

// Trigger button used to modify reference, on click
document.getElementById('f_ref_mod').onclick = function() {__api.modify_reference(); }

// Trigger button used to remove reference, on click
document.getElementById('f_ref_rm').onclick = function() {__api.remove_reference(); }

/** Export **/

// Trigger export buttons on click
document.getElementById('f_save_html').onclick = function() { __api.export_html(); };
document.getElementById('f_save_json').onclick = function() { __api.export_json(); };
