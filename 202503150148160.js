! function(t, e, n, i, r) {
	var a = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : {},
		o = "function" == typeof a.parcelRequire93cf && a.parcelRequire93cf,
		s = o.cache || {},
		l = "undefined" != typeof module && "function" == typeof module.require && module.require.bind(module);

	function u(e, n) {
		if (!s[e]) {
			if (!t[e]) {
				var i = "function" == typeof a.parcelRequire93cf && a.parcelRequire93cf;
				if (!n && i) return i(e, !0);
				if (o) return o(e, !0);
				if (l && "string" == typeof e) return l(e);
				var r = new Error("Cannot find module '" + e + "'");
				throw r.code = "MODULE_NOT_FOUND", r
			}
			m.resolve = function(n) {
				var i = t[e][1][n];
				return null != i ? i : n
			}, m.cache = {};
			var d = s[e] = new u.Module(e);
			t[e][0].call(d.exports, m, d, d.exports, this)
		}
		return s[e].exports;

		function m(t) {
			var e = m.resolve(t);
			return !1 === e ? {} : u(e)
		}
	}
	u.isParcelRequire = !0, u.Module = function(t) {
		this.id = t, this.bundle = u, this.exports = {}
	}, u.modules = t, u.cache = s, u.parent = o, u.register = function(e, n) {
		t[e] = [function(t, e) {
			e.exports = n
		}, {}]
	}, Object.defineProperty(u, "root", {
		get: function() {
			return a.parcelRequire93cf
		}
	}), a.parcelRequire93cf = u;
	for (var d = 0; d < e.length; d++) u(e[d]);
	var m = u(n);
	"object" == typeof exports && "undefined" != typeof module ? module.exports = m : "function" == typeof define && define.amd && define((function() {
		return m
	}))
}({
	E13ST: [function(t, e, n) {
		var i = t("@parcel/transformer-js/src/esmodule-helpers.js");
		i.defineInteropFlag(n);
		var r = t("./danmuku"),
			a = i.interopDefault(r),
			o = t("./setting"),
			s = i.interopDefault(o);

		function l(t) {
			return e => {
				! function(t) {
					const {
						version: e,
						utils: {
							errorHandle: n
						}
					} = t.constructor, i = e.split(".").map(Number);
					n(i[0] + i[1] / 100 >= 4.04, `Artplayer.js@${e}不兼容该弹幕库，请更新到4.4.x版本以上`)
				}(e);
				const n = new(0, a.default)(e, t);
				return (0, s.default)(e, n), {
					name: "artplayerPluginDanmuku",
					emit: n.emit.bind(n),
					load: n.load.bind(n),
					config: n.config.bind(n),
					hide: n.hide.bind(n),
					show: n.show.bind(n),
					get isHide() {
						return n.isHide
					},
					get isStop() {
						return n.isStop
					}
				}
			}
		}
		n.default = l, l.env = "production", l.version = "4.4.8", l.build = "1655097987373", "undefined" != typeof window && (window.artplayerPluginDanmuku = l)
	}, {
		"./danmuku": "8Gtnh",
		"./setting": "jAkJm",
		"@parcel/transformer-js/src/esmodule-helpers.js": "9v6Cv"
	}],
	"8Gtnh": [function(t, e, n) {
		var i = t("@parcel/transformer-js/src/esmodule-helpers.js");
		i.defineInteropFlag(n);
		var r = t("./bilibili"),
			a = t("./getDanmuTop"),
			o = i.interopDefault(a);
		class s {
			constructor(e, n) {
				const {
					constructor: i,
					template: r
				} = e;
				if (this.utils = i.utils, this.validator = i.validator, this.$danmuku = r.$danmuku, this.$player = r.$player, this.art = e, this.queue = [], this.option = {}, this.$refs = [], this.isStop = !1, this.isHide = !1, this.timer = null, this.config(n), this.option.useWorker) try {
					this.worker = new Worker(t("27c3930ee158179a"))
				} catch (t) {}
				this.start = this.start.bind(this), this.stop = this.stop.bind(this), this.reset = this.reset.bind(this), this.destroy = this.destroy.bind(this), e.on("video:play", this.start), e.on("video:playing", this.start), e.on("video:pause", this.stop), e.on("video:waiting", this.stop), e.on("fullscreen", this.reset), e.on("fullscreenWeb", this.reset), e.on("destroy", this.destroy), this.load()
			}
			static get option() {
				return {
					danmuku: [],
					speed: 5,
					margin: ["2%", "25%"],
					opacity: 1,
					color: "#FFFFFF",
					mode: 0,
					fontSize: 25,
					filter: () => !0,
					antiOverlap: !0,
					useWorker: !0,
					synchronousPlayback: !0,
					lockTime: 5,
					maxLength: 100,
					minWidth: 200,
					maxWidth: 400,
					mount: void 0,
					theme: "dark",
					beforeEmit: () => !0
				}
			}
			static get scheme() {
				return {
					danmuku: "array|function|string",
					speed: "number",
					margin: "array",
					opacity: "number",
					color: "string",
					mode: "number",
					fontSize: "number|string",
					filter: "function",
					antiOverlap: "boolean",
					useWorker: "boolean",
					synchronousPlayback: "boolean",
					lockTime: "number",
					maxLength: "number",
					minWidth: "number",
					maxWidth: "number",
					mount: "undefined|htmldivelement",
					theme: "string",
					beforeEmit: "function"
				}
			}
			get isRotate() {
				return this.art.plugins.autoOrientation && this.art.plugins.autoOrientation.state
			}
			get marginTop() {
				const {
					clamp: t
				} = this.utils, e = this.option.margin[0], {
					clientHeight: n
				} = this.$player;
				if ("number" == typeof e) return t(e, 0, n);
				if ("string" == typeof e && e.endsWith("%")) {
					return t(n * (parseFloat(e) / 100), 0, n)
				}
				return s.option.margin[0]
			}
			get marginBottom() {
				const {
					clamp: t
				} = this.utils, e = this.option.margin[1], {
					clientHeight: n
				} = this.$player;
				if ("number" == typeof e) return t(e, 0, n);
				if ("string" == typeof e && e.endsWith("%")) {
					return t(n * (parseFloat(e) / 100), 0, n)
				}
				return s.option.margin[1]
			}
			filter(t, e) {
				return this.queue.filter((e => e.$state === t)).map(e)
			}
			getLeft(t) {
				const e = t.getBoundingClientRect();
				return this.isRotate ? e.top : e.left
			}
			getRef() {
				const t = this.$refs.pop();
				if (t) return t;
				const e = document.createElement("div");
				return e.style.cssText = '\n            user-select: none;\n            position: absolute;\n            white-space: pre;\n            pointer-events: none;\n            perspective: 500px;\n            display: inline-block;\n            will-change: transform;\n            font-weight: normal;\n            line-height: 1.125;\n            visibility: hidden;\n            font-family: SimHei, "Microsoft JhengHei", Arial, Helvetica, sans-serif;\n            text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;\n        ', e
			}
			getReady() {
				const {
					currentTime: t
				} = this.art;
				return this.queue.filter((e => "ready" === e.$state || "wait" === e.$state && t + .1 >= e.time && e.time >= t - .1))
			}
			getEmits() {
				const t = [],
					{
						clientWidth: e
					} = this.$player,
					n = this.getLeft(this.$player);
				return this.filter("emit", (i => {
					const r = i.$ref.offsetTop,
						a = this.getLeft(i.$ref) - n,
						o = i.$ref.clientHeight,
						s = i.$ref.clientWidth,
						l = a + s,
						u = e - l,
						d = l / i.$restTime,
						m = {};
					m.top = r, m.left = a, m.height = o, m.width = s, m.right = u, m.speed = d, m.distance = l, m.time = i.$restTime, m.mode = i.mode, t.push(m)
				})), t
			}
			getFontSize(t) {
				const {
					clamp: e
				} = this.utils, {
					clientHeight: n
				} = this.$player;
				if ("number" == typeof t) return e(t, 12, n);
				if ("string" == typeof t && t.endsWith("%")) {
					return e(n * (parseFloat(t) / 100), 12, n)
				}
				return s.option.fontSize
			}
			postMessage(t = {}) {
				return new Promise((e => {
					if (this.option.useWorker && this.worker && this.worker.postMessage) t.id = Date.now(), this.worker.postMessage(t), this.worker.onmessage = n => {
						const {
							data: i
						} = n;
						i.id === t.id && e(i)
					};
					else {
						const n = (0, o.default)(t);
						e({
							top: n
						})
					}
				}))
			}
			async load() {
				try {
					let t = [];
					t = "function" == typeof this.option.danmuku ? await this.option.danmuku() : "function" == typeof this.option.danmuku.then ? await this.option.danmuku : "string" == typeof this.option.danmuku ? await (0, r.bilibiliDanmuParseFromUrl)(this.option.danmuku) : this.option.danmuku, this.utils.errorHandle(Array.isArray(t), "Danmuku need return an array as result"), this.art.emit("artplayerPluginDanmuku:loaded", t), this.queue = [], this.$danmuku.innerText = "", t.forEach((t => this.emit(t)))
				} catch (t) {
					throw this.art.emit("artplayerPluginDanmuku:error", t), t
				}
				return this
			}
			config(t) {
				const {
					clamp: e
				} = this.utils;
				return this.option = Object.assign({}, s.option, this.option, t), this.validator(this.option, s.scheme), this.option.speed = e(this.option.speed, 1, 10), this.option.opacity = e(this.option.opacity, 0, 1), this.option.lockTime = e(Math.floor(this.option.lockTime), 0, 60), this.option.maxLength = e(this.option.maxLength, 0, 500), this.option.minWidth = e(this.option.minWidth, 0, 500), this.option.maxWidth = e(this.option.maxWidth, 0, 1 / 0), t.fontSize && (this.option.fontSize = this.getFontSize(this.option.fontSize), this.reset()), this.art.emit("artplayerPluginDanmuku:config", this.option), this
			}
			makeWait(t) {
				t.$state = "wait", t.$ref && (t.$ref.style.visibility = "hidden", t.$ref.style.marginLeft = "0px", t.$ref.style.transform = "translateX(0px)", t.$ref.style.transition = "transform 0s linear 0s", this.$refs.push(t.$ref), t.$ref = null)
			}
			continue () {
				const {
					clientWidth: t
				} = this.$player;
				return this.filter("stop", (e => {
					switch (e.$state = "emit", e.$lastStartTime = Date.now(), e.mode) {
						case 0: {
							const n = t + e.$ref.clientWidth;
							e.$ref.style.transform = `translateX(${-n}px)`, e.$ref.style.transition = `transform ${e.$restTime}s linear 0s`;
							break
						}
					}
				})), this
			}
			suspend() {
				const {
					clientWidth: t
				} = this.$player;
				return this.filter("emit", (e => {
					switch (e.$state = "stop", e.mode) {
						case 0: {
							const n = t - (this.getLeft(e.$ref) - this.getLeft(this.$player));
							e.$ref.style.transform = `translateX(${-n}px)`, e.$ref.style.transition = "transform 0s linear 0s";
							break
						}
					}
				})), this
			}
			reset() {
				return this.queue.forEach((t => this.makeWait(t))), this
			}
			update() {
				return this.timer = window.requestAnimationFrame((async () => {
					if (this.art.playing && !this.isHide) {
						this.filter("emit", (t => {
							const e = (Date.now() - t.$lastStartTime) / 1e3;
							t.$restTime -= e, t.$lastStartTime = Date.now(), t.$restTime <= 0 && this.makeWait(t)
						}));
						const t = this.getReady(),
							{
								clientWidth: e,
								clientHeight: n
							} = this.$player;
						for (let i = 0; i < t.length; i++) {
							const r = t[i];
							r.$ref = this.getRef(), r.$ref.innerText = r.text, this.$danmuku.appendChild(r.$ref), r.$ref.style.left = `${e}px`, r.$ref.style.opacity = this.option.opacity, r.$ref.style.fontSize = `${this.option.fontSize}px`, r.$ref.style.color = r.color, r.$ref.style.border = r.border ? `1px solid ${r.color}` : null, r.$ref.style.backgroundColor = r.border ? "rgb(0 0 0 / 50%)" : null, r.$ref.style.marginLeft = "0px", r.$lastStartTime = Date.now(), r.$restTime = this.option.synchronousPlayback && this.art.playbackRate ? this.option.speed / Number(this.art.playbackRate) : this.option.speed;
							const a = {
									mode: r.mode,
									height: r.$ref.clientHeight,
									speed: (e + r.$ref.clientWidth) / r.$restTime
								},
								{
									top: o
								} = await this.postMessage({
									target: a,
									emits: this.getEmits(),
									antiOverlap: this.option.antiOverlap,
									clientWidth: e,
									clientHeight: n,
									marginBottom: this.marginBottom,
									marginTop: this.marginTop
								});
							if (r.$ref)
								if (this.isStop || void 0 === o) r.$state = "ready", this.$refs.push(r.$ref), r.$ref = null;
								else switch (r.$state = "emit", r.$ref.style.visibility = "visible", r.mode) {
									case 0: {
										r.$ref.style.top = `${o}px`;
										const t = e + r.$ref.clientWidth;
										r.$ref.style.transform = `translateX(${-t}px)`, r.$ref.style.transition = `transform ${r.$restTime}s linear 0s`;
										break
									}
									case 1:
										r.$ref.style.left = "50%", r.$ref.style.top = `${o}px`, r.$ref.style.marginLeft = `-${r.$ref.clientWidth/2}px`
								}
						}
					}
					this.isStop || this.update()
				})), this
			}
			stop() {
				return this.isStop = !0, this.suspend(), window.cancelAnimationFrame(this.timer), this.art.emit("artplayerPluginDanmuku:stop"), this
			}
			start() {
				return this.isStop = !1, this.continue(), this.update(), this.art.emit("artplayerPluginDanmuku:start"), this
			}
			show() {
				return this.isHide = !1, this.start(), this.$danmuku.style.display = "block", this.art.emit("artplayerPluginDanmuku:show"), this
			}
			hide() {
				return this.isHide = !0, this.stop(), this.queue.forEach((t => this.makeWait(t))), this.$danmuku.style.display = "none", this.art.emit("artplayerPluginDanmuku:hide"), this
			}
			emit(t) {
				return this.validator(t, {
					text: "string",
					mode: "number|undefined",
					color: "string|undefined",
					time: "number|undefined",
					border: "boolean|undefined"
				}), t.text.trim() && this.option.filter(t) ? (t.time ? t.time = this.utils.clamp(t.time, 0, 1 / 0) : t.time = this.art.currentTime + .5, void 0 === t.mode && (t.mode = this.option.mode), void 0 === t.color && (t.color = this.option.color), this.queue.push({
					...t,
					$state: "wait",
					$ref: null,
					$restTime: 0,
					$lastStartTime: 0
				}), this) : this
			}
			destroy() {
				this.stop(), this.worker && this.worker.terminate && this.worker.terminate(), this.art.off("video:play", this.start), this.art.off("video:playing", this.start), this.art.off("video:pause", this.stop), this.art.off("video:waiting", this.stop), this.art.off("fullscreen", this.reset), this.art.off("fullscreenWeb", this.reset), this.art.off("destroy", this.destroy), this.art.emit("artplayerPluginDanmuku:destroy")
			}
		}
		n.default = s
	}, {
		"./bilibili": "KnwDr",
		"./getDanmuTop": "2Abxf",
		"27c3930ee158179a": "anHwN",
		"@parcel/transformer-js/src/esmodule-helpers.js": "9v6Cv"
	}],
	KnwDr: [function(t, e, n) {
		var i = t("@parcel/transformer-js/src/esmodule-helpers.js");

		function r(t) {
			switch (t) {
				case 1:
				case 2:
				case 3:
				default:
					return 0;
				case 4:
				case 5:
					return 1
			}
		}

		function a(t) {
			if ("string" != typeof t) return [];
			const e = t.matchAll(/<d (?:.*? )??p="(?<p>.+?)"(?: .*?)?>(?<text>.+?)<\/d>/gs);
			return Array.from(e).map((t => {
				const e = t.groups.p.split(",");
				if (e.length >= 8) {
					return {
						text: t.groups.text.trim().replaceAll("&quot;", '"').replaceAll("&apos;", "'").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;", "&"),
						time: Number(e[0]),
						mode: r(Number(e[1])),
						fontSize: Number(e[2]),
						color: `#${Number(e[3]).toString(16)}`,
						timestamp: Number(e[4]),
						pool: Number(e[5]),
						userID: e[6],
						rowID: Number(e[7])
					}
				}
				return null
			})).filter(Boolean)
		}

		function o(t) {
			return fetch(t).then((t => t.text())).then((t => a(t)))
		}
		i.defineInteropFlag(n), i.export(n, "getMode", (() => r)), i.export(n, "bilibiliDanmuParseFromXml", (() => a)), i.export(n, "bilibiliDanmuParseFromUrl", (() => o))
	}, {
		"@parcel/transformer-js/src/esmodule-helpers.js": "9v6Cv"
	}],
	"9v6Cv": [function(t, e, n) {
		n.interopDefault = function(t) {
			return t && t.__esModule ? t : {
				default: t
			}
		}, n.defineInteropFlag = function(t) {
			Object.defineProperty(t, "__esModule", {
				value: !0
			})
		}, n.exportAll = function(t, e) {
			return Object.keys(t).forEach((function(n) {
				"default" === n || "__esModule" === n || e.hasOwnProperty(n) || Object.defineProperty(e, n, {
					enumerable: !0,
					get: function() {
						return t[n]
					}
				})
			})), e
		}, n.export = function(t, e, n) {
			Object.defineProperty(t, e, {
				enumerable: !0,
				get: n
			})
		}
	}, {}],
	"2Abxf": [function(t, e, n) {
		t("@parcel/transformer-js/src/esmodule-helpers.js").defineInteropFlag(n), n.default = function({
			target: t,
			emits: e,
			clientWidth: n,
			clientHeight: i,
			marginBottom: r,
			marginTop: a,
			antiOverlap: o
		}) {
			const s = e.filter((e => e.mode === t.mode && e.top <= i - r)).sort(((t, e) => t.top - e.top));
			if (0 === s.length) return a;
			s.unshift({
				top: 0,
				left: 0,
				right: 0,
				height: a,
				width: n,
				speed: 0,
				distance: n
			}), s.push({
				top: i - r,
				left: 0,
				right: 0,
				height: r,
				width: n,
				speed: 0,
				distance: n
			});
			for (let e = 1; e < s.length; e += 1) {
				const n = s[e],
					i = s[e - 1],
					r = i.top + i.height;
				if (n.top - r >= t.height) return r
			}
			const l = [];
			for (let t = 1; t < s.length - 1; t += 1) {
				const e = s[t];
				if (l.length) {
					const t = l[l.length - 1];
					t[0].top === e.top ? t.push(e) : l.push([e])
				} else l.push([e])
			}
			if (!o) {
				switch (t.mode) {
					case 0:
						l.sort(((t, e) => {
							const n = Math.min(...e.map((t => t.right))),
								i = Math.min(...t.map((t => t.right)));
							return n * e.length - i * t.length
						}));
						break;
					case 1:
						l.sort(((t, e) => {
							const n = Math.max(...e.map((t => t.width)));
							return Math.max(...t.map((t => t.width))) * t.length - n * e.length
						}))
				}
				return l[0][0].top
			}
			switch (t.mode) {
				case 0: {
					const e = l.find((e => e.every((e => {
						if (n < e.distance) return !1;
						if (t.speed < e.speed) return !0;
						return e.right / (t.speed - e.speed) > e.time
					}))));
					return e && e[0] ? e[0].top : void 0
				}
				case 1:
					return
			}
		}
	}, {
		"@parcel/transformer-js/src/esmodule-helpers.js": "9v6Cv"
	}],
	anHwN: [function(t, e, n) {
		e.exports = "data:application/javascript,function%20getDanmuTop%28%7Btarget%3At%2Cemits%3Ae%2CclientWidth%3An%2CclientHeight%3Ai%2CmarginBottom%3As%2CmarginTop%3Ah%2CantiOverlap%3Ao%7D%29%7Bconst%20r%3De.filter%28%28e%3D%3Ee.mode%3D%3D%3Dt.mode%26%26e.top%3C%3Di-s%29%29.sort%28%28%28t%2Ce%29%3D%3Et.top-e.top%29%29%3Bif%280%3D%3D%3Dr.length%29return%20h%3Br.unshift%28%7Btop%3A0%2Cleft%3A0%2Cright%3A0%2Cheight%3Ah%2Cwidth%3An%2Cspeed%3A0%2Cdistance%3An%7D%29%2Cr.push%28%7Btop%3Ai-s%2Cleft%3A0%2Cright%3A0%2Cheight%3As%2Cwidth%3An%2Cspeed%3A0%2Cdistance%3An%7D%29%3Bfor%28let%20e%3D1%3Be%3Cr.length%3Be%2B%3D1%29%7Bconst%20n%3Dr%5Be%5D%2Ci%3Dr%5Be-1%5D%2Cs%3Di.top%2Bi.height%3Bif%28n.top-s%3E%3Dt.height%29return%20s%7Dconst%20p%3D%5B%5D%3Bfor%28let%20t%3D1%3Bt%3Cr.length-1%3Bt%2B%3D1%29%7Bconst%20e%3Dr%5Bt%5D%3Bif%28p.length%29%7Bconst%20t%3Dp%5Bp.length-1%5D%3Bt%5B0%5D.top%3D%3D%3De.top%3Ft.push%28e%29%3Ap.push%28%5Be%5D%29%7Delse%20p.push%28%5Be%5D%29%7Dif%28%21o%29%7Bswitch%28t.mode%29%7Bcase%200%3Ap.sort%28%28%28t%2Ce%29%3D%3E%7Bconst%20n%3DMath.min%28...e.map%28%28t%3D%3Et.right%29%29%29%2Ci%3DMath.min%28...t.map%28%28t%3D%3Et.right%29%29%29%3Breturn%20n%2ae.length-i%2at.length%7D%29%29%3Bbreak%3Bcase%201%3Ap.sort%28%28%28t%2Ce%29%3D%3E%7Bconst%20n%3DMath.max%28...e.map%28%28t%3D%3Et.width%29%29%29%3Breturn%20Math.max%28...t.map%28%28t%3D%3Et.width%29%29%29%2at.length-n%2ae.length%7D%29%29%7Dreturn%20p%5B0%5D%5B0%5D.top%7Dswitch%28t.mode%29%7Bcase%200%3A%7Bconst%20e%3Dp.find%28%28e%3D%3Ee.every%28%28e%3D%3E%7Bif%28n%3Ce.distance%29return%211%3Bif%28t.speed%3Ce.speed%29return%210%3Breturn%20e.right%2F%28t.speed-e.speed%29%3Ee.time%7D%29%29%29%29%3Breturn%20e%26%26e%5B0%5D%3Fe%5B0%5D.top%3Avoid%200%7Dcase%201%3Areturn%7D%7Donmessage%3Dt%3D%3E%7Bconst%7Bdata%3Ae%7D%3Dt%2Cn%3DgetDanmuTop%28e%29%3Bself.postMessage%28%7Btop%3An%2Cid%3Ae.id%7D%29%7D%3B"
	}, {}],
	jAkJm: [function(t, e, n) {
		var i = t("@parcel/transformer-js/src/esmodule-helpers.js");
		i.defineInteropFlag(n);
		var r = t("bundle-text:./style.less"),
			a = i.interopDefault(r),
			o = t("bundle-text:./img/danmu-on.svg"),
			s = i.interopDefault(o),
			l = t("bundle-text:./img/danmu-off.svg"),
			u = i.interopDefault(l),
			d = t("bundle-text:./img/danmu-config.svg"),
			m = i.interopDefault(d),
			p = t("bundle-text:./img/danmu-style.svg"),
			c = i.interopDefault(p);
		if (n.default = function(t, e) {
				const {
					option: n
				} = e, {
					template: {
						$controlsCenter: i,
						$player: r
					},
					constructor: {
						utils: {
							removeClass: a,
							addClass: o,
							append: l,
							setStyle: d,
							tooltip: p,
							query: h,
							inverseClass: f
						}
					}
				} = t;

				function g(t, e) {
					const n = document.createElement("i");
					return l(n, t), o(n, "art-icon"), o(n, `art-icon-${e}`), n
				}
				const k = g(s.default, "danmu-on"),
					y = g(u.default, "danmu-off"),
					v = g(m.default, "danmu-config"),
					b = g(c.default, "danmu-style");
				! function() {
					const s = ["#FE0302", "#FF7204", "#FFAA02", "#FFD302", "#FFFF00", "#A0EE00", "#00CD00", "#019899", "#4266BE", "#89D5FF", "#CC0273", "#222222", "#9B9B9B", "#FFFFFF"].map((t => `<div class="art-danmuku-style-panel-color${n.color === t ? "art-current" : ""}"data-color="${t}"style="background-color:${t}"></div>`)),
						u = l(i, `<div class="art-danmuku-emitter" style="max-width: ${n.maxWidth ? `${n.maxWidth}px` : " 100%"}"><div class="art-danmuku-left"></div></div>`),
						m = h(".art-danmuku-style", u),
						p = h(".art-danmuku-input", u),
						c = h(".art-danmuku-send", u),
						g = h(".art-danmuku-style-panel-inner", u),
						k = h(".art-danmuku-style-panel-modes", u),
						y = h(".art-danmuku-style-panel-colors", u),
						v = n.mount || l(r, '<div class="art-layer-danmuku-emitter"></div>');
					t.option.backdrop && o(g, "art-backdrop-filter"), n.theme && o(u, `art-danmuku-theme-${n.theme}`);
					let x = null,
						w = n.mode,
						D = n.color;

					function $(t) {
						t <= 0 ? (x = null, c.innerText = "发送", a(c, "art-disabled")) : (c.innerText = t, x = setTimeout((() => $(t - 1)), 1e3))
					}

					function B() {
						const i = {
							mode: w,
							color: D,
							border: !0,
							text: p.value.trim()
						};
						null === x && n.beforeEmit(i) && (p.value = "", e.emit(i), o(c, "art-disabled"), $(n.lockTime), t.emit("artplayerPluginDanmuku:emit", i))
					}

					function C() {
						i.clientWidth < n.minWidth ? (l(v, u), d(v, "display", "flex"), o(u, "art-danmuku-mount"), n.mount || d(r, "marginBottom", "40px")) : (l(i, u), d(v, "display", "none"), a(u, "art-danmuku-mount"), n.mount || d(r, "marginBottom", null))
					}
					l(m, b), t.proxy(c, "click", B), t.proxy(p, "keypress", (t => {
						"Enter" === t.key && (t.preventDefault(), B())
					})), t.proxy(k, "click", (t => {
						const {
							dataset: e
						} = t.target;
						e.mode && (w = Number(e.mode), f(t.target, "art-current"))
					})), t.proxy(y, "click", (t => {
						const {
							dataset: e
						} = t.target;
						e.color && (D = e.color, f(t.target, "art-current"))
					})), C(), t.on("resize", C), t.on("destroy", (() => {
						n.mount && u.parentElement === n.mount && n.mount.removeChild(u)
					}))
				}(), t.controls.add({
					position: "right",
					name: "danmuku",
					click: function() {
						e.isHide ? (e.show(), t.notice.show = "弹幕显示", d(k, "display", null), d(y, "display", "none")) : (e.hide(), t.notice.show = "弹幕隐藏", d(k, "display", "none"), d(y, "display", null))
					},
					mounted(t) {
						l(t, k), l(t, y), p(t, "弹幕开关"), d(y, "display", "none")
					}
				}), t.setting.add({
					name: "danmuku",
					html: "弹幕设置",
					tooltip: "更多",
					icon: v,
					selector: [{
						width: 200,
						html: "播放速度",
						icon: "",
						tooltip: "适中",
						selector: [{
							html: "极慢",
							time: 10
						}, {
							html: "较慢",
							time: 7.5
						}, {
							default: !0,
							html: "适中",
							time: 5
						}, {
							html: "较快",
							time: 2.5
						}, {
							html: "极快",
							time: 1
						}],
						onSelect: function(t) {
							return e.config({
								speed: t.time
							}), t.html
						}
					}, {
						width: 200,
						html: "字体大小",
						icon: "",
						tooltip: "适中",
						selector: [{
							html: "极小",
							fontSize: "1.5%"
						}, {
							html: "较小",
							fontSize: "2%"
						}, {
							default: !0,
							html: "适中",
							fontSize: "2.5%"
						}, {
							html: "较大",
							fontSize: "5%"
						}, {
							html: "极大",
							fontSize: "8%"
						}],
						onSelect: function(t) {
							return e.config({
								fontSize: t.fontSize
							}), t.html
						}
					}, {
						width: 200,
						html: "不透明度",
						icon: "",
						tooltip: "100%",
						selector: [{
							default: !0,
							opacity: 1,
							html: "100%"
						}, {
							opacity: .75,
							html: "75%"
						}, {
							opacity: .50,
							html: "50%"
						}, {
							opacity: .25,
							html: "25%"
						}, {
							opacity: 0,
							html: "0%"
						}],
						onSelect: function(t) {
							return e.config({
								opacity: t.opacity
							}), t.html
						}
					}, {
						width: 200,
						html: "显示范围",
						icon: "",
						tooltip: "1/4",
						selector: [{
							default: !0,
							html: "1/4",
							margin: [10, "75%"]
						}, {
							html: "半屏",
							margin: [10, "50%"]
						}, {
							html: "3/4",
							margin: [10, "25%"]
						}, {
							html: "满屏",
							margin: [10, 10]
						}],
						onSelect: function(t) {
							return e.config({
								margin: t.margin
							}), t.html
						}
					}, {
						html: "弹幕防重叠",
						icon: "",
						tooltip: n.antiOverlap ? "开启" : "关闭",
						switch: n.antiOverlap,
						onSwitch: t => (e.config({
							antiOverlap: !t.switch
						}), t.tooltip = t.switch ? "关闭" : "开启", !t.switch)
					}, {
						html: "同步视频速度",
						icon: "",
						tooltip: n.synchronousPlayback ? "开启" : "关闭",
						switch: n.synchronousPlayback,
						onSwitch: t => (e.config({
							synchronousPlayback: !t.switch
						}), t.tooltip = t.switch ? "关闭" : "开启", !t.switch)
					}]
				})
			}, "undefined" != typeof document && !document.getElementById("artplayer-plugin-danmuku")) {
			const t = document.createElement("style");
			t.id = "artplayer-plugin-danmuku", t.textContent = a.default, document.head.appendChild(t)
		}
	}, {
		"bundle-text:./style.less": "chNhY",
		"bundle-text:./img/danmu-on.svg": "j5M2a",
		"bundle-text:./img/danmu-off.svg": "d9WLf",
		"bundle-text:./img/danmu-config.svg": "8Y3Ij",
		"bundle-text:./img/danmu-style.svg": "hltwt",
		"@parcel/transformer-js/src/esmodule-helpers.js": "9v6Cv"
	}],
	chNhY: [function(t, e, n) {
		e.exports = '.art-danmuku-emitter{height:32px;width:100%;max-width:100%;color:#fff;-webkit-tap-highlight-color:#0000;touch-action:manipulation;-ms-high-contrast-adjust:none;background-color:#ffffff4d;border-radius:3px;font-family:Roboto,Arial,Helvetica,sans-serif;font-size:12px;line-height:1;display:flex;position:relative}.art-danmuku-emitter *,.art-danmuku-emitter :before,.art-danmuku-emitter :after{box-sizing:border-box;margin:0;padding:0}.art-danmuku-emitter .art-icon{justify-content:center;align-items:center;line-height:1.5;display:inline-flex}.art-danmuku-emitter .art-icon svg{fill:#fff}@supports ((-webkit-backdrop-filter: initial) or (backdrop-filter: initial)){.art-danmuku-emitter .art-backdrop-filter{-webkit-backdrop-filter:saturate(180%)blur(20px);backdrop-filter:saturate(180%)blur(20px);background-color:#000000b3!important}}.art-danmuku-emitter .art-danmuku-left{border-radius:3px 0 0 3px;flex:1;display:flex}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style{width:32px;justify-content:center;align-items:center;display:flex;position:relative}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel{z-index:999;width:200px;padding-bottom:10px;display:none;position:absolute;bottom:30px;left:-85px}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner{background-color:#000000e6;border-radius:3px;flex-direction:column;padding:10px 10px 0;display:flex}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner .art-danmuku-style-panel-title{margin-bottom:10px;font-size:13px}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner .art-danmuku-style-panel-modes{justify-content:space-between;margin-bottom:15px;display:flex}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner .art-danmuku-style-panel-modes .art-danmuku-style-panel-mode{width:47%;cursor:pointer;color:#fff;border:1px solid #fff;justify-content:center;padding:5px 0;display:flex}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner .art-danmuku-style-panel-modes .art-danmuku-style-panel-mode.art-current{background-color:#ff0000d5;border:1px solid #fff}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner .art-danmuku-style-panel-colors{flex-wrap:wrap;justify-content:space-between;gap:5px;margin-bottom:10px;display:flex}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner .art-danmuku-style-panel-colors .art-danmuku-style-panel-color{cursor:pointer;width:20px;height:20px;border:1px solid #fff}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner .art-danmuku-style-panel-colors .art-danmuku-style-panel-color.art-current{position:relative;box-shadow:0 0 2px #fff}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel .art-danmuku-style-panel-inner .art-danmuku-style-panel-colors .art-danmuku-style-panel-color.art-current:before{content:"";width:100%;height:100%;border:2px solid #000;position:absolute;inset:0}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style:hover .art-danmuku-style-panel{display:flex}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-icon{opacity:.75;cursor:pointer}.art-danmuku-emitter .art-danmuku-left .art-danmuku-style .art-icon:hover{opacity:1}.art-danmuku-emitter .art-danmuku-left .art-danmuku-input{width:100%;color:#fff;background-color:#0000;border:none;outline:none;flex:1;padding:0 10px 0 0;display:flex}.art-danmuku-emitter .art-danmuku-left .art-danmuku-input::placeholder,.art-danmuku-emitter .art-danmuku-left .art-danmuku-input::-webkit-input-placeholder{color:#ffffff80}.art-danmuku-emitter .art-danmuku-send{width:50px;cursor:pointer;background-color:#ff0000d5;border-radius:0 3px 3px 0;justify-content:center;align-items:center;display:flex}.art-danmuku-emitter .art-danmuku-send:hover{background-color:#ff0000}.art-danmuku-emitter .art-danmuku-send.art-disabled{opacity:.5;pointer-events:none}.art-danmuku-emitter.art-danmuku-mount{height:34px;max-width:100%!important}.art-danmuku-emitter.art-danmuku-mount .art-danmuku-left .art-danmuku-style .art-danmuku-style-panel{left:0}.art-danmuku-emitter.art-danmuku-mount .art-danmuku-send{width:60px}.art-danmuku-emitter.art-danmuku-mount.art-danmuku-theme-light .art-danmuku-left{background:#f4f4f4;border:1px solid #dadada}.art-danmuku-emitter.art-danmuku-mount.art-danmuku-theme-light .art-danmuku-left .art-danmuku-style .art-icon svg{fill:#666}.art-danmuku-emitter.art-danmuku-mount.art-danmuku-theme-light .art-danmuku-left .art-danmuku-input{color:#000}.art-danmuku-emitter.art-danmuku-mount.art-danmuku-theme-light .art-danmuku-left .art-danmuku-input::placeholder,.art-danmuku-emitter.art-danmuku-mount.art-danmuku-theme-light .art-danmuku-left .art-danmuku-input::-webkit-input-placeholder{color:#00000080}.art-layer-danmuku-emitter{z-index:99;width:100%;position:absolute;bottom:-40px;left:0;right:0}'
	}, {}],
	j5M2a: [function(t, e, n) {
		e.exports = '<svg viewBox="0 0 1152 1024" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M311.467 661.333c0 4.267-4.267 8.534-8.534 12.8 0 4.267 0 4.267-4.266 8.534h-12.8c-4.267 0-8.534-4.267-17.067-8.534-8.533-8.533-17.067-8.533-25.6-8.533-8.533 0-12.8 4.267-17.067 12.8-4.266 12.8-8.533 21.333-4.266 29.867 4.266 8.533 12.8 17.066 25.6 21.333 17.066 8.533 34.133 17.067 46.933 17.067 12.8 0 21.333-4.267 34.133-8.534 8.534-4.266 17.067-17.066 25.6-29.866 8.534-12.8 12.8-34.134 17.067-55.467 4.267-21.333 4.267-51.2 4.267-85.333 0-12.8 0-21.334-4.267-29.867 0-8.533-4.267-12.8-8.533-17.067-4.267-4.266-8.534-8.533-12.8-8.533-4.267 0-12.8-4.267-21.334-4.267h-55.466s-4.267-4.266 0-8.533l4.266-38.4c0-4.267 0-8.533 4.267-8.533h46.933c17.067 0 25.6-4.267 34.134-12.8 8.533-8.534 12.8-21.334 12.8-42.667v-72.533c0-17.067-4.267-34.134-8.534-42.667-12.8-12.8-25.6-17.067-42.666-17.067H243.2c-8.533 0-17.067 0-21.333 4.267-4.267 8.533-4.267 12.8-4.267 25.6 0 8.533 0 17.067 4.267 21.333 4.266 4.267 12.8 8.534 21.333 8.534h64c4.267 0 8.533 0 8.533 4.266v34.134c0 8.533 0 12.8-4.266 12.8 0 0-4.267 4.266-8.534 4.266H268.8c-8.533 0-12.8 0-21.333 4.267-4.267 0-8.534 4.267-8.534 4.267-4.266 4.266-8.533 12.8-8.533 17.066 0 8.534-4.267 17.067-4.267 25.6l-8.533 72.534v29.866c0 8.534 4.267 12.8 8.533 17.067 4.267 4.267 8.534 4.267 17.067 8.533h68.267c4.266 0 8.533 0 8.533 4.267s4.267 8.533 4.267 17.067c0 21.333 0 42.666-4.267 55.466 0 8.534-4.267 21.334-8.533 25.6zM896 486.4c-93.867 0-174.933 51.2-217.6 123.733H571.733V576H640c21.333 0 34.133-4.267 42.667-12.8 8.533-8.533 12.8-21.333 12.8-42.667V358.4c0-21.333-4.267-34.133-12.8-42.667-8.534-8.533-21.334-12.8-42.667-12.8 0-4.266 4.267-4.266 4.267-8.533-4.267 0-4.267-4.267-4.267-4.267 4.267-12.8 8.533-21.333 4.267-25.6 0-8.533-4.267-12.8-12.8-21.333-8.534-4.267-17.067-4.267-21.334-4.267-8.533 4.267-12.8 8.534-21.333 21.334-4.267 8.533-8.533 12.8-12.8 21.333-4.267 8.533-8.533 12.8-12.8 21.333H512c-4.267-8.533-8.533-17.066-8.533-21.333-4.267-8.533-8.534-12.8-12.8-21.333-4.267-12.8-12.8-17.067-21.334-17.067s-17.066 0-25.6 8.533c-8.533 8.534-12.8 12.8-12.8 21.334s0 17.066 8.534 25.6l4.266 4.266L448 307.2c-17.067 0-29.867 4.267-38.4 12.8-8.533 4.267-12.8 21.333-12.8 38.4v157.867c0 21.333 4.267 34.133 12.8 42.666 8.533 8.534 21.333 12.8 42.667 12.8H512v34.134h-98.133c-12.8 0-21.334 0-25.6 4.266-4.267 4.267-8.534 8.534-8.534 21.334v17.066c0 4.267 4.267 8.534 4.267 8.534 4.267 0 4.267 4.266 8.533 4.266H512V716.8c0 12.8 4.267 21.333 8.533 25.6 4.267 4.267 12.8 8.533 21.334 8.533 12.8 0 21.333-4.266 25.6-8.533 4.266-4.267 4.266-12.8 4.266-25.6v-55.467H652.8c-8.533 25.6-12.8 51.2-12.8 76.8 0 140.8 115.2 256 256 256s256-115.2 256-256S1036.8 486.4 896 486.4zm-328.533-128h55.466c4.267 0 4.267 0 4.267 4.267V409.6h-59.733v-51.2zm0 102.4H627.2V512h-55.467v-51.2zM512 516.267h-55.467v-51.2H512v51.2zm0-102.4h-59.733V362.667H512v51.2zm384 499.2c-93.867 0-170.667-76.8-170.667-170.667S802.133 571.733 896 571.733s170.667 76.8 170.667 170.667S989.867 913.067 896 913.067z"/><path fill="#fff" d="M951.467 669.867 878.933 742.4l-29.866-25.6C832 699.733 806.4 704 789.333 721.067c-17.066 17.066-12.8 42.666 4.267 59.733l59.733 51.2c8.534 8.533 17.067 8.533 29.867 8.533s21.333-4.266 29.867-12.8l102.4-102.4c17.066-17.066 17.066-42.666 0-59.733-21.334-12.8-46.934-12.8-64 4.267zm-371.2 209.066H213.333c-72.533 0-128-55.466-128-119.466V230.4c0-64 55.467-119.467 128-119.467h512c72.534 0 128 55.467 128 119.467v140.8c0 25.6 17.067 42.667 42.667 42.667s42.667-17.067 42.667-42.667V230.4c0-115.2-93.867-204.8-213.334-204.8h-512C93.867 25.6 0 119.467 0 230.4v529.067c0 115.2 93.867 204.8 213.333 204.8h366.934c25.6 0 42.666-17.067 42.666-42.667s-21.333-42.667-42.666-42.667z"/></svg>'
	}, {}],
	d9WLf: [function(t, e, n) {
		e.exports = '<svg viewBox="0 0 1152 1024" width="22" height="22" xmlns="http://www.w3.org/2000/svg"><path fill="#fff" d="M311.296 661.504c0 4.096-4.096 8.704-8.704 12.8 0 4.096 0 4.096-4.096 8.704h-12.8c-4.096 0-8.704-4.096-16.896-8.704-8.704-8.704-16.896-8.704-25.6-8.704s-12.8 4.096-16.896 12.8c-4.096 12.8-8.704 21.504-4.096 29.696 4.096 8.704 12.8 16.896 25.6 21.504 16.896 8.704 34.304 16.896 47.104 16.896 12.8 0 21.504-4.096 34.304-8.704 8.704-4.096 16.896-16.896 25.6-29.696s12.8-34.304 16.896-55.296c4.096-21.504 4.096-51.2 4.096-85.504 0-12.8 0-21.504-4.096-29.696 0-8.704-4.096-12.8-8.704-16.896-4.096-4.096-8.704-8.704-12.8-8.704s-12.8-4.096-21.504-4.096h-55.808s-4.096-4.096 0-8.704l4.096-38.4c0-4.096 0-8.704 4.096-8.704h47.104c16.896 0 25.6-4.096 34.304-12.8s12.8-21.504 12.8-42.496v-72.704c0-16.896-4.096-34.304-8.704-42.496-12.8-12.8-25.6-16.896-42.496-16.896H243.2c-8.704 0-16.896 0-21.504 4.096-4.096 8.704-4.096 12.8-4.096 25.6 0 8.704 0 16.896 4.096 21.504 4.096 4.096 12.8 8.704 21.504 8.704h64c4.096 0 8.704 0 8.704 4.096v34.304c0 8.704 0 12.8-4.096 12.8 0 0-4.096 4.096-8.704 4.096H268.8c-8.704 0-12.8 0-21.504 4.096-4.096 0-8.704 4.096-8.704 4.096-4.096 4.096-8.704 12.8-8.704 16.896 0 8.704-4.096 16.896-4.096 25.6l-8.704 72.704v29.696c0 8.704 4.096 12.8 8.704 16.896s8.704 4.096 16.896 8.704h68.096c4.096 0 8.704 0 8.704 4.096s4.096 8.704 4.096 16.896c0 21.504 0 42.496-4.096 55.296.512 9.216-3.584 22.016-8.192 26.624zM896 486.4c-93.696 0-175.104 51.2-217.6 123.904H571.904V576H640c21.504 0 34.304-4.096 42.496-12.8 8.704-8.704 12.8-21.504 12.8-42.496V358.4c0-21.504-4.096-34.304-12.8-42.496-8.704-8.704-21.504-12.8-42.496-12.8 0-4.096 4.096-4.096 4.096-8.704-4.096 0-4.096-4.096-4.096-4.096 4.096-12.8 8.704-21.504 4.096-25.6 0-8.704-4.096-12.8-12.8-21.504-8.704-4.096-16.896-4.096-21.504-4.096-8.704 4.096-12.8 8.704-21.504 21.504-4.096 8.704-8.704 12.8-12.8 21.504s-8.704 12.8-12.8 21.504h-51.2c-4.096-8.704-8.704-16.896-8.704-21.504-4.096-8.704-8.704-12.8-12.8-21.504-4.096-12.8-12.8-16.896-21.504-16.896s-16.896 0-25.6 8.704-12.8 12.8-12.8 21.504 0 16.896 8.704 25.6l4.096 4.096 4.096 4.096c-16.896 0-29.696 4.096-38.4 12.8-8.704 4.096-12.8 21.504-12.8 38.4v157.696c0 21.504 4.096 34.304 12.8 42.496 8.704 8.704 21.504 12.8 42.496 12.8H512v34.304h-98.304c-12.8 0-21.504 0-25.6 4.096s-8.704 8.704-8.704 21.504v16.896c0 4.096 4.096 8.704 4.096 8.704 4.096 0 4.096 4.096 8.704 4.096H512V716.8c0 12.8 4.096 21.504 8.704 25.6 4.096 4.096 12.8 8.704 21.504 8.704 12.8 0 21.504-4.096 25.6-8.704 4.096-4.096 4.096-12.8 4.096-25.6v-55.296H652.8c-8.704 25.6-12.8 51.2-12.8 76.8 0 140.8 115.2 256 256 256s256-115.2 256-256S1036.8 486.4 896 486.4zm-328.704-128h55.296c4.096 0 4.096 0 4.096 4.096V409.6h-59.904v-51.2zm0 102.4H627.2V512h-55.296v-51.2h-4.608zM512 516.096h-55.296v-51.2H512v51.2zm0-102.4h-59.904v-51.2H512v51.2zm384 499.2c-93.696 0-170.496-76.8-170.496-170.496S802.304 571.904 896 571.904s170.496 76.8 170.496 170.496S989.696 912.896 896 912.896z"/><path fill="#fff" d="M580.096 879.104H213.504c-72.704 0-128-55.296-128-119.296V230.4c0-64 55.296-119.296 128-119.296h512c72.704 0 128 55.296 128 119.296v140.8c0 25.6 16.896 42.496 42.496 42.496s42.496-16.896 42.496-42.496V230.4c0-115.2-93.696-204.8-213.504-204.8h-512C93.696 25.6 0 119.296 0 230.4v528.896c0 115.2 93.696 204.8 213.504 204.8h367.104c25.6 0 42.496-16.896 42.496-42.496s-21.504-42.496-43.008-42.496zm171.52 10.752c-15.36-15.36-15.36-40.96 0-56.32l237.568-237.568c15.36-15.36 40.96-15.36 56.32 0s15.36 40.96 0 56.32L807.936 889.856c-15.36 15.36-40.448 15.36-56.32 0z"/></svg>'
	}, {}],
	"8Y3Ij": [function(t, e, n) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"><path d="M16.5 8c1.289 0 2.49.375 3.5 1.022V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7.022A6.5 6.5 0 0 1 16.5 8zM7 13H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2zm2-4H5a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2z"/><path d="m20.587 13.696-.787-.131a3.503 3.503 0 0 0-.593-1.051l.301-.804a.46.46 0 0 0-.21-.56l-1.005-.581a.52.52 0 0 0-.656.113l-.499.607a3.53 3.53 0 0 0-1.276 0l-.499-.607a.52.52 0 0 0-.656-.113l-1.005.581a.46.46 0 0 0-.21.56l.301.804c-.254.31-.456.665-.593 1.051l-.787.131a.48.48 0 0 0-.413.465v1.209a.48.48 0 0 0 .413.465l.811.135c.144.382.353.733.614 1.038l-.292.78a.46.46 0 0 0 .21.56l1.005.581a.52.52 0 0 0 .656-.113l.515-.626a3.549 3.549 0 0 0 1.136 0l.515.626a.52.52 0 0 0 .656.113l1.005-.581a.46.46 0 0 0 .21-.56l-.292-.78c.261-.305.47-.656.614-1.038l.811-.135A.48.48 0 0 0 21 15.37v-1.209a.48.48 0 0 0-.413-.465zM16.5 16.057a1.29 1.29 0 1 1 .002-2.582 1.29 1.29 0 0 1-.002 2.582z"/></svg>'
	}, {}],
	hltwt: [function(t, e, n) {
		e.exports = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width="24" height="24"><path d="M17 16H5c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zM6.96 15c.39 0 .74-.24.89-.6l.65-1.6h5l.66 1.6c.15.36.5.6.89.6.69 0 1.15-.71.88-1.34l-3.88-8.97C11.87 4.27 11.46 4 11 4s-.87.27-1.05.69l-3.88 8.97c-.27.63.2 1.34.89 1.34zM11 5.98 12.87 11H9.13L11 5.98z"/></svg>'
	}, {}]
}, ["E13ST"], "E13ST");