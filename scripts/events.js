import * as __api from './modules/api.js'

/* Main events */

/* Ask the user for confirmation when leaving the page (not to lose any data by mistake)
** Event is triggered when leaving the page (refreshing or closing it)
*/
//window.onbeforeunload = function() { return ""; };

/* Load several elements in the article preview and reset form values
** Event is triggered when loading the page (refreshing or opening it)
*/
$(window).on("load", function() { __api.init(); });

/** Metadata **/

// TITLE
$('#f-title').on("keyup keydown", function() { __api.update_title(); });

// AUTHOR
$('#f-author').on("keyup keydown", function() { __api.update_author(); });

// DATE
$('#f-date').on("change", function() { __api.update_date(); });

/** Section manager **/

$('#f-sctn-lst').on("change", function() { __api.update_section(); }); // LIST

$('#f-sctn-add').on("click", function() { __api.add_section(); }); // ADD
$('#f-sctn-mod').on("click", function() { __api.modify_section(); }); // MODIFY
$('#f-sctn-rm').on("click", function() { __api.remove_section(); }); // REMOVAL

/** Element manager **/

// Paragraph styling
$('#f-el-par-it').on("click", function() { __api.add_italic(); }); // ITALIC
$('#f-el-par-bold').on("click", function() { __api.add_bold(); }); // BOLD
$('#f-el-par-quote').on("click", function() { __api.add_quote(); }); // QUOTE
$('#f-el-par-link').on("click", function() { __api.add_link(); }); // LINK
$('#f-el-par-ref').on("click", function() { __api.add_ref(); }); // REFERENCE

// Add elements
$('#f-el-add-par').on("click", function() { __api.add_paragraph(); }); // PARAGRAPH

$('#f-el-add-subttl').on("click", function() { __api.add_subtitle(); }); // SUBTITLE

$('#f-el-img').on("change", function() { __api.update_img_button(); }); // IMAGE
$('#f-el-add-fig').on("click", function() { __api.add_figure(); }); // FIGURE

$('#f-el-add-quote').on("click", function() { __api.add_blockquote(); }); // BLOCKQUOTE

// Remove/copy elements
$('#f-el-copy-element').on("click", function() { __api.copy_element_content(); }); // COPY
$('#f-el-rm-element').on("click", function() { __api.remove_element(); }); // REMOVAL

/** Reference manager **/

$('#f-ref-add').on("click", function() {__api.add_reference(); }); // ADD
$('#f-ref-mod').on("click", function() {__api.modify_reference(); }); // MODIFY
$('#f-ref-rm').on("click", function() {__api.remove_reference(); }); // REMOVAL

/** Export **/

$('#f-save-html').on("click", function() { __api.export_html(); }); // HTML
$('#f-save-json').on("click", function() { __api.export_json(); }); // JSON
