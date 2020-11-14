import * as __api from './modules/api.js'

/* Main events */

/* Ask the user for confirmation when leaving the page (not to lose any data by mistake)
** Event is triggered when leaving the page (refreshing or closing it)
*/
//$(window).on("beforeunload", function() { return ""; });

/* Load several elements in the article preview and reset form values
** Event is triggered when loading the page (refreshing or opening it)
*/
$(window).on("load", function() { __api.init('article'); });

/** Metadata **/

// TITLE
$('#f-title').on("keyup keydown", function() { __api.update_title('f-title'); });

// AUTHOR
$('#f-author').on("keyup keydown", function() { __api.update_author('f-author'); });

// DATE
$('#f-date').on("change", function() { __api.update_date('f-date'); });

/** Section manager **/

$('#f-sctn-lst').on("change", function() { __api.update_section('f-sctn-lst', 'f-el', 'f-el-lst'); }); // LIST

$('#f-sctn-add').on("click", function() { __api.add_section('f-sctn-name', 'f-sctn-nbr', 'f-sctn-show-nbr', 'f-sctn-lst', 'f-el', 'f-el-lst'); }); // ADD
$('#f-sctn-mod').on("click", function() { __api.modify_section('f-sctn-name', 'f-sctn-nbr', 'f-sctn-show-nbr', 'f-sctn-lst', 'f-el-lst'); }); // MODIFY
$('#f-sctn-rm').on("click", function() { __api.remove_section('f-sctn-lst', 'f-el', 'f-el-lst'); }); // REMOVAL

/** Element manager **/

// Paragraph styling
$('#f-el-par-it').on("click", function() { __api.add_italic('f-el-par'); }); // ITALIC
$('#f-el-par-bold').on("click", function() { __api.add_bold('f-el-par'); }); // BOLD
$('#f-el-par-quote').on("click", function() { __api.add_quote('f-el-par'); }); // QUOTE
$('#f-el-par-link').on("click", function() { __api.add_link('f-el-par'); }); // LINK
$('#f-el-par-ref').on("click", function() { __api.add_ref('f-el-par'); }); // REFERENCE

// Add elements
$('#f-el-add-par').on("click", function() { __api.add_paragraph('f-el-par', 'f-sctn-lst', 'f-el-lst'); }); // PARAGRAPH

$('#f-el-add-subttl').on("click", function() { __api.add_subtitle('f-el-subttl', 'f-sctn-lst', 'f-el-lst'); }); // SUBTITLE

$('#f-el-img').on("change", function() { __api.update_img_button('f-el-img'); }); // IMAGE
$('#f-el-add-fig').on("click", function() { __api.add_figure('f-el-img', 'f-el-caption', 'f-sctn-lst', 'f-el-lst'); }); // FIGURE

$('#f-el-add-quote').on("click", function() { __api.add_blockquote('f-el-quote', 'f-sctn-lst', 'f-el-lst'); }); // BLOCKQUOTE

// Remove/copy elements
$('#f-el-rm-element').on("click", function() { __api.remove_element('f-sctn-lst', 'f-el-lst'); }); // REMOVAL
$('#f-el-copy-element').on("click", function() { __api.copy_element_content(); }); // COPY

/** Reference manager **/

$('#f-ref-add').on("click", function() {__api.add_reference(); }); // ADD
$('#f-ref-mod').on("click", function() {__api.modify_reference(); }); // MODIFY
$('#f-ref-rm').on("click", function() {__api.remove_reference(); }); // REMOVAL

/** Export **/

$('#f-save-html').on("click", function() { __api.export_html(); }); // HTML
$('#f-save-json').on("click", function() { __api.export_json(); }); // JSON
