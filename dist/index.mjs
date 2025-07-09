var __typeError = (msg) => {
  throw TypeError(msg);
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

// src/wsf/shared/fetching/dateUtils.ts
var dateToWsfFormat = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};
var dateToWsfPathFormat = (date) => {
  return date.toISOString().split("T")[0];
};
var buildWsfUrl = (template, params = {}) => {
  let url = template;
  for (const [key, value] of Object.entries(params)) {
    const placeholder = `{${key}}`;
    if (url.includes(placeholder)) {
      const stringValue = value instanceof Date ? dateToWsfPathFormat(value) : String(value);
      url = url.replace(placeholder, stringValue);
    }
  }
  return url;
};
var dateToWsfTimeFormat = (date) => {
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${ampm}`;
};
var dateToWsfDateTimeFormat = (date) => {
  return `${dateToWsfFormat(date)} ${dateToWsfTimeFormat(date)}`;
};
var parseWsfScheduleDate = (dateString) => {
  const [month, day, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day);
};
var parseWsfTime = (timeString) => {
  const [time, ampm] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  const date = /* @__PURE__ */ new Date();
  date.setHours(
    ampm === "PM" && hours !== 12 ? hours + 12 : hours === 12 && ampm === "AM" ? 0 : hours
  );
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};
var parseWsfDateTime = (dateTimeString) => {
  const [datePart, timePart] = dateTimeString.split(" ");
  const date = parseWsfScheduleDate(datePart);
  const time = parseWsfTime(
    `${timePart} ${dateTimeString.split(" ").pop() || ""}`
  );
  date.setHours(time.getHours());
  date.setMinutes(time.getMinutes());
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
};
var getTodayWsfFormat = () => {
  return dateToWsfFormat(/* @__PURE__ */ new Date());
};
var getTomorrowWsfFormat = () => {
  const tomorrow = /* @__PURE__ */ new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return dateToWsfFormat(tomorrow);
};
var isToday = (date) => {
  const today = /* @__PURE__ */ new Date();
  return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
};
var isTomorrow = (date) => {
  const tomorrow = /* @__PURE__ */ new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return date.getDate() === tomorrow.getDate() && date.getMonth() === tomorrow.getMonth() && date.getFullYear() === tomorrow.getFullYear();
};
var getDateLabel = (date) => {
  if (isToday(date)) return "Today";
  if (isTomorrow(date)) return "Tomorrow";
  return dateToWsfFormat(date);
};

// src/wsf/shared/fetching/config.ts
var API_BASES = {
  vessels: "https://www.wsdot.wa.gov/ferries/api/vessels/rest",
  terminals: "https://www.wsdot.wa.gov/ferries/api/terminals/rest",
  schedule: "https://www.wsdot.wa.gov/ferries/api/schedule/rest"
};
var API_KEY = process.env.EXPO_PUBLIC_WSDOT_ACCESS_TOKEN || "";

// src/lib/logger.ts
var log = {
  debug: (...args) => {
    if (typeof process !== "undefined" && process.env.NODE_ENV === "development") {
      console.debug("[WSF Debug]", ...args);
    }
  },
  info: (...args) => {
    console.info("[WSF Info]", ...args);
  },
  warn: (...args) => {
    console.warn("[WSF Warn]", ...args);
  },
  error: (...args) => {
    console.error("[WSF Error]", ...args);
  }
};
var logger_default = log;

// src/wsf/shared/fetching/utils.ts
var isYyyyMmDdDate = (str) => {
  const yyyyMmDdRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!yyyyMmDdRegex.test(str)) return false;
  const date = new Date(str);
  return !Number.isNaN(date.getTime()) && date.toISOString().split("T")[0] === str;
};
var isIsoDateTime = (str) => {
  const isoDateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
  if (!isoDateTimeRegex.test(str)) return false;
  const date = new Date(str);
  return !Number.isNaN(date.getTime());
};
var isMmDdYyyyDate = (str) => {
  const mmDdYyyyRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
  if (!mmDdYyyyRegex.test(str)) return false;
  const [month, day, year] = str.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return !Number.isNaN(date.getTime()) && date.getMonth() === month - 1 && date.getDate() === day && date.getFullYear() === year;
};
var parseDateString = (dateString) => {
  if (dateString.startsWith("/Date(")) {
    const middle = dateString.slice(6, 19);
    const timestamp = parseInt(middle);
    return new Date(timestamp);
  }
  if (isIsoDateTime(dateString)) {
    return new Date(dateString);
  }
  if (isYyyyMmDdDate(dateString)) {
    return new Date(dateString);
  }
  if (isMmDdYyyyDate(dateString)) {
    const [month, day, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  }
  return null;
};
var transformWsfData = (data) => {
  if (data === null) {
    return null;
  }
  if (Array.isArray(data)) {
    return data.map(transformWsfData);
  }
  if (typeof data === "object" && data.constructor === Object) {
    const result = {};
    for (const [key, value] of Object.entries(data)) {
      const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
      result[camelKey] = transformWsfData(value);
    }
    return result;
  }
  if (typeof data === "string") {
    const parsedDate = parseDateString(data);
    if (parsedDate) {
      return parsedDate;
    }
  }
  return data;
};

// src/wsf/shared/fetching/fetchInternal.ts
var JSONP_TIMEOUT_MS = 3e4;
var isNodeEnvironment = () => {
  return typeof process !== "undefined" && process.versions && process.versions.node;
};
var isWebEnvironment = () => {
  return typeof window !== "undefined" && typeof document !== "undefined";
};
var fetchInternal = async (url, endpoint, logMode) => {
  try {
    let response;
    if (isNodeEnvironment()) {
      response = await fetchNative(url);
    } else if (isWebEnvironment()) {
      response = await fetchJsonp(url);
    } else {
      response = await fetchNative(url);
    }
    const transformedResponse = transformWsfData(response);
    if (logMode === "debug") {
      logger_default.debug(`[WSF ${endpoint}] Response transformed:`, transformedResponse);
    }
    return transformedResponse;
  } catch (error) {
    if (logMode === "debug" || logMode === "info") {
      logger_default.error(`[WSF ${endpoint}] Fetch failed:`, error);
    }
    return null;
  }
};
var generateCallbackName = () => `jsonp_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
var fetchJsonp = (url) => {
  logger_default.debug("fetchJsonp", url);
  return new Promise((resolve, reject) => {
    const callbackName = generateCallbackName();
    const script = document.createElement("script");
    const jsonpWindow = window;
    const cleanup = () => {
      if (script.parentNode) document.head.removeChild(script);
      if (jsonpWindow[callbackName]) delete jsonpWindow[callbackName];
    };
    const cleanupWithTimeout = () => {
      clearTimeout(timeoutId);
      cleanup();
    };
    const timeoutId = setTimeout(() => {
      cleanup();
      reject(new Error("JSONP request timeout"));
    }, JSONP_TIMEOUT_MS);
    jsonpWindow[callbackName] = (data) => {
      cleanupWithTimeout();
      resolve(data);
    };
    script.onerror = () => {
      cleanupWithTimeout();
      reject(new Error("JSONP script load failed"));
    };
    script.src = `${url}${url.includes("?") ? "&" : "?"}callback=${callbackName}`;
    document.head.appendChild(script);
  });
};
var fetchNative = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  return response.json();
};

// src/wsf/shared/fetching/fetch.ts
var fetchWsf = async (source, endpoint, logMode) => {
  const baseUrl = API_BASES[source];
  const url = `${baseUrl}${endpoint}?api_key=${API_KEY}`;
  return await fetchInternal(url, endpoint, logMode);
};
var fetchWsfArray = async (source, endpoint, logMode) => await fetchWsf(source, endpoint, logMode) || [];

// src/wsf/schedule/routes/api.ts
var getRoutes = (tripDate) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/routes/{tripDate}", { tripDate })
);
var getRoutesByTerminals = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl(
    "/routes/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
    params
  )
);
var getRoutesWithDisruptions = (tripDate) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/routeshavingservicedisruptions/{tripDate}", { tripDate })
);
var getRouteDetails = (tripDate) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/routedetails/{tripDate}", { tripDate })
);
var getRouteDetailsByTerminals = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl(
    "/routedetails/{tripDate}/{departingTerminalId}/{arrivingTerminalId}",
    params
  )
);
var getRouteDetailsByRoute = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/routedetails/{tripDate}/{routeId}", params)
);
var getScheduledRoutes = () => fetchWsfArray("schedule", "/schedroutes");
var getScheduledRoutesBySeason = (seasonId) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/schedroutes/{seasonId}", { seasonId })
);
var getActiveSeasons = () => fetchWsfArray("schedule", "/activeseasons");
var getAlerts = () => fetchWsfArray("schedule", "/alerts");

// ../node_modules/@tanstack/query-core/build/modern/subscribable.js
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

