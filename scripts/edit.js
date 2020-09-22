function italic() {
  var textarea = document.getElementById('f_prgrph');
  var select_pos = textarea.selectionStart + 3;
  textarea.value = textarea.value.slice(0, textarea.selectionStart) + '<i></i>' + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
  textarea.focus();
  textarea.selectionEnd = select_pos;
}

function bold() {
  var textarea = document.getElementById('f_prgrph');
  var select_pos = textarea.selectionStart + 3;
  textarea.value = textarea.value.slice(0, textarea.selectionStart) + '<b></b>' + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
  textarea.focus();
  textarea.selectionEnd = select_pos;
}

function quote() {
  var textarea = document.getElementById('f_prgrph');
  var select_pos = textarea.selectionStart + 3;
  textarea.value = textarea.value.slice(0, textarea.selectionStart) + '<q></q>' + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
  textarea.focus();
  textarea.selectionEnd = select_pos;
}

function link() {
  var textarea = document.getElementById('f_prgrph');
  var select_pos = textarea.selectionStart + 9;
  textarea.value = textarea.value.slice(0, textarea.selectionStart) + '<a href=""></a>' + textarea.value.slice(textarea.selectionEnd, textarea.value.length);
  textarea.focus();
  textarea.selectionEnd = select_pos;
}
