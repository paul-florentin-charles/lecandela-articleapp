import * as __api from './modules/api.js'

/* Main events */

/* Ask the user for confirmation when leaving the page (not to lose any data by mistake)
** Event is triggered when leaving the page (refreshing or closing it)
*/
//$(window).on("beforeunload", function() { return ""; });

/* Load several elements in the article preview and reset form values
** Event is triggered when loading the page (refreshing or opening it)
*/
$(window).on("load", function() { __api.init('#article'); });

/** Metadata **/

$('#m-title').on("keyup keydown", function() { __api.update_title('#m-title'); }); // TITLE
$('#m-author').on("keyup keydown", function() { __api.update_author('#m-author'); }); // AUTHOR
$('#m-date').on("change", function() { __api.update_date('#m-date'); }); // DATE

/** Section manager **/

$('#s-lst').on("change", function() { __api.update_section('#s-lst', '#element', '#e-lst'); }); // LIST

$('#s-add').on("click", function() { __api.add_section('#s-name', '#s-nbr', '#s-shownbr', '#s-lst', '#element', '#e-lst'); }); // ADD
$('#s-mod').on("click", function() { __api.modify_section('#s-name', '#s-nbr', '#s-shownbr', '#s-lst', '#e-lst'); }); // MODIFY
$('#s-rm').on("click", function() { __api.remove_section('#s-lst', '#element', '#e-lst'); }); // REMOVAL

/** Element manager **/

// Paragraph styling
$('#e-par-it').on("click", function() { __api.add_italic('#e-par'); }); // ITALIC
$('#e-par-bold').on("click", function() { __api.add_bold('#e-par'); }); // BOLD
$('#e-par-quote').on("click", function() { __api.add_quote('#e-par'); }); // QUOTE
$('#e-par-link').on("click", function() { __api.add_link('#e-par'); }); // LINK
$('#e-par-ref').on("click", function() { __api.add_ref('#e-par'); }); // REFERENCE

// Add elements
$('#e-par-add').on("click", function() { __api.add_paragraph('#e-par', '#s-lst', '#e-lst'); }); // PARAGRAPH

$('#e-subttl-add').on("click", function() { __api.add_subtitle('#e-subttl', '#s-lst', '#e-lst'); }); // SUBTITLE

$('#e-img').on("change", function() { __api.update_img_button('#e-img'); }); // IMAGE
$('#e-fig-add').on("click", function() { __api.add_figure('#e-img', '#e-cap', '#s-lst', '#e-lst'); }); // FIGURE

$('#e-quote-add').on("click", function() { __api.add_blockquote('#e-quote', '#s-lst', '#e-lst'); }); // BLOCKQUOTE

// Remove/copy elements
$('#e-rm').on("click", function() { __api.remove_element('#s-lst', '#e-lst'); }); // REMOVAL
$('#e-cpy').on("click", function() { __api.copy_element_content('#e-lst', '#e-par', '#e-subttl', '#e-cap', '#e-quote'); }); // COPY

/** Reference manager **/

$('#r-add').on("click", function() {__api.add_reference('#r-lst', '#r-name', '#r-author', '#r-src', '#r-year', '#r-url'); }); // ADD
$('#r-mod').on("click", function() {__api.modify_reference('#r-lst', '#r-name', '#r-author', '#r-src', '#r-year', '#r-url'); }); // MODIFY
$('#r-rm').on("click", function() {__api.remove_reference('#r-lst'); }); // REMOVAL

/** Export **/

$('#save-html').on("click", function() { __api.export_html(); }); // HTML
$('#save-json').on("click", function() { __api.export_json(); }); // JSON