// ../node_modules/@tanstack/query-core/build/modern/utils.js
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return Object.keys(b).every((key) => partialMatchKey(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    const aItemsSet = new Set(aItems);
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if ((!array && aItemsSet.has(key) || array) && a[key] === void 0 && b[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key] && a[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (process.env.NODE_ENV !== "production") {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
        throw error;
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (process.env.NODE_ENV !== "production") {
    if (options.queryFn === skipToken) {
      console.error(
        `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
      );
    }
  }
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}
function shouldThrowError(throwOnError, params) {
  if (typeof throwOnError === "function") {
    return throwOnError(...params);
  }
  return !!throwOnError;
}

// ../node_modules/@tanstack/query-core/build/modern/focusManager.js
var _focused, _cleanup, _setup, _a;
var FocusManager = (_a = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _focused);
    __privateAdd(this, _cleanup);
    __privateAdd(this, _setup);
    __privateSet(this, _setup, (onFocus) => {
      if (!isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup)) {
      this.setEventListener(__privateGet(this, _setup));
    }
  }
  onUnsubscribe() {
    var _a10;
    if (!this.hasListeners()) {
      (_a10 = __privateGet(this, _cleanup)) == null ? void 0 : _a10.call(this);
      __privateSet(this, _cleanup, void 0);
    }
  }
  setEventListener(setup) {
    var _a10;
    __privateSet(this, _setup, setup);
    (_a10 = __privateGet(this, _cleanup)) == null ? void 0 : _a10.call(this);
    __privateSet(this, _cleanup, setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    }));
  }
  setFocused(focused) {
    const changed = __privateGet(this, _focused) !== focused;
    if (changed) {
      __privateSet(this, _focused, focused);
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof __privateGet(this, _focused) === "boolean") {
      return __privateGet(this, _focused);
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
}, _focused = new WeakMap(), _cleanup = new WeakMap(), _setup = new WeakMap(), _a);
var focusManager = new FocusManager();

// ../node_modules/@tanstack/query-core/build/modern/onlineManager.js
var _online, _cleanup2, _setup2, _a2;
var OnlineManager = (_a2 = class extends Subscribable {
  constructor() {
    super();
    __privateAdd(this, _online, true);
    __privateAdd(this, _cleanup2);
    __privateAdd(this, _setup2);
    __privateSet(this, _setup2, (onOnline) => {
      if (!isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    });
  }
  onSubscribe() {
    if (!__privateGet(this, _cleanup2)) {
      this.setEventListener(__privateGet(this, _setup2));
    }
  }
  onUnsubscribe() {
    var _a10;
    if (!this.hasListeners()) {
      (_a10 = __privateGet(this, _cleanup2)) == null ? void 0 : _a10.call(this);
      __privateSet(this, _cleanup2, void 0);
    }
  }
  setEventListener(setup) {
    var _a10;
    __privateSet(this, _setup2, setup);
    (_a10 = __privateGet(this, _cleanup2)) == null ? void 0 : _a10.call(this);
    __privateSet(this, _cleanup2, setup(this.setOnline.bind(this)));
  }
  setOnline(online) {
    const changed = __privateGet(this, _online) !== online;
    if (changed) {
      __privateSet(this, _online, online);
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return __privateGet(this, _online);
  }
}, _online = new WeakMap(), _cleanup2 = new WeakMap(), _setup2 = new WeakMap(), _a2);
var onlineManager = new OnlineManager();

// ../node_modules/@tanstack/query-core/build/modern/thenable.js
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}
function tryResolveSync(promise) {
  let data;
  promise.then((result) => {
    data = result;
    return result;
  }, noop)?.catch(noop);
  if (data !== void 0) {
    return { data };
  }
  return void 0;
}

// ../node_modules/@tanstack/query-core/build/modern/retryer.js
function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  const thenable = pendingThenable();
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort?.();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => focusManager.isFocused() && (config.networkMode === "always" || onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError?.(value);
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved) {
        return;
      }
      const retry = config.retry ?? (isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      sleep(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}

// ../node_modules/@tanstack/query-core/build/modern/notifyManager.js
var defaultScheduler = (cb) => setTimeout(cb, 0);
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = defaultScheduler;
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

// ../node_modules/@tanstack/query-core/build/modern/removable.js
var _gcTimeout, _a3;
var Removable = (_a3 = class {
  constructor() {
    __privateAdd(this, _gcTimeout);
  }
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if (isValidTimeout(this.gcTime)) {
      __privateSet(this, _gcTimeout, setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime));
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (__privateGet(this, _gcTimeout)) {
      clearTimeout(__privateGet(this, _gcTimeout));
      __privateSet(this, _gcTimeout, void 0);
    }
  }
}, _gcTimeout = new WeakMap(), _a3);

// ../node_modules/@tanstack/query-core/build/modern/query.js
var _initialState, _revertState, _cache, _client, _retryer, _defaultOptions, _abortSignalConsumed, _Query_instances, dispatch_fn, _a4;
var Query = (_a4 = class extends Removable {
  constructor(config) {
    super();
    __privateAdd(this, _Query_instances);
    __privateAdd(this, _initialState);
    __privateAdd(this, _revertState);
    __privateAdd(this, _cache);
    __privateAdd(this, _client);
    __privateAdd(this, _retryer);
    __privateAdd(this, _defaultOptions);
    __privateAdd(this, _abortSignalConsumed);
    __privateSet(this, _abortSignalConsumed, false);
    __privateSet(this, _defaultOptions, config.defaultOptions);
    this.setOptions(config.options);
    this.observers = [];
    __privateSet(this, _client, config.client);
    __privateSet(this, _cache, __privateGet(this, _client).getQueryCache());
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    __privateSet(this, _initialState, getDefaultState(this.options));
    this.state = config.state ?? __privateGet(this, _initialState);
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return __privateGet(this, _retryer)?.promise;
  }
  setOptions(options) {
    this.options = { ...__privateGet(this, _defaultOptions), ...options };
    this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      __privateGet(this, _cache).remove(this);
    }
  }
  setData(newData, options) {
    const data = replaceData(this.state.data, newData, this.options);
    __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = __privateGet(this, _retryer)?.promise;
    __privateGet(this, _retryer)?.cancel(options);
    return promise ? promise.then(noop).catch(noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(__privateGet(this, _initialState));
  }
  isActive() {
    return this.observers.some(
      (observer) => resolveEnabled(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    if (this.getObserversCount() > 0) {
      return !this.isActive();
    }
    return this.options.queryFn === skipToken || this.state.dataUpdateCount + this.state.errorUpdateCount === 0;
  }
  isStatic() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => resolveStaleTime(observer.options.staleTime, this) === "static"
      );
    }
    return false;
  }
  isStale() {
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0 || this.state.isInvalidated;
  }
  isStaleByTime(staleTime = 0) {
    if (this.state.data === void 0) {
      return true;
    }
    if (staleTime === "static") {
      return false;
    }
    if (this.state.isInvalidated) {
      return true;
    }
    return !timeUntilStale(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    __privateGet(this, _retryer)?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    __privateGet(this, _retryer)?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      __privateGet(this, _cache).notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (__privateGet(this, _retryer)) {
          if (__privateGet(this, _abortSignalConsumed)) {
            __privateGet(this, _retryer).cancel({ revert: true });
          } else {
            __privateGet(this, _retryer).cancelRetry();
          }
        }
        this.scheduleGc();
      }
      __privateGet(this, _cache).notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (__privateGet(this, _retryer)) {
        __privateGet(this, _retryer).continueRetry();
        return __privateGet(this, _retryer).promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (process.env.NODE_ENV !== "production") {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(
          `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
        );
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          __privateSet(this, _abortSignalConsumed, true);
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = ensureQueryFn(this.options, fetchOptions);
      const createQueryFnContext = () => {
        const queryFnContext2 = {
          client: __privateGet(this, _client),
          queryKey: this.queryKey,
          meta: this.meta
        };
        addSignalProperty(queryFnContext2);
        return queryFnContext2;
      };
      const queryFnContext = createQueryFnContext();
      __privateSet(this, _abortSignalConsumed, false);
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const createFetchContext = () => {
      const context2 = {
        fetchOptions,
        options: this.options,
        queryKey: this.queryKey,
        client: __privateGet(this, _client),
        state: this.state,
        fetchFn
      };
      addSignalProperty(context2);
      return context2;
    };
    const context = createFetchContext();
    this.options.behavior?.onFetch(context, this);
    __privateSet(this, _revertState, this.state);
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "fetch", meta: context.fetchOptions?.meta });
    }
    const onError = (error) => {
      if (!(isCancelledError(error) && error.silent)) {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, {
          type: "error",
          error
        });
      }
      if (!isCancelledError(error)) {
        __privateGet(this, _cache).config.onError?.(
          error,
          this
        );
        __privateGet(this, _cache).config.onSettled?.(
          this.state.data,
          error,
          this
        );
      }
      this.scheduleGc();
    };
    __privateSet(this, _retryer, createRetryer({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        if (data === void 0) {
          if (process.env.NODE_ENV !== "production") {
            console.error(
              `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
            );
          }
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(data);
        } catch (error) {
          onError(error);
          return;
        }
        __privateGet(this, _cache).config.onSuccess?.(data, this);
        __privateGet(this, _cache).config.onSettled?.(
          data,
          this.state.error,
          this
        );
        this.scheduleGc();
      },
      onError,
      onFail: (failureCount, error) => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "pause" });
      },
      onContinue: () => {
        __privateMethod(this, _Query_instances, dispatch_fn).call(this, { type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    }));
    return __privateGet(this, _retryer).start();
  }
}, _initialState = new WeakMap(), _revertState = new WeakMap(), _cache = new WeakMap(), _client = new WeakMap(), _retryer = new WeakMap(), _defaultOptions = new WeakMap(), _abortSignalConsumed = new WeakMap(), _Query_instances = new WeakSet(), dispatch_fn = function(action) {
  const reducer = (state) => {
    switch (action.type) {
      case "failed":
        return {
          ...state,
          fetchFailureCount: action.failureCount,
          fetchFailureReason: action.error
        };
      case "pause":
        return {
          ...state,
          fetchStatus: "paused"
        };
      case "continue":
        return {
          ...state,
          fetchStatus: "fetching"
        };
      case "fetch":
        return {
          ...state,
          ...fetchState(state.data, this.options),
          fetchMeta: action.meta ?? null
        };
      case "success":
        __privateSet(this, _revertState, void 0);
        return {
          ...state,
          data: action.data,
          dataUpdateCount: state.dataUpdateCount + 1,
          dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
          error: null,
          isInvalidated: false,
          status: "success",
          ...!action.manual && {
            fetchStatus: "idle",
            fetchFailureCount: 0,
            fetchFailureReason: null
          }
        };
      case "error":
        const error = action.error;
        if (isCancelledError(error) && error.revert && __privateGet(this, _revertState)) {
          return { ...__privateGet(this, _revertState), fetchStatus: "idle" };
        }
        return {
          ...state,
          error,
          errorUpdateCount: state.errorUpdateCount + 1,
          errorUpdatedAt: Date.now(),
          fetchFailureCount: state.fetchFailureCount + 1,
          fetchFailureReason: error,
          fetchStatus: "idle",
          status: "error"
        };
      case "invalidate":
        return {
          ...state,
          isInvalidated: true
        };
      case "setState":
        return {
          ...state,
          ...action.state
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    this.observers.forEach((observer) => {
      observer.onQueryUpdate();
    });
    __privateGet(this, _cache).notify({ query: this, type: "updated", action });
  });
}, _a4);
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: canFetch(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

// ../node_modules/@tanstack/query-core/build/modern/queryCache.js
var _queries, _a5;
var QueryCache = (_a5 = class extends Subscribable {
  constructor(config = {}) {
    super();
    __privateAdd(this, _queries);
    this.config = config;
    __privateSet(this, _queries, /* @__PURE__ */ new Map());
  }
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? hashQueryKeyByOptions(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new Query({
        client,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!__privateGet(this, _queries).has(query.queryHash)) {
      __privateGet(this, _queries).set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = __privateGet(this, _queries).get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        __privateGet(this, _queries).delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return __privateGet(this, _queries).get(queryHash);
  }
  getAll() {
    return [...__privateGet(this, _queries).values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => matchQuery(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => matchQuery(filters, query)) : queries;
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
}, _queries = new WeakMap(), _a5);

// ../node_modules/@tanstack/query-core/build/modern/mutation.js
var _observers, _mutationCache, _retryer2, _Mutation_instances, dispatch_fn2, _a6;
var Mutation = (_a6 = class extends Removable {
  constructor(config) {
    super();
    __privateAdd(this, _Mutation_instances);
    __privateAdd(this, _observers);
    __privateAdd(this, _mutationCache);
    __privateAdd(this, _retryer2);
    this.mutationId = config.mutationId;
    __privateSet(this, _mutationCache, config.mutationCache);
    __privateSet(this, _observers, []);
    this.state = config.state || getDefaultState2();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!__privateGet(this, _observers).includes(observer)) {
      __privateGet(this, _observers).push(observer);
      this.clearGcTimeout();
      __privateGet(this, _mutationCache).notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    __privateSet(this, _observers, __privateGet(this, _observers).filter((x) => x !== observer));
    this.scheduleGc();
    __privateGet(this, _mutationCache).notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!__privateGet(this, _observers).length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        __privateGet(this, _mutationCache).remove(this);
      }
    }
  }
  continue() {
    return __privateGet(this, _retryer2)?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    const onContinue = () => {
      __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "continue" });
    };
    __privateSet(this, _retryer2, createRetryer({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables);
      },
      onFail: (failureCount, error) => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "failed", failureCount, error });
      },
      onPause: () => {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pause" });
      },
      onContinue,
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => __privateGet(this, _mutationCache).canRun(this)
    }));
    const restored = this.state.status === "pending";
    const isPaused = !__privateGet(this, _retryer2).canStart();
    try {
      if (restored) {
        onContinue();
      } else {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "pending", variables, isPaused });
        await __privateGet(this, _mutationCache).config.onMutate?.(
          variables,
          this
        );
        const context = await this.options.onMutate?.(variables);
        if (context !== this.state.context) {
          __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, {
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await __privateGet(this, _retryer2).start();
      await __privateGet(this, _mutationCache).config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this
      );
      await this.options.onSuccess?.(data, variables, this.state.context);
      await __privateGet(this, _mutationCache).config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      );
      await this.options.onSettled?.(data, null, variables, this.state.context);
      __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "success", data });
      return data;
    } catch (error) {
      try {
        await __privateGet(this, _mutationCache).config.onError?.(
          error,
          variables,
          this.state.context,
          this
        );
        await this.options.onError?.(
          error,
          variables,
          this.state.context
        );
        await __privateGet(this, _mutationCache).config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context
        );
        throw error;
      } finally {
        __privateMethod(this, _Mutation_instances, dispatch_fn2).call(this, { type: "error", error });
      }
    } finally {
      __privateGet(this, _mutationCache).runNext(this);
    }
  }
}, _observers = new WeakMap(), _mutationCache = new WeakMap(), _retryer2 = new WeakMap(), _Mutation_instances = new WeakSet(), dispatch_fn2 = function(action) {
  const reducer = (state) => {
    switch (action.type) {
      case "failed":
        return {
          ...state,
          failureCount: action.failureCount,
          failureReason: action.error
        };
      case "pause":
        return {
          ...state,
          isPaused: true
        };
      case "continue":
        return {
          ...state,
          isPaused: false
        };
      case "pending":
        return {
          ...state,
          context: action.context,
          data: void 0,
          failureCount: 0,
          failureReason: null,
          error: null,
          isPaused: action.isPaused,
          status: "pending",
          variables: action.variables,
          submittedAt: Date.now()
        };
      case "success":
        return {
          ...state,
          data: action.data,
          failureCount: 0,
          failureReason: null,
          error: null,
          status: "success",
          isPaused: false
        };
      case "error":
        return {
          ...state,
          data: void 0,
          error: action.error,
          failureCount: state.failureCount + 1,
          failureReason: action.error,
          isPaused: false,
          status: "error"
        };
    }
  };
  this.state = reducer(this.state);
  notifyManager.batch(() => {
    __privateGet(this, _observers).forEach((observer) => {
      observer.onMutationUpdate(action);
    });
    __privateGet(this, _mutationCache).notify({
      mutation: this,
      type: "updated",
      action
    });
  });
}, _a6);
function getDefaultState2() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

// ../node_modules/@tanstack/query-core/build/modern/mutationCache.js
var _mutations, _scopes, _mutationId, _a7;
var MutationCache = (_a7 = class extends Subscribable {
  constructor(config = {}) {
    super();
    __privateAdd(this, _mutations);
    __privateAdd(this, _scopes);
    __privateAdd(this, _mutationId);
    this.config = config;
    __privateSet(this, _mutations, /* @__PURE__ */ new Set());
    __privateSet(this, _scopes, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationId, 0);
  }
  build(client, options, state) {
    const mutation = new Mutation({
      mutationCache: this,
      mutationId: ++__privateWrapper(this, _mutationId)._,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    __privateGet(this, _mutations).add(mutation);
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const scopedMutations = __privateGet(this, _scopes).get(scope);
      if (scopedMutations) {
        scopedMutations.push(mutation);
      } else {
        __privateGet(this, _scopes).set(scope, [mutation]);
      }
    }
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    if (__privateGet(this, _mutations).delete(mutation)) {
      const scope = scopeFor(mutation);
      if (typeof scope === "string") {
        const scopedMutations = __privateGet(this, _scopes).get(scope);
        if (scopedMutations) {
          if (scopedMutations.length > 1) {
            const index = scopedMutations.indexOf(mutation);
            if (index !== -1) {
              scopedMutations.splice(index, 1);
            }
          } else if (scopedMutations[0] === mutation) {
            __privateGet(this, _scopes).delete(scope);
          }
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const mutationsWithSameScope = __privateGet(this, _scopes).get(scope);
      const firstPendingMutation = mutationsWithSameScope?.find(
        (m) => m.state.status === "pending"
      );
      return !firstPendingMutation || firstPendingMutation === mutation;
    } else {
      return true;
    }
  }
  runNext(mutation) {
    const scope = scopeFor(mutation);
    if (typeof scope === "string") {
      const foundMutation = __privateGet(this, _scopes).get(scope)?.find((m) => m !== mutation && m.state.isPaused);
      return foundMutation?.continue() ?? Promise.resolve();
    } else {
      return Promise.resolve();
    }
  }
  clear() {
    notifyManager.batch(() => {
      __privateGet(this, _mutations).forEach((mutation) => {
        this.notify({ type: "removed", mutation });
      });
      __privateGet(this, _mutations).clear();
      __privateGet(this, _scopes).clear();
    });
  }
  getAll() {
    return Array.from(__privateGet(this, _mutations));
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => matchMutation(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => matchMutation(filters, mutation));
  }
  notify(event) {
    notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(noop))
      )
    );
  }
}, _mutations = new WeakMap(), _scopes = new WeakMap(), _mutationId = new WeakMap(), _a7);
function scopeFor(mutation) {
  return mutation.options.scope?.id;
}

// ../node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js
function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = ensureQueryFn(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const createQueryFnContext = () => {
            const queryFnContext2 = {
              client: context.client,
              queryKey: context.queryKey,
              pageParam: param,
              direction: previous ? "backward" : "forward",
              meta: context.options.meta
            };
            addSignalProperty(queryFnContext2);
            return queryFnContext2;
          };
          const queryFnContext = createQueryFnContext();
          const page = await queryFn(queryFnContext);
          const { maxPages } = context.options;
          const addTo = previous ? addToStart : addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              client: context.client,
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}

// ../node_modules/@tanstack/query-core/build/modern/queryClient.js
var _queryCache, _mutationCache2, _defaultOptions2, _queryDefaults, _mutationDefaults, _mountCount, _unsubscribeFocus, _unsubscribeOnline, _a8;
var QueryClient = (_a8 = class {
  constructor(config = {}) {
    __privateAdd(this, _queryCache);
    __privateAdd(this, _mutationCache2);
    __privateAdd(this, _defaultOptions2);
    __privateAdd(this, _queryDefaults);
    __privateAdd(this, _mutationDefaults);
    __privateAdd(this, _mountCount);
    __privateAdd(this, _unsubscribeFocus);
    __privateAdd(this, _unsubscribeOnline);
    __privateSet(this, _queryCache, config.queryCache || new QueryCache());
    __privateSet(this, _mutationCache2, config.mutationCache || new MutationCache());
    __privateSet(this, _defaultOptions2, config.defaultOptions || {});
    __privateSet(this, _queryDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mutationDefaults, /* @__PURE__ */ new Map());
    __privateSet(this, _mountCount, 0);
  }
  mount() {
    __privateWrapper(this, _mountCount)._++;
    if (__privateGet(this, _mountCount) !== 1) return;
    __privateSet(this, _unsubscribeFocus, focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        __privateGet(this, _queryCache).onFocus();
      }
    }));
    __privateSet(this, _unsubscribeOnline, onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        __privateGet(this, _queryCache).onOnline();
      }
    }));
  }
  unmount() {
    var _a10, _b;
    __privateWrapper(this, _mountCount)._--;
    if (__privateGet(this, _mountCount) !== 0) return;
    (_a10 = __privateGet(this, _unsubscribeFocus)) == null ? void 0 : _a10.call(this);
    __privateSet(this, _unsubscribeFocus, void 0);
    (_b = __privateGet(this, _unsubscribeOnline)) == null ? void 0 : _b.call(this);
    __privateSet(this, _unsubscribeOnline, void 0);
  }
  isFetching(filters) {
    return __privateGet(this, _queryCache).findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return __privateGet(this, _mutationCache2).findAll({ ...filters, status: "pending" }).length;
  }
  /**
   * Imperative (non-reactive) way to retrieve data for a QueryKey.
   * Should only be used in callbacks or functions where reading the latest data is necessary, e.g. for optimistic updates.
   *
   * Hint: Do not use this function inside a component, because it won't receive updates.
   * Use `useQuery` to create a `QueryObserver` that subscribes to changes.
   */
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return __privateGet(this, _queryCache).get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
    const cachedData = query.state.data;
    if (cachedData === void 0) {
      return this.fetchQuery(options);
    }
    if (options.revalidateIfStale && query.isStaleByTime(resolveStaleTime(defaultedOptions.staleTime, query))) {
      void this.prefetchQuery(defaultedOptions);
    }
    return Promise.resolve(cachedData);
  }
  getQueriesData(filters) {
    return __privateGet(this, _queryCache).findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = __privateGet(this, _queryCache).get(
      defaultedOptions.queryHash
    );
    const prevData = query?.state.data;
    const data = functionalUpdate(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return __privateGet(this, _queryCache).build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return __privateGet(this, _queryCache).get(
      options.queryHash
    )?.state;
  }
  removeQueries(filters) {
    const queryCache = __privateGet(this, _queryCache);
    notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = __privateGet(this, _queryCache);
    return notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(
        {
          type: "active",
          ...filters
        },
        options
      );
    });
  }
  cancelQueries(filters, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(noop).catch(noop);
  }
  invalidateQueries(filters, options = {}) {
    return notifyManager.batch(() => {
      __privateGet(this, _queryCache).findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters?.refetchType === "none") {
        return Promise.resolve();
      }
      return this.refetchQueries(
        {
          ...filters,
          type: filters?.refetchType ?? filters?.type ?? "active"
        },
        options
      );
    });
  }
  refetchQueries(filters, options = {}) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options.cancelRefetch ?? true
    };
    const promises = notifyManager.batch(
      () => __privateGet(this, _queryCache).findAll(filters).filter((query) => !query.isDisabled() && !query.isStatic()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = __privateGet(this, _queryCache).build(this, defaultedOptions);
    return query.isStaleByTime(
      resolveStaleTime(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(noop).catch(noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(noop).catch(noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = infiniteQueryBehavior(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (onlineManager.isOnline()) {
      return __privateGet(this, _mutationCache2).resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return __privateGet(this, _queryCache);
  }
  getMutationCache() {
    return __privateGet(this, _mutationCache2);
  }
  getDefaultOptions() {
    return __privateGet(this, _defaultOptions2);
  }
  setDefaultOptions(options) {
    __privateSet(this, _defaultOptions2, options);
  }
  setQueryDefaults(queryKey, options) {
    __privateGet(this, _queryDefaults).set(hashKey(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...__privateGet(this, _queryDefaults).values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(queryKey, queryDefault.queryKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    __privateGet(this, _mutationDefaults).set(hashKey(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...__privateGet(this, _mutationDefaults).values()];
    const result = {};
    defaults.forEach((queryDefault) => {
      if (partialMatchKey(mutationKey, queryDefault.mutationKey)) {
        Object.assign(result, queryDefault.defaultOptions);
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...__privateGet(this, _defaultOptions2).queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = hashQueryKeyByOptions(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.queryFn === skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...__privateGet(this, _defaultOptions2).mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    __privateGet(this, _queryCache).clear();
    __privateGet(this, _mutationCache2).clear();
  }
}, _queryCache = new WeakMap(), _mutationCache2 = new WeakMap(), _defaultOptions2 = new WeakMap(), _queryDefaults = new WeakMap(), _mutationDefaults = new WeakMap(), _mountCount = new WeakMap(), _unsubscribeFocus = new WeakMap(), _unsubscribeOnline = new WeakMap(), _a8);

// ../node_modules/@tanstack/query-core/build/modern/queryObserver.js
var _client2, _currentQuery, _currentQueryInitialState, _currentResult, _currentResultState, _currentResultOptions, _currentThenable, _selectError, _selectFn, _selectResult, _lastQueryWithDefinedData, _staleTimeoutId, _refetchIntervalId, _currentRefetchInterval, _trackedProps, _QueryObserver_instances, executeFetch_fn, updateStaleTimeout_fn, computeRefetchInterval_fn, updateRefetchInterval_fn, updateTimers_fn, clearStaleTimeout_fn, clearRefetchInterval_fn, updateQuery_fn, notify_fn, _a9;
var QueryObserver = (_a9 = class extends Subscribable {
  constructor(client, options) {
    super();
    __privateAdd(this, _QueryObserver_instances);
    __privateAdd(this, _client2);
    __privateAdd(this, _currentQuery);
    __privateAdd(this, _currentQueryInitialState);
    __privateAdd(this, _currentResult);
    __privateAdd(this, _currentResultState);
    __privateAdd(this, _currentResultOptions);
    __privateAdd(this, _currentThenable);
    __privateAdd(this, _selectError);
    __privateAdd(this, _selectFn);
    __privateAdd(this, _selectResult);
    // This property keeps track of the last query with defined data.
    // It will be used to pass the previous data and query to the placeholder function between renders.
    __privateAdd(this, _lastQueryWithDefinedData);
    __privateAdd(this, _staleTimeoutId);
    __privateAdd(this, _refetchIntervalId);
    __privateAdd(this, _currentRefetchInterval);
    __privateAdd(this, _trackedProps, /* @__PURE__ */ new Set());
    this.options = options;
    __privateSet(this, _client2, client);
    __privateSet(this, _selectError, null);
    __privateSet(this, _currentThenable, pendingThenable());
    if (!this.options.experimental_prefetchInRender) {
      __privateGet(this, _currentThenable).reject(
        new Error("experimental_prefetchInRender feature flag is not enabled")
      );
    }
    this.bindMethods();
    this.setOptions(options);
  }
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      __privateGet(this, _currentQuery).addObserver(this);
      if (shouldFetchOnMount(__privateGet(this, _currentQuery), this.options)) {
        __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
      } else {
        this.updateResult();
      }
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      __privateGet(this, _currentQuery),
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
    __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
    __privateGet(this, _currentQuery).removeObserver(this);
  }
  setOptions(options) {
    const prevOptions = this.options;
    const prevQuery = __privateGet(this, _currentQuery);
    this.options = __privateGet(this, _client2).defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
    __privateGet(this, _currentQuery).setOptions(this.options);
    if (prevOptions._defaulted && !shallowEqualObjects(this.options, prevOptions)) {
      __privateGet(this, _client2).getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: __privateGet(this, _currentQuery),
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      __privateGet(this, _currentQuery),
      prevQuery,
      this.options,
      prevOptions
    )) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
    this.updateResult();
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || resolveStaleTime(this.options.staleTime, __privateGet(this, _currentQuery)) !== resolveStaleTime(prevOptions.staleTime, __privateGet(this, _currentQuery)))) {
      __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
    }
    const nextRefetchInterval = __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this);
    if (mounted && (__privateGet(this, _currentQuery) !== prevQuery || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) !== resolveEnabled(prevOptions.enabled, __privateGet(this, _currentQuery)) || nextRefetchInterval !== __privateGet(this, _currentRefetchInterval))) {
      __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      __privateSet(this, _currentResult, result);
      __privateSet(this, _currentResultOptions, this.options);
      __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    }
    return result;
  }
  getCurrentResult() {
    return __privateGet(this, _currentResult);
  }
  trackResult(result, onPropTracked) {
    return new Proxy(result, {
      get: (target, key) => {
        this.trackProp(key);
        onPropTracked?.(key);
        return Reflect.get(target, key);
      }
    });
  }
  trackProp(key) {
    __privateGet(this, _trackedProps).add(key);
  }
  getCurrentQuery() {
    return __privateGet(this, _currentQuery);
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = __privateGet(this, _client2).defaultQueryOptions(options);
    const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), defaultedOptions);
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this, {
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return __privateGet(this, _currentResult);
    });
  }
  createResult(query, options) {
    const prevQuery = __privateGet(this, _currentQuery);
    const prevOptions = this.options;
    const prevResult = __privateGet(this, _currentResult);
    const prevResultState = __privateGet(this, _currentResultState);
    const prevResultOptions = __privateGet(this, _currentResultOptions);
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : __privateGet(this, _currentQueryInitialState);
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...fetchState(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    data = newState.data;
    let skipSelect = false;
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
        placeholderData = prevResult.data;
        skipSelect = true;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          __privateGet(this, _lastQueryWithDefinedData)?.state.data,
          __privateGet(this, _lastQueryWithDefinedData)
        ) : options.placeholderData;
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = replaceData(
          prevResult?.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (options.select && data !== void 0 && !skipSelect) {
      if (prevResult && data === prevResultState?.data && options.select === __privateGet(this, _selectFn)) {
        data = __privateGet(this, _selectResult);
      } else {
        try {
          __privateSet(this, _selectFn, options.select);
          data = options.select(data);
          data = replaceData(prevResult?.data, data, options);
          __privateSet(this, _selectResult, data);
          __privateSet(this, _selectError, null);
        } catch (selectError) {
          __privateSet(this, _selectError, selectError);
        }
      }
    }
    if (__privateGet(this, _selectError)) {
      error = __privateGet(this, _selectError);
      data = __privateGet(this, _selectResult);
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: __privateGet(this, _currentThenable)
    };
    const nextResult = result;
    if (this.options.experimental_prefetchInRender) {
      const finalizeThenableIfPossible = (thenable) => {
        if (nextResult.status === "error") {
          thenable.reject(nextResult.error);
        } else if (nextResult.data !== void 0) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = __privateSet(this, _currentThenable, nextResult.promise = pendingThenable());
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = __privateGet(this, _currentThenable);
      switch (prevThenable.status) {
        case "pending":
          if (query.queryHash === prevQuery.queryHash) {
            finalizeThenableIfPossible(prevThenable);
          }
          break;
        case "fulfilled":
          if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    return nextResult;
  }
  updateResult() {
    const prevResult = __privateGet(this, _currentResult);
    const nextResult = this.createResult(__privateGet(this, _currentQuery), this.options);
    __privateSet(this, _currentResultState, __privateGet(this, _currentQuery).state);
    __privateSet(this, _currentResultOptions, this.options);
    if (__privateGet(this, _currentResultState).data !== void 0) {
      __privateSet(this, _lastQueryWithDefinedData, __privateGet(this, _currentQuery));
    }
    if (shallowEqualObjects(nextResult, prevResult)) {
      return;
    }
    __privateSet(this, _currentResult, nextResult);
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !__privateGet(this, _trackedProps).size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? __privateGet(this, _trackedProps)
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(__privateGet(this, _currentResult)).some((key) => {
        const typedKey = key;
        const changed = __privateGet(this, _currentResult)[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    __privateMethod(this, _QueryObserver_instances, notify_fn).call(this, { listeners: shouldNotifyListeners() });
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      __privateMethod(this, _QueryObserver_instances, updateTimers_fn).call(this);
    }
  }
}, _client2 = new WeakMap(), _currentQuery = new WeakMap(), _currentQueryInitialState = new WeakMap(), _currentResult = new WeakMap(), _currentResultState = new WeakMap(), _currentResultOptions = new WeakMap(), _currentThenable = new WeakMap(), _selectError = new WeakMap(), _selectFn = new WeakMap(), _selectResult = new WeakMap(), _lastQueryWithDefinedData = new WeakMap(), _staleTimeoutId = new WeakMap(), _refetchIntervalId = new WeakMap(), _currentRefetchInterval = new WeakMap(), _trackedProps = new WeakMap(), _QueryObserver_instances = new WeakSet(), executeFetch_fn = function(fetchOptions) {
  __privateMethod(this, _QueryObserver_instances, updateQuery_fn).call(this);
  let promise = __privateGet(this, _currentQuery).fetch(
    this.options,
    fetchOptions
  );
  if (!fetchOptions?.throwOnError) {
    promise = promise.catch(noop);
  }
  return promise;
}, updateStaleTimeout_fn = function() {
  __privateMethod(this, _QueryObserver_instances, clearStaleTimeout_fn).call(this);
  const staleTime = resolveStaleTime(
    this.options.staleTime,
    __privateGet(this, _currentQuery)
  );
  if (isServer || __privateGet(this, _currentResult).isStale || !isValidTimeout(staleTime)) {
    return;
  }
  const time = timeUntilStale(__privateGet(this, _currentResult).dataUpdatedAt, staleTime);
  const timeout = time + 1;
  __privateSet(this, _staleTimeoutId, setTimeout(() => {
    if (!__privateGet(this, _currentResult).isStale) {
      this.updateResult();
    }
  }, timeout));
}, computeRefetchInterval_fn = function() {
  return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(__privateGet(this, _currentQuery)) : this.options.refetchInterval) ?? false;
}, updateRefetchInterval_fn = function(nextInterval) {
  __privateMethod(this, _QueryObserver_instances, clearRefetchInterval_fn).call(this);
  __privateSet(this, _currentRefetchInterval, nextInterval);
  if (isServer || resolveEnabled(this.options.enabled, __privateGet(this, _currentQuery)) === false || !isValidTimeout(__privateGet(this, _currentRefetchInterval)) || __privateGet(this, _currentRefetchInterval) === 0) {
    return;
  }
  __privateSet(this, _refetchIntervalId, setInterval(() => {
    if (this.options.refetchIntervalInBackground || focusManager.isFocused()) {
      __privateMethod(this, _QueryObserver_instances, executeFetch_fn).call(this);
    }
  }, __privateGet(this, _currentRefetchInterval)));
}, updateTimers_fn = function() {
  __privateMethod(this, _QueryObserver_instances, updateStaleTimeout_fn).call(this);
  __privateMethod(this, _QueryObserver_instances, updateRefetchInterval_fn).call(this, __privateMethod(this, _QueryObserver_instances, computeRefetchInterval_fn).call(this));
}, clearStaleTimeout_fn = function() {
  if (__privateGet(this, _staleTimeoutId)) {
    clearTimeout(__privateGet(this, _staleTimeoutId));
    __privateSet(this, _staleTimeoutId, void 0);
  }
}, clearRefetchInterval_fn = function() {
  if (__privateGet(this, _refetchIntervalId)) {
    clearInterval(__privateGet(this, _refetchIntervalId));
    __privateSet(this, _refetchIntervalId, void 0);
  }
}, updateQuery_fn = function() {
  const query = __privateGet(this, _client2).getQueryCache().build(__privateGet(this, _client2), this.options);
  if (query === __privateGet(this, _currentQuery)) {
    return;
  }
  const prevQuery = __privateGet(this, _currentQuery);
  __privateSet(this, _currentQuery, query);
  __privateSet(this, _currentQueryInitialState, query.state);
  if (this.hasListeners()) {
    prevQuery?.removeObserver(this);
    query.addObserver(this);
  }
}, notify_fn = function(notifyOptions) {
  notifyManager.batch(() => {
    if (notifyOptions.listeners) {
      this.listeners.forEach((listener) => {
        listener(__privateGet(this, _currentResult));
      });
    }
    __privateGet(this, _client2).getQueryCache().notify({
      query: __privateGet(this, _currentQuery),
      type: "observerResultsUpdated"
    });
  });
}, _a9);
function shouldLoadOnMount(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if (resolveEnabled(options.enabled, query) !== false && resolveStaleTime(options.staleTime, query) !== "static") {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || resolveEnabled(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return resolveEnabled(options.enabled, query) !== false && query.isStaleByTime(resolveStaleTime(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!shallowEqualObjects(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}

// ../node_modules/@tanstack/query-core/build/modern/hydration.js
function defaultTransformerFn(data) {
  return data;
}
function dehydrateMutation(mutation) {
  return {
    mutationKey: mutation.options.mutationKey,
    state: mutation.state,
    ...mutation.options.scope && { scope: mutation.options.scope },
    ...mutation.meta && { meta: mutation.meta }
  };
}
function dehydrateQuery(query, serializeData, shouldRedactErrors) {
  return {
    dehydratedAt: Date.now(),
    state: {
      ...query.state,
      ...query.state.data !== void 0 && {
        data: serializeData(query.state.data)
      }
    },
    queryKey: query.queryKey,
    queryHash: query.queryHash,
    ...query.state.status === "pending" && {
      promise: query.promise?.then(serializeData).catch((error) => {
        if (!shouldRedactErrors(error)) {
          return Promise.reject(error);
        }
        if (process.env.NODE_ENV !== "production") {
          console.error(
            `A query that was dehydrated as pending ended up rejecting. [${query.queryHash}]: ${error}; The error will be redacted in production builds`
          );
        }
        return Promise.reject(new Error("redacted"));
      })
    },
    ...query.meta && { meta: query.meta }
  };
}
function defaultShouldDehydrateMutation(mutation) {
  return mutation.state.isPaused;
}
function defaultShouldDehydrateQuery(query) {
  return query.state.status === "success";
}
function defaultShouldRedactErrors(_) {
  return true;
}
function dehydrate(client, options = {}) {
  const filterMutation = options.shouldDehydrateMutation ?? client.getDefaultOptions().dehydrate?.shouldDehydrateMutation ?? defaultShouldDehydrateMutation;
  const mutations = client.getMutationCache().getAll().flatMap(
    (mutation) => filterMutation(mutation) ? [dehydrateMutation(mutation)] : []
  );
  const filterQuery = options.shouldDehydrateQuery ?? client.getDefaultOptions().dehydrate?.shouldDehydrateQuery ?? defaultShouldDehydrateQuery;
  const shouldRedactErrors = options.shouldRedactErrors ?? client.getDefaultOptions().dehydrate?.shouldRedactErrors ?? defaultShouldRedactErrors;
  const serializeData = options.serializeData ?? client.getDefaultOptions().dehydrate?.serializeData ?? defaultTransformerFn;
  const queries = client.getQueryCache().getAll().flatMap(
    (query) => filterQuery(query) ? [dehydrateQuery(query, serializeData, shouldRedactErrors)] : []
  );
  return { mutations, queries };
}
function hydrate(client, dehydratedState, options) {
  if (typeof dehydratedState !== "object" || dehydratedState === null) {
    return;
  }
  const mutationCache = client.getMutationCache();
  const queryCache = client.getQueryCache();
  const deserializeData = options?.defaultOptions?.deserializeData ?? client.getDefaultOptions().hydrate?.deserializeData ?? defaultTransformerFn;
  const mutations = dehydratedState.mutations || [];
  const queries = dehydratedState.queries || [];
  mutations.forEach(({ state, ...mutationOptions }) => {
    mutationCache.build(
      client,
      {
        ...client.getDefaultOptions().hydrate?.mutations,
        ...options?.defaultOptions?.mutations,
        ...mutationOptions
      },
      state
    );
  });
  queries.forEach(
    ({ queryKey, state, queryHash, meta, promise, dehydratedAt }) => {
      const syncData = promise ? tryResolveSync(promise) : void 0;
      const rawData = state.data === void 0 ? syncData?.data : state.data;
      const data = rawData === void 0 ? rawData : deserializeData(rawData);
      let query = queryCache.get(queryHash);
      const existingQueryIsPending = query?.state.status === "pending";
      const existingQueryIsFetching = query?.state.fetchStatus === "fetching";
      if (query) {
        const hasNewerSyncData = syncData && // We only need this undefined check to handle older dehydration
        // payloads that might not have dehydratedAt
        dehydratedAt !== void 0 && dehydratedAt > query.state.dataUpdatedAt;
        if (state.dataUpdatedAt > query.state.dataUpdatedAt || hasNewerSyncData) {
          const { fetchStatus: _ignored, ...serializedState } = state;
          query.setState({
            ...serializedState,
            data
          });
        }
      } else {
        query = queryCache.build(
          client,
          {
            ...client.getDefaultOptions().hydrate?.queries,
            ...options?.defaultOptions?.queries,
            queryKey,
            queryHash,
            meta
          },
          // Reset fetch status to idle to avoid
          // query being stuck in fetching state upon hydration
          {
            ...state,
            data,
            fetchStatus: "idle",
            status: data !== void 0 ? "success" : state.status
          }
        );
      }
      if (promise && !existingQueryIsPending && !existingQueryIsFetching && // Only hydrate if dehydration is newer than any existing data,
      // this is always true for new queries
      (dehydratedAt === void 0 || dehydratedAt > query.state.dataUpdatedAt)) {
        void query.fetch(void 0, {
          // RSC transformed promises are not thenable
          initialPromise: Promise.resolve(promise).then(deserializeData)
        });
      }
    }
  );
}

// ../node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js
import * as React from "react";
import { jsx } from "react/jsx-runtime";
var QueryClientContext = React.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = React.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};

// ../node_modules/@tanstack/react-query/build/modern/IsRestoringProvider.js
import * as React2 from "react";
var IsRestoringContext = React2.createContext(false);
var useIsRestoring = () => React2.useContext(IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;

// ../node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js
import * as React3 from "react";
import { jsx as jsx2 } from "react/jsx-runtime";
function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = React3.createContext(createValue());
var useQueryErrorResetBoundary = () => React3.useContext(QueryErrorResetBoundaryContext);

// ../node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js
import * as React4 from "react";
var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary) => {
  if (options.suspense || options.throwOnError || options.experimental_prefetchInRender) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  React4.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query,
  suspense
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (suspense && result.data === void 0 || shouldThrowError(throwOnError, [result.error, query]));
};

// ../node_modules/@tanstack/react-query/build/modern/suspense.js
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    const clamp = (value) => value === "static" ? value : Math.max(value ?? 1e3, 1e3);
    const originalStaleTime = defaultedOptions.staleTime;
    defaultedOptions.staleTime = typeof originalStaleTime === "function" ? (...args) => clamp(originalStaleTime(...args)) : clamp(originalStaleTime);
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, 1e3);
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});

// ../node_modules/@tanstack/react-query/build/modern/useBaseQuery.js
import * as React5 from "react";
function useBaseQuery(options, Observer, queryClient) {
  if (process.env.NODE_ENV !== "production") {
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new Error(
        'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
      );
    }
  }
  const isRestoring = useIsRestoring();
  const errorResetBoundary = useQueryErrorResetBoundary();
  const client = useQueryClient(queryClient);
  const defaultedOptions = client.defaultQueryOptions(options);
  client.getDefaultOptions().queries?._experimental_beforeQuery?.(
    defaultedOptions
  );
  if (process.env.NODE_ENV !== "production") {
    if (!defaultedOptions.queryFn) {
      console.error(
        `[${defaultedOptions.queryHash}]: No queryFn was passed as an option, and no default queryFn was found. The queryFn parameter is only optional when using a default queryFn. More info here: https://tanstack.com/query/latest/docs/framework/react/guides/default-query-function`
      );
    }
  }
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  ensureSuspenseTimers(defaultedOptions);
  ensurePreventErrorBoundaryRetry(defaultedOptions, errorResetBoundary);
  useClearResetErrorBoundary(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryCache().get(defaultedOptions.queryHash);
  const [observer] = React5.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  const shouldSubscribe = !isRestoring && options.subscribed !== false;
  React5.useSyncExternalStore(
    React5.useCallback(
      (onStoreChange) => {
        const unsubscribe = shouldSubscribe ? observer.subscribe(notifyManager.batchCalls(onStoreChange)) : noop;
        observer.updateResult();
        return unsubscribe;
      },
      [observer, shouldSubscribe]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  React5.useEffect(() => {
    observer.setOptions(defaultedOptions);
  }, [defaultedOptions, observer]);
  if (shouldSuspend(defaultedOptions, result)) {
    throw fetchOptimistic(defaultedOptions, observer, errorResetBoundary);
  }
  if (getHasError({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query: client.getQueryCache().get(defaultedOptions.queryHash),
    suspense: defaultedOptions.suspense
  })) {
    throw result.error;
  }
  ;
  client.getDefaultOptions().queries?._experimental_afterQuery?.(
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !isServer && willFetch(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      fetchOptimistic(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      client.getQueryCache().get(defaultedOptions.queryHash)?.promise
    );
    promise?.catch(noop).finally(() => {
      observer.updateResult();
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}

// ../node_modules/@tanstack/react-query/build/modern/useQuery.js
function useQuery(options, queryClient) {
  return useBaseQuery(options, QueryObserver, queryClient);
}

// src/wsf/shared/caching/config.ts
var SECOND = 1e3;
var MINUTE = 60 * SECOND;
var HOUR = 60 * MINUTE;
var DAY = 24 * HOUR;
var WEEK = 7 * DAY;
var MONTH = 30 * DAY;
var FREQUENT_UPDATE_CONFIG = {
  // Data is considered stale after 30 seconds
  staleTime: 30 * SECOND,
  // Keep in cache for 2 minutes
  gcTime: 2 * MINUTE,
  // Refetch every 5 seconds when component is active
  refetchInterval: 5 * SECOND,
  // Refetch when window regains focus
  refetchOnWindowFocus: true,
  // Retry up to 3 times with exponential backoff
  retry: 3,
  retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 3e4)
};
var INFREQUENT_UPDATE_CONFIG = {
  // Data is considered stale after 1 week (since cache flush will invalidate if it changes)
  staleTime: 1 * WEEK,
  // Keep in cache for 1 month (aggressive caching since cache flush handles invalidation)
  gcTime: 1 * MONTH,
  // No automatic refetch interval - rely on cache flush invalidation
  refetchInterval: false,
  // Refetch when window regains focus (but only if stale)
  refetchOnWindowFocus: true,
  // Retry up to 5 times with exponential backoff
  retry: 5,
  retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 3e4)
};
var CACHE_FLUSH_CONFIG = {
  // Data is considered stale after 5 minutes
  staleTime: 5 * MINUTE,
  // Keep in cache for 10 minutes
  gcTime: 10 * MINUTE,
  // Refetch every 2 minutes to check for updates
  refetchInterval: 2 * MINUTE,
  // Refetch when window regains focus
  refetchOnWindowFocus: true,
  // Retry up to 5 times with exponential backoff
  retry: 5,
  retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 3e4)
};
var createFrequentUpdateOptions = (additionalOptions = {}) => ({
  ...FREQUENT_UPDATE_CONFIG,
  ...additionalOptions
});
var createInfrequentUpdateOptions = (additionalOptions = {}) => ({
  ...INFREQUENT_UPDATE_CONFIG,
  ...additionalOptions
});
var createCacheFlushOptions = (additionalOptions = {}) => ({
  ...CACHE_FLUSH_CONFIG,
  ...additionalOptions
});

// src/wsf/schedule/routes/hook.ts
var useRoutes = (tripDate) => {
  return useQuery({
    queryKey: ["schedule", "routes", tripDate.toISOString().split("T")[0]],
    queryFn: () => getRoutes(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions()
  });
};
var useRoutesByTerminals = (params) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "byTerminals",
      params.tripDate.toISOString().split("T")[0],
      params.departingTerminalId,
      params.arrivingTerminalId
    ],
    queryFn: () => getRoutesByTerminals(params),
    enabled: !!params.tripDate && !!params.departingTerminalId && !!params.arrivingTerminalId,
    ...createInfrequentUpdateOptions()
  });
};
var useRoutesWithDisruptions = (tripDate) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "withDisruptions",
      tripDate.toISOString().split("T")[0]
    ],
    queryFn: () => getRoutesWithDisruptions(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions()
  });
};
var useRouteDetails = (tripDate) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "details",
      tripDate.toISOString().split("T")[0]
    ],
    queryFn: () => getRouteDetails(tripDate),
    enabled: !!tripDate,
    ...createInfrequentUpdateOptions()
  });
};
var useRouteDetailsByTerminals = (params) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "detailsByTerminals",
      params.tripDate.toISOString().split("T")[0],
      params.departingTerminalId,
      params.arrivingTerminalId
    ],
    queryFn: () => getRouteDetailsByTerminals(params),
    enabled: !!params.tripDate && !!params.departingTerminalId && !!params.arrivingTerminalId,
    ...createInfrequentUpdateOptions()
  });
};
var useRouteDetailsByRoute = (tripDate, routeId) => {
  return useQuery({
    queryKey: [
      "schedule",
      "routes",
      "detailsByRoute",
      tripDate.toISOString().split("T")[0],
      routeId
    ],
    queryFn: () => getRouteDetailsByRoute({ tripDate, routeId }),
    enabled: !!tripDate && !!routeId,
    ...createInfrequentUpdateOptions()
  });
};
var useScheduledRoutes = () => {
  return useQuery({
    queryKey: ["schedule", "scheduledRoutes"],
    queryFn: getScheduledRoutes,
    ...createInfrequentUpdateOptions()
  });
};
var useScheduledRoutesBySeason = (seasonId) => {
  return useQuery({
    queryKey: ["schedule", "scheduledRoutes", "bySeason", seasonId],
    queryFn: () => getScheduledRoutesBySeason(seasonId),
    enabled: !!seasonId,
    ...createInfrequentUpdateOptions()
  });
};
var useActiveSeasons = () => {
  return useQuery({
    queryKey: ["schedule", "activeSeasons"],
    queryFn: getActiveSeasons,
    ...createInfrequentUpdateOptions()
  });
};
var useAlerts = () => {
  return useQuery({
    queryKey: ["schedule", "alerts"],
    queryFn: getAlerts,
    ...createInfrequentUpdateOptions()
  });
};

