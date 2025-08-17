// https://mikeflynn.github.io/egg.js/

export default function Egg() {
  (this.eggs = []),
    (this.hooks = []),
    (this.kps = []),
    (this.activeEgg = ""),
    (this.ignoredKeys = [16]),
    arguments.length && this.AddCode.apply(this, arguments);
}
(Egg.prototype.__execute = function (a) {
  return "function" == typeof a && a.call(this);
}),
  (Egg.prototype.__toCharCodes = function (a) {
    var b = {
        up: 38,
        down: 40,
        left: 37,
        right: 39,
        enter: 13,
        space: 32,
        ctrl: 17,
        alt: 18,
        tab: 9,
        esc: 27,
      },
      c = Object.keys(b);
    "string" == typeof a &&
      (a = a.split(",").map(function (a) {
        return a.trim();
      }));
    var d = a.map(function (a) {
      return a === parseInt(a, 10)
        ? a
        : c.indexOf(a) > -1
        ? b[a]
        : a.charCodeAt(0);
    });
    return d.join(",");
  }),
  (Egg.prototype.AddCode = function (a, b, c) {
    return (
      this.eggs.push({ keys: this.__toCharCodes(a), fn: b, metadata: c }), this
    );
  }),
  (Egg.prototype.AddHook = function (a) {
    return this.hooks.push(a), this;
  }),
  (Egg.prototype.handleEvent = function (a) {
    var b = a.which,
      c = b >= 65 && 90 >= b;
    if (
      !(
        "keydown" !== a.type ||
        a.metaKey ||
        a.ctrlKey ||
        a.altKey ||
        a.shiftKey
      )
    ) {
      var d = a.target.tagName;
      if (("HTML" === d || "BODY" === d) && c) return void a.preventDefault();
    }
    "keyup" === a.type &&
      this.eggs.length > 0 &&
      (c && (a.shiftKey || (b += 32)),
      -1 === this.ignoredKeys.indexOf(b) && this.kps.push(b),
      this.eggs.forEach(function (a, b) {
        var c = this.kps.toString().indexOf(a.keys) >= 0;
        c &&
          ((this.kps = []),
          (this.activeEgg = a),
          this.__execute(a.fn, this),
          this.hooks.forEach(this.__execute, this),
          (this.activeEgg = ""));
      }, this));
  }),
  (Egg.prototype.Listen = function () {
    return (
      void 0 !== document.addEventListener &&
        (document.addEventListener("keydown", this, !1),
        document.addEventListener("keyup", this, !1)),
      this
    );
  }),
  (Egg.prototype.listen = Egg.prototype.Listen),
  (Egg.prototype.addCode = Egg.prototype.AddCode),
  (Egg.prototype.addHook = Egg.prototype.AddHook);

// EGGS
const eggsHtml =
  '<audio id="eggOmori" src="https://www.rahcode.com/assets/audio/omori.ogg"></audio>' +
  '<audio id="eggMeow" src="https://www.rahcode.com/assets/audio/meow.ogg"></audio>' +
  '<audio id="eggCiao" src="https://www.rahcode.com/assets/audio/bella_ciao.ogg"></audio>';

document.body.innerHTML += eggsHtml;

const egg = new Egg();

egg
  .addCode("o,m,o,r,i", function () {
    document.getElementById("eggOmori").play();
  })
  .listen();

egg
  .addCode("m,e,o,w", function () {
    document.getElementById("eggMeow").play();
  })
  .listen();

// Pracchia-78 at Italian Wikipedia, Public domain, via Wikimedia Commons
egg
  .addCode("c,i,a,o", function () {
    document.getElementById("eggCiao").play();
  })
  .addCode("b,e,l,l,a", function () {
    document.getElementById("eggCiao").play();
  })
  .addCode("a,n,t,i,f,a", function () {
    document.getElementById("eggCiao").play();
  })
  .listen();
