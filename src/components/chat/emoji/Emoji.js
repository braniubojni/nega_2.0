import React, { Component, Fragment } from "react";
import EmojiPicker from "emoji-picker-react";
import EmojiConvertor from "emoji-js";
import { init, exec } from "pell";

import "pell/dist/pell.css";
import "./styles.css";

let jsemoji = new EmojiConvertor();
// set the style to emojione (default - apple)
jsemoji.img_set = "emojione";
// set the storage location for all emojis
jsemoji.img_sets.emojione.path =
  "https://cdn.jsdelivr.net/emojione/assets/3.0/png/32/";

// jsemoji.replace_mode = "unified";
jsemoji.allow_native = false;

function placeCaretAtEnd(el) {
  el.focus();
  if (
    typeof window.getSelection !== undefined &&
    typeof document.createRange !== undefined
  ) {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange !== undefined) {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

function getNodeIndex(n) {
  var i = 0;
  while ((n = n.previousSibling)) i++;
  return i;
}

function saveRangePosition(el) {
  var range = window.getSelection().getRangeAt(0);
  var sC = range.startContainer,
    eC = range.endContainer;

  const A = [];
  while (sC !== el) {
    A.push(getNodeIndex(sC));
    sC = sC.parentNode;
  }

  const B = [];
  while (eC !== el) {
    B.push(getNodeIndex(eC));
    eC = eC.parentNode;
  }

  return { sC: A, sO: range.startOffset, eC: B, eO: range.endOffset };
}

function restoreRangePosition(el, rp) {
  el.focus();
  var sel = window.getSelection(),
    range = sel.getRangeAt(0);
  var x,
    C,
    sC = el,
    eC = el;

  C = rp.sC;
  x = C.length;
  while (x--) sC = sC.childNodes[C[x]];
  C = rp.eC;
  x = C.length;
  while (x--) eC = eC.childNodes[C[x]];

  range.setStart(sC, rp.sO);
  range.setEnd(eC, rp.eO);
  sel.removeAllRanges();
  sel.addRange(range);
}

class Editor extends Component {
  editor = null;
  id = Date.now();

  componentDidMount() {
    const { html: htmlProp, onChange } = this.props;

    this.editor = init({
      element: document.getElementById(this.id),
      onChange: (html) => {
        if (onChange) {
          onChange(html);
        }
      },
      actions: [],
      defaultParagraphSeparator: "div",
    });

    this.editor.content.innerHTML = htmlProp;
  }

  handleEmojiClick = (n, e) => {
    const emoji = jsemoji
      .replace_colons(`:${e.name}:`)
      .replace("span", "img")
      .slice(0, -7)
      .replace('style="background-image:url(', 'src="')
      .replace(')"', '"');

    if (this.pos) {
      restoreRangePosition(this.editor, this.pos);

      exec("insertHTML", emoji);

      this.getPos();
    } else {
      placeCaretAtEnd(this.editor.content);
      exec("insertHTML", emoji);
    }
  };

  getPos = () => {
    const pos = saveRangePosition(this.editor);
    this.pos = pos;
  };

  render() {
    return (
      <Fragment>
        <EmojiPicker onEmojiClick={this.handleEmojiClick} />

        <div
          id={this.id}
          className="pell"
          onKeyUp={this.getPos}
          onClick={this.getPos}
        />
      </Fragment>
    );
  }
}

export default Editor;