// src/wsf/schedule/schedules/api.ts
var getScheduleByRoute = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/schedule/{tripDate}/{routeID}", params)
);
var getScheduleByTerminals = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl(
    "/schedule/{tripDate}/{departingTerminalID}/{arrivingTerminalID}",
    params
  )
);
var getScheduleTodayByRoute = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/scheduletoday/{routeID}", params)
);
var getScheduleTodayByTerminals = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl(
    "/scheduletoday/{departingTerminalID}/{arrivingTerminalID}",
    params
  )
);
var getSailings = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/sailings/{schedRouteID}", params)
);
var getAllSailings = (params) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/allsailings/{schedRouteID}/{year}", params)
);

// src/wsf/schedule/schedules/hook.ts
var useScheduleByRoute = (tripDate, routeId) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "byRoute",
      tripDate.toISOString().split("T")[0],
      routeId
    ],
    queryFn: () => getScheduleByRoute({ tripDate, routeID: routeId }),
    enabled: !!tripDate && !!routeId,
    ...createInfrequentUpdateOptions()
  });
};
var useScheduleByTerminals = (params) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "byTerminals",
      params.tripDate.toISOString().split("T")[0],
      params.departingTerminalID,
      params.arrivingTerminalID
    ],
    queryFn: () => getScheduleByTerminals(params),
    enabled: !!params.tripDate && !!params.departingTerminalID && !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions()
  });
};
var useScheduleTodayByRoute = (routeId) => {
  return useQuery({
    queryKey: ["schedule", "schedules", "todayByRoute", routeId],
    queryFn: () => getScheduleTodayByRoute({ routeID: routeId }),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions()
  });
};
var useScheduleTodayByTerminals = (params) => {
  return useQuery({
    queryKey: [
      "schedule",
      "schedules",
      "todayByTerminals",
      params.departingTerminalID,
      params.arrivingTerminalID
    ],
    queryFn: () => getScheduleTodayByTerminals(params),
    enabled: !!params.departingTerminalID && !!params.arrivingTerminalID,
    ...createInfrequentUpdateOptions()
  });
};
var useSailings = (schedRouteID) => {
  return useQuery({
    queryKey: ["schedule", "sailings", schedRouteID],
    queryFn: () => getSailings({ schedRouteID }),
    enabled: !!schedRouteID,
    ...createInfrequentUpdateOptions()
  });
};
var useAllSailings = (schedRouteID, year) => {
  return useQuery({
    queryKey: ["schedule", "allSailings", schedRouteID, year],
    queryFn: () => getAllSailings({ schedRouteID, year }),
    enabled: !!schedRouteID && !!year,
    ...createInfrequentUpdateOptions()
  });
};

