const CONFIG_KEY = Symbol.for('FFmpegFiltergraph.Config');
const DEFAULTS = {
  ffmpeg_bin: '/usr/local/bin/ffmpeg',
  ffprobe_bin: '/usr/local/bin/ffprobe',
  logger: console
};
const _configData = global[CONFIG_KEY] || DEFAULTS;

const updateConfigWithOptions = function (options) {
  Object.keys(DEFAULTS).forEach((key) => {
    if (!this.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        get: () => _configData[key]
      });
    }
  });
  Object.keys(options).forEach((key) => {
    _configData[key] = options[key];
    if (!this.hasOwnProperty(key)) {
      Object.defineProperty(this, key, {
        get: () => _configData[key]
      });
    }
  });
};

/**
 * Get the config object, optionally updated with new options
 * @function
 * @param {Object} options - (optional) options object (default: {})
 * 
 * @returns {Object} - singleton object with config data
 */
module.exports = function (options = {}) {
  try {
    updateConfigWithOptions(options);
    global[CONFIG_KEY] = _configData;
    console.info(`Created config object: ${JSON.stringify(global[CONFIG_KEY])}`);
  } catch (e) {
    console.warn(`Invalid attempt to update frozen configuration. Using current config: ${JSON.stringify(global[CONFIG_KEY])}`);
  }
  return global[CONFIG_KEY];
};