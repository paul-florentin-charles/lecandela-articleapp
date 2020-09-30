import * as __api from './modules/api.js'

/* Main events */

/* Ask the user for confirmation when leaving the page (not to lose any data by mistake)
** Event is triggered when leaving the page (refreshing or closing it)
*/
//window.onbeforeunload = function() { return ""; };

/* Load several elements in the article preview and reset form values
** Event is triggered when loading the page (refreshing or opening it)
*/
window.onload = function() { __api.init(); };

/* Specific events */

var byId = document.getElementById.bind(document); // Useful alias

/** Metadata **/

// TITLE
byId('f-title').onkeyup = function() { __api.update_title(); };
byId('f-title').onkeydown = function() { __api.update_title(); };

// AUTHOR
byId('f-author').onkeyup = function() { __api.update_author(); };
byId('f-author').onkeydown = function() { __api.update_author(); };

// DATE
byId('f-date').onchange = function() { __api.update_date(); };

/** Section manager **/

byId('f-sctn-lst').onchange = function() { __api.update_section(); }; // LIST

byId('f-sctn-add').onclick = function() { __api.add_section(); }; // ADD
byId('f-sctn-mod').onclick = function() { __api.modify_section(); }; // MODIFY
byId('f-sctn-rm').onclick = function() { __api.remove_section(); }; // REMOVAL

/** Element manager **/

// Paragraph styling
byId('f-el-par-it').onclick = function() { __api.add_italic(); }; // ITALIC
byId('f-el-par-bold').onclick = function() { __api.add_bold(); }; // BOLD
byId('f-el-par-quote').onclick = function() { __api.add_quote(); }; // QUOTE
byId('f-el-par-link').onclick = function() { __api.add_link(); }; // LINK
byId('f-el-par-ref').onclick = function() { __api.add_ref(); }; // REFERENCE

// Add elements
byId('f-el-add-par').onclick = function() { __api.add_paragraph(); }; // PARAGRAPH

byId('f-el-add-subttl').onclick = function() { __api.add_subtitle(); }; // SUBTITLE

byId('f-el-img').onchange = function() { __api.update_img_button(); }; // IMAGE
byId('f-el-add-fig').onclick = function() { __api.add_figure(); }; // FIGURE

byId('f-el-add-quote').onclick = function() { __api.add_blockquote(); }; // BLOCKQUOTE

// Remove/copy elements
byId('f-el-copy-element').onclick = function() { __api.copy_element_content(); }; // COPY
byId('f-el-rm-element').onclick = function() { __api.remove_element(); }; // REMOVAL

/** Reference manager **/

byId('f-ref-add').onclick = function() {__api.add_reference(); } // ADD
byId('f-ref-mod').onclick = function() {__api.modify_reference(); } // MODIFY
byId('f-ref-rm').onclick = function() {__api.remove_reference(); } // REMOVAL

/** Export **/

byId('f-save-html').onclick = function() { __api.export_html(); }; // HTML
byId('f-save-json').onclick = function() { __api.export_json(); }; // JSON