// src/wsf/schedule/terminals/api.ts
var getTerminals = (tripDate) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/terminals/{tripDate}", { tripDate })
);
var getTerminalsByRoute = (routeId) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/terminalsandmatesbyroute/{routeId}", { routeId })
);
var getTerminalsAndMates = (tripDate) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/terminalsandmates/{tripDate}", { tripDate })
);
var getTerminalMates = (tripDate, terminalId) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/terminalmates/{tripDate}/{terminalId}", {
    tripDate,
    terminalId
  })
);

// src/wsf/schedule/terminals/hook.ts
var useTerminals = (tripDate) => {
  return useQuery({
    queryKey: ["schedule", "terminals", tripDate.toISOString().split("T")[0]],
    queryFn: () => getTerminals(tripDate),
    ...createInfrequentUpdateOptions()
  });
};
var useTerminalsByRoute = (routeId) => {
  return useQuery({
    queryKey: ["schedule", "terminals", "byRoute", routeId],
    queryFn: () => getTerminalsByRoute(routeId),
    ...createInfrequentUpdateOptions()
  });
};
var useTerminalsAndMates = (tripDate) => {
  return useQuery({
    queryKey: [
      "schedule",
      "terminals",
      "andMates",
      tripDate.toISOString().split("T")[0]
    ],
    queryFn: () => getTerminalsAndMates(tripDate),
    ...createInfrequentUpdateOptions()
  });
};
var useTerminalMates = (tripDate, terminalId) => {
  return useQuery({
    queryKey: [
      "schedule",
      "terminals",
      "mates",
      tripDate.toISOString().split("T")[0],
      terminalId
    ],
    queryFn: () => getTerminalMates(tripDate, terminalId),
    ...createInfrequentUpdateOptions()
  });
};

