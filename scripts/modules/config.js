var cfg = {
  "html": {
    "f_name": "article.html",
    "ttl_tag": "h1"
  },
  "json": {
    "f_name": "article.json"
  },
  "img_path": "./local/img/"
}

export function get_html_fname() { return cfg["html"]["f_name"]; }

export function get_json_fname() { return cfg["json"]["f_name"]; }

export function get_img_path() { return cfg["img_path"]; }
