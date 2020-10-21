/* Config */

var cfg = {
    "html_name": "article.html",
    "json_name": "article.json",
    "img_path": "./local/img/"
};

/* Getters*/

export function get_html_fname() { return cfg["html_name"]; }

export function get_json_fname() { return cfg["json_name"]; }

export function get_img_path() { return cfg["img_path"]; }