// src/wsf/schedule/vessels/api.ts
var getVessels = () => fetchWsfArray("schedule", "/vessels");
var getVesselsByRoute = (routeID) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/vessels/{routeID}", { routeID })
);

// src/wsf/schedule/vessels/hook.ts
var useVessels = () => {
  return useQuery({
    queryKey: ["schedule", "vessels"],
    queryFn: getVessels,
    ...createInfrequentUpdateOptions()
  });
};
var useVesselsByRoute = (routeId) => {
  return useQuery({
    queryKey: ["schedule", "vessels", "byRoute", routeId],
    queryFn: () => getVesselsByRoute(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions()
  });
};

// src/wsf/schedule/timeAdjustments/api.ts
var getTimeAdjustments = () => fetchWsfArray("schedule", "/timeadj");
var getTimeAdjustmentsByRoute = (routeID) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/timeadjbyroute/{routeID}", { routeID })
);
var getTimeAdjustmentsBySchedRoute = (schedRouteID) => fetchWsfArray(
  "schedule",
  buildWsfUrl("/timeadjbyschedroute/{schedRouteID}", { schedRouteID })
);

// src/wsf/schedule/timeAdjustments/hook.ts
var useTimeAdjustments = () => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments"],
    queryFn: getTimeAdjustments,
    ...createInfrequentUpdateOptions()
  });
};
var useTimeAdjustmentsByRoute = (routeId) => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments", "byRoute", routeId],
    queryFn: () => getTimeAdjustmentsByRoute(routeId),
    enabled: !!routeId,
    ...createInfrequentUpdateOptions()
  });
};
var useTimeAdjustmentsBySchedRoute = (schedRouteID) => {
  return useQuery({
    queryKey: ["schedule", "timeAdjustments", "bySchedRoute", schedRouteID],
    queryFn: () => getTimeAdjustmentsBySchedRoute(schedRouteID),
    enabled: !!schedRouteID,
    ...createInfrequentUpdateOptions()
  });
};

