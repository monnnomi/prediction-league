var PLWallet = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // node_modules/viem/_esm/errors/version.js
  var version;
  var init_version = __esm({
    "node_modules/viem/_esm/errors/version.js"() {
      version = "2.47.6";
    }
  });

  // node_modules/viem/_esm/errors/base.js
  function walk(err, fn) {
    if (fn?.(err))
      return err;
    if (err && typeof err === "object" && "cause" in err && err.cause !== void 0)
      return walk(err.cause, fn);
    return fn ? null : err;
  }
  var errorConfig, BaseError;
  var init_base = __esm({
    "node_modules/viem/_esm/errors/base.js"() {
      init_version();
      errorConfig = {
        getDocsUrl: ({ docsBaseUrl, docsPath = "", docsSlug }) => docsPath ? `${docsBaseUrl ?? "https://viem.sh"}${docsPath}${docsSlug ? `#${docsSlug}` : ""}` : void 0,
        version: `viem@${version}`
      };
      BaseError = class _BaseError extends Error {
        constructor(shortMessage, args = {}) {
          const details = (() => {
            if (args.cause instanceof _BaseError)
              return args.cause.details;
            if (args.cause?.message)
              return args.cause.message;
            return args.details;
          })();
          const docsPath = (() => {
            if (args.cause instanceof _BaseError)
              return args.cause.docsPath || args.docsPath;
            return args.docsPath;
          })();
          const docsUrl = errorConfig.getDocsUrl?.({ ...args, docsPath });
          const message = [
            shortMessage || "An error occurred.",
            "",
            ...args.metaMessages ? [...args.metaMessages, ""] : [],
            ...docsUrl ? [`Docs: ${docsUrl}`] : [],
            ...details ? [`Details: ${details}`] : [],
            ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []
          ].join("\n");
          super(message, args.cause ? { cause: args.cause } : void 0);
          Object.defineProperty(this, "details", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "docsPath", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "metaMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "shortMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "version", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "BaseError"
          });
          this.details = details;
          this.docsPath = docsPath;
          this.metaMessages = args.metaMessages;
          this.name = args.name ?? this.name;
          this.shortMessage = shortMessage;
          this.version = version;
        }
        walk(fn) {
          return walk(this, fn);
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/encoding.js
  var IntegerOutOfRangeError, SizeOverflowError;
  var init_encoding = __esm({
    "node_modules/viem/_esm/errors/encoding.js"() {
      init_base();
      IntegerOutOfRangeError = class extends BaseError {
        constructor({ max, min, signed, size: size4, value }) {
          super(`Number "${value}" is not in safe ${size4 ? `${size4 * 8}-bit ${signed ? "signed" : "unsigned"} ` : ""}integer range ${max ? `(${min} to ${max})` : `(above ${min})`}`, { name: "IntegerOutOfRangeError" });
        }
      };
      SizeOverflowError = class extends BaseError {
        constructor({ givenSize, maxSize }) {
          super(`Size cannot exceed ${maxSize} bytes. Given size: ${givenSize} bytes.`, { name: "SizeOverflowError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/data/isHex.js
  function isHex(value, { strict = true } = {}) {
    if (!value)
      return false;
    if (typeof value !== "string")
      return false;
    return strict ? /^0x[0-9a-fA-F]*$/.test(value) : value.startsWith("0x");
  }
  var init_isHex = __esm({
    "node_modules/viem/_esm/utils/data/isHex.js"() {
    }
  });

  // node_modules/viem/_esm/utils/data/size.js
  function size(value) {
    if (isHex(value, { strict: false }))
      return Math.ceil((value.length - 2) / 2);
    return value.length;
  }
  var init_size = __esm({
    "node_modules/viem/_esm/utils/data/size.js"() {
      init_isHex();
    }
  });

  // node_modules/viem/_esm/utils/data/trim.js
  function trim(hexOrBytes, { dir = "left" } = {}) {
    let data = typeof hexOrBytes === "string" ? hexOrBytes.replace("0x", "") : hexOrBytes;
    let sliceLength = 0;
    for (let i = 0; i < data.length - 1; i++) {
      if (data[dir === "left" ? i : data.length - i - 1].toString() === "0")
        sliceLength++;
      else
        break;
    }
    data = dir === "left" ? data.slice(sliceLength) : data.slice(0, data.length - sliceLength);
    if (typeof hexOrBytes === "string") {
      if (data.length === 1 && dir === "right")
        data = `${data}0`;
      return `0x${data.length % 2 === 1 ? `0${data}` : data}`;
    }
    return data;
  }
  var init_trim = __esm({
    "node_modules/viem/_esm/utils/data/trim.js"() {
    }
  });

  // node_modules/viem/_esm/errors/data.js
  var SliceOffsetOutOfBoundsError, SizeExceedsPaddingSizeError;
  var init_data = __esm({
    "node_modules/viem/_esm/errors/data.js"() {
      init_base();
      SliceOffsetOutOfBoundsError = class extends BaseError {
        constructor({ offset, position, size: size4 }) {
          super(`Slice ${position === "start" ? "starting" : "ending"} at offset "${offset}" is out-of-bounds (size: ${size4}).`, { name: "SliceOffsetOutOfBoundsError" });
        }
      };
      SizeExceedsPaddingSizeError = class extends BaseError {
        constructor({ size: size4, targetSize, type }) {
          super(`${type.charAt(0).toUpperCase()}${type.slice(1).toLowerCase()} size (${size4}) exceeds padding size (${targetSize}).`, { name: "SizeExceedsPaddingSizeError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/data/pad.js
  function pad(hexOrBytes, { dir, size: size4 = 32 } = {}) {
    if (typeof hexOrBytes === "string")
      return padHex(hexOrBytes, { dir, size: size4 });
    return padBytes(hexOrBytes, { dir, size: size4 });
  }
  function padHex(hex_, { dir, size: size4 = 32 } = {}) {
    if (size4 === null)
      return hex_;
    const hex = hex_.replace("0x", "");
    if (hex.length > size4 * 2)
      throw new SizeExceedsPaddingSizeError({
        size: Math.ceil(hex.length / 2),
        targetSize: size4,
        type: "hex"
      });
    return `0x${hex[dir === "right" ? "padEnd" : "padStart"](size4 * 2, "0")}`;
  }
  function padBytes(bytes, { dir, size: size4 = 32 } = {}) {
    if (size4 === null)
      return bytes;
    if (bytes.length > size4)
      throw new SizeExceedsPaddingSizeError({
        size: bytes.length,
        targetSize: size4,
        type: "bytes"
      });
    const paddedBytes = new Uint8Array(size4);
    for (let i = 0; i < size4; i++) {
      const padEnd = dir === "right";
      paddedBytes[padEnd ? i : size4 - i - 1] = bytes[padEnd ? i : bytes.length - i - 1];
    }
    return paddedBytes;
  }
  var init_pad = __esm({
    "node_modules/viem/_esm/utils/data/pad.js"() {
      init_data();
    }
  });

  // node_modules/viem/_esm/utils/encoding/toHex.js
  function toHex(value, opts = {}) {
    if (typeof value === "number" || typeof value === "bigint")
      return numberToHex(value, opts);
    if (typeof value === "string") {
      return stringToHex(value, opts);
    }
    if (typeof value === "boolean")
      return boolToHex(value, opts);
    return bytesToHex(value, opts);
  }
  function boolToHex(value, opts = {}) {
    const hex = `0x${Number(value)}`;
    if (typeof opts.size === "number") {
      assertSize(hex, { size: opts.size });
      return pad(hex, { size: opts.size });
    }
    return hex;
  }
  function bytesToHex(value, opts = {}) {
    let string = "";
    for (let i = 0; i < value.length; i++) {
      string += hexes[value[i]];
    }
    const hex = `0x${string}`;
    if (typeof opts.size === "number") {
      assertSize(hex, { size: opts.size });
      return pad(hex, { dir: "right", size: opts.size });
    }
    return hex;
  }
  function numberToHex(value_, opts = {}) {
    const { signed, size: size4 } = opts;
    const value = BigInt(value_);
    let maxValue;
    if (size4) {
      if (signed)
        maxValue = (1n << BigInt(size4) * 8n - 1n) - 1n;
      else
        maxValue = 2n ** (BigInt(size4) * 8n) - 1n;
    } else if (typeof value_ === "number") {
      maxValue = BigInt(Number.MAX_SAFE_INTEGER);
    }
    const minValue = typeof maxValue === "bigint" && signed ? -maxValue - 1n : 0;
    if (maxValue && value > maxValue || value < minValue) {
      const suffix = typeof value_ === "bigint" ? "n" : "";
      throw new IntegerOutOfRangeError({
        max: maxValue ? `${maxValue}${suffix}` : void 0,
        min: `${minValue}${suffix}`,
        signed,
        size: size4,
        value: `${value_}${suffix}`
      });
    }
    const hex = `0x${(signed && value < 0 ? (1n << BigInt(size4 * 8)) + BigInt(value) : value).toString(16)}`;
    if (size4)
      return pad(hex, { size: size4 });
    return hex;
  }
  function stringToHex(value_, opts = {}) {
    const value = encoder.encode(value_);
    return bytesToHex(value, opts);
  }
  var hexes, encoder;
  var init_toHex = __esm({
    "node_modules/viem/_esm/utils/encoding/toHex.js"() {
      init_encoding();
      init_pad();
      init_fromHex();
      hexes = /* @__PURE__ */ Array.from({ length: 256 }, (_v, i) => i.toString(16).padStart(2, "0"));
      encoder = /* @__PURE__ */ new TextEncoder();
    }
  });

  // node_modules/viem/_esm/utils/encoding/toBytes.js
  function toBytes(value, opts = {}) {
    if (typeof value === "number" || typeof value === "bigint")
      return numberToBytes(value, opts);
    if (typeof value === "boolean")
      return boolToBytes(value, opts);
    if (isHex(value))
      return hexToBytes(value, opts);
    return stringToBytes(value, opts);
  }
  function boolToBytes(value, opts = {}) {
    const bytes = new Uint8Array(1);
    bytes[0] = Number(value);
    if (typeof opts.size === "number") {
      assertSize(bytes, { size: opts.size });
      return pad(bytes, { size: opts.size });
    }
    return bytes;
  }
  function charCodeToBase16(char) {
    if (char >= charCodeMap.zero && char <= charCodeMap.nine)
      return char - charCodeMap.zero;
    if (char >= charCodeMap.A && char <= charCodeMap.F)
      return char - (charCodeMap.A - 10);
    if (char >= charCodeMap.a && char <= charCodeMap.f)
      return char - (charCodeMap.a - 10);
    return void 0;
  }
  function hexToBytes(hex_, opts = {}) {
    let hex = hex_;
    if (opts.size) {
      assertSize(hex, { size: opts.size });
      hex = pad(hex, { dir: "right", size: opts.size });
    }
    let hexString = hex.slice(2);
    if (hexString.length % 2)
      hexString = `0${hexString}`;
    const length = hexString.length / 2;
    const bytes = new Uint8Array(length);
    for (let index3 = 0, j = 0; index3 < length; index3++) {
      const nibbleLeft = charCodeToBase16(hexString.charCodeAt(j++));
      const nibbleRight = charCodeToBase16(hexString.charCodeAt(j++));
      if (nibbleLeft === void 0 || nibbleRight === void 0) {
        throw new BaseError(`Invalid byte sequence ("${hexString[j - 2]}${hexString[j - 1]}" in "${hexString}").`);
      }
      bytes[index3] = nibbleLeft * 16 + nibbleRight;
    }
    return bytes;
  }
  function numberToBytes(value, opts) {
    const hex = numberToHex(value, opts);
    return hexToBytes(hex);
  }
  function stringToBytes(value, opts = {}) {
    const bytes = encoder2.encode(value);
    if (typeof opts.size === "number") {
      assertSize(bytes, { size: opts.size });
      return pad(bytes, { dir: "right", size: opts.size });
    }
    return bytes;
  }
  var encoder2, charCodeMap;
  var init_toBytes = __esm({
    "node_modules/viem/_esm/utils/encoding/toBytes.js"() {
      init_base();
      init_isHex();
      init_pad();
      init_fromHex();
      init_toHex();
      encoder2 = /* @__PURE__ */ new TextEncoder();
      charCodeMap = {
        zero: 48,
        nine: 57,
        A: 65,
        F: 70,
        a: 97,
        f: 102
      };
    }
  });

  // node_modules/viem/_esm/utils/encoding/fromHex.js
  function assertSize(hexOrBytes, { size: size4 }) {
    if (size(hexOrBytes) > size4)
      throw new SizeOverflowError({
        givenSize: size(hexOrBytes),
        maxSize: size4
      });
  }
  function hexToBigInt(hex, opts = {}) {
    const { signed } = opts;
    if (opts.size)
      assertSize(hex, { size: opts.size });
    const value = BigInt(hex);
    if (!signed)
      return value;
    const size4 = (hex.length - 2) / 2;
    const max = (1n << BigInt(size4) * 8n - 1n) - 1n;
    if (value <= max)
      return value;
    return value - BigInt(`0x${"f".padStart(size4 * 2, "f")}`) - 1n;
  }
  function hexToNumber(hex, opts = {}) {
    const value = hexToBigInt(hex, opts);
    const number = Number(value);
    if (!Number.isSafeInteger(number))
      throw new IntegerOutOfRangeError({
        max: `${Number.MAX_SAFE_INTEGER}`,
        min: `${Number.MIN_SAFE_INTEGER}`,
        signed: opts.signed,
        size: opts.size,
        value: `${value}n`
      });
    return number;
  }
  var init_fromHex = __esm({
    "node_modules/viem/_esm/utils/encoding/fromHex.js"() {
      init_encoding();
      init_size();
    }
  });

  // node_modules/viem/_esm/utils/formatters/formatter.js
  function defineFormatter(type, format) {
    return ({ exclude, format: overrides }) => {
      return {
        exclude,
        format: (args, action) => {
          const formatted = format(args, action);
          if (exclude) {
            for (const key of exclude) {
              delete formatted[key];
            }
          }
          return {
            ...formatted,
            ...overrides(args, action)
          };
        },
        type
      };
    };
  }
  var init_formatter = __esm({
    "node_modules/viem/_esm/utils/formatters/formatter.js"() {
    }
  });

  // node_modules/viem/_esm/constants/number.js
  var maxInt8, maxInt16, maxInt24, maxInt32, maxInt40, maxInt48, maxInt56, maxInt64, maxInt72, maxInt80, maxInt88, maxInt96, maxInt104, maxInt112, maxInt120, maxInt128, maxInt136, maxInt144, maxInt152, maxInt160, maxInt168, maxInt176, maxInt184, maxInt192, maxInt200, maxInt208, maxInt216, maxInt224, maxInt232, maxInt240, maxInt248, maxInt256, minInt8, minInt16, minInt24, minInt32, minInt40, minInt48, minInt56, minInt64, minInt72, minInt80, minInt88, minInt96, minInt104, minInt112, minInt120, minInt128, minInt136, minInt144, minInt152, minInt160, minInt168, minInt176, minInt184, minInt192, minInt200, minInt208, minInt216, minInt224, minInt232, minInt240, minInt248, minInt256, maxUint8, maxUint16, maxUint24, maxUint32, maxUint40, maxUint48, maxUint56, maxUint64, maxUint72, maxUint80, maxUint88, maxUint96, maxUint104, maxUint112, maxUint120, maxUint128, maxUint136, maxUint144, maxUint152, maxUint160, maxUint168, maxUint176, maxUint184, maxUint192, maxUint200, maxUint208, maxUint216, maxUint224, maxUint232, maxUint240, maxUint248, maxUint256;
  var init_number = __esm({
    "node_modules/viem/_esm/constants/number.js"() {
      maxInt8 = 2n ** (8n - 1n) - 1n;
      maxInt16 = 2n ** (16n - 1n) - 1n;
      maxInt24 = 2n ** (24n - 1n) - 1n;
      maxInt32 = 2n ** (32n - 1n) - 1n;
      maxInt40 = 2n ** (40n - 1n) - 1n;
      maxInt48 = 2n ** (48n - 1n) - 1n;
      maxInt56 = 2n ** (56n - 1n) - 1n;
      maxInt64 = 2n ** (64n - 1n) - 1n;
      maxInt72 = 2n ** (72n - 1n) - 1n;
      maxInt80 = 2n ** (80n - 1n) - 1n;
      maxInt88 = 2n ** (88n - 1n) - 1n;
      maxInt96 = 2n ** (96n - 1n) - 1n;
      maxInt104 = 2n ** (104n - 1n) - 1n;
      maxInt112 = 2n ** (112n - 1n) - 1n;
      maxInt120 = 2n ** (120n - 1n) - 1n;
      maxInt128 = 2n ** (128n - 1n) - 1n;
      maxInt136 = 2n ** (136n - 1n) - 1n;
      maxInt144 = 2n ** (144n - 1n) - 1n;
      maxInt152 = 2n ** (152n - 1n) - 1n;
      maxInt160 = 2n ** (160n - 1n) - 1n;
      maxInt168 = 2n ** (168n - 1n) - 1n;
      maxInt176 = 2n ** (176n - 1n) - 1n;
      maxInt184 = 2n ** (184n - 1n) - 1n;
      maxInt192 = 2n ** (192n - 1n) - 1n;
      maxInt200 = 2n ** (200n - 1n) - 1n;
      maxInt208 = 2n ** (208n - 1n) - 1n;
      maxInt216 = 2n ** (216n - 1n) - 1n;
      maxInt224 = 2n ** (224n - 1n) - 1n;
      maxInt232 = 2n ** (232n - 1n) - 1n;
      maxInt240 = 2n ** (240n - 1n) - 1n;
      maxInt248 = 2n ** (248n - 1n) - 1n;
      maxInt256 = 2n ** (256n - 1n) - 1n;
      minInt8 = -(2n ** (8n - 1n));
      minInt16 = -(2n ** (16n - 1n));
      minInt24 = -(2n ** (24n - 1n));
      minInt32 = -(2n ** (32n - 1n));
      minInt40 = -(2n ** (40n - 1n));
      minInt48 = -(2n ** (48n - 1n));
      minInt56 = -(2n ** (56n - 1n));
      minInt64 = -(2n ** (64n - 1n));
      minInt72 = -(2n ** (72n - 1n));
      minInt80 = -(2n ** (80n - 1n));
      minInt88 = -(2n ** (88n - 1n));
      minInt96 = -(2n ** (96n - 1n));
      minInt104 = -(2n ** (104n - 1n));
      minInt112 = -(2n ** (112n - 1n));
      minInt120 = -(2n ** (120n - 1n));
      minInt128 = -(2n ** (128n - 1n));
      minInt136 = -(2n ** (136n - 1n));
      minInt144 = -(2n ** (144n - 1n));
      minInt152 = -(2n ** (152n - 1n));
      minInt160 = -(2n ** (160n - 1n));
      minInt168 = -(2n ** (168n - 1n));
      minInt176 = -(2n ** (176n - 1n));
      minInt184 = -(2n ** (184n - 1n));
      minInt192 = -(2n ** (192n - 1n));
      minInt200 = -(2n ** (200n - 1n));
      minInt208 = -(2n ** (208n - 1n));
      minInt216 = -(2n ** (216n - 1n));
      minInt224 = -(2n ** (224n - 1n));
      minInt232 = -(2n ** (232n - 1n));
      minInt240 = -(2n ** (240n - 1n));
      minInt248 = -(2n ** (248n - 1n));
      minInt256 = -(2n ** (256n - 1n));
      maxUint8 = 2n ** 8n - 1n;
      maxUint16 = 2n ** 16n - 1n;
      maxUint24 = 2n ** 24n - 1n;
      maxUint32 = 2n ** 32n - 1n;
      maxUint40 = 2n ** 40n - 1n;
      maxUint48 = 2n ** 48n - 1n;
      maxUint56 = 2n ** 56n - 1n;
      maxUint64 = 2n ** 64n - 1n;
      maxUint72 = 2n ** 72n - 1n;
      maxUint80 = 2n ** 80n - 1n;
      maxUint88 = 2n ** 88n - 1n;
      maxUint96 = 2n ** 96n - 1n;
      maxUint104 = 2n ** 104n - 1n;
      maxUint112 = 2n ** 112n - 1n;
      maxUint120 = 2n ** 120n - 1n;
      maxUint128 = 2n ** 128n - 1n;
      maxUint136 = 2n ** 136n - 1n;
      maxUint144 = 2n ** 144n - 1n;
      maxUint152 = 2n ** 152n - 1n;
      maxUint160 = 2n ** 160n - 1n;
      maxUint168 = 2n ** 168n - 1n;
      maxUint176 = 2n ** 176n - 1n;
      maxUint184 = 2n ** 184n - 1n;
      maxUint192 = 2n ** 192n - 1n;
      maxUint200 = 2n ** 200n - 1n;
      maxUint208 = 2n ** 208n - 1n;
      maxUint216 = 2n ** 216n - 1n;
      maxUint224 = 2n ** 224n - 1n;
      maxUint232 = 2n ** 232n - 1n;
      maxUint240 = 2n ** 240n - 1n;
      maxUint248 = 2n ** 248n - 1n;
      maxUint256 = 2n ** 256n - 1n;
    }
  });

  // node_modules/viem/_esm/utils/data/concat.js
  function concatHex(values) {
    return `0x${values.reduce((acc, x) => acc + x.replace("0x", ""), "")}`;
  }
  var init_concat = __esm({
    "node_modules/viem/_esm/utils/data/concat.js"() {
    }
  });

  // node_modules/viem/_esm/errors/cursor.js
  var NegativeOffsetError, PositionOutOfBoundsError, RecursiveReadLimitExceededError;
  var init_cursor = __esm({
    "node_modules/viem/_esm/errors/cursor.js"() {
      init_base();
      NegativeOffsetError = class extends BaseError {
        constructor({ offset }) {
          super(`Offset \`${offset}\` cannot be negative.`, {
            name: "NegativeOffsetError"
          });
        }
      };
      PositionOutOfBoundsError = class extends BaseError {
        constructor({ length, position }) {
          super(`Position \`${position}\` is out of bounds (\`0 < position < ${length}\`).`, { name: "PositionOutOfBoundsError" });
        }
      };
      RecursiveReadLimitExceededError = class extends BaseError {
        constructor({ count, limit }) {
          super(`Recursive read limit of \`${limit}\` exceeded (recursive read count: \`${count}\`).`, { name: "RecursiveReadLimitExceededError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/cursor.js
  function createCursor(bytes, { recursiveReadLimit = 8192 } = {}) {
    const cursor = Object.create(staticCursor);
    cursor.bytes = bytes;
    cursor.dataView = new DataView(bytes.buffer ?? bytes, bytes.byteOffset, bytes.byteLength);
    cursor.positionReadCount = /* @__PURE__ */ new Map();
    cursor.recursiveReadLimit = recursiveReadLimit;
    return cursor;
  }
  var staticCursor;
  var init_cursor2 = __esm({
    "node_modules/viem/_esm/utils/cursor.js"() {
      init_cursor();
      staticCursor = {
        bytes: new Uint8Array(),
        dataView: new DataView(new ArrayBuffer(0)),
        position: 0,
        positionReadCount: /* @__PURE__ */ new Map(),
        recursiveReadCount: 0,
        recursiveReadLimit: Number.POSITIVE_INFINITY,
        assertReadLimit() {
          if (this.recursiveReadCount >= this.recursiveReadLimit)
            throw new RecursiveReadLimitExceededError({
              count: this.recursiveReadCount + 1,
              limit: this.recursiveReadLimit
            });
        },
        assertPosition(position) {
          if (position < 0 || position > this.bytes.length - 1)
            throw new PositionOutOfBoundsError({
              length: this.bytes.length,
              position
            });
        },
        decrementPosition(offset) {
          if (offset < 0)
            throw new NegativeOffsetError({ offset });
          const position = this.position - offset;
          this.assertPosition(position);
          this.position = position;
        },
        getReadCount(position) {
          return this.positionReadCount.get(position || this.position) || 0;
        },
        incrementPosition(offset) {
          if (offset < 0)
            throw new NegativeOffsetError({ offset });
          const position = this.position + offset;
          this.assertPosition(position);
          this.position = position;
        },
        inspectByte(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position);
          return this.bytes[position];
        },
        inspectBytes(length, position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + length - 1);
          return this.bytes.subarray(position, position + length);
        },
        inspectUint8(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position);
          return this.bytes[position];
        },
        inspectUint16(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 1);
          return this.dataView.getUint16(position);
        },
        inspectUint24(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 2);
          return (this.dataView.getUint16(position) << 8) + this.dataView.getUint8(position + 2);
        },
        inspectUint32(position_) {
          const position = position_ ?? this.position;
          this.assertPosition(position + 3);
          return this.dataView.getUint32(position);
        },
        pushByte(byte) {
          this.assertPosition(this.position);
          this.bytes[this.position] = byte;
          this.position++;
        },
        pushBytes(bytes) {
          this.assertPosition(this.position + bytes.length - 1);
          this.bytes.set(bytes, this.position);
          this.position += bytes.length;
        },
        pushUint8(value) {
          this.assertPosition(this.position);
          this.bytes[this.position] = value;
          this.position++;
        },
        pushUint16(value) {
          this.assertPosition(this.position + 1);
          this.dataView.setUint16(this.position, value);
          this.position += 2;
        },
        pushUint24(value) {
          this.assertPosition(this.position + 2);
          this.dataView.setUint16(this.position, value >> 8);
          this.dataView.setUint8(this.position + 2, value & ~4294967040);
          this.position += 3;
        },
        pushUint32(value) {
          this.assertPosition(this.position + 3);
          this.dataView.setUint32(this.position, value);
          this.position += 4;
        },
        readByte() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectByte();
          this.position++;
          return value;
        },
        readBytes(length, size4) {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectBytes(length);
          this.position += size4 ?? length;
          return value;
        },
        readUint8() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint8();
          this.position += 1;
          return value;
        },
        readUint16() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint16();
          this.position += 2;
          return value;
        },
        readUint24() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint24();
          this.position += 3;
          return value;
        },
        readUint32() {
          this.assertReadLimit();
          this._touch();
          const value = this.inspectUint32();
          this.position += 4;
          return value;
        },
        get remaining() {
          return this.bytes.length - this.position;
        },
        setPosition(position) {
          const oldPosition = this.position;
          this.assertPosition(position);
          this.position = position;
          return () => this.position = oldPosition;
        },
        _touch() {
          if (this.recursiveReadLimit === Number.POSITIVE_INFINITY)
            return;
          const count = this.getReadCount();
          this.positionReadCount.set(this.position, count + 1);
          if (count > 0)
            this.recursiveReadCount++;
        }
      };
    }
  });

  // node_modules/viem/_esm/constants/unit.js
  var gweiUnits;
  var init_unit = __esm({
    "node_modules/viem/_esm/constants/unit.js"() {
      gweiUnits = {
        ether: -9,
        wei: 9
      };
    }
  });

  // node_modules/viem/_esm/utils/unit/formatUnits.js
  function formatUnits(value, decimals) {
    let display = value.toString();
    const negative = display.startsWith("-");
    if (negative)
      display = display.slice(1);
    display = display.padStart(decimals, "0");
    let [integer, fraction] = [
      display.slice(0, display.length - decimals),
      display.slice(display.length - decimals)
    ];
    fraction = fraction.replace(/(0+)$/, "");
    return `${negative ? "-" : ""}${integer || "0"}${fraction ? `.${fraction}` : ""}`;
  }
  var init_formatUnits = __esm({
    "node_modules/viem/_esm/utils/unit/formatUnits.js"() {
    }
  });

  // node_modules/viem/_esm/utils/unit/formatGwei.js
  function formatGwei(wei, unit = "wei") {
    return formatUnits(wei, gweiUnits[unit]);
  }
  var init_formatGwei = __esm({
    "node_modules/viem/_esm/utils/unit/formatGwei.js"() {
      init_unit();
      init_formatUnits();
    }
  });

  // node_modules/viem/_esm/errors/transaction.js
  function prettyPrint(args) {
    const entries = Object.entries(args).map(([key, value]) => {
      if (value === void 0 || value === false)
        return null;
      return [key, value];
    }).filter(Boolean);
    const maxLength = entries.reduce((acc, [key]) => Math.max(acc, key.length), 0);
    return entries.map(([key, value]) => `  ${`${key}:`.padEnd(maxLength + 1)}  ${value}`).join("\n");
  }
  var InvalidLegacyVError, InvalidSerializableTransactionError, InvalidStorageKeySizeError;
  var init_transaction = __esm({
    "node_modules/viem/_esm/errors/transaction.js"() {
      init_base();
      InvalidLegacyVError = class extends BaseError {
        constructor({ v }) {
          super(`Invalid \`v\` value "${v}". Expected 27 or 28.`, {
            name: "InvalidLegacyVError"
          });
        }
      };
      InvalidSerializableTransactionError = class extends BaseError {
        constructor({ transaction }) {
          super("Cannot infer a transaction type from provided transaction.", {
            metaMessages: [
              "Provided Transaction:",
              "{",
              prettyPrint(transaction),
              "}",
              "",
              "To infer the type, either provide:",
              "- a `type` to the Transaction, or",
              "- an EIP-1559 Transaction with `maxFeePerGas`, or",
              "- an EIP-2930 Transaction with `gasPrice` & `accessList`, or",
              "- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or",
              "- an EIP-7702 Transaction with `authorizationList`, or",
              "- a Legacy Transaction with `gasPrice`"
            ],
            name: "InvalidSerializableTransactionError"
          });
        }
      };
      InvalidStorageKeySizeError = class extends BaseError {
        constructor({ storageKey }) {
          super(`Size for storage key "${storageKey}" is invalid. Expected 32 bytes. Got ${Math.floor((storageKey.length - 2) / 2)} bytes.`, { name: "InvalidStorageKeySizeError" });
        }
      };
    }
  });

  // node_modules/@noble/hashes/esm/utils.js
  function isBytes(a) {
    return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array";
  }
  function anumber(n) {
    if (!Number.isSafeInteger(n) || n < 0)
      throw new Error("positive integer expected, got " + n);
  }
  function abytes(b, ...lengths) {
    if (!isBytes(b))
      throw new Error("Uint8Array expected");
    if (lengths.length > 0 && !lengths.includes(b.length))
      throw new Error("Uint8Array expected of length " + lengths + ", got length=" + b.length);
  }
  function aexists(instance, checkFinished = true) {
    if (instance.destroyed)
      throw new Error("Hash instance has been destroyed");
    if (checkFinished && instance.finished)
      throw new Error("Hash#digest() has already been called");
  }
  function aoutput(out, instance) {
    abytes(out);
    const min = instance.outputLen;
    if (out.length < min) {
      throw new Error("digestInto() expects output buffer of length at least " + min);
    }
  }
  function u32(arr) {
    return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
  }
  function clean(...arrays) {
    for (let i = 0; i < arrays.length; i++) {
      arrays[i].fill(0);
    }
  }
  function createView(arr) {
    return new DataView(arr.buffer, arr.byteOffset, arr.byteLength);
  }
  function rotr(word, shift) {
    return word << 32 - shift | word >>> shift;
  }
  function byteSwap(word) {
    return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
  }
  function byteSwap32(arr) {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = byteSwap(arr[i]);
    }
    return arr;
  }
  function utf8ToBytes(str) {
    if (typeof str !== "string")
      throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(str));
  }
  function toBytes2(data) {
    if (typeof data === "string")
      data = utf8ToBytes(data);
    abytes(data);
    return data;
  }
  function createHasher(hashCons) {
    const hashC = (msg) => hashCons().update(toBytes2(msg)).digest();
    const tmp = hashCons();
    hashC.outputLen = tmp.outputLen;
    hashC.blockLen = tmp.blockLen;
    hashC.create = () => hashCons();
    return hashC;
  }
  var isLE, swap32IfBE, Hash;
  var init_utils = __esm({
    "node_modules/@noble/hashes/esm/utils.js"() {
      isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
      swap32IfBE = isLE ? (u) => u : byteSwap32;
      Hash = class {
      };
    }
  });

  // node_modules/@noble/hashes/esm/_md.js
  function setBigUint64(view, byteOffset, value, isLE2) {
    if (typeof view.setBigUint64 === "function")
      return view.setBigUint64(byteOffset, value, isLE2);
    const _32n2 = BigInt(32);
    const _u32_max = BigInt(4294967295);
    const wh = Number(value >> _32n2 & _u32_max);
    const wl = Number(value & _u32_max);
    const h = isLE2 ? 4 : 0;
    const l = isLE2 ? 0 : 4;
    view.setUint32(byteOffset + h, wh, isLE2);
    view.setUint32(byteOffset + l, wl, isLE2);
  }
  function Chi(a, b, c) {
    return a & b ^ ~a & c;
  }
  function Maj(a, b, c) {
    return a & b ^ a & c ^ b & c;
  }
  var HashMD, SHA256_IV;
  var init_md = __esm({
    "node_modules/@noble/hashes/esm/_md.js"() {
      init_utils();
      HashMD = class extends Hash {
        constructor(blockLen, outputLen, padOffset, isLE2) {
          super();
          this.finished = false;
          this.length = 0;
          this.pos = 0;
          this.destroyed = false;
          this.blockLen = blockLen;
          this.outputLen = outputLen;
          this.padOffset = padOffset;
          this.isLE = isLE2;
          this.buffer = new Uint8Array(blockLen);
          this.view = createView(this.buffer);
        }
        update(data) {
          aexists(this);
          data = toBytes2(data);
          abytes(data);
          const { view, buffer: buffer3, blockLen } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            if (take === blockLen) {
              const dataView = createView(data);
              for (; blockLen <= len - pos; pos += blockLen)
                this.process(dataView, pos);
              continue;
            }
            buffer3.set(data.subarray(pos, pos + take), this.pos);
            this.pos += take;
            pos += take;
            if (this.pos === blockLen) {
              this.process(view, 0);
              this.pos = 0;
            }
          }
          this.length += data.length;
          this.roundClean();
          return this;
        }
        digestInto(out) {
          aexists(this);
          aoutput(out, this);
          this.finished = true;
          const { buffer: buffer3, view, blockLen, isLE: isLE2 } = this;
          let { pos } = this;
          buffer3[pos++] = 128;
          clean(this.buffer.subarray(pos));
          if (this.padOffset > blockLen - pos) {
            this.process(view, 0);
            pos = 0;
          }
          for (let i = pos; i < blockLen; i++)
            buffer3[i] = 0;
          setBigUint64(view, blockLen - 8, BigInt(this.length * 8), isLE2);
          this.process(view, 0);
          const oview = createView(out);
          const len = this.outputLen;
          if (len % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
          const outLen = len / 4;
          const state = this.get();
          if (outLen > state.length)
            throw new Error("_sha2: outputLen bigger than state");
          for (let i = 0; i < outLen; i++)
            oview.setUint32(4 * i, state[i], isLE2);
        }
        digest() {
          const { buffer: buffer3, outputLen } = this;
          this.digestInto(buffer3);
          const res = buffer3.slice(0, outputLen);
          this.destroy();
          return res;
        }
        _cloneInto(to) {
          to || (to = new this.constructor());
          to.set(...this.get());
          const { blockLen, buffer: buffer3, length, finished, destroyed, pos } = this;
          to.destroyed = destroyed;
          to.finished = finished;
          to.length = length;
          to.pos = pos;
          if (length % blockLen)
            to.buffer.set(buffer3);
          return to;
        }
        clone() {
          return this._cloneInto();
        }
      };
      SHA256_IV = /* @__PURE__ */ Uint32Array.from([
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
      ]);
    }
  });

  // node_modules/@noble/hashes/esm/_u64.js
  function fromBig(n, le = false) {
    if (le)
      return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
    return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
  }
  function split(lst, le = false) {
    const len = lst.length;
    let Ah = new Uint32Array(len);
    let Al = new Uint32Array(len);
    for (let i = 0; i < len; i++) {
      const { h, l } = fromBig(lst[i], le);
      [Ah[i], Al[i]] = [h, l];
    }
    return [Ah, Al];
  }
  var U32_MASK64, _32n, rotlSH, rotlSL, rotlBH, rotlBL;
  var init_u64 = __esm({
    "node_modules/@noble/hashes/esm/_u64.js"() {
      U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
      _32n = /* @__PURE__ */ BigInt(32);
      rotlSH = (h, l, s) => h << s | l >>> 32 - s;
      rotlSL = (h, l, s) => l << s | h >>> 32 - s;
      rotlBH = (h, l, s) => l << s - 32 | h >>> 64 - s;
      rotlBL = (h, l, s) => h << s - 32 | l >>> 64 - s;
    }
  });

  // node_modules/@noble/hashes/esm/sha2.js
  var SHA256_K, SHA256_W, SHA256, sha256;
  var init_sha2 = __esm({
    "node_modules/@noble/hashes/esm/sha2.js"() {
      init_md();
      init_utils();
      SHA256_K = /* @__PURE__ */ Uint32Array.from([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      SHA256_W = /* @__PURE__ */ new Uint32Array(64);
      SHA256 = class extends HashMD {
        constructor(outputLen = 32) {
          super(64, outputLen, 8, false);
          this.A = SHA256_IV[0] | 0;
          this.B = SHA256_IV[1] | 0;
          this.C = SHA256_IV[2] | 0;
          this.D = SHA256_IV[3] | 0;
          this.E = SHA256_IV[4] | 0;
          this.F = SHA256_IV[5] | 0;
          this.G = SHA256_IV[6] | 0;
          this.H = SHA256_IV[7] | 0;
        }
        get() {
          const { A, B, C, D, E, F, G, H } = this;
          return [A, B, C, D, E, F, G, H];
        }
        // prettier-ignore
        set(A, B, C, D, E, F, G, H) {
          this.A = A | 0;
          this.B = B | 0;
          this.C = C | 0;
          this.D = D | 0;
          this.E = E | 0;
          this.F = F | 0;
          this.G = G | 0;
          this.H = H | 0;
        }
        process(view, offset) {
          for (let i = 0; i < 16; i++, offset += 4)
            SHA256_W[i] = view.getUint32(offset, false);
          for (let i = 16; i < 64; i++) {
            const W15 = SHA256_W[i - 15];
            const W2 = SHA256_W[i - 2];
            const s0 = rotr(W15, 7) ^ rotr(W15, 18) ^ W15 >>> 3;
            const s1 = rotr(W2, 17) ^ rotr(W2, 19) ^ W2 >>> 10;
            SHA256_W[i] = s1 + SHA256_W[i - 7] + s0 + SHA256_W[i - 16] | 0;
          }
          let { A, B, C, D, E, F, G, H } = this;
          for (let i = 0; i < 64; i++) {
            const sigma1 = rotr(E, 6) ^ rotr(E, 11) ^ rotr(E, 25);
            const T1 = H + sigma1 + Chi(E, F, G) + SHA256_K[i] + SHA256_W[i] | 0;
            const sigma0 = rotr(A, 2) ^ rotr(A, 13) ^ rotr(A, 22);
            const T2 = sigma0 + Maj(A, B, C) | 0;
            H = G;
            G = F;
            F = E;
            E = D + T1 | 0;
            D = C;
            C = B;
            B = A;
            A = T1 + T2 | 0;
          }
          A = A + this.A | 0;
          B = B + this.B | 0;
          C = C + this.C | 0;
          D = D + this.D | 0;
          E = E + this.E | 0;
          F = F + this.F | 0;
          G = G + this.G | 0;
          H = H + this.H | 0;
          this.set(A, B, C, D, E, F, G, H);
        }
        roundClean() {
          clean(SHA256_W);
        }
        destroy() {
          this.set(0, 0, 0, 0, 0, 0, 0, 0);
          clean(this.buffer);
        }
      };
      sha256 = /* @__PURE__ */ createHasher(() => new SHA256());
    }
  });

  // node_modules/viem/_esm/errors/address.js
  var InvalidAddressError;
  var init_address = __esm({
    "node_modules/viem/_esm/errors/address.js"() {
      init_base();
      InvalidAddressError = class extends BaseError {
        constructor({ address }) {
          super(`Address "${address}" is invalid.`, {
            metaMessages: [
              "- Address must be a hex value of 20 bytes (40 hex characters).",
              "- Address must match its checksum counterpart."
            ],
            name: "InvalidAddressError"
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/chain.js
  var InvalidChainIdError;
  var init_chain = __esm({
    "node_modules/viem/_esm/errors/chain.js"() {
      init_base();
      InvalidChainIdError = class extends BaseError {
        constructor({ chainId }) {
          super(typeof chainId === "number" ? `Chain ID "${chainId}" is invalid.` : "Chain ID is invalid.", { name: "InvalidChainIdError" });
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/node.js
  var ExecutionRevertedError, FeeCapTooHighError, FeeCapTooLowError, NonceTooHighError, NonceTooLowError, NonceMaxValueError, InsufficientFundsError, IntrinsicGasTooHighError, IntrinsicGasTooLowError, TransactionTypeNotSupportedError, TipAboveFeeCapError;
  var init_node = __esm({
    "node_modules/viem/_esm/errors/node.js"() {
      init_formatGwei();
      init_base();
      ExecutionRevertedError = class extends BaseError {
        constructor({ cause, message } = {}) {
          const reason = message?.replace("execution reverted: ", "")?.replace("execution reverted", "");
          super(`Execution reverted ${reason ? `with reason: ${reason}` : "for an unknown reason"}.`, {
            cause,
            name: "ExecutionRevertedError"
          });
        }
      };
      Object.defineProperty(ExecutionRevertedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 3
      });
      Object.defineProperty(ExecutionRevertedError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /execution reverted|gas required exceeds allowance/
      });
      FeeCapTooHighError = class extends BaseError {
        constructor({ cause, maxFeePerGas } = {}) {
          super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}) cannot be higher than the maximum allowed value (2^256-1).`, {
            cause,
            name: "FeeCapTooHighError"
          });
        }
      };
      Object.defineProperty(FeeCapTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/
      });
      FeeCapTooLowError = class extends BaseError {
        constructor({ cause, maxFeePerGas } = {}) {
          super(`The fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)}` : ""} gwei) cannot be lower than the block base fee.`, {
            cause,
            name: "FeeCapTooLowError"
          });
        }
      };
      Object.defineProperty(FeeCapTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max fee per gas less than block base fee|fee cap less than block base fee|transaction is outdated/
      });
      NonceTooHighError = class extends BaseError {
        constructor({ cause, nonce } = {}) {
          super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is higher than the next one expected.`, { cause, name: "NonceTooHighError" });
        }
      };
      Object.defineProperty(NonceTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce too high/
      });
      NonceTooLowError = class extends BaseError {
        constructor({ cause, nonce } = {}) {
          super([
            `Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}is lower than the current nonce of the account.`,
            "Try increasing the nonce or find the latest nonce with `getTransactionCount`."
          ].join("\n"), { cause, name: "NonceTooLowError" });
        }
      };
      Object.defineProperty(NonceTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce too low|transaction already imported|already known/
      });
      NonceMaxValueError = class extends BaseError {
        constructor({ cause, nonce } = {}) {
          super(`Nonce provided for the transaction ${nonce ? `(${nonce}) ` : ""}exceeds the maximum allowed nonce.`, { cause, name: "NonceMaxValueError" });
        }
      };
      Object.defineProperty(NonceMaxValueError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /nonce has max value/
      });
      InsufficientFundsError = class extends BaseError {
        constructor({ cause } = {}) {
          super([
            "The total cost (gas * gas fee + value) of executing this transaction exceeds the balance of the account."
          ].join("\n"), {
            cause,
            metaMessages: [
              "This error could arise when the account does not have enough funds to:",
              " - pay for the total gas fee,",
              " - pay for the value to send.",
              " ",
              "The cost of the transaction is calculated as `gas * gas fee + value`, where:",
              " - `gas` is the amount of gas needed for transaction to execute,",
              " - `gas fee` is the gas fee,",
              " - `value` is the amount of ether to send to the recipient."
            ],
            name: "InsufficientFundsError"
          });
        }
      };
      Object.defineProperty(InsufficientFundsError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /insufficient funds|exceeds transaction sender account balance/
      });
      IntrinsicGasTooHighError = class extends BaseError {
        constructor({ cause, gas } = {}) {
          super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction exceeds the limit allowed for the block.`, {
            cause,
            name: "IntrinsicGasTooHighError"
          });
        }
      };
      Object.defineProperty(IntrinsicGasTooHighError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /intrinsic gas too high|gas limit reached/
      });
      IntrinsicGasTooLowError = class extends BaseError {
        constructor({ cause, gas } = {}) {
          super(`The amount of gas ${gas ? `(${gas}) ` : ""}provided for the transaction is too low.`, {
            cause,
            name: "IntrinsicGasTooLowError"
          });
        }
      };
      Object.defineProperty(IntrinsicGasTooLowError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /intrinsic gas too low/
      });
      TransactionTypeNotSupportedError = class extends BaseError {
        constructor({ cause }) {
          super("The transaction type is not supported for this chain.", {
            cause,
            name: "TransactionTypeNotSupportedError"
          });
        }
      };
      Object.defineProperty(TransactionTypeNotSupportedError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /transaction type not valid/
      });
      TipAboveFeeCapError = class extends BaseError {
        constructor({ cause, maxPriorityFeePerGas, maxFeePerGas } = {}) {
          super([
            `The provided tip (\`maxPriorityFeePerGas\`${maxPriorityFeePerGas ? ` = ${formatGwei(maxPriorityFeePerGas)} gwei` : ""}) cannot be higher than the fee cap (\`maxFeePerGas\`${maxFeePerGas ? ` = ${formatGwei(maxFeePerGas)} gwei` : ""}).`
          ].join("\n"), {
            cause,
            name: "TipAboveFeeCapError"
          });
        }
      };
      Object.defineProperty(TipAboveFeeCapError, "nodeMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: /max priority fee per gas higher than max fee per gas|tip higher than fee cap/
      });
    }
  });

  // node_modules/viem/_esm/utils/lru.js
  var LruMap;
  var init_lru = __esm({
    "node_modules/viem/_esm/utils/lru.js"() {
      LruMap = class extends Map {
        constructor(size4) {
          super();
          Object.defineProperty(this, "maxSize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.maxSize = size4;
        }
        get(key) {
          const value = super.get(key);
          if (super.has(key)) {
            super.delete(key);
            super.set(key, value);
          }
          return value;
        }
        set(key, value) {
          if (super.has(key))
            super.delete(key);
          super.set(key, value);
          if (this.maxSize && this.size > this.maxSize) {
            const firstKey = super.keys().next().value;
            if (firstKey !== void 0)
              super.delete(firstKey);
          }
          return this;
        }
      };
    }
  });

  // node_modules/@noble/hashes/esm/sha3.js
  function keccakP(s, rounds = 24) {
    const B = new Uint32Array(5 * 2);
    for (let round = 24 - rounds; round < 24; round++) {
      for (let x = 0; x < 10; x++)
        B[x] = s[x] ^ s[x + 10] ^ s[x + 20] ^ s[x + 30] ^ s[x + 40];
      for (let x = 0; x < 10; x += 2) {
        const idx1 = (x + 8) % 10;
        const idx0 = (x + 2) % 10;
        const B0 = B[idx0];
        const B1 = B[idx0 + 1];
        const Th = rotlH(B0, B1, 1) ^ B[idx1];
        const Tl = rotlL(B0, B1, 1) ^ B[idx1 + 1];
        for (let y = 0; y < 50; y += 10) {
          s[x + y] ^= Th;
          s[x + y + 1] ^= Tl;
        }
      }
      let curH = s[2];
      let curL = s[3];
      for (let t = 0; t < 24; t++) {
        const shift = SHA3_ROTL[t];
        const Th = rotlH(curH, curL, shift);
        const Tl = rotlL(curH, curL, shift);
        const PI = SHA3_PI[t];
        curH = s[PI];
        curL = s[PI + 1];
        s[PI] = Th;
        s[PI + 1] = Tl;
      }
      for (let y = 0; y < 50; y += 10) {
        for (let x = 0; x < 10; x++)
          B[x] = s[y + x];
        for (let x = 0; x < 10; x++)
          s[y + x] ^= ~B[(x + 2) % 10] & B[(x + 4) % 10];
      }
      s[0] ^= SHA3_IOTA_H[round];
      s[1] ^= SHA3_IOTA_L[round];
    }
    clean(B);
  }
  var _0n, _1n, _2n, _7n, _256n, _0x71n, SHA3_PI, SHA3_ROTL, _SHA3_IOTA, IOTAS, SHA3_IOTA_H, SHA3_IOTA_L, rotlH, rotlL, Keccak, gen, keccak_256;
  var init_sha3 = __esm({
    "node_modules/@noble/hashes/esm/sha3.js"() {
      init_u64();
      init_utils();
      _0n = BigInt(0);
      _1n = BigInt(1);
      _2n = BigInt(2);
      _7n = BigInt(7);
      _256n = BigInt(256);
      _0x71n = BigInt(113);
      SHA3_PI = [];
      SHA3_ROTL = [];
      _SHA3_IOTA = [];
      for (let round = 0, R = _1n, x = 1, y = 0; round < 24; round++) {
        [x, y] = [y, (2 * x + 3 * y) % 5];
        SHA3_PI.push(2 * (5 * y + x));
        SHA3_ROTL.push((round + 1) * (round + 2) / 2 % 64);
        let t = _0n;
        for (let j = 0; j < 7; j++) {
          R = (R << _1n ^ (R >> _7n) * _0x71n) % _256n;
          if (R & _2n)
            t ^= _1n << (_1n << /* @__PURE__ */ BigInt(j)) - _1n;
        }
        _SHA3_IOTA.push(t);
      }
      IOTAS = split(_SHA3_IOTA, true);
      SHA3_IOTA_H = IOTAS[0];
      SHA3_IOTA_L = IOTAS[1];
      rotlH = (h, l, s) => s > 32 ? rotlBH(h, l, s) : rotlSH(h, l, s);
      rotlL = (h, l, s) => s > 32 ? rotlBL(h, l, s) : rotlSL(h, l, s);
      Keccak = class _Keccak extends Hash {
        // NOTE: we accept arguments in bytes instead of bits here.
        constructor(blockLen, suffix, outputLen, enableXOF = false, rounds = 24) {
          super();
          this.pos = 0;
          this.posOut = 0;
          this.finished = false;
          this.destroyed = false;
          this.enableXOF = false;
          this.blockLen = blockLen;
          this.suffix = suffix;
          this.outputLen = outputLen;
          this.enableXOF = enableXOF;
          this.rounds = rounds;
          anumber(outputLen);
          if (!(0 < blockLen && blockLen < 200))
            throw new Error("only keccak-f1600 function is supported");
          this.state = new Uint8Array(200);
          this.state32 = u32(this.state);
        }
        clone() {
          return this._cloneInto();
        }
        keccak() {
          swap32IfBE(this.state32);
          keccakP(this.state32, this.rounds);
          swap32IfBE(this.state32);
          this.posOut = 0;
          this.pos = 0;
        }
        update(data) {
          aexists(this);
          data = toBytes2(data);
          abytes(data);
          const { blockLen, state } = this;
          const len = data.length;
          for (let pos = 0; pos < len; ) {
            const take = Math.min(blockLen - this.pos, len - pos);
            for (let i = 0; i < take; i++)
              state[this.pos++] ^= data[pos++];
            if (this.pos === blockLen)
              this.keccak();
          }
          return this;
        }
        finish() {
          if (this.finished)
            return;
          this.finished = true;
          const { state, suffix, pos, blockLen } = this;
          state[pos] ^= suffix;
          if ((suffix & 128) !== 0 && pos === blockLen - 1)
            this.keccak();
          state[blockLen - 1] ^= 128;
          this.keccak();
        }
        writeInto(out) {
          aexists(this, false);
          abytes(out);
          this.finish();
          const bufferOut = this.state;
          const { blockLen } = this;
          for (let pos = 0, len = out.length; pos < len; ) {
            if (this.posOut >= blockLen)
              this.keccak();
            const take = Math.min(blockLen - this.posOut, len - pos);
            out.set(bufferOut.subarray(this.posOut, this.posOut + take), pos);
            this.posOut += take;
            pos += take;
          }
          return out;
        }
        xofInto(out) {
          if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
          return this.writeInto(out);
        }
        xof(bytes) {
          anumber(bytes);
          return this.xofInto(new Uint8Array(bytes));
        }
        digestInto(out) {
          aoutput(out, this);
          if (this.finished)
            throw new Error("digest() was already called");
          this.writeInto(out);
          this.destroy();
          return out;
        }
        digest() {
          return this.digestInto(new Uint8Array(this.outputLen));
        }
        destroy() {
          this.destroyed = true;
          clean(this.state);
        }
        _cloneInto(to) {
          const { blockLen, suffix, outputLen, rounds, enableXOF } = this;
          to || (to = new _Keccak(blockLen, suffix, outputLen, enableXOF, rounds));
          to.state32.set(this.state32);
          to.pos = this.pos;
          to.posOut = this.posOut;
          to.finished = this.finished;
          to.rounds = rounds;
          to.suffix = suffix;
          to.outputLen = outputLen;
          to.enableXOF = enableXOF;
          to.destroyed = this.destroyed;
          return to;
        }
      };
      gen = (suffix, blockLen, outputLen) => createHasher(() => new Keccak(blockLen, suffix, outputLen));
      keccak_256 = /* @__PURE__ */ (() => gen(1, 136, 256 / 8))();
    }
  });

  // node_modules/viem/_esm/utils/hash/keccak256.js
  function keccak256(value, to_) {
    const to = to_ || "hex";
    const bytes = keccak_256(isHex(value, { strict: false }) ? toBytes(value) : value);
    if (to === "bytes")
      return bytes;
    return toHex(bytes);
  }
  var init_keccak256 = __esm({
    "node_modules/viem/_esm/utils/hash/keccak256.js"() {
      init_sha3();
      init_isHex();
      init_toBytes();
      init_toHex();
    }
  });

  // node_modules/viem/_esm/utils/address/getAddress.js
  function checksumAddress(address_, chainId) {
    if (checksumAddressCache.has(`${address_}.${chainId}`))
      return checksumAddressCache.get(`${address_}.${chainId}`);
    const hexAddress = chainId ? `${chainId}${address_.toLowerCase()}` : address_.substring(2).toLowerCase();
    const hash = keccak256(stringToBytes(hexAddress), "bytes");
    const address = (chainId ? hexAddress.substring(`${chainId}0x`.length) : hexAddress).split("");
    for (let i = 0; i < 40; i += 2) {
      if (hash[i >> 1] >> 4 >= 8 && address[i]) {
        address[i] = address[i].toUpperCase();
      }
      if ((hash[i >> 1] & 15) >= 8 && address[i + 1]) {
        address[i + 1] = address[i + 1].toUpperCase();
      }
    }
    const result = `0x${address.join("")}`;
    checksumAddressCache.set(`${address_}.${chainId}`, result);
    return result;
  }
  function getAddress(address, chainId) {
    if (!isAddress(address, { strict: false }))
      throw new InvalidAddressError({ address });
    return checksumAddress(address, chainId);
  }
  var checksumAddressCache;
  var init_getAddress = __esm({
    "node_modules/viem/_esm/utils/address/getAddress.js"() {
      init_address();
      init_toBytes();
      init_keccak256();
      init_lru();
      init_isAddress();
      checksumAddressCache = /* @__PURE__ */ new LruMap(8192);
    }
  });

  // node_modules/viem/_esm/utils/address/isAddress.js
  function isAddress(address, options) {
    const { strict = true } = options ?? {};
    const cacheKey = `${address}.${strict}`;
    if (isAddressCache.has(cacheKey))
      return isAddressCache.get(cacheKey);
    const result = (() => {
      if (!addressRegex.test(address))
        return false;
      if (address.toLowerCase() === address)
        return true;
      if (strict)
        return checksumAddress(address) === address;
      return true;
    })();
    isAddressCache.set(cacheKey, result);
    return result;
  }
  var addressRegex, isAddressCache;
  var init_isAddress = __esm({
    "node_modules/viem/_esm/utils/address/isAddress.js"() {
      init_lru();
      init_getAddress();
      addressRegex = /^0x[a-fA-F0-9]{40}$/;
      isAddressCache = /* @__PURE__ */ new LruMap(8192);
    }
  });

  // node_modules/viem/_esm/utils/data/slice.js
  function slice(value, start, end, { strict } = {}) {
    if (isHex(value, { strict: false }))
      return sliceHex(value, start, end, {
        strict
      });
    return sliceBytes(value, start, end, {
      strict
    });
  }
  function assertStartOffset(value, start) {
    if (typeof start === "number" && start > 0 && start > size(value) - 1)
      throw new SliceOffsetOutOfBoundsError({
        offset: start,
        position: "start",
        size: size(value)
      });
  }
  function assertEndOffset(value, start, end) {
    if (typeof start === "number" && typeof end === "number" && size(value) !== end - start) {
      throw new SliceOffsetOutOfBoundsError({
        offset: end,
        position: "end",
        size: size(value)
      });
    }
  }
  function sliceBytes(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = value_.slice(start, end);
    if (strict)
      assertEndOffset(value, start, end);
    return value;
  }
  function sliceHex(value_, start, end, { strict } = {}) {
    assertStartOffset(value_, start);
    const value = `0x${value_.replace("0x", "").slice((start ?? 0) * 2, (end ?? value_.length) * 2)}`;
    if (strict)
      assertEndOffset(value, start, end);
    return value;
  }
  var init_slice = __esm({
    "node_modules/viem/_esm/utils/data/slice.js"() {
      init_data();
      init_isHex();
      init_size();
    }
  });

  // node_modules/viem/_esm/accounts/utils/parseAccount.js
  function parseAccount(account) {
    if (typeof account === "string")
      return { address: account, type: "json-rpc" };
    return account;
  }
  var init_parseAccount = __esm({
    "node_modules/viem/_esm/accounts/utils/parseAccount.js"() {
    }
  });

  // node_modules/viem/_esm/utils/stringify.js
  var stringify;
  var init_stringify = __esm({
    "node_modules/viem/_esm/utils/stringify.js"() {
      stringify = (value, replacer, space) => JSON.stringify(value, (key, value_) => {
        const value2 = typeof value_ === "bigint" ? value_.toString() : value_;
        return typeof replacer === "function" ? replacer(key, value2) : value2;
      }, space);
    }
  });

  // node_modules/viem/_esm/errors/utils.js
  var getUrl;
  var init_utils2 = __esm({
    "node_modules/viem/_esm/errors/utils.js"() {
      getUrl = (url) => url;
    }
  });

  // node_modules/viem/_esm/errors/request.js
  var HttpRequestError, RpcRequestError, TimeoutError;
  var init_request = __esm({
    "node_modules/viem/_esm/errors/request.js"() {
      init_stringify();
      init_base();
      init_utils2();
      HttpRequestError = class extends BaseError {
        constructor({ body, cause, details, headers, status, url }) {
          super("HTTP request failed.", {
            cause,
            details,
            metaMessages: [
              status && `Status: ${status}`,
              `URL: ${getUrl(url)}`,
              body && `Request body: ${stringify(body)}`
            ].filter(Boolean),
            name: "HttpRequestError"
          });
          Object.defineProperty(this, "body", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "headers", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "status", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.body = body;
          this.headers = headers;
          this.status = status;
          this.url = url;
        }
      };
      RpcRequestError = class extends BaseError {
        constructor({ body, error, url }) {
          super("RPC Request failed.", {
            cause: error,
            details: error.message,
            metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
            name: "RpcRequestError"
          });
          Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.code = error.code;
          this.data = error.data;
          this.url = url;
        }
      };
      TimeoutError = class extends BaseError {
        constructor({ body, url }) {
          super("The request took too long to respond.", {
            details: "The request timed out.",
            metaMessages: [`URL: ${getUrl(url)}`, `Request body: ${stringify(body)}`],
            name: "TimeoutError"
          });
          Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.url = url;
        }
      };
    }
  });

  // node_modules/viem/_esm/errors/rpc.js
  var unknownErrorCode, RpcError, ProviderRpcError, ParseRpcError, InvalidRequestRpcError, MethodNotFoundRpcError, InvalidParamsRpcError, InternalRpcError, InvalidInputRpcError, ResourceNotFoundRpcError, ResourceUnavailableRpcError, TransactionRejectedRpcError, MethodNotSupportedRpcError, LimitExceededRpcError, JsonRpcVersionUnsupportedError, UserRejectedRequestError, UnauthorizedProviderError, UnsupportedProviderMethodError, ProviderDisconnectedError, ChainDisconnectedError, SwitchChainError, UnsupportedNonOptionalCapabilityError, UnsupportedChainIdError, DuplicateIdError, UnknownBundleIdError, BundleTooLargeError, AtomicReadyWalletRejectedUpgradeError, AtomicityNotSupportedError, WalletConnectSessionSettlementError, UnknownRpcError;
  var init_rpc = __esm({
    "node_modules/viem/_esm/errors/rpc.js"() {
      init_base();
      init_request();
      unknownErrorCode = -1;
      RpcError = class extends BaseError {
        constructor(cause, { code, docsPath, metaMessages, name, shortMessage }) {
          super(shortMessage, {
            cause,
            docsPath,
            metaMessages: metaMessages || cause?.metaMessages,
            name: name || "RpcError"
          });
          Object.defineProperty(this, "code", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.name = name || cause.name;
          this.code = cause instanceof RpcRequestError ? cause.code : code ?? unknownErrorCode;
        }
      };
      ProviderRpcError = class extends RpcError {
        constructor(cause, options) {
          super(cause, options);
          Object.defineProperty(this, "data", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
          });
          this.data = options.data;
        }
      };
      ParseRpcError = class _ParseRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ParseRpcError.code,
            name: "ParseRpcError",
            shortMessage: "Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."
          });
        }
      };
      Object.defineProperty(ParseRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32700
      });
      InvalidRequestRpcError = class _InvalidRequestRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidRequestRpcError.code,
            name: "InvalidRequestRpcError",
            shortMessage: "JSON is not a valid request object."
          });
        }
      };
      Object.defineProperty(InvalidRequestRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32600
      });
      MethodNotFoundRpcError = class _MethodNotFoundRpcError extends RpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _MethodNotFoundRpcError.code,
            name: "MethodNotFoundRpcError",
            shortMessage: `The method${method ? ` "${method}"` : ""} does not exist / is not available.`
          });
        }
      };
      Object.defineProperty(MethodNotFoundRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32601
      });
      InvalidParamsRpcError = class _InvalidParamsRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidParamsRpcError.code,
            name: "InvalidParamsRpcError",
            shortMessage: [
              "Invalid parameters were provided to the RPC method.",
              "Double check you have provided the correct parameters."
            ].join("\n")
          });
        }
      };
      Object.defineProperty(InvalidParamsRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32602
      });
      InternalRpcError = class _InternalRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InternalRpcError.code,
            name: "InternalRpcError",
            shortMessage: "An internal error was received."
          });
        }
      };
      Object.defineProperty(InternalRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32603
      });
      InvalidInputRpcError = class _InvalidInputRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _InvalidInputRpcError.code,
            name: "InvalidInputRpcError",
            shortMessage: [
              "Missing or invalid parameters.",
              "Double check you have provided the correct parameters."
            ].join("\n")
          });
        }
      };
      Object.defineProperty(InvalidInputRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32e3
      });
      ResourceNotFoundRpcError = class _ResourceNotFoundRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ResourceNotFoundRpcError.code,
            name: "ResourceNotFoundRpcError",
            shortMessage: "Requested resource not found."
          });
          Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: "ResourceNotFoundRpcError"
          });
        }
      };
      Object.defineProperty(ResourceNotFoundRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32001
      });
      ResourceUnavailableRpcError = class _ResourceUnavailableRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _ResourceUnavailableRpcError.code,
            name: "ResourceUnavailableRpcError",
            shortMessage: "Requested resource not available."
          });
        }
      };
      Object.defineProperty(ResourceUnavailableRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32002
      });
      TransactionRejectedRpcError = class _TransactionRejectedRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _TransactionRejectedRpcError.code,
            name: "TransactionRejectedRpcError",
            shortMessage: "Transaction creation failed."
          });
        }
      };
      Object.defineProperty(TransactionRejectedRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32003
      });
      MethodNotSupportedRpcError = class _MethodNotSupportedRpcError extends RpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _MethodNotSupportedRpcError.code,
            name: "MethodNotSupportedRpcError",
            shortMessage: `Method${method ? ` "${method}"` : ""} is not supported.`
          });
        }
      };
      Object.defineProperty(MethodNotSupportedRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32004
      });
      LimitExceededRpcError = class _LimitExceededRpcError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _LimitExceededRpcError.code,
            name: "LimitExceededRpcError",
            shortMessage: "Request exceeds defined limit."
          });
        }
      };
      Object.defineProperty(LimitExceededRpcError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32005
      });
      JsonRpcVersionUnsupportedError = class _JsonRpcVersionUnsupportedError extends RpcError {
        constructor(cause) {
          super(cause, {
            code: _JsonRpcVersionUnsupportedError.code,
            name: "JsonRpcVersionUnsupportedError",
            shortMessage: "Version of JSON-RPC protocol is not supported."
          });
        }
      };
      Object.defineProperty(JsonRpcVersionUnsupportedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: -32006
      });
      UserRejectedRequestError = class _UserRejectedRequestError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UserRejectedRequestError.code,
            name: "UserRejectedRequestError",
            shortMessage: "User rejected the request."
          });
        }
      };
      Object.defineProperty(UserRejectedRequestError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4001
      });
      UnauthorizedProviderError = class _UnauthorizedProviderError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnauthorizedProviderError.code,
            name: "UnauthorizedProviderError",
            shortMessage: "The requested method and/or account has not been authorized by the user."
          });
        }
      };
      Object.defineProperty(UnauthorizedProviderError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4100
      });
      UnsupportedProviderMethodError = class _UnsupportedProviderMethodError extends ProviderRpcError {
        constructor(cause, { method } = {}) {
          super(cause, {
            code: _UnsupportedProviderMethodError.code,
            name: "UnsupportedProviderMethodError",
            shortMessage: `The Provider does not support the requested method${method ? ` " ${method}"` : ""}.`
          });
        }
      };
      Object.defineProperty(UnsupportedProviderMethodError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4200
      });
      ProviderDisconnectedError = class _ProviderDisconnectedError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _ProviderDisconnectedError.code,
            name: "ProviderDisconnectedError",
            shortMessage: "The Provider is disconnected from all chains."
          });
        }
      };
      Object.defineProperty(ProviderDisconnectedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4900
      });
      ChainDisconnectedError = class _ChainDisconnectedError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _ChainDisconnectedError.code,
            name: "ChainDisconnectedError",
            shortMessage: "The Provider is not connected to the requested chain."
          });
        }
      };
      Object.defineProperty(ChainDisconnectedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4901
      });
      SwitchChainError = class _SwitchChainError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _SwitchChainError.code,
            name: "SwitchChainError",
            shortMessage: "An error occurred when attempting to switch chain."
          });
        }
      };
      Object.defineProperty(SwitchChainError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 4902
      });
      UnsupportedNonOptionalCapabilityError = class _UnsupportedNonOptionalCapabilityError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnsupportedNonOptionalCapabilityError.code,
            name: "UnsupportedNonOptionalCapabilityError",
            shortMessage: "This Wallet does not support a capability that was not marked as optional."
          });
        }
      };
      Object.defineProperty(UnsupportedNonOptionalCapabilityError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5700
      });
      UnsupportedChainIdError = class _UnsupportedChainIdError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnsupportedChainIdError.code,
            name: "UnsupportedChainIdError",
            shortMessage: "This Wallet does not support the requested chain ID."
          });
        }
      };
      Object.defineProperty(UnsupportedChainIdError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5710
      });
      DuplicateIdError = class _DuplicateIdError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _DuplicateIdError.code,
            name: "DuplicateIdError",
            shortMessage: "There is already a bundle submitted with this ID."
          });
        }
      };
      Object.defineProperty(DuplicateIdError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5720
      });
      UnknownBundleIdError = class _UnknownBundleIdError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _UnknownBundleIdError.code,
            name: "UnknownBundleIdError",
            shortMessage: "This bundle id is unknown / has not been submitted"
          });
        }
      };
      Object.defineProperty(UnknownBundleIdError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5730
      });
      BundleTooLargeError = class _BundleTooLargeError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _BundleTooLargeError.code,
            name: "BundleTooLargeError",
            shortMessage: "The call bundle is too large for the Wallet to process."
          });
        }
      };
      Object.defineProperty(BundleTooLargeError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5740
      });
      AtomicReadyWalletRejectedUpgradeError = class _AtomicReadyWalletRejectedUpgradeError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _AtomicReadyWalletRejectedUpgradeError.code,
            name: "AtomicReadyWalletRejectedUpgradeError",
            shortMessage: "The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."
          });
        }
      };
      Object.defineProperty(AtomicReadyWalletRejectedUpgradeError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5750
      });
      AtomicityNotSupportedError = class _AtomicityNotSupportedError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _AtomicityNotSupportedError.code,
            name: "AtomicityNotSupportedError",
            shortMessage: "The wallet does not support atomic execution but the request requires it."
          });
        }
      };
      Object.defineProperty(AtomicityNotSupportedError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 5760
      });
      WalletConnectSessionSettlementError = class _WalletConnectSessionSettlementError extends ProviderRpcError {
        constructor(cause) {
          super(cause, {
            code: _WalletConnectSessionSettlementError.code,
            name: "WalletConnectSessionSettlementError",
            shortMessage: "WalletConnect session settlement failed."
          });
        }
      };
      Object.defineProperty(WalletConnectSessionSettlementError, "code", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: 7e3
      });
      UnknownRpcError = class extends RpcError {
        constructor(cause) {
          super(cause, {
            name: "UnknownRpcError",
            shortMessage: "An unknown RPC error occurred."
          });
        }
      };
    }
  });

  // node_modules/viem/_esm/utils/promise/withResolvers.js
  function withResolvers() {
    let resolve = () => void 0;
    let reject = () => void 0;
    const promise = new Promise((resolve_, reject_) => {
      resolve = resolve_;
      reject = reject_;
    });
    return { promise, resolve, reject };
  }
  var init_withResolvers = __esm({
    "node_modules/viem/_esm/utils/promise/withResolvers.js"() {
    }
  });

  // node_modules/viem/_esm/utils/promise/createBatchScheduler.js
  function createBatchScheduler({ fn, id, shouldSplitBatch, wait: wait2 = 0, sort }) {
    const exec = async () => {
      const scheduler = getScheduler();
      flush();
      const args = scheduler.map(({ args: args2 }) => args2);
      if (args.length === 0)
        return;
      fn(args).then((data) => {
        if (sort && Array.isArray(data))
          data.sort(sort);
        for (let i = 0; i < scheduler.length; i++) {
          const { resolve } = scheduler[i];
          resolve?.([data[i], data]);
        }
      }).catch((err) => {
        for (let i = 0; i < scheduler.length; i++) {
          const { reject } = scheduler[i];
          reject?.(err);
        }
      });
    };
    const flush = () => schedulerCache.delete(id);
    const getBatchedArgs = () => getScheduler().map(({ args }) => args);
    const getScheduler = () => schedulerCache.get(id) || [];
    const setScheduler = (item) => schedulerCache.set(id, [...getScheduler(), item]);
    return {
      flush,
      async schedule(args) {
        const { promise, resolve, reject } = withResolvers();
        const split2 = shouldSplitBatch?.([...getBatchedArgs(), args]);
        if (split2)
          exec();
        const hasActiveScheduler = getScheduler().length > 0;
        if (hasActiveScheduler) {
          setScheduler({ args, resolve, reject });
          return promise;
        }
        setScheduler({ args, resolve, reject });
        setTimeout(exec, wait2);
        return promise;
      }
    };
  }
  var schedulerCache;
  var init_createBatchScheduler = __esm({
    "node_modules/viem/_esm/utils/promise/createBatchScheduler.js"() {
      init_withResolvers();
      schedulerCache = /* @__PURE__ */ new Map();
    }
  });

  // node_modules/eventemitter3/index.js
  var require_eventemitter3 = __commonJS({
    "node_modules/eventemitter3/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var prefix = "~";
      function Events() {
      }
      if (Object.create) {
        Events.prototype = /* @__PURE__ */ Object.create(null);
        if (!new Events().__proto__) prefix = false;
      }
      function EE(fn, context, once) {
        this.fn = fn;
        this.context = context;
        this.once = once || false;
      }
      function addListener(emitter, event, fn, context, once) {
        if (typeof fn !== "function") {
          throw new TypeError("The listener must be a function");
        }
        var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
        if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
        else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
        else emitter._events[evt] = [emitter._events[evt], listener];
        return emitter;
      }
      function clearEvent(emitter, evt) {
        if (--emitter._eventsCount === 0) emitter._events = new Events();
        else delete emitter._events[evt];
      }
      function EventEmitter2() {
        this._events = new Events();
        this._eventsCount = 0;
      }
      EventEmitter2.prototype.eventNames = function eventNames() {
        var names = [], events, name;
        if (this._eventsCount === 0) return names;
        for (name in events = this._events) {
          if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
        }
        if (Object.getOwnPropertySymbols) {
          return names.concat(Object.getOwnPropertySymbols(events));
        }
        return names;
      };
      EventEmitter2.prototype.listeners = function listeners(event) {
        var evt = prefix ? prefix + event : event, handlers = this._events[evt];
        if (!handlers) return [];
        if (handlers.fn) return [handlers.fn];
        for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
          ee[i] = handlers[i].fn;
        }
        return ee;
      };
      EventEmitter2.prototype.listenerCount = function listenerCount(event) {
        var evt = prefix ? prefix + event : event, listeners = this._events[evt];
        if (!listeners) return 0;
        if (listeners.fn) return 1;
        return listeners.length;
      };
      EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return false;
        var listeners = this._events[evt], len = arguments.length, args, i;
        if (listeners.fn) {
          if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
          switch (len) {
            case 1:
              return listeners.fn.call(listeners.context), true;
            case 2:
              return listeners.fn.call(listeners.context, a1), true;
            case 3:
              return listeners.fn.call(listeners.context, a1, a2), true;
            case 4:
              return listeners.fn.call(listeners.context, a1, a2, a3), true;
            case 5:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
            case 6:
              return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
          }
          for (i = 1, args = new Array(len - 1); i < len; i++) {
            args[i - 1] = arguments[i];
          }
          listeners.fn.apply(listeners.context, args);
        } else {
          var length = listeners.length, j;
          for (i = 0; i < length; i++) {
            if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
            switch (len) {
              case 1:
                listeners[i].fn.call(listeners[i].context);
                break;
              case 2:
                listeners[i].fn.call(listeners[i].context, a1);
                break;
              case 3:
                listeners[i].fn.call(listeners[i].context, a1, a2);
                break;
              case 4:
                listeners[i].fn.call(listeners[i].context, a1, a2, a3);
                break;
              default:
                if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                  args[j - 1] = arguments[j];
                }
                listeners[i].fn.apply(listeners[i].context, args);
            }
          }
        }
        return true;
      };
      EventEmitter2.prototype.on = function on(event, fn, context) {
        return addListener(this, event, fn, context, false);
      };
      EventEmitter2.prototype.once = function once(event, fn, context) {
        return addListener(this, event, fn, context, true);
      };
      EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
        var evt = prefix ? prefix + event : event;
        if (!this._events[evt]) return this;
        if (!fn) {
          clearEvent(this, evt);
          return this;
        }
        var listeners = this._events[evt];
        if (listeners.fn) {
          if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
            clearEvent(this, evt);
          }
        } else {
          for (var i = 0, events = [], length = listeners.length; i < length; i++) {
            if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
              events.push(listeners[i]);
            }
          }
          if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
          else clearEvent(this, evt);
        }
        return this;
      };
      EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
        var evt;
        if (event) {
          evt = prefix ? prefix + event : event;
          if (this._events[evt]) clearEvent(this, evt);
        } else {
          this._events = new Events();
          this._eventsCount = 0;
        }
        return this;
      };
      EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
      EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
      EventEmitter2.prefixed = prefix;
      EventEmitter2.EventEmitter = EventEmitter2;
      if ("undefined" !== typeof module) {
        module.exports = EventEmitter2;
      }
    }
  });

  // web3/wallet-entry.mjs
  var wallet_entry_exports = {};
  __export(wallet_entry_exports, {
    BASE_CHAIN_ID: () => BASE_CHAIN_ID,
    BASE_SEPOLIA_ID: () => BASE_SEPOLIA_ID,
    connect: () => connect2,
    disconnect: () => disconnect2,
    getState: () => getState,
    init: () => init,
    subscribe: () => subscribe,
    switchToBase: () => switchToBase
  });

  // node_modules/viem/_esm/utils/chain/defineChain.js
  function defineChain(chain) {
    const chainInstance = {
      formatters: void 0,
      fees: void 0,
      serializers: void 0,
      ...chain
    };
    function extend(base2) {
      return (fnOrExtended) => {
        const properties = typeof fnOrExtended === "function" ? fnOrExtended(base2) : fnOrExtended;
        const combined = { ...base2, ...properties };
        return Object.assign(combined, { extend: extend(combined) });
      };
    }
    return Object.assign(chainInstance, {
      extend: extend(chainInstance)
    });
  }

  // node_modules/viem/_esm/utils/formatters/block.js
  init_formatter();

  // node_modules/viem/_esm/utils/formatters/transaction.js
  init_fromHex();
  init_formatter();
  var transactionType = {
    "0x0": "legacy",
    "0x1": "eip2930",
    "0x2": "eip1559",
    "0x3": "eip4844",
    "0x4": "eip7702"
  };
  function formatTransaction(transaction, _) {
    const transaction_ = {
      ...transaction,
      blockHash: transaction.blockHash ? transaction.blockHash : null,
      blockNumber: transaction.blockNumber ? BigInt(transaction.blockNumber) : null,
      chainId: transaction.chainId ? hexToNumber(transaction.chainId) : void 0,
      gas: transaction.gas ? BigInt(transaction.gas) : void 0,
      gasPrice: transaction.gasPrice ? BigInt(transaction.gasPrice) : void 0,
      maxFeePerBlobGas: transaction.maxFeePerBlobGas ? BigInt(transaction.maxFeePerBlobGas) : void 0,
      maxFeePerGas: transaction.maxFeePerGas ? BigInt(transaction.maxFeePerGas) : void 0,
      maxPriorityFeePerGas: transaction.maxPriorityFeePerGas ? BigInt(transaction.maxPriorityFeePerGas) : void 0,
      nonce: transaction.nonce ? hexToNumber(transaction.nonce) : void 0,
      to: transaction.to ? transaction.to : null,
      transactionIndex: transaction.transactionIndex ? Number(transaction.transactionIndex) : null,
      type: transaction.type ? transactionType[transaction.type] : void 0,
      typeHex: transaction.type ? transaction.type : void 0,
      value: transaction.value ? BigInt(transaction.value) : void 0,
      v: transaction.v ? BigInt(transaction.v) : void 0
    };
    if (transaction.authorizationList)
      transaction_.authorizationList = formatAuthorizationList(transaction.authorizationList);
    transaction_.yParity = (() => {
      if (transaction.yParity)
        return Number(transaction.yParity);
      if (typeof transaction_.v === "bigint") {
        if (transaction_.v === 0n || transaction_.v === 27n)
          return 0;
        if (transaction_.v === 1n || transaction_.v === 28n)
          return 1;
        if (transaction_.v >= 35n)
          return transaction_.v % 2n === 0n ? 1 : 0;
      }
      return void 0;
    })();
    if (transaction_.type === "legacy") {
      delete transaction_.accessList;
      delete transaction_.maxFeePerBlobGas;
      delete transaction_.maxFeePerGas;
      delete transaction_.maxPriorityFeePerGas;
      delete transaction_.yParity;
    }
    if (transaction_.type === "eip2930") {
      delete transaction_.maxFeePerBlobGas;
      delete transaction_.maxFeePerGas;
      delete transaction_.maxPriorityFeePerGas;
    }
    if (transaction_.type === "eip1559")
      delete transaction_.maxFeePerBlobGas;
    return transaction_;
  }
  var defineTransaction = /* @__PURE__ */ defineFormatter("transaction", formatTransaction);
  function formatAuthorizationList(authorizationList) {
    return authorizationList.map((authorization) => ({
      address: authorization.address,
      chainId: Number(authorization.chainId),
      nonce: Number(authorization.nonce),
      r: authorization.r,
      s: authorization.s,
      yParity: Number(authorization.yParity)
    }));
  }

  // node_modules/viem/_esm/utils/formatters/block.js
  function formatBlock(block, _) {
    const transactions = (block.transactions ?? []).map((transaction) => {
      if (typeof transaction === "string")
        return transaction;
      return formatTransaction(transaction);
    });
    return {
      ...block,
      baseFeePerGas: block.baseFeePerGas ? BigInt(block.baseFeePerGas) : null,
      blobGasUsed: block.blobGasUsed ? BigInt(block.blobGasUsed) : void 0,
      difficulty: block.difficulty ? BigInt(block.difficulty) : void 0,
      excessBlobGas: block.excessBlobGas ? BigInt(block.excessBlobGas) : void 0,
      gasLimit: block.gasLimit ? BigInt(block.gasLimit) : void 0,
      gasUsed: block.gasUsed ? BigInt(block.gasUsed) : void 0,
      hash: block.hash ? block.hash : null,
      logsBloom: block.logsBloom ? block.logsBloom : null,
      nonce: block.nonce ? block.nonce : null,
      number: block.number ? BigInt(block.number) : null,
      size: block.size ? BigInt(block.size) : void 0,
      timestamp: block.timestamp ? BigInt(block.timestamp) : void 0,
      transactions,
      totalDifficulty: block.totalDifficulty ? BigInt(block.totalDifficulty) : null
    };
  }
  var defineBlock = /* @__PURE__ */ defineFormatter("block", formatBlock);

  // node_modules/viem/_esm/utils/formatters/log.js
  function formatLog(log, { args, eventName } = {}) {
    return {
      ...log,
      blockHash: log.blockHash ? log.blockHash : null,
      blockNumber: log.blockNumber ? BigInt(log.blockNumber) : null,
      blockTimestamp: log.blockTimestamp ? BigInt(log.blockTimestamp) : log.blockTimestamp === null ? null : void 0,
      logIndex: log.logIndex ? Number(log.logIndex) : null,
      transactionHash: log.transactionHash ? log.transactionHash : null,
      transactionIndex: log.transactionIndex ? Number(log.transactionIndex) : null,
      ...eventName ? { args, eventName } : {}
    };
  }

  // node_modules/viem/_esm/utils/formatters/transactionReceipt.js
  init_fromHex();
  init_formatter();
  var receiptStatuses = {
    "0x0": "reverted",
    "0x1": "success"
  };
  function formatTransactionReceipt(transactionReceipt, _) {
    const receipt = {
      ...transactionReceipt,
      blockNumber: transactionReceipt.blockNumber ? BigInt(transactionReceipt.blockNumber) : null,
      contractAddress: transactionReceipt.contractAddress ? transactionReceipt.contractAddress : null,
      cumulativeGasUsed: transactionReceipt.cumulativeGasUsed ? BigInt(transactionReceipt.cumulativeGasUsed) : null,
      effectiveGasPrice: transactionReceipt.effectiveGasPrice ? BigInt(transactionReceipt.effectiveGasPrice) : null,
      gasUsed: transactionReceipt.gasUsed ? BigInt(transactionReceipt.gasUsed) : null,
      logs: transactionReceipt.logs ? transactionReceipt.logs.map((log) => formatLog(log)) : null,
      to: transactionReceipt.to ? transactionReceipt.to : null,
      transactionIndex: transactionReceipt.transactionIndex ? hexToNumber(transactionReceipt.transactionIndex) : null,
      status: transactionReceipt.status ? receiptStatuses[transactionReceipt.status] : null,
      type: transactionReceipt.type ? transactionType[transactionReceipt.type] || transactionReceipt.type : null
    };
    if (transactionReceipt.blobGasPrice)
      receipt.blobGasPrice = BigInt(transactionReceipt.blobGasPrice);
    if (transactionReceipt.blobGasUsed)
      receipt.blobGasUsed = BigInt(transactionReceipt.blobGasUsed);
    return receipt;
  }
  var defineTransactionReceipt = /* @__PURE__ */ defineFormatter("transactionReceipt", formatTransactionReceipt);

  // node_modules/viem/_esm/utils/encoding/toRlp.js
  init_base();
  init_cursor2();
  init_toBytes();
  init_toHex();
  function toRlp(bytes, to = "hex") {
    const encodable = getEncodable(bytes);
    const cursor = createCursor(new Uint8Array(encodable.length));
    encodable.encode(cursor);
    if (to === "hex")
      return bytesToHex(cursor.bytes);
    return cursor.bytes;
  }
  function getEncodable(bytes) {
    if (Array.isArray(bytes))
      return getEncodableList(bytes.map((x) => getEncodable(x)));
    return getEncodableBytes(bytes);
  }
  function getEncodableList(list) {
    const bodyLength = list.reduce((acc, x) => acc + x.length, 0);
    const sizeOfBodyLength = getSizeOfLength(bodyLength);
    const length = (() => {
      if (bodyLength <= 55)
        return 1 + bodyLength;
      return 1 + sizeOfBodyLength + bodyLength;
    })();
    return {
      length,
      encode(cursor) {
        if (bodyLength <= 55) {
          cursor.pushByte(192 + bodyLength);
        } else {
          cursor.pushByte(192 + 55 + sizeOfBodyLength);
          if (sizeOfBodyLength === 1)
            cursor.pushUint8(bodyLength);
          else if (sizeOfBodyLength === 2)
            cursor.pushUint16(bodyLength);
          else if (sizeOfBodyLength === 3)
            cursor.pushUint24(bodyLength);
          else
            cursor.pushUint32(bodyLength);
        }
        for (const { encode } of list) {
          encode(cursor);
        }
      }
    };
  }
  function getEncodableBytes(bytesOrHex) {
    const bytes = typeof bytesOrHex === "string" ? hexToBytes(bytesOrHex) : bytesOrHex;
    const sizeOfBytesLength = getSizeOfLength(bytes.length);
    const length = (() => {
      if (bytes.length === 1 && bytes[0] < 128)
        return 1;
      if (bytes.length <= 55)
        return 1 + bytes.length;
      return 1 + sizeOfBytesLength + bytes.length;
    })();
    return {
      length,
      encode(cursor) {
        if (bytes.length === 1 && bytes[0] < 128) {
          cursor.pushBytes(bytes);
        } else if (bytes.length <= 55) {
          cursor.pushByte(128 + bytes.length);
          cursor.pushBytes(bytes);
        } else {
          cursor.pushByte(128 + 55 + sizeOfBytesLength);
          if (sizeOfBytesLength === 1)
            cursor.pushUint8(bytes.length);
          else if (sizeOfBytesLength === 2)
            cursor.pushUint16(bytes.length);
          else if (sizeOfBytesLength === 3)
            cursor.pushUint24(bytes.length);
          else
            cursor.pushUint32(bytes.length);
          cursor.pushBytes(bytes);
        }
      }
    };
  }
  function getSizeOfLength(length) {
    if (length < 2 ** 8)
      return 1;
    if (length < 2 ** 16)
      return 2;
    if (length < 2 ** 24)
      return 3;
    if (length < 2 ** 32)
      return 4;
    throw new BaseError("Length is too large.");
  }

  // node_modules/viem/_esm/utils/transaction/serializeTransaction.js
  init_transaction();

  // node_modules/viem/_esm/utils/authorization/serializeAuthorizationList.js
  init_toHex();
  function serializeAuthorizationList(authorizationList) {
    if (!authorizationList || authorizationList.length === 0)
      return [];
    const serializedAuthorizationList = [];
    for (const authorization of authorizationList) {
      const { chainId, nonce, ...signature } = authorization;
      const contractAddress = authorization.address;
      serializedAuthorizationList.push([
        chainId ? toHex(chainId) : "0x",
        contractAddress,
        nonce ? toHex(nonce) : "0x",
        ...toYParitySignatureArray({}, signature)
      ]);
    }
    return serializedAuthorizationList;
  }

  // node_modules/viem/_esm/utils/blob/blobsToCommitments.js
  init_toBytes();
  init_toHex();
  function blobsToCommitments(parameters) {
    const { kzg } = parameters;
    const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
    const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
    const commitments = [];
    for (const blob of blobs)
      commitments.push(Uint8Array.from(kzg.blobToKzgCommitment(blob)));
    return to === "bytes" ? commitments : commitments.map((x) => bytesToHex(x));
  }

  // node_modules/viem/_esm/utils/blob/blobsToProofs.js
  init_toBytes();
  init_toHex();
  function blobsToProofs(parameters) {
    const { kzg } = parameters;
    const to = parameters.to ?? (typeof parameters.blobs[0] === "string" ? "hex" : "bytes");
    const blobs = typeof parameters.blobs[0] === "string" ? parameters.blobs.map((x) => hexToBytes(x)) : parameters.blobs;
    const commitments = typeof parameters.commitments[0] === "string" ? parameters.commitments.map((x) => hexToBytes(x)) : parameters.commitments;
    const proofs = [];
    for (let i = 0; i < blobs.length; i++) {
      const blob = blobs[i];
      const commitment = commitments[i];
      proofs.push(Uint8Array.from(kzg.computeBlobKzgProof(blob, commitment)));
    }
    return to === "bytes" ? proofs : proofs.map((x) => bytesToHex(x));
  }

  // node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
  init_toHex();

  // node_modules/@noble/hashes/esm/sha256.js
  init_sha2();
  var sha2562 = sha256;

  // node_modules/viem/_esm/utils/hash/sha256.js
  init_isHex();
  init_toBytes();
  init_toHex();
  function sha2563(value, to_) {
    const to = to_ || "hex";
    const bytes = sha2562(isHex(value, { strict: false }) ? toBytes(value) : value);
    if (to === "bytes")
      return bytes;
    return toHex(bytes);
  }

  // node_modules/viem/_esm/utils/blob/commitmentToVersionedHash.js
  function commitmentToVersionedHash(parameters) {
    const { commitment, version: version3 = 1 } = parameters;
    const to = parameters.to ?? (typeof commitment === "string" ? "hex" : "bytes");
    const versionedHash = sha2563(commitment, "bytes");
    versionedHash.set([version3], 0);
    return to === "bytes" ? versionedHash : bytesToHex(versionedHash);
  }

  // node_modules/viem/_esm/utils/blob/commitmentsToVersionedHashes.js
  function commitmentsToVersionedHashes(parameters) {
    const { commitments, version: version3 } = parameters;
    const to = parameters.to ?? (typeof commitments[0] === "string" ? "hex" : "bytes");
    const hashes = [];
    for (const commitment of commitments) {
      hashes.push(commitmentToVersionedHash({
        commitment,
        to,
        version: version3
      }));
    }
    return hashes;
  }

  // node_modules/viem/_esm/constants/blob.js
  var blobsPerTransaction = 6;
  var bytesPerFieldElement = 32;
  var fieldElementsPerBlob = 4096;
  var bytesPerBlob = bytesPerFieldElement * fieldElementsPerBlob;
  var maxBytesPerTransaction = bytesPerBlob * blobsPerTransaction - // terminator byte (0x80).
  1 - // zero byte (0x00) appended to each field element.
  1 * fieldElementsPerBlob * blobsPerTransaction;

  // node_modules/viem/_esm/constants/kzg.js
  var versionedHashVersionKzg = 1;

  // node_modules/viem/_esm/errors/blob.js
  init_base();
  var BlobSizeTooLargeError = class extends BaseError {
    constructor({ maxSize, size: size4 }) {
      super("Blob size is too large.", {
        metaMessages: [`Max: ${maxSize} bytes`, `Given: ${size4} bytes`],
        name: "BlobSizeTooLargeError"
      });
    }
  };
  var EmptyBlobError = class extends BaseError {
    constructor() {
      super("Blob data must not be empty.", { name: "EmptyBlobError" });
    }
  };
  var InvalidVersionedHashSizeError = class extends BaseError {
    constructor({ hash, size: size4 }) {
      super(`Versioned hash "${hash}" size is invalid.`, {
        metaMessages: ["Expected: 32", `Received: ${size4}`],
        name: "InvalidVersionedHashSizeError"
      });
    }
  };
  var InvalidVersionedHashVersionError = class extends BaseError {
    constructor({ hash, version: version3 }) {
      super(`Versioned hash "${hash}" version is invalid.`, {
        metaMessages: [
          `Expected: ${versionedHashVersionKzg}`,
          `Received: ${version3}`
        ],
        name: "InvalidVersionedHashVersionError"
      });
    }
  };

  // node_modules/viem/_esm/utils/blob/toBlobs.js
  init_cursor2();
  init_size();
  init_toBytes();
  init_toHex();
  function toBlobs(parameters) {
    const to = parameters.to ?? (typeof parameters.data === "string" ? "hex" : "bytes");
    const data = typeof parameters.data === "string" ? hexToBytes(parameters.data) : parameters.data;
    const size_ = size(data);
    if (!size_)
      throw new EmptyBlobError();
    if (size_ > maxBytesPerTransaction)
      throw new BlobSizeTooLargeError({
        maxSize: maxBytesPerTransaction,
        size: size_
      });
    const blobs = [];
    let active = true;
    let position = 0;
    while (active) {
      const blob = createCursor(new Uint8Array(bytesPerBlob));
      let size4 = 0;
      while (size4 < fieldElementsPerBlob) {
        const bytes = data.slice(position, position + (bytesPerFieldElement - 1));
        blob.pushByte(0);
        blob.pushBytes(bytes);
        if (bytes.length < 31) {
          blob.pushByte(128);
          active = false;
          break;
        }
        size4++;
        position += 31;
      }
      blobs.push(blob);
    }
    return to === "bytes" ? blobs.map((x) => x.bytes) : blobs.map((x) => bytesToHex(x.bytes));
  }

  // node_modules/viem/_esm/utils/blob/toBlobSidecars.js
  function toBlobSidecars(parameters) {
    const { data, kzg, to } = parameters;
    const blobs = parameters.blobs ?? toBlobs({ data, to });
    const commitments = parameters.commitments ?? blobsToCommitments({ blobs, kzg, to });
    const proofs = parameters.proofs ?? blobsToProofs({ blobs, commitments, kzg, to });
    const sidecars = [];
    for (let i = 0; i < blobs.length; i++)
      sidecars.push({
        blob: blobs[i],
        commitment: commitments[i],
        proof: proofs[i]
      });
    return sidecars;
  }

  // node_modules/viem/_esm/utils/transaction/serializeTransaction.js
  init_concat();
  init_trim();
  init_toHex();

  // node_modules/viem/_esm/utils/transaction/assertTransaction.js
  init_number();
  init_address();
  init_base();
  init_chain();
  init_node();
  init_isAddress();
  init_size();
  init_slice();
  init_fromHex();
  function assertTransactionEIP7702(transaction) {
    const { authorizationList } = transaction;
    if (authorizationList) {
      for (const authorization of authorizationList) {
        const { chainId } = authorization;
        const address = authorization.address;
        if (!isAddress(address))
          throw new InvalidAddressError({ address });
        if (chainId < 0)
          throw new InvalidChainIdError({ chainId });
      }
    }
    assertTransactionEIP1559(transaction);
  }
  function assertTransactionEIP4844(transaction) {
    const { blobVersionedHashes } = transaction;
    if (blobVersionedHashes) {
      if (blobVersionedHashes.length === 0)
        throw new EmptyBlobError();
      for (const hash of blobVersionedHashes) {
        const size_ = size(hash);
        const version3 = hexToNumber(slice(hash, 0, 1));
        if (size_ !== 32)
          throw new InvalidVersionedHashSizeError({ hash, size: size_ });
        if (version3 !== versionedHashVersionKzg)
          throw new InvalidVersionedHashVersionError({
            hash,
            version: version3
          });
      }
    }
    assertTransactionEIP1559(transaction);
  }
  function assertTransactionEIP1559(transaction) {
    const { chainId, maxPriorityFeePerGas, maxFeePerGas, to } = transaction;
    if (chainId <= 0)
      throw new InvalidChainIdError({ chainId });
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
    if (maxFeePerGas && maxFeePerGas > maxUint256)
      throw new FeeCapTooHighError({ maxFeePerGas });
    if (maxPriorityFeePerGas && maxFeePerGas && maxPriorityFeePerGas > maxFeePerGas)
      throw new TipAboveFeeCapError({ maxFeePerGas, maxPriorityFeePerGas });
  }
  function assertTransactionEIP2930(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
    if (chainId <= 0)
      throw new InvalidChainIdError({ chainId });
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
    if (maxPriorityFeePerGas || maxFeePerGas)
      throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");
    if (gasPrice && gasPrice > maxUint256)
      throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
  }
  function assertTransactionLegacy(transaction) {
    const { chainId, maxPriorityFeePerGas, gasPrice, maxFeePerGas, to } = transaction;
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
    if (typeof chainId !== "undefined" && chainId <= 0)
      throw new InvalidChainIdError({ chainId });
    if (maxPriorityFeePerGas || maxFeePerGas)
      throw new BaseError("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");
    if (gasPrice && gasPrice > maxUint256)
      throw new FeeCapTooHighError({ maxFeePerGas: gasPrice });
  }

  // node_modules/viem/_esm/utils/transaction/getTransactionType.js
  init_transaction();
  function getTransactionType(transaction) {
    if (transaction.type)
      return transaction.type;
    if (typeof transaction.authorizationList !== "undefined")
      return "eip7702";
    if (typeof transaction.blobs !== "undefined" || typeof transaction.blobVersionedHashes !== "undefined" || typeof transaction.maxFeePerBlobGas !== "undefined" || typeof transaction.sidecars !== "undefined")
      return "eip4844";
    if (typeof transaction.maxFeePerGas !== "undefined" || typeof transaction.maxPriorityFeePerGas !== "undefined") {
      return "eip1559";
    }
    if (typeof transaction.gasPrice !== "undefined") {
      if (typeof transaction.accessList !== "undefined")
        return "eip2930";
      return "legacy";
    }
    throw new InvalidSerializableTransactionError({ transaction });
  }

  // node_modules/viem/_esm/utils/transaction/serializeAccessList.js
  init_address();
  init_transaction();
  init_isAddress();
  function serializeAccessList(accessList) {
    if (!accessList || accessList.length === 0)
      return [];
    const serializedAccessList = [];
    for (let i = 0; i < accessList.length; i++) {
      const { address, storageKeys } = accessList[i];
      for (let j = 0; j < storageKeys.length; j++) {
        if (storageKeys[j].length - 2 !== 64) {
          throw new InvalidStorageKeySizeError({ storageKey: storageKeys[j] });
        }
      }
      if (!isAddress(address, { strict: false })) {
        throw new InvalidAddressError({ address });
      }
      serializedAccessList.push([address, storageKeys]);
    }
    return serializedAccessList;
  }

  // node_modules/viem/_esm/utils/transaction/serializeTransaction.js
  function serializeTransaction(transaction, signature) {
    const type = getTransactionType(transaction);
    if (type === "eip1559")
      return serializeTransactionEIP1559(transaction, signature);
    if (type === "eip2930")
      return serializeTransactionEIP2930(transaction, signature);
    if (type === "eip4844")
      return serializeTransactionEIP4844(transaction, signature);
    if (type === "eip7702")
      return serializeTransactionEIP7702(transaction, signature);
    return serializeTransactionLegacy(transaction, signature);
  }
  function serializeTransactionEIP7702(transaction, signature) {
    const { authorizationList, chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
    assertTransactionEIP7702(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedAuthorizationList = serializeAuthorizationList(authorizationList);
    return concatHex([
      "0x04",
      toRlp([
        numberToHex(chainId),
        nonce ? numberToHex(nonce) : "0x",
        maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
        maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
        gas ? numberToHex(gas) : "0x",
        to ?? "0x",
        value ? numberToHex(value) : "0x",
        data ?? "0x",
        serializedAccessList,
        serializedAuthorizationList,
        ...toYParitySignatureArray(transaction, signature)
      ])
    ]);
  }
  function serializeTransactionEIP4844(transaction, signature) {
    const { chainId, gas, nonce, to, value, maxFeePerBlobGas, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
    assertTransactionEIP4844(transaction);
    let blobVersionedHashes = transaction.blobVersionedHashes;
    let sidecars = transaction.sidecars;
    if (transaction.blobs && (typeof blobVersionedHashes === "undefined" || typeof sidecars === "undefined")) {
      const blobs2 = typeof transaction.blobs[0] === "string" ? transaction.blobs : transaction.blobs.map((x) => bytesToHex(x));
      const kzg = transaction.kzg;
      const commitments2 = blobsToCommitments({
        blobs: blobs2,
        kzg
      });
      if (typeof blobVersionedHashes === "undefined")
        blobVersionedHashes = commitmentsToVersionedHashes({
          commitments: commitments2
        });
      if (typeof sidecars === "undefined") {
        const proofs2 = blobsToProofs({ blobs: blobs2, commitments: commitments2, kzg });
        sidecars = toBlobSidecars({ blobs: blobs2, commitments: commitments2, proofs: proofs2 });
      }
    }
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
      numberToHex(chainId),
      nonce ? numberToHex(nonce) : "0x",
      maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
      gas ? numberToHex(gas) : "0x",
      to ?? "0x",
      value ? numberToHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      maxFeePerBlobGas ? numberToHex(maxFeePerBlobGas) : "0x",
      blobVersionedHashes ?? [],
      ...toYParitySignatureArray(transaction, signature)
    ];
    const blobs = [];
    const commitments = [];
    const proofs = [];
    if (sidecars)
      for (let i = 0; i < sidecars.length; i++) {
        const { blob, commitment, proof } = sidecars[i];
        blobs.push(blob);
        commitments.push(commitment);
        proofs.push(proof);
      }
    return concatHex([
      "0x03",
      sidecars ? (
        // If sidecars are enabled, envelope turns into a "wrapper":
        toRlp([serializedTransaction, blobs, commitments, proofs])
      ) : (
        // If sidecars are disabled, standard envelope is used:
        toRlp(serializedTransaction)
      )
    ]);
  }
  function serializeTransactionEIP1559(transaction, signature) {
    const { chainId, gas, nonce, to, value, maxFeePerGas, maxPriorityFeePerGas, accessList, data } = transaction;
    assertTransactionEIP1559(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
      numberToHex(chainId),
      nonce ? numberToHex(nonce) : "0x",
      maxPriorityFeePerGas ? numberToHex(maxPriorityFeePerGas) : "0x",
      maxFeePerGas ? numberToHex(maxFeePerGas) : "0x",
      gas ? numberToHex(gas) : "0x",
      to ?? "0x",
      value ? numberToHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      ...toYParitySignatureArray(transaction, signature)
    ];
    return concatHex([
      "0x02",
      toRlp(serializedTransaction)
    ]);
  }
  function serializeTransactionEIP2930(transaction, signature) {
    const { chainId, gas, data, nonce, to, value, accessList, gasPrice } = transaction;
    assertTransactionEIP2930(transaction);
    const serializedAccessList = serializeAccessList(accessList);
    const serializedTransaction = [
      numberToHex(chainId),
      nonce ? numberToHex(nonce) : "0x",
      gasPrice ? numberToHex(gasPrice) : "0x",
      gas ? numberToHex(gas) : "0x",
      to ?? "0x",
      value ? numberToHex(value) : "0x",
      data ?? "0x",
      serializedAccessList,
      ...toYParitySignatureArray(transaction, signature)
    ];
    return concatHex([
      "0x01",
      toRlp(serializedTransaction)
    ]);
  }
  function serializeTransactionLegacy(transaction, signature) {
    const { chainId = 0, gas, data, nonce, to, value, gasPrice } = transaction;
    assertTransactionLegacy(transaction);
    let serializedTransaction = [
      nonce ? numberToHex(nonce) : "0x",
      gasPrice ? numberToHex(gasPrice) : "0x",
      gas ? numberToHex(gas) : "0x",
      to ?? "0x",
      value ? numberToHex(value) : "0x",
      data ?? "0x"
    ];
    if (signature) {
      const v = (() => {
        if (signature.v >= 35n) {
          const inferredChainId = (signature.v - 35n) / 2n;
          if (inferredChainId > 0)
            return signature.v;
          return 27n + (signature.v === 35n ? 0n : 1n);
        }
        if (chainId > 0)
          return BigInt(chainId * 2) + BigInt(35n + signature.v - 27n);
        const v2 = 27n + (signature.v === 27n ? 0n : 1n);
        if (signature.v !== v2)
          throw new InvalidLegacyVError({ v: signature.v });
        return v2;
      })();
      const r = trim(signature.r);
      const s = trim(signature.s);
      serializedTransaction = [
        ...serializedTransaction,
        numberToHex(v),
        r === "0x00" ? "0x" : r,
        s === "0x00" ? "0x" : s
      ];
    } else if (chainId > 0) {
      serializedTransaction = [
        ...serializedTransaction,
        numberToHex(chainId),
        "0x",
        "0x"
      ];
    }
    return toRlp(serializedTransaction);
  }
  function toYParitySignatureArray(transaction, signature_) {
    const signature = signature_ ?? transaction;
    const { v, yParity } = signature;
    if (typeof signature.r === "undefined")
      return [];
    if (typeof signature.s === "undefined")
      return [];
    if (typeof v === "undefined" && typeof yParity === "undefined")
      return [];
    const r = trim(signature.r);
    const s = trim(signature.s);
    const yParity_ = (() => {
      if (typeof yParity === "number")
        return yParity ? numberToHex(1) : "0x";
      if (v === 0n)
        return "0x";
      if (v === 1n)
        return numberToHex(1);
      return v === 27n ? "0x" : numberToHex(1);
    })();
    return [yParity_, r === "0x00" ? "0x" : r, s === "0x00" ? "0x" : s];
  }

  // node_modules/viem/_esm/op-stack/contracts.js
  var contracts = {
    gasPriceOracle: { address: "0x420000000000000000000000000000000000000F" },
    l1Block: { address: "0x4200000000000000000000000000000000000015" },
    l2CrossDomainMessenger: {
      address: "0x4200000000000000000000000000000000000007"
    },
    l2Erc721Bridge: { address: "0x4200000000000000000000000000000000000014" },
    l2StandardBridge: { address: "0x4200000000000000000000000000000000000010" },
    l2ToL1MessagePasser: {
      address: "0x4200000000000000000000000000000000000016"
    }
  };

  // node_modules/viem/_esm/op-stack/formatters.js
  init_fromHex();
  var formatters = {
    block: /* @__PURE__ */ defineBlock({
      format(args) {
        const transactions = args.transactions?.map((transaction) => {
          if (typeof transaction === "string")
            return transaction;
          const formatted = formatTransaction(transaction);
          if (formatted.typeHex === "0x7e") {
            formatted.isSystemTx = transaction.isSystemTx;
            formatted.mint = transaction.mint ? hexToBigInt(transaction.mint) : void 0;
            formatted.sourceHash = transaction.sourceHash;
            formatted.type = "deposit";
          }
          return formatted;
        });
        return {
          transactions,
          stateRoot: args.stateRoot
        };
      }
    }),
    transaction: /* @__PURE__ */ defineTransaction({
      format(args) {
        const transaction = {};
        if (args.type === "0x7e") {
          transaction.isSystemTx = args.isSystemTx;
          transaction.mint = args.mint ? hexToBigInt(args.mint) : void 0;
          transaction.sourceHash = args.sourceHash;
          transaction.type = "deposit";
        }
        return transaction;
      }
    }),
    transactionReceipt: /* @__PURE__ */ defineTransactionReceipt({
      format(args) {
        return {
          l1GasPrice: args.l1GasPrice ? hexToBigInt(args.l1GasPrice) : null,
          l1GasUsed: args.l1GasUsed ? hexToBigInt(args.l1GasUsed) : null,
          l1Fee: args.l1Fee ? hexToBigInt(args.l1Fee) : null,
          l1FeeScalar: args.l1FeeScalar ? Number(args.l1FeeScalar) : null
        };
      }
    })
  };

  // node_modules/viem/_esm/op-stack/serializers.js
  init_address();
  init_isAddress();
  init_concat();
  init_toHex();
  function serializeTransaction2(transaction, signature) {
    if (isDeposit(transaction))
      return serializeTransactionDeposit(transaction);
    return serializeTransaction(transaction, signature);
  }
  var serializers = {
    transaction: serializeTransaction2
  };
  function serializeTransactionDeposit(transaction) {
    assertTransactionDeposit(transaction);
    const { sourceHash, data, from, gas, isSystemTx, mint, to, value } = transaction;
    const serializedTransaction = [
      sourceHash,
      from,
      to ?? "0x",
      mint ? toHex(mint) : "0x",
      value ? toHex(value) : "0x",
      gas ? toHex(gas) : "0x",
      isSystemTx ? "0x1" : "0x",
      data ?? "0x"
    ];
    return concatHex([
      "0x7e",
      toRlp(serializedTransaction)
    ]);
  }
  function isDeposit(transaction) {
    if (transaction.type === "deposit")
      return true;
    if (typeof transaction.sourceHash !== "undefined")
      return true;
    return false;
  }
  function assertTransactionDeposit(transaction) {
    const { from, to } = transaction;
    if (from && !isAddress(from))
      throw new InvalidAddressError({ address: from });
    if (to && !isAddress(to))
      throw new InvalidAddressError({ address: to });
  }

  // node_modules/viem/_esm/op-stack/chainConfig.js
  var chainConfig = {
    blockTime: 2e3,
    contracts,
    formatters,
    serializers
  };

  // node_modules/viem/_esm/chains/definitions/base.js
  var sourceId = 1;
  var base = /* @__PURE__ */ defineChain({
    ...chainConfig,
    id: 8453,
    name: "Base",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://mainnet.base.org"]
      }
    },
    blockExplorers: {
      default: {
        name: "Basescan",
        url: "https://basescan.org",
        apiUrl: "https://api.basescan.org/api"
      }
    },
    contracts: {
      ...chainConfig.contracts,
      disputeGameFactory: {
        [sourceId]: {
          address: "0x43edB88C4B80fDD2AdFF2412A7BebF9dF42cB40e"
        }
      },
      l2OutputOracle: {
        [sourceId]: {
          address: "0x56315b90c40730925ec5485cf004d835058518A0"
        }
      },
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 5022
      },
      portal: {
        [sourceId]: {
          address: "0x49048044D57e1C92A77f79988d21Fa8fAF74E97e",
          blockCreated: 17482143
        }
      },
      l1StandardBridge: {
        [sourceId]: {
          address: "0x3154Cf16ccdb4C6d922629664174b904d80F2C35",
          blockCreated: 17482143
        }
      }
    },
    sourceId
  });
  var basePreconf = /* @__PURE__ */ defineChain({
    ...base,
    experimental_preconfirmationTime: 200,
    rpcUrls: {
      default: {
        http: ["https://mainnet-preconf.base.org"]
      }
    }
  });

  // node_modules/viem/_esm/chains/definitions/baseSepolia.js
  var sourceId2 = 11155111;
  var baseSepolia = /* @__PURE__ */ defineChain({
    ...chainConfig,
    id: 84532,
    network: "base-sepolia",
    name: "Base Sepolia",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: {
        http: ["https://sepolia.base.org"]
      }
    },
    blockExplorers: {
      default: {
        name: "Basescan",
        url: "https://sepolia.basescan.org",
        apiUrl: "https://api-sepolia.basescan.org/api"
      }
    },
    contracts: {
      ...chainConfig.contracts,
      disputeGameFactory: {
        [sourceId2]: {
          address: "0xd6E6dBf4F7EA0ac412fD8b65ED297e64BB7a06E1"
        }
      },
      l2OutputOracle: {
        [sourceId2]: {
          address: "0x84457ca9D0163FbC4bbfe4Dfbb20ba46e48DF254"
        }
      },
      portal: {
        [sourceId2]: {
          address: "0x49f53e41452c74589e85ca1677426ba426459e85",
          blockCreated: 4446677
        }
      },
      l1StandardBridge: {
        [sourceId2]: {
          address: "0xfd0Bf71F60660E2f608ed56e1659C450eB113120",
          blockCreated: 4446677
        }
      },
      multicall3: {
        address: "0xca11bde05977b3631167028862be2a173976ca11",
        blockCreated: 1059647
      }
    },
    testnet: true,
    sourceId: sourceId2
  });
  var baseSepoliaPreconf = /* @__PURE__ */ defineChain({
    ...baseSepolia,
    experimental_preconfirmationTime: 200,
    rpcUrls: {
      default: {
        http: ["https://sepolia-preconf.base.org"]
      }
    }
  });

  // web3/chains.mjs
  var plChains = [base, baseSepolia];
  var primaryChain = base;
  var BASE_MAINNET_ID = base.id;
  var BASE_SEPOLIA_ID = baseSepolia.id;
  function isSupportedPlChain(chainId) {
    if (chainId == null) return false;
    return chainId === BASE_MAINNET_ID || chainId === BASE_SEPOLIA_ID;
  }

  // node_modules/viem/_esm/utils/buildRequest.js
  init_base();
  init_request();
  init_rpc();
  init_toHex();

  // node_modules/viem/_esm/utils/promise/withDedupe.js
  init_lru();
  var promiseCache = /* @__PURE__ */ new LruMap(8192);
  function withDedupe(fn, { enabled = true, id }) {
    if (!enabled || !id)
      return fn();
    if (promiseCache.get(id))
      return promiseCache.get(id);
    const promise = fn().finally(() => promiseCache.delete(id));
    promiseCache.set(id, promise);
    return promise;
  }

  // node_modules/viem/_esm/utils/wait.js
  async function wait(time) {
    return new Promise((res) => setTimeout(res, time));
  }

  // node_modules/viem/_esm/utils/promise/withRetry.js
  function withRetry(fn, { delay: delay_ = 100, retryCount = 2, shouldRetry: shouldRetry2 = () => true } = {}) {
    return new Promise((resolve, reject) => {
      const attemptRetry = async ({ count = 0 } = {}) => {
        const retry = async ({ error }) => {
          const delay = typeof delay_ === "function" ? delay_({ count, error }) : delay_;
          if (delay)
            await wait(delay);
          attemptRetry({ count: count + 1 });
        };
        try {
          const data = await fn();
          resolve(data);
        } catch (err) {
          if (count < retryCount && await shouldRetry2({ count, error: err }))
            return retry({ error: err });
          reject(err);
        }
      };
      attemptRetry();
    });
  }

  // node_modules/viem/_esm/utils/buildRequest.js
  init_stringify();
  function buildRequest(request, options = {}) {
    return async (args, overrideOptions = {}) => {
      const { dedupe = false, methods, retryDelay = 150, retryCount = 3, uid: uid3 } = {
        ...options,
        ...overrideOptions
      };
      const { method } = args;
      if (methods?.exclude?.includes(method))
        throw new MethodNotSupportedRpcError(new Error("method not supported"), {
          method
        });
      if (methods?.include && !methods.include.includes(method))
        throw new MethodNotSupportedRpcError(new Error("method not supported"), {
          method
        });
      const requestId = dedupe ? stringToHex(`${uid3}.${stringify(args)}`) : void 0;
      return withDedupe(() => withRetry(async () => {
        try {
          return await request(args);
        } catch (err_) {
          const err = err_;
          switch (err.code) {
            // -32700
            case ParseRpcError.code:
              throw new ParseRpcError(err);
            // -32600
            case InvalidRequestRpcError.code:
              throw new InvalidRequestRpcError(err);
            // -32601
            case MethodNotFoundRpcError.code:
              throw new MethodNotFoundRpcError(err, { method: args.method });
            // -32602
            case InvalidParamsRpcError.code:
              throw new InvalidParamsRpcError(err);
            // -32603
            case InternalRpcError.code:
              throw new InternalRpcError(err);
            // -32000
            case InvalidInputRpcError.code:
              throw new InvalidInputRpcError(err);
            // -32001
            case ResourceNotFoundRpcError.code:
              throw new ResourceNotFoundRpcError(err);
            // -32002
            case ResourceUnavailableRpcError.code:
              throw new ResourceUnavailableRpcError(err);
            // -32003
            case TransactionRejectedRpcError.code:
              throw new TransactionRejectedRpcError(err);
            // -32004
            case MethodNotSupportedRpcError.code:
              throw new MethodNotSupportedRpcError(err, {
                method: args.method
              });
            // -32005
            case LimitExceededRpcError.code:
              throw new LimitExceededRpcError(err);
            // -32006
            case JsonRpcVersionUnsupportedError.code:
              throw new JsonRpcVersionUnsupportedError(err);
            // 4001
            case UserRejectedRequestError.code:
              throw new UserRejectedRequestError(err);
            // 4100
            case UnauthorizedProviderError.code:
              throw new UnauthorizedProviderError(err);
            // 4200
            case UnsupportedProviderMethodError.code:
              throw new UnsupportedProviderMethodError(err);
            // 4900
            case ProviderDisconnectedError.code:
              throw new ProviderDisconnectedError(err);
            // 4901
            case ChainDisconnectedError.code:
              throw new ChainDisconnectedError(err);
            // 4902
            case SwitchChainError.code:
              throw new SwitchChainError(err);
            // 5700
            case UnsupportedNonOptionalCapabilityError.code:
              throw new UnsupportedNonOptionalCapabilityError(err);
            // 5710
            case UnsupportedChainIdError.code:
              throw new UnsupportedChainIdError(err);
            // 5720
            case DuplicateIdError.code:
              throw new DuplicateIdError(err);
            // 5730
            case UnknownBundleIdError.code:
              throw new UnknownBundleIdError(err);
            // 5740
            case BundleTooLargeError.code:
              throw new BundleTooLargeError(err);
            // 5750
            case AtomicReadyWalletRejectedUpgradeError.code:
              throw new AtomicReadyWalletRejectedUpgradeError(err);
            // 5760
            case AtomicityNotSupportedError.code:
              throw new AtomicityNotSupportedError(err);
            // CAIP-25: User Rejected Error
            // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes#rejected-caip-25
            case 5e3:
              throw new UserRejectedRequestError(err);
            // WalletConnect: Session Settlement Failed
            // https://docs.walletconnect.com/2.0/specs/clients/sign/error-codes
            case WalletConnectSessionSettlementError.code:
              throw new WalletConnectSessionSettlementError(err);
            default:
              if (err_ instanceof BaseError)
                throw err_;
              throw new UnknownRpcError(err);
          }
        }
      }, {
        delay: ({ count, error }) => {
          if (error && error instanceof HttpRequestError) {
            const retryAfter = error?.headers?.get("Retry-After");
            if (retryAfter?.match(/\d/))
              return Number.parseInt(retryAfter, 10) * 1e3;
          }
          return ~~(1 << count) * retryDelay;
        },
        retryCount,
        shouldRetry: ({ error }) => shouldRetry(error)
      }), { enabled: dedupe, id: requestId });
    };
  }
  function shouldRetry(error) {
    if ("code" in error && typeof error.code === "number") {
      if (error.code === -1)
        return true;
      if (error.code === LimitExceededRpcError.code)
        return true;
      if (error.code === InternalRpcError.code)
        return true;
      return false;
    }
    if (error instanceof HttpRequestError && error.status) {
      if (error.status === 403)
        return true;
      if (error.status === 408)
        return true;
      if (error.status === 413)
        return true;
      if (error.status === 429)
        return true;
      if (error.status === 500)
        return true;
      if (error.status === 502)
        return true;
      if (error.status === 503)
        return true;
      if (error.status === 504)
        return true;
      return false;
    }
    return true;
  }

  // node_modules/viem/_esm/utils/rpc/http.js
  init_request();

  // node_modules/viem/_esm/utils/promise/withTimeout.js
  function withTimeout(fn, { errorInstance = new Error("timed out"), timeout, signal }) {
    return new Promise((resolve, reject) => {
      ;
      (async () => {
        let timeoutId;
        try {
          const controller = new AbortController();
          if (timeout > 0) {
            timeoutId = setTimeout(() => {
              if (signal) {
                controller.abort();
              } else {
                reject(errorInstance);
              }
            }, timeout);
          }
          resolve(await fn({ signal: controller?.signal || null }));
        } catch (err) {
          if (err?.name === "AbortError")
            reject(errorInstance);
          reject(err);
        } finally {
          clearTimeout(timeoutId);
        }
      })();
    });
  }

  // node_modules/viem/_esm/utils/rpc/http.js
  init_stringify();

  // node_modules/viem/_esm/utils/rpc/id.js
  function createIdStore() {
    return {
      current: 0,
      take() {
        return this.current++;
      },
      reset() {
        this.current = 0;
      }
    };
  }
  var idCache = /* @__PURE__ */ createIdStore();

  // node_modules/viem/_esm/utils/rpc/http.js
  function getHttpRpcClient(url_, options = {}) {
    const { url, headers: headers_url } = parseUrl(url_);
    return {
      async request(params) {
        const { body, fetchFn = options.fetchFn ?? fetch, onRequest = options.onRequest, onResponse = options.onResponse, timeout = options.timeout ?? 1e4 } = params;
        const fetchOptions = {
          ...options.fetchOptions ?? {},
          ...params.fetchOptions ?? {}
        };
        const { headers, method, signal: signal_ } = fetchOptions;
        try {
          const response = await withTimeout(async ({ signal }) => {
            const init2 = {
              ...fetchOptions,
              body: Array.isArray(body) ? stringify(body.map((body2) => ({
                jsonrpc: "2.0",
                id: body2.id ?? idCache.take(),
                ...body2
              }))) : stringify({
                jsonrpc: "2.0",
                id: body.id ?? idCache.take(),
                ...body
              }),
              headers: {
                ...headers_url,
                "Content-Type": "application/json",
                ...headers
              },
              method: method || "POST",
              signal: signal_ || (timeout > 0 ? signal : null)
            };
            const request = new Request(url, init2);
            const args = await onRequest?.(request, init2) ?? { ...init2, url };
            const response2 = await fetchFn(args.url ?? url, args);
            return response2;
          }, {
            errorInstance: new TimeoutError({ body, url }),
            timeout,
            signal: true
          });
          if (onResponse)
            await onResponse(response);
          let data;
          if (response.headers.get("Content-Type")?.startsWith("application/json"))
            data = await response.json();
          else {
            data = await response.text();
            try {
              data = JSON.parse(data || "{}");
            } catch (err) {
              if (response.ok)
                throw err;
              data = { error: data };
            }
          }
          if (!response.ok) {
            if (typeof data.error?.code === "number" && typeof data.error?.message === "string")
              return data;
            throw new HttpRequestError({
              body,
              details: stringify(data.error) || response.statusText,
              headers: response.headers,
              status: response.status,
              url
            });
          }
          return data;
        } catch (err) {
          if (err instanceof HttpRequestError)
            throw err;
          if (err instanceof TimeoutError)
            throw err;
          throw new HttpRequestError({
            body,
            cause: err,
            url
          });
        }
      }
    };
  }
  function parseUrl(url_) {
    try {
      const url = new URL(url_);
      const result = (() => {
        if (url.username) {
          const credentials = `${decodeURIComponent(url.username)}:${decodeURIComponent(url.password)}`;
          url.username = "";
          url.password = "";
          return {
            url: url.toString(),
            headers: { Authorization: `Basic ${btoa(credentials)}` }
          };
        }
        return;
      })();
      return { url: url.toString(), ...result };
    } catch {
      return { url: url_ };
    }
  }

  // node_modules/@wagmi/core/dist/esm/version.js
  var version2 = "3.4.1";

  // node_modules/@wagmi/core/dist/esm/utils/getVersion.js
  var getVersion = () => `@wagmi/core@${version2}`;

  // node_modules/@wagmi/core/dist/esm/errors/base.js
  var __classPrivateFieldGet = function(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _BaseError_instances;
  var _BaseError_walk;
  var BaseError2 = class _BaseError extends Error {
    get docsBaseUrl() {
      return "https://wagmi.sh/core";
    }
    get version() {
      return getVersion();
    }
    constructor(shortMessage, options = {}) {
      super();
      _BaseError_instances.add(this);
      Object.defineProperty(this, "details", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "docsPath", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "metaMessages", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "shortMessage", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: void 0
      });
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "WagmiCoreError"
      });
      const details = options.cause instanceof _BaseError ? options.cause.details : options.cause?.message ? options.cause.message : options.details;
      const docsPath = options.cause instanceof _BaseError ? options.cause.docsPath || options.docsPath : options.docsPath;
      this.message = [
        shortMessage || "An error occurred.",
        "",
        ...options.metaMessages ? [...options.metaMessages, ""] : [],
        ...docsPath ? [
          `Docs: ${this.docsBaseUrl}${docsPath}.html${options.docsSlug ? `#${options.docsSlug}` : ""}`
        ] : [],
        ...details ? [`Details: ${details}`] : [],
        `Version: ${this.version}`
      ].join("\n");
      if (options.cause)
        this.cause = options.cause;
      this.details = details;
      this.docsPath = docsPath;
      this.metaMessages = options.metaMessages;
      this.shortMessage = shortMessage;
    }
    walk(fn) {
      return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk).call(this, this, fn);
    }
  };
  _BaseError_instances = /* @__PURE__ */ new WeakSet(), _BaseError_walk = function _BaseError_walk2(err, fn) {
    if (fn?.(err))
      return err;
    if (err.cause)
      return __classPrivateFieldGet(this, _BaseError_instances, "m", _BaseError_walk2).call(this, err.cause, fn);
    return err;
  };

  // node_modules/@wagmi/core/dist/esm/errors/config.js
  var ChainNotConfiguredError = class extends BaseError2 {
    constructor() {
      super("Chain not configured.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "ChainNotConfiguredError"
      });
    }
  };
  var ConnectorAlreadyConnectedError = class extends BaseError2 {
    constructor() {
      super("Connector already connected.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "ConnectorAlreadyConnectedError"
      });
    }
  };

  // node_modules/@wagmi/core/dist/esm/actions/connect.js
  async function connect(config2, parameters) {
    let connector;
    if (typeof parameters.connector === "function") {
      connector = config2._internal.connectors.setup(parameters.connector);
    } else
      connector = parameters.connector;
    if (connector.uid === config2.state.current)
      throw new ConnectorAlreadyConnectedError();
    try {
      config2.setState((x) => ({ ...x, status: "connecting" }));
      connector.emitter.emit("message", { type: "connecting" });
      const { connector: _, ...rest } = parameters;
      const data = await connector.connect(rest);
      connector.emitter.off("connect", config2._internal.events.connect);
      connector.emitter.on("change", config2._internal.events.change);
      connector.emitter.on("disconnect", config2._internal.events.disconnect);
      await config2.storage?.setItem("recentConnectorId", connector.id);
      config2.setState((x) => ({
        ...x,
        connections: new Map(x.connections).set(connector.uid, {
          accounts: rest.withCapabilities ? data.accounts.map((account) => typeof account === "object" ? account.address : account) : data.accounts,
          chainId: data.chainId,
          connector
        }),
        current: connector.uid,
        status: "connected"
      }));
      return {
        // TODO(v3): Remove `withCapabilities: true` default behavior so remove compat marshalling
        // Workaround so downstream connectors work with `withCapabilities` without any changes required
        accounts: rest.withCapabilities ? data.accounts.map((address) => typeof address === "object" ? address : { address, capabilities: {} }) : data.accounts,
        chainId: data.chainId
      };
    } catch (error) {
      config2.setState((x) => ({
        ...x,
        // Keep existing connector connected in case of error
        status: x.current ? "connected" : "disconnected"
      }));
      throw error;
    }
  }

  // node_modules/viem/_esm/clients/createClient.js
  init_parseAccount();

  // node_modules/viem/_esm/utils/uid.js
  var size2 = 256;
  var index = size2;
  var buffer;
  function uid(length = 11) {
    if (!buffer || index + length > size2 * 2) {
      buffer = "";
      index = 0;
      for (let i = 0; i < size2; i++) {
        buffer += (256 + Math.random() * 256 | 0).toString(16).substring(1);
      }
    }
    return buffer.substring(index, index++ + length);
  }

  // node_modules/viem/_esm/clients/createClient.js
  function createClient(parameters) {
    const { batch, chain, ccipRead, dataSuffix, key = "base", name = "Base Client", type = "base" } = parameters;
    const experimental_blockTag = parameters.experimental_blockTag ?? (typeof chain?.experimental_preconfirmationTime === "number" ? "pending" : void 0);
    const blockTime = chain?.blockTime ?? 12e3;
    const defaultPollingInterval = Math.min(Math.max(Math.floor(blockTime / 2), 500), 4e3);
    const pollingInterval = parameters.pollingInterval ?? defaultPollingInterval;
    const cacheTime = parameters.cacheTime ?? pollingInterval;
    const account = parameters.account ? parseAccount(parameters.account) : void 0;
    const { config: config2, request, value } = parameters.transport({
      account,
      chain,
      pollingInterval
    });
    const transport = { ...config2, ...value };
    const client = {
      account,
      batch,
      cacheTime,
      ccipRead,
      chain,
      dataSuffix,
      key,
      name,
      pollingInterval,
      request,
      transport,
      type,
      uid: uid(),
      ...experimental_blockTag ? { experimental_blockTag } : {}
    };
    function extend(base2) {
      return (extendFn) => {
        const extended = extendFn(base2);
        for (const key2 in client)
          delete extended[key2];
        const combined = { ...base2, ...extended };
        return Object.assign(combined, { extend: extend(combined) });
      };
    }
    return Object.assign(client, { extend: extend(client) });
  }

  // node_modules/viem/_esm/clients/transports/createTransport.js
  function createTransport({ key, methods, name, request, retryCount = 3, retryDelay = 150, timeout, type }, value) {
    const uid3 = uid();
    return {
      config: {
        key,
        methods,
        name,
        request,
        retryCount,
        retryDelay,
        timeout,
        type
      },
      request: buildRequest(request, { methods, retryCount, retryDelay, uid: uid3 }),
      value
    };
  }

  // node_modules/viem/_esm/clients/transports/http.js
  init_request();

  // node_modules/viem/_esm/errors/transport.js
  init_base();
  var UrlRequiredError = class extends BaseError {
    constructor() {
      super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.", {
        docsPath: "/docs/clients/intro",
        name: "UrlRequiredError"
      });
    }
  };

  // node_modules/viem/_esm/clients/transports/http.js
  init_createBatchScheduler();
  function http(url, config2 = {}) {
    const { batch, fetchFn, fetchOptions, key = "http", methods, name = "HTTP JSON-RPC", onFetchRequest, onFetchResponse, retryDelay, raw } = config2;
    return ({ chain, retryCount: retryCount_, timeout: timeout_ }) => {
      const { batchSize = 1e3, wait: wait2 = 0 } = typeof batch === "object" ? batch : {};
      const retryCount = config2.retryCount ?? retryCount_;
      const timeout = timeout_ ?? config2.timeout ?? 1e4;
      const url_ = url || chain?.rpcUrls.default.http[0];
      if (!url_)
        throw new UrlRequiredError();
      const rpcClient = getHttpRpcClient(url_, {
        fetchFn,
        fetchOptions,
        onRequest: onFetchRequest,
        onResponse: onFetchResponse,
        timeout
      });
      return createTransport({
        key,
        methods,
        name,
        async request({ method, params }) {
          const body = { method, params };
          const { schedule } = createBatchScheduler({
            id: url_,
            wait: wait2,
            shouldSplitBatch(requests) {
              return requests.length > batchSize;
            },
            fn: (body2) => rpcClient.request({
              body: body2
            }),
            sort: (a, b) => a.id - b.id
          });
          const fn = async (body2) => batch ? schedule(body2) : [
            await rpcClient.request({
              body: body2
            })
          ];
          const [{ error, result }] = await fn(body);
          if (raw)
            return { error, result };
          if (error)
            throw new RpcRequestError({
              body,
              error,
              url: url_
            });
          return result;
        },
        retryCount,
        retryDelay,
        timeout,
        type: "http"
      }, {
        fetchOptions,
        url: url_
      });
    };
  }

  // node_modules/viem/_esm/index.js
  init_rpc();
  init_getAddress();
  init_toHex();

  // node_modules/@wagmi/core/dist/esm/actions/disconnect.js
  async function disconnect(config2, parameters = {}) {
    let connector;
    if (parameters.connector)
      connector = parameters.connector;
    else {
      const { connections: connections2, current } = config2.state;
      const connection = connections2.get(current);
      connector = connection?.connector;
    }
    const connections = config2.state.connections;
    if (connector) {
      await connector.disconnect();
      connector.emitter.off("change", config2._internal.events.change);
      connector.emitter.off("disconnect", config2._internal.events.disconnect);
      connector.emitter.on("connect", config2._internal.events.connect);
      connections.delete(connector.uid);
    }
    config2.setState((x) => {
      if (connections.size === 0)
        return {
          ...x,
          connections: /* @__PURE__ */ new Map(),
          current: null,
          status: "disconnected"
        };
      const nextConnection = connections.values().next().value;
      return {
        ...x,
        connections: new Map(connections),
        current: nextConnection.connector.uid
      };
    });
    {
      const current = config2.state.current;
      if (!current)
        return;
      const connector2 = config2.state.connections.get(current)?.connector;
      if (!connector2)
        return;
      await config2.storage?.setItem("recentConnectorId", connector2.id);
    }
  }

  // node_modules/@wagmi/core/dist/esm/utils/deepEqual.js
  function deepEqual(a, b) {
    if (a === b)
      return true;
    if (a && b && typeof a === "object" && typeof b === "object") {
      if (a.constructor !== b.constructor)
        return false;
      let length;
      let i;
      if (Array.isArray(a) && Array.isArray(b)) {
        length = a.length;
        if (length !== b.length)
          return false;
        for (i = length; i-- !== 0; )
          if (!deepEqual(a[i], b[i]))
            return false;
        return true;
      }
      if (typeof a.valueOf === "function" && a.valueOf !== Object.prototype.valueOf)
        return a.valueOf() === b.valueOf();
      if (typeof a.toString === "function" && a.toString !== Object.prototype.toString)
        return a.toString() === b.toString();
      const keys = Object.keys(a);
      length = keys.length;
      if (length !== Object.keys(b).length)
        return false;
      for (i = length; i-- !== 0; )
        if (!Object.hasOwn(b, keys[i]))
          return false;
      for (i = length; i-- !== 0; ) {
        const key = keys[i];
        if (key && !deepEqual(a[key], b[key]))
          return false;
      }
      return true;
    }
    return a !== a && b !== b;
  }

  // node_modules/@wagmi/core/dist/esm/actions/getConnection.js
  function getConnection(config2) {
    const uid3 = config2.state.current;
    const connection = config2.state.connections.get(uid3);
    const addresses = connection?.accounts;
    const address = addresses?.[0];
    const chain = config2.chains.find((chain2) => chain2.id === connection?.chainId);
    const status = config2.state.status;
    switch (status) {
      case "connected":
        return {
          address,
          addresses,
          chain,
          chainId: connection?.chainId,
          connector: connection?.connector,
          isConnected: true,
          isConnecting: false,
          isDisconnected: false,
          isReconnecting: false,
          status
        };
      case "reconnecting":
        return {
          address,
          addresses,
          chain,
          chainId: connection?.chainId,
          connector: connection?.connector,
          isConnected: !!address,
          isConnecting: false,
          isDisconnected: false,
          isReconnecting: true,
          status
        };
      case "connecting":
        return {
          address,
          addresses,
          chain,
          chainId: connection?.chainId,
          connector: connection?.connector,
          isConnected: false,
          isConnecting: true,
          isDisconnected: false,
          isReconnecting: false,
          status
        };
      case "disconnected":
        return {
          address: void 0,
          addresses: void 0,
          chain: void 0,
          chainId: void 0,
          connector: void 0,
          isConnected: false,
          isConnecting: false,
          isDisconnected: true,
          isReconnecting: false,
          status
        };
    }
  }

  // node_modules/@wagmi/core/dist/esm/actions/getConnectors.js
  var previousConnectors = [];
  function getConnectors(config2) {
    const connectors = config2.connectors;
    if (previousConnectors.length === connectors.length && previousConnectors.every((connector, index3) => connector === connectors[index3]))
      return previousConnectors;
    previousConnectors = connectors;
    return connectors;
  }

  // node_modules/@wagmi/core/dist/esm/actions/reconnect.js
  var isReconnecting = false;
  async function reconnect(config2, parameters = {}) {
    if (isReconnecting)
      return [];
    isReconnecting = true;
    config2.setState((x) => ({
      ...x,
      status: x.current ? "reconnecting" : "connecting"
    }));
    const connectors = [];
    if (parameters.connectors?.length) {
      for (const connector_ of parameters.connectors) {
        let connector;
        if (typeof connector_ === "function")
          connector = config2._internal.connectors.setup(connector_);
        else
          connector = connector_;
        connectors.push(connector);
      }
    } else
      connectors.push(...config2.connectors);
    let recentConnectorId;
    try {
      recentConnectorId = await config2.storage?.getItem("recentConnectorId");
    } catch {
    }
    const scores = {};
    for (const [, connection] of config2.state.connections) {
      scores[connection.connector.id] = 1;
    }
    if (recentConnectorId)
      scores[recentConnectorId] = 0;
    const sorted = Object.keys(scores).length > 0 ? (
      // .toSorted()
      [...connectors].sort((a, b) => (scores[a.id] ?? 10) - (scores[b.id] ?? 10))
    ) : connectors;
    let connected = false;
    const connections = [];
    const providers = [];
    for (const connector of sorted) {
      const provider = await connector.getProvider().catch(() => void 0);
      if (!provider)
        continue;
      if (providers.some((x) => x === provider))
        continue;
      const isAuthorized = await connector.isAuthorized();
      if (!isAuthorized)
        continue;
      const data = await connector.connect({ isReconnecting: true }).catch(() => null);
      if (!data)
        continue;
      connector.emitter.off("connect", config2._internal.events.connect);
      connector.emitter.on("change", config2._internal.events.change);
      connector.emitter.on("disconnect", config2._internal.events.disconnect);
      config2.setState((x) => {
        const connections2 = new Map(connected ? x.connections : /* @__PURE__ */ new Map()).set(connector.uid, { accounts: data.accounts, chainId: data.chainId, connector });
        return {
          ...x,
          current: connected ? x.current : connector.uid,
          connections: connections2
        };
      });
      connections.push({
        accounts: data.accounts,
        chainId: data.chainId,
        connector
      });
      providers.push(provider);
      connected = true;
    }
    if (config2.state.status === "reconnecting" || config2.state.status === "connecting") {
      if (!connected)
        config2.setState((x) => ({
          ...x,
          connections: /* @__PURE__ */ new Map(),
          current: null,
          status: "disconnected"
        }));
      else
        config2.setState((x) => ({ ...x, status: "connected" }));
    }
    isReconnecting = false;
    return connections;
  }

  // node_modules/@wagmi/core/dist/esm/errors/connector.js
  var ProviderNotFoundError = class extends BaseError2 {
    constructor() {
      super("Provider not found.");
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "ProviderNotFoundError"
      });
    }
  };
  var SwitchChainNotSupportedError = class extends BaseError2 {
    constructor({ connector }) {
      super(`"${connector.name}" does not support programmatic chain switching.`);
      Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: "SwitchChainNotSupportedError"
      });
    }
  };

  // node_modules/@wagmi/core/dist/esm/actions/switchChain.js
  async function switchChain(config2, parameters) {
    const { addEthereumChainParameter, chainId } = parameters;
    const connection = config2.state.connections.get(parameters.connector?.uid ?? config2.state.current);
    if (connection) {
      const connector = connection.connector;
      if (!connector.switchChain)
        throw new SwitchChainNotSupportedError({ connector });
      const chain2 = await connector.switchChain({
        addEthereumChainParameter,
        chainId
      });
      return chain2;
    }
    const chain = config2.chains.find((x) => x.id === chainId);
    if (!chain)
      throw new ChainNotConfiguredError();
    config2.setState((x) => ({ ...x, chainId }));
    return chain;
  }

  // node_modules/@wagmi/core/dist/esm/actions/watchConnection.js
  function watchConnection(config2, parameters) {
    const { onChange } = parameters;
    return config2.subscribe(() => getConnection(config2), onChange, {
      equalityFn(a, b) {
        const { connector: aConnector, ...aRest } = a;
        const { connector: bConnector, ...bRest } = b;
        return deepEqual(aRest, bRest) && // check connector separately
        aConnector?.id === bConnector?.id && aConnector?.uid === bConnector?.uid;
      }
    });
  }

  // node_modules/@wagmi/core/dist/esm/connectors/createConnector.js
  function createConnector(createConnectorFn) {
    return createConnectorFn;
  }

  // node_modules/@wagmi/core/dist/esm/connectors/injected.js
  injected.type = "injected";
  function injected(parameters = {}) {
    const { shimDisconnect = true, unstable_shimAsyncInject } = parameters;
    function getTarget() {
      const target = parameters.target;
      if (typeof target === "function") {
        const result = target();
        if (result)
          return result;
      }
      if (typeof target === "object")
        return target;
      if (typeof target === "string")
        return {
          ...targetMap[target] ?? {
            id: target,
            name: `${target[0].toUpperCase()}${target.slice(1)}`,
            provider: `is${target[0].toUpperCase()}${target.slice(1)}`
          }
        };
      return {
        id: "injected",
        name: "Injected",
        provider(window2) {
          return window2?.ethereum;
        }
      };
    }
    let accountsChanged;
    let chainChanged;
    let connect3;
    let disconnect3;
    return createConnector((config2) => ({
      get icon() {
        return getTarget().icon;
      },
      get id() {
        return getTarget().id;
      },
      get name() {
        return getTarget().name;
      },
      type: injected.type,
      async setup() {
        const provider = await this.getProvider();
        if (provider?.on && parameters.target) {
          if (!connect3) {
            connect3 = this.onConnect.bind(this);
            provider.on("connect", connect3);
          }
          if (!accountsChanged) {
            accountsChanged = this.onAccountsChanged.bind(this);
            provider.on("accountsChanged", accountsChanged);
          }
        }
      },
      async connect({ chainId, isReconnecting: isReconnecting2, withCapabilities } = {}) {
        const provider = await this.getProvider();
        if (!provider)
          throw new ProviderNotFoundError();
        let accounts = [];
        if (isReconnecting2)
          accounts = await this.getAccounts().catch(() => []);
        else if (shimDisconnect) {
          try {
            const permissions = await provider.request({
              method: "wallet_requestPermissions",
              params: [{ eth_accounts: {} }]
            });
            accounts = permissions[0]?.caveats?.[0]?.value?.map((x) => getAddress(x));
            if (accounts.length > 0) {
              const sortedAccounts = await this.getAccounts();
              accounts = sortedAccounts;
            }
          } catch (err) {
            const error = err;
            if (error.code === UserRejectedRequestError.code)
              throw new UserRejectedRequestError(error);
            if (error.code === ResourceUnavailableRpcError.code)
              throw error;
          }
        }
        try {
          if (!accounts?.length && !isReconnecting2) {
            const requestedAccounts = await provider.request({
              method: "eth_requestAccounts"
            });
            accounts = requestedAccounts.map((x) => getAddress(x));
          }
          if (connect3) {
            provider.removeListener("connect", connect3);
            connect3 = void 0;
          }
          if (!accountsChanged) {
            accountsChanged = this.onAccountsChanged.bind(this);
            provider.on("accountsChanged", accountsChanged);
          }
          if (!chainChanged) {
            chainChanged = this.onChainChanged.bind(this);
            provider.on("chainChanged", chainChanged);
          }
          if (!disconnect3) {
            disconnect3 = this.onDisconnect.bind(this);
            provider.on("disconnect", disconnect3);
          }
          let currentChainId = await this.getChainId();
          if (chainId && currentChainId !== chainId) {
            const chain = await this.switchChain({ chainId }).catch((error) => {
              if (error.code === UserRejectedRequestError.code)
                throw error;
              return { id: currentChainId };
            });
            currentChainId = chain?.id ?? currentChainId;
          }
          if (shimDisconnect)
            await config2.storage?.removeItem(`${this.id}.disconnected`);
          if (!parameters.target)
            await config2.storage?.setItem("injected.connected", true);
          return {
            accounts: withCapabilities ? accounts.map((address) => ({ address, capabilities: {} })) : accounts,
            chainId: currentChainId
          };
        } catch (err) {
          const error = err;
          if (error.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(error);
          if (error.code === ResourceUnavailableRpcError.code)
            throw new ResourceUnavailableRpcError(error);
          throw error;
        }
      },
      async disconnect() {
        const provider = await this.getProvider();
        if (!provider)
          throw new ProviderNotFoundError();
        if (chainChanged) {
          provider.removeListener("chainChanged", chainChanged);
          chainChanged = void 0;
        }
        if (disconnect3) {
          provider.removeListener("disconnect", disconnect3);
          disconnect3 = void 0;
        }
        if (!connect3) {
          connect3 = this.onConnect.bind(this);
          provider.on("connect", connect3);
        }
        try {
          await withTimeout(() => (
            // TODO: Remove explicit type for viem@3
            provider.request({
              // `'wallet_revokePermissions'` added in `viem@2.10.3`
              method: "wallet_revokePermissions",
              params: [{ eth_accounts: {} }]
            })
          ), { timeout: 100 });
        } catch {
        }
        if (shimDisconnect) {
          await config2.storage?.setItem(`${this.id}.disconnected`, true);
        }
        if (!parameters.target)
          await config2.storage?.removeItem("injected.connected");
      },
      async getAccounts() {
        const provider = await this.getProvider();
        if (!provider)
          throw new ProviderNotFoundError();
        const accounts = await provider.request({ method: "eth_accounts" });
        return accounts.map((x) => getAddress(x));
      },
      async getChainId() {
        const provider = await this.getProvider();
        if (!provider)
          throw new ProviderNotFoundError();
        const hexChainId = await provider.request({ method: "eth_chainId" });
        return Number(hexChainId);
      },
      async getProvider() {
        if (typeof window === "undefined")
          return void 0;
        let provider;
        const target = getTarget();
        if (typeof target.provider === "function")
          provider = target.provider(window);
        else if (typeof target.provider === "string")
          provider = findProvider(window, target.provider);
        else
          provider = target.provider;
        if (provider && !provider.removeListener) {
          if ("off" in provider && typeof provider.off === "function")
            provider.removeListener = provider.off;
          else
            provider.removeListener = () => {
            };
        }
        return provider;
      },
      async isAuthorized() {
        try {
          const isDisconnected = shimDisconnect && // If shim exists in storage, connector is disconnected
          await config2.storage?.getItem(`${this.id}.disconnected`);
          if (isDisconnected)
            return false;
          if (!parameters.target) {
            const connected = await config2.storage?.getItem("injected.connected");
            if (!connected)
              return false;
          }
          const provider = await this.getProvider();
          if (!provider) {
            if (unstable_shimAsyncInject !== void 0 && unstable_shimAsyncInject !== false) {
              const handleEthereum = async () => {
                if (typeof window !== "undefined")
                  window.removeEventListener("ethereum#initialized", handleEthereum);
                const provider2 = await this.getProvider();
                return !!provider2;
              };
              const timeout = typeof unstable_shimAsyncInject === "number" ? unstable_shimAsyncInject : 1e3;
              const res = await Promise.race([
                ...typeof window !== "undefined" ? [
                  new Promise((resolve) => window.addEventListener("ethereum#initialized", () => resolve(handleEthereum()), { once: true }))
                ] : [],
                new Promise((resolve) => setTimeout(() => resolve(handleEthereum()), timeout))
              ]);
              if (res)
                return true;
            }
            throw new ProviderNotFoundError();
          }
          const accounts = await withRetry(() => this.getAccounts());
          return !!accounts.length;
        } catch {
          return false;
        }
      },
      async switchChain({ addEthereumChainParameter, chainId }) {
        const provider = await this.getProvider();
        if (!provider)
          throw new ProviderNotFoundError();
        const chain = config2.chains.find((x) => x.id === chainId);
        if (!chain)
          throw new SwitchChainError(new ChainNotConfiguredError());
        const promise = new Promise((resolve) => {
          const listener = ((data) => {
            if ("chainId" in data && data.chainId === chainId) {
              config2.emitter.off("change", listener);
              resolve();
            }
          });
          config2.emitter.on("change", listener);
        });
        try {
          await Promise.all([
            provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: numberToHex(chainId) }]
            }).then(async () => {
              const currentChainId = await this.getChainId();
              if (currentChainId === chainId)
                config2.emitter.emit("change", { chainId });
            }),
            promise
          ]);
          return chain;
        } catch (err) {
          const error = err;
          if (error.code === 4902 || // Unwrapping for MetaMask Mobile
          // https://github.com/MetaMask/metamask-mobile/issues/2944#issuecomment-976988719
          error?.data?.originalError?.code === 4902) {
            try {
              const { default: blockExplorer, ...blockExplorers } = chain.blockExplorers ?? {};
              let blockExplorerUrls;
              if (addEthereumChainParameter?.blockExplorerUrls)
                blockExplorerUrls = addEthereumChainParameter.blockExplorerUrls;
              else if (blockExplorer)
                blockExplorerUrls = [
                  blockExplorer.url,
                  ...Object.values(blockExplorers).map((x) => x.url)
                ];
              let rpcUrls;
              if (addEthereumChainParameter?.rpcUrls?.length)
                rpcUrls = addEthereumChainParameter.rpcUrls;
              else
                rpcUrls = [chain.rpcUrls.default?.http[0] ?? ""];
              const addEthereumChain = {
                blockExplorerUrls,
                chainId: numberToHex(chainId),
                chainName: addEthereumChainParameter?.chainName ?? chain.name,
                iconUrls: addEthereumChainParameter?.iconUrls,
                nativeCurrency: addEthereumChainParameter?.nativeCurrency ?? chain.nativeCurrency,
                rpcUrls
              };
              await Promise.all([
                provider.request({
                  method: "wallet_addEthereumChain",
                  params: [addEthereumChain]
                }).then(async () => {
                  const currentChainId = await this.getChainId();
                  if (currentChainId === chainId)
                    config2.emitter.emit("change", { chainId });
                  else
                    throw new UserRejectedRequestError(new Error("User rejected switch after adding network."));
                }),
                promise
              ]);
              return chain;
            } catch (error2) {
              throw new UserRejectedRequestError(error2);
            }
          }
          if (error.code === UserRejectedRequestError.code)
            throw new UserRejectedRequestError(error);
          throw new SwitchChainError(error);
        }
      },
      async onAccountsChanged(accounts) {
        if (accounts.length === 0)
          this.onDisconnect();
        else if (config2.emitter.listenerCount("connect")) {
          const chainId = (await this.getChainId()).toString();
          this.onConnect({ chainId });
          if (shimDisconnect)
            await config2.storage?.removeItem(`${this.id}.disconnected`);
        } else
          config2.emitter.emit("change", {
            accounts: accounts.map((x) => getAddress(x))
          });
      },
      onChainChanged(chain) {
        const chainId = Number(chain);
        config2.emitter.emit("change", { chainId });
      },
      async onConnect(connectInfo) {
        const accounts = await this.getAccounts();
        if (accounts.length === 0)
          return;
        const chainId = Number(connectInfo.chainId);
        config2.emitter.emit("connect", { accounts, chainId });
        const provider = await this.getProvider();
        if (provider) {
          if (connect3) {
            provider.removeListener("connect", connect3);
            connect3 = void 0;
          }
          if (!accountsChanged) {
            accountsChanged = this.onAccountsChanged.bind(this);
            provider.on("accountsChanged", accountsChanged);
          }
          if (!chainChanged) {
            chainChanged = this.onChainChanged.bind(this);
            provider.on("chainChanged", chainChanged);
          }
          if (!disconnect3) {
            disconnect3 = this.onDisconnect.bind(this);
            provider.on("disconnect", disconnect3);
          }
        }
      },
      async onDisconnect(error) {
        const provider = await this.getProvider();
        if (error && error.code === 1013) {
          if (provider && !!(await this.getAccounts()).length)
            return;
        }
        config2.emitter.emit("disconnect");
        if (provider) {
          if (chainChanged) {
            provider.removeListener("chainChanged", chainChanged);
            chainChanged = void 0;
          }
          if (disconnect3) {
            provider.removeListener("disconnect", disconnect3);
            disconnect3 = void 0;
          }
          if (!connect3) {
            connect3 = this.onConnect.bind(this);
            provider.on("connect", connect3);
          }
        }
      }
    }));
  }
  var targetMap = {
    coinbaseWallet: {
      id: "coinbaseWallet",
      name: "Coinbase Wallet",
      provider(window2) {
        if (window2?.coinbaseWalletExtension)
          return window2.coinbaseWalletExtension;
        return findProvider(window2, "isCoinbaseWallet");
      }
    },
    metaMask: {
      id: "metaMask",
      name: "MetaMask",
      provider(window2) {
        return findProvider(window2, (provider) => {
          if (!provider.isMetaMask)
            return false;
          if (provider.isBraveWallet && !provider._events && !provider._state)
            return false;
          const flags = [
            "isApexWallet",
            "isAvalanche",
            "isBitKeep",
            "isBlockWallet",
            "isKuCoinWallet",
            "isMathWallet",
            "isOkxWallet",
            "isOKExWallet",
            "isOneInchIOSWallet",
            "isOneInchAndroidWallet",
            "isOpera",
            "isPhantom",
            "isPortal",
            "isRabby",
            "isTokenPocket",
            "isTokenary",
            "isUniswapWallet",
            "isZerion"
          ];
          for (const flag of flags)
            if (provider[flag])
              return false;
          return true;
        });
      }
    },
    phantom: {
      id: "phantom",
      name: "Phantom",
      provider(window2) {
        if (window2?.phantom?.ethereum)
          return window2.phantom?.ethereum;
        return findProvider(window2, "isPhantom");
      }
    }
  };
  function findProvider(window2, select) {
    function isProvider(provider) {
      if (typeof select === "function")
        return select(provider);
      if (typeof select === "string")
        return provider[select];
      return true;
    }
    const ethereum = window2.ethereum;
    if (ethereum?.providers)
      return ethereum.providers.find((provider) => isProvider(provider));
    if (ethereum && isProvider(ethereum))
      return ethereum;
    return void 0;
  }

  // node_modules/mipd/dist/esm/utils.js
  function requestProviders(listener) {
    if (typeof window === "undefined")
      return;
    const handler = (event) => listener(event.detail);
    window.addEventListener("eip6963:announceProvider", handler);
    window.dispatchEvent(new CustomEvent("eip6963:requestProvider"));
    return () => window.removeEventListener("eip6963:announceProvider", handler);
  }

  // node_modules/mipd/dist/esm/store.js
  function createStore() {
    const listeners = /* @__PURE__ */ new Set();
    let providerDetails = [];
    const request = () => requestProviders((providerDetail) => {
      if (providerDetails.some(({ info }) => info.uuid === providerDetail.info.uuid))
        return;
      providerDetails = [...providerDetails, providerDetail];
      listeners.forEach((listener) => listener(providerDetails, { added: [providerDetail] }));
    });
    let unwatch = request();
    return {
      _listeners() {
        return listeners;
      },
      clear() {
        listeners.forEach((listener) => listener([], { removed: [...providerDetails] }));
        providerDetails = [];
      },
      destroy() {
        this.clear();
        listeners.clear();
        unwatch?.();
      },
      findProvider({ rdns }) {
        return providerDetails.find((providerDetail) => providerDetail.info.rdns === rdns);
      },
      getProviders() {
        return providerDetails;
      },
      reset() {
        this.clear();
        unwatch?.();
        unwatch = request();
      },
      subscribe(listener, { emitImmediately } = {}) {
        listeners.add(listener);
        if (emitImmediately)
          listener(providerDetails, { added: providerDetails });
        return () => listeners.delete(listener);
      }
    };
  }

  // node_modules/zustand/esm/middleware.mjs
  var subscribeWithSelectorImpl = (fn) => (set, get, api) => {
    const origSubscribe = api.subscribe;
    api.subscribe = (selector, optListener, options) => {
      let listener = selector;
      if (optListener) {
        const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
        let currentSlice = selector(api.getState());
        listener = (state) => {
          const nextSlice = selector(state);
          if (!equalityFn(currentSlice, nextSlice)) {
            const previousSlice = currentSlice;
            optListener(currentSlice = nextSlice, previousSlice);
          }
        };
        if (options == null ? void 0 : options.fireImmediately) {
          optListener(currentSlice, currentSlice);
        }
      }
      return origSubscribe(listener);
    };
    const initialState = fn(set, get, api);
    return initialState;
  };
  var subscribeWithSelector = subscribeWithSelectorImpl;
  function createJSONStorage(getStorage, options) {
    let storage;
    try {
      storage = getStorage();
    } catch (e) {
      return;
    }
    const persistStorage = {
      getItem: (name) => {
        var _a;
        const parse = (str2) => {
          if (str2 === null) {
            return null;
          }
          return JSON.parse(str2, options == null ? void 0 : options.reviver);
        };
        const str = (_a = storage.getItem(name)) != null ? _a : null;
        if (str instanceof Promise) {
          return str.then(parse);
        }
        return parse(str);
      },
      setItem: (name, newValue) => storage.setItem(
        name,
        JSON.stringify(newValue, options == null ? void 0 : options.replacer)
      ),
      removeItem: (name) => storage.removeItem(name)
    };
    return persistStorage;
  }
  var toThenable = (fn) => (input) => {
    try {
      const result = fn(input);
      if (result instanceof Promise) {
        return result;
      }
      return {
        then(onFulfilled) {
          return toThenable(onFulfilled)(result);
        },
        catch(_onRejected) {
          return this;
        }
      };
    } catch (e) {
      return {
        then(_onFulfilled) {
          return this;
        },
        catch(onRejected) {
          return toThenable(onRejected)(e);
        }
      };
    }
  };
  var persistImpl = (config2, baseOptions) => (set, get, api) => {
    let options = {
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => state,
      version: 0,
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState
      }),
      ...baseOptions
    };
    let hasHydrated = false;
    const hydrationListeners = /* @__PURE__ */ new Set();
    const finishHydrationListeners = /* @__PURE__ */ new Set();
    let storage = options.storage;
    if (!storage) {
      return config2(
        (...args) => {
          console.warn(
            `[zustand persist middleware] Unable to update item '${options.name}', the given storage is currently unavailable.`
          );
          set(...args);
        },
        get,
        api
      );
    }
    const setItem = () => {
      const state = options.partialize({ ...get() });
      return storage.setItem(options.name, {
        state,
        version: options.version
      });
    };
    const savedSetState = api.setState;
    api.setState = (state, replace) => {
      savedSetState(state, replace);
      void setItem();
    };
    const configResult = config2(
      (...args) => {
        set(...args);
        void setItem();
      },
      get,
      api
    );
    api.getInitialState = () => configResult;
    let stateFromStorage;
    const hydrate = () => {
      var _a, _b;
      if (!storage) return;
      hasHydrated = false;
      hydrationListeners.forEach((cb) => {
        var _a2;
        return cb((_a2 = get()) != null ? _a2 : configResult);
      });
      const postRehydrationCallback = ((_b = options.onRehydrateStorage) == null ? void 0 : _b.call(options, (_a = get()) != null ? _a : configResult)) || void 0;
      return toThenable(storage.getItem.bind(storage))(options.name).then((deserializedStorageValue) => {
        if (deserializedStorageValue) {
          if (typeof deserializedStorageValue.version === "number" && deserializedStorageValue.version !== options.version) {
            if (options.migrate) {
              return [
                true,
                options.migrate(
                  deserializedStorageValue.state,
                  deserializedStorageValue.version
                )
              ];
            }
            console.error(
              `State loaded from storage couldn't be migrated since no migrate function was provided`
            );
          } else {
            return [false, deserializedStorageValue.state];
          }
        }
        return [false, void 0];
      }).then((migrationResult) => {
        var _a2;
        const [migrated, migratedState] = migrationResult;
        stateFromStorage = options.merge(
          migratedState,
          (_a2 = get()) != null ? _a2 : configResult
        );
        set(stateFromStorage, true);
        if (migrated) {
          return setItem();
        }
      }).then(() => {
        postRehydrationCallback == null ? void 0 : postRehydrationCallback(stateFromStorage, void 0);
        stateFromStorage = get();
        hasHydrated = true;
        finishHydrationListeners.forEach((cb) => cb(stateFromStorage));
      }).catch((e) => {
        postRehydrationCallback == null ? void 0 : postRehydrationCallback(void 0, e);
      });
    };
    api.persist = {
      setOptions: (newOptions) => {
        options = {
          ...options,
          ...newOptions
        };
        if (newOptions.storage) {
          storage = newOptions.storage;
        }
      },
      clearStorage: () => {
        storage == null ? void 0 : storage.removeItem(options.name);
      },
      getOptions: () => options,
      rehydrate: () => hydrate(),
      hasHydrated: () => hasHydrated,
      onHydrate: (cb) => {
        hydrationListeners.add(cb);
        return () => {
          hydrationListeners.delete(cb);
        };
      },
      onFinishHydration: (cb) => {
        finishHydrationListeners.add(cb);
        return () => {
          finishHydrationListeners.delete(cb);
        };
      }
    };
    if (!options.skipHydration) {
      hydrate();
    }
    return stateFromStorage || configResult;
  };
  var persist = persistImpl;

  // node_modules/zustand/esm/vanilla.mjs
  var createStoreImpl = (createState) => {
    let state;
    const listeners = /* @__PURE__ */ new Set();
    const setState = (partial, replace) => {
      const nextState = typeof partial === "function" ? partial(state) : partial;
      if (!Object.is(nextState, state)) {
        const previousState = state;
        state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
        listeners.forEach((listener) => listener(state, previousState));
      }
    };
    const getState2 = () => state;
    const getInitialState = () => initialState;
    const subscribe2 = (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    };
    const api = { setState, getState: getState2, getInitialState, subscribe: subscribe2 };
    const initialState = state = createState(setState, getState2, api);
    return api;
  };
  var createStore2 = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;

  // node_modules/eventemitter3/index.mjs
  var import_index = __toESM(require_eventemitter3(), 1);

  // node_modules/@wagmi/core/dist/esm/createEmitter.js
  var Emitter = class {
    constructor(uid3) {
      Object.defineProperty(this, "uid", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: uid3
      });
      Object.defineProperty(this, "_emitter", {
        enumerable: true,
        configurable: true,
        writable: true,
        value: new import_index.default()
      });
    }
    on(eventName, fn) {
      this._emitter.on(eventName, fn);
    }
    once(eventName, fn) {
      this._emitter.once(eventName, fn);
    }
    off(eventName, fn) {
      this._emitter.off(eventName, fn);
    }
    emit(eventName, ...params) {
      const data = params[0];
      this._emitter.emit(eventName, { uid: this.uid, ...data });
    }
    listenerCount(eventName) {
      return this._emitter.listenerCount(eventName);
    }
  };
  function createEmitter(uid3) {
    return new Emitter(uid3);
  }

  // node_modules/@wagmi/core/dist/esm/utils/deserialize.js
  function deserialize(value, reviver) {
    return JSON.parse(value, (key, value_) => {
      let value2 = value_;
      if (value2?.__type === "bigint")
        value2 = BigInt(value2.value);
      if (value2?.__type === "Map")
        value2 = new Map(value2.value);
      return reviver?.(key, value2) ?? value2;
    });
  }

  // node_modules/@wagmi/core/dist/esm/utils/serialize.js
  function getReferenceKey(keys, cutoff) {
    return keys.slice(0, cutoff).join(".") || ".";
  }
  function getCutoff(array, value) {
    const { length } = array;
    for (let index3 = 0; index3 < length; ++index3) {
      if (array[index3] === value) {
        return index3 + 1;
      }
    }
    return 0;
  }
  function createReplacer(replacer, circularReplacer) {
    const hasReplacer = typeof replacer === "function";
    const hasCircularReplacer = typeof circularReplacer === "function";
    const cache = [];
    const keys = [];
    return function replace(key, value) {
      if (typeof value === "object") {
        if (cache.length) {
          const thisCutoff = getCutoff(cache, this);
          if (thisCutoff === 0) {
            cache[cache.length] = this;
          } else {
            cache.splice(thisCutoff);
            keys.splice(thisCutoff);
          }
          keys[keys.length] = key;
          const valueCutoff = getCutoff(cache, value);
          if (valueCutoff !== 0) {
            return hasCircularReplacer ? circularReplacer.call(this, key, value, getReferenceKey(keys, valueCutoff)) : `[ref=${getReferenceKey(keys, valueCutoff)}]`;
          }
        } else {
          cache[0] = value;
          keys[0] = key;
        }
      }
      return hasReplacer ? replacer.call(this, key, value) : value;
    };
  }
  function serialize(value, replacer, indent, circularReplacer) {
    return JSON.stringify(value, createReplacer((key, value_) => {
      let value2 = value_;
      if (typeof value2 === "bigint")
        value2 = { __type: "bigint", value: value_.toString() };
      if (value2 instanceof Map)
        value2 = { __type: "Map", value: Array.from(value_.entries()) };
      return replacer?.(key, value2) ?? value2;
    }, circularReplacer), indent ?? void 0);
  }

  // node_modules/@wagmi/core/dist/esm/createStorage.js
  function createStorage(parameters) {
    const { deserialize: deserialize2 = deserialize, key: prefix = "wagmi", serialize: serialize2 = serialize, storage = noopStorage } = parameters;
    function unwrap(value) {
      if (value instanceof Promise)
        return value.then((x) => x).catch(() => null);
      return value;
    }
    return {
      ...storage,
      key: prefix,
      async getItem(key, defaultValue) {
        const value = storage.getItem(`${prefix}.${key}`);
        const unwrapped = await unwrap(value);
        if (unwrapped)
          return deserialize2(unwrapped) ?? null;
        return defaultValue ?? null;
      },
      async setItem(key, value) {
        const storageKey = `${prefix}.${key}`;
        if (value === null)
          await unwrap(storage.removeItem(storageKey));
        else
          await unwrap(storage.setItem(storageKey, serialize2(value)));
      },
      async removeItem(key) {
        await unwrap(storage.removeItem(`${prefix}.${key}`));
      }
    };
  }
  var noopStorage = {
    getItem: () => null,
    setItem: () => {
    },
    removeItem: () => {
    }
  };
  function getDefaultStorage() {
    const storage = (() => {
      if (typeof window !== "undefined" && window.localStorage)
        return window.localStorage;
      return noopStorage;
    })();
    return {
      getItem(key) {
        return storage.getItem(key);
      },
      removeItem(key) {
        storage.removeItem(key);
      },
      setItem(key, value) {
        try {
          storage.setItem(key, value);
        } catch {
        }
      }
    };
  }

  // node_modules/@wagmi/core/dist/esm/utils/uid.js
  var size3 = 256;
  var index2 = size3;
  var buffer2;
  function uid2(length = 11) {
    if (!buffer2 || index2 + length > size3 * 2) {
      buffer2 = "";
      index2 = 0;
      for (let i = 0; i < size3; i++) {
        buffer2 += (256 + Math.random() * 256 | 0).toString(16).substring(1);
      }
    }
    return buffer2.substring(index2, index2++ + length);
  }

  // node_modules/@wagmi/core/dist/esm/createConfig.js
  function createConfig(parameters) {
    const { multiInjectedProviderDiscovery = true, storage = createStorage({
      storage: getDefaultStorage()
    }), syncConnectedChain = true, ssr = false, ...rest } = parameters;
    const mipd = typeof window !== "undefined" && multiInjectedProviderDiscovery ? createStore() : void 0;
    const chains = createStore2(() => rest.chains);
    const connectors = createStore2(() => {
      const collection = [];
      const rdnsSet = /* @__PURE__ */ new Set();
      for (const connectorFns of rest.connectors ?? []) {
        const connector = setup(connectorFns);
        collection.push(connector);
        if (!ssr && connector.rdns) {
          const rdnsValues = typeof connector.rdns === "string" ? [connector.rdns] : connector.rdns;
          for (const rdns of rdnsValues) {
            rdnsSet.add(rdns);
          }
        }
      }
      if (!ssr && mipd) {
        const providers = mipd.getProviders();
        for (const provider of providers) {
          if (rdnsSet.has(provider.info.rdns))
            continue;
          collection.push(setup(providerDetailToConnector(provider)));
        }
      }
      return collection;
    });
    function setup(connectorFn) {
      const emitter = createEmitter(uid2());
      const connector = {
        ...connectorFn({
          emitter,
          chains: chains.getState(),
          storage,
          transports: rest.transports
        }),
        emitter,
        uid: emitter.uid
      };
      emitter.on("connect", connect3);
      connector.setup?.();
      return connector;
    }
    function providerDetailToConnector(providerDetail) {
      const { info } = providerDetail;
      const provider = providerDetail.provider;
      return injected({ target: { ...info, id: info.rdns, provider } });
    }
    const clients = /* @__PURE__ */ new Map();
    function getClient(config2 = {}) {
      const chainId = config2.chainId ?? store.getState().chainId;
      const chain = chains.getState().find((x) => x.id === chainId);
      if (config2.chainId && !chain)
        throw new ChainNotConfiguredError();
      {
        const client2 = clients.get(store.getState().chainId);
        if (client2 && !chain)
          return client2;
        if (!chain)
          throw new ChainNotConfiguredError();
      }
      {
        const client2 = clients.get(chainId);
        if (client2)
          return client2;
      }
      let client;
      if (rest.client)
        client = rest.client({ chain });
      else {
        const chainId2 = chain.id;
        const chainIds = chains.getState().map((x) => x.id);
        const properties = {};
        const entries = Object.entries(rest);
        for (const [key, value] of entries) {
          if (key === "chains" || key === "client" || key === "connectors" || key === "transports")
            continue;
          if (typeof value === "object") {
            if (chainId2 in value)
              properties[key] = value[chainId2];
            else {
              const hasChainSpecificValue = chainIds.some((x) => x in value);
              if (hasChainSpecificValue)
                continue;
              properties[key] = value;
            }
          } else
            properties[key] = value;
        }
        client = createClient({
          ...properties,
          chain,
          batch: properties.batch ?? { multicall: true },
          transport: (parameters2) => rest.transports[chainId2]({ ...parameters2, connectors })
        });
      }
      clients.set(chainId, client);
      return client;
    }
    function getInitialState() {
      return {
        chainId: chains.getState()[0].id,
        connections: /* @__PURE__ */ new Map(),
        current: null,
        status: "disconnected"
      };
    }
    let currentVersion;
    const prefix = "0.0.0-canary-";
    if (version2.startsWith(prefix))
      currentVersion = Number.parseInt(version2.replace(prefix, ""), 10);
    else
      currentVersion = Number.parseInt(version2.split(".")[0] ?? "0", 10);
    const store = createStore2(subscribeWithSelector(
      // only use persist middleware if storage exists
      storage ? persist(getInitialState, {
        migrate(persistedState, version3) {
          if (version3 === currentVersion)
            return persistedState;
          const initialState = getInitialState();
          const chainId = validatePersistedChainId(persistedState, initialState.chainId);
          return { ...initialState, chainId };
        },
        name: "store",
        partialize(state) {
          return {
            connections: {
              __type: "Map",
              value: Array.from(state.connections.entries()).map(([key, connection]) => {
                const { id, name, type, uid: uid3 } = connection.connector;
                const connector = { id, name, type, uid: uid3 };
                return [key, { ...connection, connector }];
              })
            },
            chainId: state.chainId,
            current: state.current
          };
        },
        merge(persistedState, currentState) {
          if (typeof persistedState === "object" && persistedState && "status" in persistedState)
            delete persistedState.status;
          const chainId = validatePersistedChainId(persistedState, currentState.chainId);
          return {
            ...currentState,
            ...persistedState,
            chainId
          };
        },
        skipHydration: ssr,
        storage,
        version: currentVersion
      }) : getInitialState
    ));
    store.setState(getInitialState());
    function validatePersistedChainId(persistedState, defaultChainId) {
      return persistedState && typeof persistedState === "object" && "chainId" in persistedState && typeof persistedState.chainId === "number" && chains.getState().some((x) => x.id === persistedState.chainId) ? persistedState.chainId : defaultChainId;
    }
    if (syncConnectedChain)
      store.subscribe(({ connections, current }) => current ? connections.get(current)?.chainId : void 0, (chainId) => {
        const isChainConfigured = chains.getState().some((x) => x.id === chainId);
        if (!isChainConfigured)
          return;
        return store.setState((x) => ({
          ...x,
          chainId: chainId ?? x.chainId
        }));
      });
    mipd?.subscribe((providerDetails) => {
      const connectorIdSet = /* @__PURE__ */ new Set();
      const connectorRdnsSet = /* @__PURE__ */ new Set();
      for (const connector of connectors.getState()) {
        connectorIdSet.add(connector.id);
        if (connector.rdns) {
          const rdnsValues = typeof connector.rdns === "string" ? [connector.rdns] : connector.rdns;
          for (const rdns of rdnsValues) {
            connectorRdnsSet.add(rdns);
          }
        }
      }
      const newConnectors = [];
      for (const providerDetail of providerDetails) {
        if (connectorRdnsSet.has(providerDetail.info.rdns))
          continue;
        const connector = setup(providerDetailToConnector(providerDetail));
        if (connectorIdSet.has(connector.id))
          continue;
        newConnectors.push(connector);
      }
      if (storage && !store.persist.hasHydrated())
        return;
      connectors.setState((x) => [...x, ...newConnectors], true);
    });
    function change(data) {
      store.setState((x) => {
        const connection = x.connections.get(data.uid);
        if (!connection)
          return x;
        return {
          ...x,
          connections: new Map(x.connections).set(data.uid, {
            accounts: data.accounts ?? connection.accounts,
            chainId: data.chainId ?? connection.chainId,
            connector: connection.connector
          })
        };
      });
    }
    function connect3(data) {
      if (store.getState().status === "connecting" || store.getState().status === "reconnecting")
        return;
      store.setState((x) => {
        const connector = connectors.getState().find((x2) => x2.uid === data.uid);
        if (!connector)
          return x;
        if (connector.emitter.listenerCount("connect"))
          connector.emitter.off("connect", change);
        if (!connector.emitter.listenerCount("change"))
          connector.emitter.on("change", change);
        if (!connector.emitter.listenerCount("disconnect"))
          connector.emitter.on("disconnect", disconnect3);
        return {
          ...x,
          connections: new Map(x.connections).set(data.uid, {
            accounts: data.accounts,
            chainId: data.chainId,
            connector
          }),
          current: data.uid,
          status: "connected"
        };
      });
    }
    function disconnect3(data) {
      store.setState((x) => {
        const connection = x.connections.get(data.uid);
        if (connection) {
          const connector = connection.connector;
          if (connector.emitter.listenerCount("change"))
            connection.connector.emitter.off("change", change);
          if (connector.emitter.listenerCount("disconnect"))
            connection.connector.emitter.off("disconnect", disconnect3);
          if (!connector.emitter.listenerCount("connect"))
            connection.connector.emitter.on("connect", connect3);
        }
        x.connections.delete(data.uid);
        if (x.connections.size === 0)
          return {
            ...x,
            connections: /* @__PURE__ */ new Map(),
            current: null,
            status: "disconnected"
          };
        const nextConnection = x.connections.values().next().value;
        return {
          ...x,
          connections: new Map(x.connections),
          current: nextConnection.connector.uid
        };
      });
    }
    return {
      get chains() {
        return chains.getState();
      },
      get connectors() {
        return connectors.getState();
      },
      storage,
      getClient,
      get state() {
        return store.getState();
      },
      setState(value) {
        let newState;
        if (typeof value === "function")
          newState = value(store.getState());
        else
          newState = value;
        const initialState = getInitialState();
        if (typeof newState !== "object")
          newState = initialState;
        const isCorrupt = Object.keys(initialState).some((x) => !(x in newState));
        if (isCorrupt)
          newState = initialState;
        store.setState(newState, true);
      },
      subscribe(selector, listener, options) {
        return store.subscribe(selector, listener, options ? {
          ...options,
          fireImmediately: options.emitImmediately
          // Workaround cast since Zustand does not support `'exactOptionalPropertyTypes'`
        } : void 0);
      },
      _internal: {
        mipd,
        async revalidate() {
          const state = store.getState();
          const connections = state.connections;
          let current = state.current;
          for (const [, connection] of connections) {
            const connector = connection.connector;
            const isAuthorized = connector.isAuthorized ? await connector.isAuthorized() : false;
            if (isAuthorized)
              continue;
            connections.delete(connector.uid);
            if (current === connector.uid)
              current = null;
          }
          store.setState((x) => ({ ...x, connections, current }));
        },
        store,
        ssr: Boolean(ssr),
        syncConnectedChain,
        transports: rest.transports,
        chains: {
          setState(value) {
            const nextChains = typeof value === "function" ? value(chains.getState()) : value;
            if (nextChains.length === 0)
              return;
            return chains.setState(nextChains, true);
          },
          subscribe(listener) {
            return chains.subscribe(listener);
          }
        },
        connectors: {
          providerDetailToConnector,
          setup,
          setState(value) {
            return connectors.setState(typeof value === "function" ? value(connectors.getState()) : value, true);
          },
          subscribe(listener) {
            return connectors.subscribe(listener);
          }
        },
        events: { change, connect: connect3, disconnect: disconnect3 }
      }
    };
  }

  // web3/wagmi-config.mjs
  function browserLocalStorage() {
    if (typeof window === "undefined" || !window.localStorage) return noopStorage;
    const ls = window.localStorage;
    return {
      getItem(key) {
        return ls.getItem(key);
      },
      setItem(key, value) {
        try {
          ls.setItem(key, value);
        } catch {
        }
      },
      removeItem(key) {
        ls.removeItem(key);
      }
    };
  }
  var plWagmiStorage = createStorage({
    key: "pl-prediction-league",
    storage: browserLocalStorage()
  });
  function pickInjectedProvider(win) {
    const ethereum = win?.ethereum;
    if (!ethereum) return void 0;
    const providers = ethereum.providers;
    if (Array.isArray(providers) && providers.length > 0) {
      const realMetaMask = (p) => Boolean(
        p?.isMetaMask && !p?.isBraveWallet && !p?.isRabby && !p?.isCoinbaseWallet && !p?.isPhantom
      );
      return providers.find((p) => p?.isRabby) || providers.find(realMetaMask) || providers.find((p) => p?.coinbaseWalletExtension || p?.isCoinbaseWallet) || providers[0];
    }
    return ethereum;
  }
  function createPlWagmiConfig() {
    return createConfig({
      chains: plChains,
      multiInjectedProviderDiscovery: false,
      connectors: [
        injected({
          shimDisconnect: false,
          target: {
            id: "pl-browser-wallet",
            name: "Browser wallet",
            provider: pickInjectedProvider
          }
        })
      ],
      storage: plWagmiStorage,
      transports: {
        [plChains[0].id]: http(),
        [plChains[1].id]: http()
      },
      ssr: false
    });
  }

  // web3/wallet-runtime.mjs
  var config;
  var initPromise = null;
  function notifyIdentity(conn) {
    const id = globalThis.PLIdentity;
    if (!id?.patch) return;
    const chainId = conn.chainId ?? null;
    const addr = conn.address ?? null;
    const connected = conn.status === "connected";
    id.patch({
      walletAddress: addr,
      chainId,
      connectionStatus: conn.status,
      isConnected: connected,
      isBase: chainId === BASE_MAINNET_ID,
      isWrongNetwork: connected && chainId != null && !isSupportedPlChain(chainId)
    });
  }
  function mapPublic(conn) {
    const chainId = conn.chainId ?? void 0;
    const connected = conn.status === "connected";
    return {
      status: conn.status,
      address: conn.address,
      chainId,
      isConnected: connected,
      isBase: chainId === BASE_MAINNET_ID,
      isWrongNetwork: connected && chainId != null && !isSupportedPlChain(chainId)
    };
  }
  var BASE_CHAIN_ID = BASE_MAINNET_ID;
  async function initWalletRuntime() {
    if (config) return;
    if (initPromise) {
      await initPromise;
      return;
    }
    initPromise = (async () => {
      config = createPlWagmiConfig();
      await reconnect(config).catch(() => {
      });
      notifyIdentity(getConnection(config));
    })();
    try {
      await initPromise;
    } finally {
      initPromise = null;
    }
  }
  function requireConfig() {
    if (!config) throw new Error("Wallet runtime not initialized");
    return config;
  }
  function getWalletState() {
    try {
      return mapPublic(getConnection(requireConfig()));
    } catch {
      return {
        status: "disconnected",
        address: void 0,
        chainId: void 0,
        isConnected: false,
        isBase: false,
        isWrongNetwork: false
      };
    }
  }
  function subscribeWallet(callback) {
    const c = requireConfig();
    return watchConnection(c, {
      onChange(conn) {
        notifyIdentity(conn);
        callback(mapPublic(conn));
      }
    });
  }
  async function connectBrowserWallet() {
    await initWalletRuntime();
    const c = requireConfig();
    const targetId = primaryChain.id;
    const list = getConnectors(c);
    const connector = list[0];
    if (!connector) {
      const hasEth = typeof window !== "undefined" && window.ethereum;
      throw new Error(
        hasEth ? "No wallet connector" : "No browser wallet (install MetaMask or Rabby)"
      );
    }
    const p = await connector.getProvider().catch(() => null);
    if (!p?.request) {
      throw new Error(
        "Wallet provider is not available \u2014 check that the site is allowed in Rabby/MetaMask"
      );
    }
    try {
      await connect(c, { connector });
    } catch (e) {
      const already = e instanceof ConnectorAlreadyConnectedError || e?.name === "ConnectorAlreadyConnectedError";
      if (!already) throw e;
    }
    const conn = getConnection(c);
    if (conn.status !== "connected" || !conn.address) {
      throw new Error("Wallet connection did not complete");
    }
    if (conn.chainId !== targetId) {
      try {
        await switchChain(c, { chainId: targetId });
      } catch {
      }
    }
  }
  async function disconnectWallet() {
    await disconnect(requireConfig());
  }
  async function switchWalletToBase() {
    await switchChain(requireConfig(), { chainId: primaryChain.id });
  }

  // web3/wallet-entry.mjs
  async function init() {
    await initWalletRuntime();
  }
  var getState = getWalletState;
  var subscribe = subscribeWallet;
  var connect2 = connectBrowserWallet;
  var disconnect2 = disconnectWallet;
  var switchToBase = switchWalletToBase;
  return __toCommonJS(wallet_entry_exports);
})();
