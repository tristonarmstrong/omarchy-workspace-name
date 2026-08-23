function plain(value) {
    return String(value || "").replace(/[<>]/g, "").replace(/\s+/g, " ").trim().slice(0, 64)
  }
function parseIcon(raw) {
    var value = String(raw || "").trim()
    if (value === "") return ""

    var glyph = ""
    var hex = value.match(/^(?:u\+|0x|\\u)?([0-9a-f]{4,6})$/i)
    if (hex) {
      var cp = parseInt(hex[1], 16)
      if (cp > 0 && cp <= 0x10FFFF) glyph = String.fromCodePoint(cp)
    }

    if (glyph === "") glyph = String.fromCodePoint(value.codePointAt(0))

    // An angle bracket is not an icon, and it is the one character that turns
    // a bar label into rich text. Both ways in are covered: the glyph itself
    // and its codepoint, u+003c. See plain().
    return glyph === "<" || glyph === ">" ? "" : glyph
  }
const cases = ['<img src="http://evil/x.png">work', '  spaced   out\n name  ', 'R&D budget', 'x'.repeat(200), 'invoicing', '<b>bold</b>'];
for (const c of cases) { const p = plain(c); console.log(`plain(${JSON.stringify(c.slice(0,40))}) = ${JSON.stringify(p)} len=${p.length}`); }
for (const i of ['f120', 'u+003c', '<', '>', '', '', 'f01ee', 'zzz', '003e'])
  { const g = parseIcon(i); console.log(`parseIcon(${JSON.stringify(i)}) = ${g === "" ? "(none)" : "U+" + g.codePointAt(0).toString(16)}`); }