// src/wsf/schedule/validDateRange/api.ts
var getValidDateRange = () => fetchWsf("schedule", "/validdaterange");

// src/wsf/schedule/validDateRange/hook.ts
var useValidDateRange = () => {
  return useQuery({
    queryKey: ["schedule", "validDateRange"],
    queryFn: getValidDateRange,
    ...createInfrequentUpdateOptions()
  });
};

// src/wsf/schedule/cacheFlushDateSchedule/api.ts
var getCacheFlushDateSchedule = () => fetchWsf("schedule", "/cacheflushdate");

// src/wsf/schedule/cacheFlushDateSchedule/hook.ts
var useCacheFlushDateSchedule = () => {
  return useQuery({
    queryKey: ["schedule", "cacheFlushDate"],
    queryFn: getCacheFlushDateSchedule,
    ...createCacheFlushOptions()
  });
};

// src/wsf/terminals/cacheFlushDateTerminals/api.ts
var getCacheFlushDateTerminals = () => fetchWsf("terminals", "/cacheflushdate");

// src/wsf/terminals/cacheFlushDateTerminals/hook.ts
var useCacheFlushDateTerminals = () => useQuery({
  queryKey: ["terminals", "cacheFlushDate"],
  queryFn: getCacheFlushDateTerminals,
  ...createCacheFlushOptions()
});

// src/wsf/terminals/terminalSailingSpace/api.ts
var getTerminalSailingSpace = () => fetchWsfArray("terminals", "/terminalsailingspace");
var getTerminalSailingSpaceById = (terminalId) => fetchWsfArray(
  "terminals",
  buildWsfUrl("/terminalsailingspace/{terminalId}", { terminalId })
);

// src/wsf/terminals/terminalSailingSpace/hook.ts
var useTerminalSailingSpace = () => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace"],
    queryFn: getTerminalSailingSpace,
    ...createFrequentUpdateOptions()
  });
};
var useTerminalSailingSpaceById = (terminalId) => {
  return useQuery({
    queryKey: ["terminals", "sailingSpace", "byId", terminalId],
    queryFn: () => getTerminalSailingSpaceById(terminalId),
    enabled: !!terminalId,
    ...createFrequentUpdateOptions()
  });
};

// src/wsf/terminals/terminalverbose/api.ts
var getTerminalVerbose = () => fetchWsfArray("terminals", "/terminalverbose");
var getTerminalVerboseById = (terminalId) => fetchWsfArray(
  "terminals",
  buildWsfUrl("/terminalverbose/{terminalId}", { terminalId })
);

// src/wsf/terminals/terminalverbose/hook.ts
var useTerminalVerbose = () => {
  return useQuery({
    queryKey: ["terminals", "verbose"],
    queryFn: getTerminalVerbose,
    ...createInfrequentUpdateOptions()
  });
};
var useTerminalVerboseById = (terminalId) => {
  return useQuery({
    queryKey: ["terminals", "verbose", "byId", terminalId],
    queryFn: () => getTerminalVerboseById(terminalId),
    enabled: !!terminalId,
    ...createInfrequentUpdateOptions()
  });
};

// src/wsf/vessels/cacheFlushDateVessels/api.ts
var getCacheFlushDateVessels = () => fetchWsf("vessels", "/cacheflushdate");

// src/wsf/vessels/cacheFlushDateVessels/hook.ts
var useCacheFlushDateVessels = () => {
  return useQuery({
    queryKey: ["vessels", "cacheFlushDate"],
    queryFn: getCacheFlushDateVessels,
    ...createCacheFlushOptions()
  });
};

// src/wsf/vessels/vesselLocations/api.ts
var getVesselLocations = () => fetchWsfArray("vessels", "/vessellocations");
var getVesselLocationsByVesselId = (vesselId) => fetchWsfArray(
  "vessels",
  buildWsfUrl("/vessellocations/{vesselId}", { vesselId })
);

// src/wsf/vessels/vesselLocations/hook.ts
var useVesselLocations = () => {
  return useQuery({
    queryKey: ["vessels", "locations"],
    queryFn: getVesselLocations,
    ...createFrequentUpdateOptions()
  });
};
var useVesselLocationsByVesselId = (vesselId) => {
  return useQuery({
    queryKey: ["vessels", "locations", "byVesselId", vesselId],
    queryFn: () => getVesselLocationsByVesselId(vesselId),
    enabled: !!vesselId,
    ...createFrequentUpdateOptions()
  });
};

// src/wsf/vessels/vesselVerbose/api.ts
var getVesselVerbose = () => fetchWsfArray("vessels", "/vesselverbose");
var getVesselVerboseById = (vesselId) => fetchWsfArray(
  "vessels",
  buildWsfUrl("/vesselverbose/{vesselId}", { vesselId })
);

// src/wsf/vessels/vesselVerbose/hook.ts
var useVesselVerbose = () => {
  return useQuery({
    queryKey: ["vessels", "verbose"],
    queryFn: getVesselVerbose,
    ...createInfrequentUpdateOptions()
  });
};
var useVesselVerboseById = (vesselId) => {
  return useQuery({
    queryKey: ["vessels", "verbose", "byId", vesselId],
    queryFn: () => getVesselVerboseById(vesselId),
    enabled: !!vesselId,
    ...createInfrequentUpdateOptions()
  });
};

// src/wsf/shared/caching/CacheProvider.tsx
import { useEffect as useEffect4, useRef } from "react";

// src/wsf/shared/caching/invalidation.ts
var useWsfCacheInvalidation = () => {
  const queryClient = useQueryClient();
  const invalidateVesselQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["vessels"] });
  };
  const invalidateTerminalQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["terminals"] });
  };
  const invalidateScheduleQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["schedule"] });
  };
  const invalidateVesselQueriesByType = (type) => {
    queryClient.invalidateQueries({ queryKey: ["vessels", type] });
  };
  const invalidateTerminalQueriesByType = (type) => {
    queryClient.invalidateQueries({ queryKey: ["terminals", type] });
  };
  const invalidateScheduleQueriesByType = (type) => {
    queryClient.invalidateQueries({ queryKey: ["schedule", type] });
  };
  const invalidateAllWsfQueries = () => {
    queryClient.invalidateQueries({ queryKey: ["vessels"] });
    queryClient.invalidateQueries({ queryKey: ["terminals"] });
    queryClient.invalidateQueries({ queryKey: ["schedule"] });
  };
  return {
    invalidateVesselQueries,
    invalidateTerminalQueries,
    invalidateScheduleQueries,
    invalidateVesselQueriesByType,
    invalidateTerminalQueriesByType,
    invalidateScheduleQueriesByType,
    invalidateAllWsfQueries
  };
};
var useWsfCacheFlushMonitor = () => {
  const queryClient = useQueryClient();
  const monitorVesselsCacheFlush = (lastFlushDate, currentFlushDate) => {
    if (lastFlushDate && currentFlushDate && lastFlushDate.getTime() !== currentFlushDate.getTime()) {
      queryClient.invalidateQueries({ queryKey: ["vessels"] });
    }
  };
  const monitorTerminalsCacheFlush = (lastFlushDate, currentFlushDate) => {
    if (lastFlushDate && currentFlushDate && lastFlushDate.getTime() !== currentFlushDate.getTime()) {
      queryClient.invalidateQueries({ queryKey: ["terminals"] });
    }
  };
  const monitorScheduleCacheFlush = (lastFlushDate, currentFlushDate) => {
    if (lastFlushDate && currentFlushDate && lastFlushDate.getTime() !== currentFlushDate.getTime()) {
      queryClient.invalidateQueries({ queryKey: ["schedule"] });
    }
  };
  return {
    monitorVesselsCacheFlush,
    monitorTerminalsCacheFlush,
    monitorScheduleCacheFlush
  };
};

// src/wsf/shared/caching/CacheProvider.tsx
var WsfCacheProvider = () => {
  const {
    monitorVesselsCacheFlush,
    monitorTerminalsCacheFlush,
    monitorScheduleCacheFlush
  } = useWsfCacheFlushMonitor();
  const { data: vesselsCacheFlushDate } = useCacheFlushDateVessels();
  const { data: terminalsCacheFlushDate } = useCacheFlushDateTerminals();
  const { data: scheduleCacheFlushDate } = useCacheFlushDateSchedule();
  const previousVesselsFlushDate = useRef(null);
  const previousTerminalsFlushDate = useRef(null);
  const previousScheduleFlushDate = useRef(null);
  useEffect4(() => {
    const currentFlushDate = vesselsCacheFlushDate?.lastUpdated || null;
    monitorVesselsCacheFlush(
      previousVesselsFlushDate.current,
      currentFlushDate
    );
    previousVesselsFlushDate.current = currentFlushDate;
  }, [vesselsCacheFlushDate?.lastUpdated, monitorVesselsCacheFlush]);
  useEffect4(() => {
    const currentFlushDate = terminalsCacheFlushDate?.lastUpdated || null;
    monitorTerminalsCacheFlush(
      previousTerminalsFlushDate.current,
      currentFlushDate
    );
    previousTerminalsFlushDate.current = currentFlushDate;
  }, [terminalsCacheFlushDate?.lastUpdated, monitorTerminalsCacheFlush]);
  useEffect4(() => {
    const currentFlushDate = scheduleCacheFlushDate?.lastUpdated || null;
    monitorScheduleCacheFlush(
      previousScheduleFlushDate.current,
      currentFlushDate
    );
    previousScheduleFlushDate.current = currentFlushDate;
  }, [scheduleCacheFlushDate?.lastUpdated, monitorScheduleCacheFlush]);
  return null;
};

// ../node_modules/@tanstack/query-persist-client-core/build/modern/persist.js
var cacheEventTypes = ["added", "removed", "updated"];
function isCacheEventType(eventType) {
  return cacheEventTypes.includes(eventType);
}
async function persistQueryClientRestore({
  queryClient,
  persister,
  maxAge = 1e3 * 60 * 60 * 24,
  buster = "",
  hydrateOptions
}) {
  try {
    const persistedClient = await persister.restoreClient();
    if (persistedClient) {
      if (persistedClient.timestamp) {
        const expired = Date.now() - persistedClient.timestamp > maxAge;
        const busted = persistedClient.buster !== buster;
        if (expired || busted) {
          return persister.removeClient();
        } else {
          hydrate(queryClient, persistedClient.clientState, hydrateOptions);
        }
      } else {
        return persister.removeClient();
      }
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error(err);
      console.warn(
        "Encountered an error attempting to restore client cache from persisted location. As a precaution, the persisted cache will be discarded."
      );
    }
    await persister.removeClient();
    throw err;
  }
}
async function persistQueryClientSave({
  queryClient,
  persister,
  buster = "",
  dehydrateOptions
}) {
  const persistClient = {
    buster,
    timestamp: Date.now(),
    clientState: dehydrate(queryClient, dehydrateOptions)
  };
  await persister.persistClient(persistClient);
}
function persistQueryClientSubscribe(props) {
  const unsubscribeQueryCache = props.queryClient.getQueryCache().subscribe((event) => {
    if (isCacheEventType(event.type)) {
      persistQueryClientSave(props);
    }
  });
  const unsubscribeMutationCache = props.queryClient.getMutationCache().subscribe((event) => {
    if (isCacheEventType(event.type)) {
      persistQueryClientSave(props);
    }
  });
  return () => {
    unsubscribeQueryCache();
    unsubscribeMutationCache();
  };
}
function persistQueryClient(props) {
  let hasUnsubscribed = false;
  let persistQueryClientUnsubscribe;
  const unsubscribe = () => {
    hasUnsubscribed = true;
    persistQueryClientUnsubscribe?.();
  };
  const restorePromise = persistQueryClientRestore(props).then(() => {
    if (!hasUnsubscribed) {
      persistQueryClientUnsubscribe = persistQueryClientSubscribe(props);
    }
  });
  return [unsubscribe, restorePromise];
}

// ../node_modules/@tanstack/query-sync-storage-persister/build/modern/utils.js
function noop2() {
}

// ../node_modules/@tanstack/query-sync-storage-persister/build/modern/index.js
function createSyncStoragePersister({
  storage,
  key = `REACT_QUERY_OFFLINE_CACHE`,
  throttleTime = 1e3,
  serialize = JSON.stringify,
  deserialize = JSON.parse,
  retry
}) {
  if (storage) {
    const trySave = (persistedClient) => {
      try {
        storage.setItem(key, serialize(persistedClient));
        return;
      } catch (error) {
        return error;
      }
    };
    return {
      persistClient: throttle((persistedClient) => {
        let client = persistedClient;
        let error = trySave(client);
        let errorCount = 0;
        while (error && client) {
          errorCount++;
          client = retry?.({
            persistedClient: client,
            error,
            errorCount
          });
          if (client) {
            error = trySave(client);
          }
        }
      }, throttleTime),
      restoreClient: () => {
        const cacheString = storage.getItem(key);
        if (!cacheString) {
          return;
        }
        return deserialize(cacheString);
      },
      removeClient: () => {
        storage.removeItem(key);
      }
    };
  }
  return {
    persistClient: noop2,
    restoreClient: noop2,
    removeClient: noop2
  };
}
function throttle(func, wait = 100) {
  let timer = null;
  let params;
  return function(...args) {
    params = args;
    if (timer === null) {
      timer = setTimeout(() => {
        func(...params);
        timer = null;
      }, wait);
    }
  };
}

// src/wsf/shared/caching/persistence.ts
import * as React6 from "react";
var createPersistentQueryClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Default to infrequent update settings
        staleTime: 7 * 24 * 60 * 60 * 1e3,
        // 1 week
        gcTime: 30 * 24 * 60 * 60 * 1e3,
        // 30 days
        retry: 3,
        retryDelay: (attemptIndex) => Math.min(1e3 * 2 ** attemptIndex, 3e4)
      }
    }
  });
  if (typeof window !== "undefined") {
    const persister = createSyncStoragePersister({
      storage: window.localStorage,
      key: "wsf-query-cache"
      // Namespace for WSF data
    });
    persistQueryClient({
      queryClient,
      persister,
      maxAge: 7 * 24 * 60 * 60 * 1e3,
      // 7 days
      buster: "v1"
      // Cache buster for app updates
    });
  }
  return queryClient;
};
var useStartupRefetch = () => {
  const queryClient = useQueryClient();
  React6.useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["vessels", "locations"] });
    queryClient.invalidateQueries({ queryKey: ["terminals", "sailingSpace"] });
  }, [queryClient]);
};
export {
  API_BASES,
  API_KEY,
  CACHE_FLUSH_CONFIG,
  FREQUENT_UPDATE_CONFIG,
  INFREQUENT_UPDATE_CONFIG,
  WsfCacheProvider,
  buildWsfUrl,
  createCacheFlushOptions,
  createFrequentUpdateOptions,
  createInfrequentUpdateOptions,
  createPersistentQueryClient,
  dateToWsfDateTimeFormat,
  dateToWsfFormat,
  dateToWsfPathFormat,
  dateToWsfTimeFormat,
  fetchInternal,
  fetchWsf,
  fetchWsfArray,
  getActiveSeasons,
  getAlerts,
  getAllSailings,
  getCacheFlushDateSchedule,
  getCacheFlushDateTerminals,
  getCacheFlushDateVessels,
  getDateLabel,
  getRouteDetails,
  getRouteDetailsByRoute,
  getRouteDetailsByTerminals,
  getRoutes,
  getRoutesByTerminals,
  getRoutesWithDisruptions,
  getSailings,
  getScheduleByRoute,
  getScheduleByTerminals,
  getScheduleTodayByRoute,
  getScheduleTodayByTerminals,
  getScheduledRoutes,
  getScheduledRoutesBySeason,
  getTerminalMates,
  getTerminalSailingSpace,
  getTerminalSailingSpaceById,
  getTerminalVerbose,
  getTerminalVerboseById,
  getTerminals,
  getTerminalsAndMates,
  getTerminalsByRoute,
  getTimeAdjustments,
  getTimeAdjustmentsByRoute,
  getTimeAdjustmentsBySchedRoute,
  getTodayWsfFormat,
  getTomorrowWsfFormat,
  getValidDateRange,
  getVesselLocations,
  getVesselLocationsByVesselId,
  getVesselVerbose,
  getVesselVerboseById,
  getVessels,
  getVesselsByRoute,
  isToday,
  isTomorrow,
  parseWsfDateTime,
  parseWsfScheduleDate,
  parseWsfTime,
  transformWsfData,
  useActiveSeasons,
  useAlerts,
  useAllSailings,
  useCacheFlushDateSchedule,
  useCacheFlushDateTerminals,
  useCacheFlushDateVessels,
  useRouteDetails,
  useRouteDetailsByRoute,
  useRouteDetailsByTerminals,
  useRoutes,
  useRoutesByTerminals,
  useRoutesWithDisruptions,
  useSailings,
  useScheduleByRoute,
  useScheduleByTerminals,
  useScheduleTodayByRoute,
  useScheduleTodayByTerminals,
  useScheduledRoutes,
  useScheduledRoutesBySeason,
  useStartupRefetch,
  useTerminalMates,
  useTerminalSailingSpace,
  useTerminalSailingSpaceById,
  useTerminalVerbose,
  useTerminalVerboseById,
  useTerminals,
  useTerminalsAndMates,
  useTerminalsByRoute,
  useTimeAdjustments,
  useTimeAdjustmentsByRoute,
  useTimeAdjustmentsBySchedRoute,
  useValidDateRange,
  useVesselLocations,
  useVesselLocationsByVesselId,
  useVesselVerbose,
  useVesselVerboseById,
  useVessels,
  useVesselsByRoute,
  useWsfCacheFlushMonitor,
  useWsfCacheInvalidation
};
//# sourceMappingURL=index.mjs.map