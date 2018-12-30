class CssFunc {
  constructor($element, attr) {
    this.$element = $element;
    this.attr = attr;
    // some sort of "virtual style"
    this._functionObject = this._getFunctions(this._getValue($element, attr));
  }
  _getValue($element, attr) {
    return window.getComputedStyle($element).getPropertyValue(attr);
  }
  _setValue(value) {
    this.$element.style[this.attr] = value;
  }
  /**
   * Generates a string from object functions
   * @param  {object} object
   */
  _getValueFromObject(object) {
    let valueString = '';
    Object.keys(object).forEach(functionName => {
      valueString += `${functionName}(${object[functionName].join(', ')}) `;
    });
    return valueString.substring(0, valueString.length - 1);
  }

  /**
   * Returns an object containing functions from the string
   * @param  {object} functionsString
   */
  _getFunctions(functionsString) {
    const regex = /(\w+)\((.*?)\)/; // .*? for ungreedy
    const values = functionsString.split(regex);
    let functions = {};
    for (let i = 1; i < values.length; i += 3) {
      functions[values[i]] = values[i + 1].replace(' ', '').split(',');
    }
    return functions;
  }
  /**
   * Get value from element's property
   */
  get() {
    return this._getValue(this.$element, this.attr);
  }
  /**
   * @param  {string} property
   * @param  {string|array} value
   * @param  {boolean} autoUpdate=true
   */
  add(property, value, autoUpdate = true) {
    if (!this.exists(property)) {
      if (typeof value === 'string') value = [value];
      this._functionObject[property] = value;
      this._setValue(this._getValueFromObject(this._functionObject));
      return true;
    } else if (autoUpdate) {
      // if autoUpdate automatically update the property if it doesn't exist
      this.update(property, value);
      return true;
    }
    return false;
  }
  /**
   * @param  {string} property
   * @param  {string|array} value
   * @param  {boolean} autoAdd=true
   */
  update(property, value, autoAdd = true) {
    if (this.exists(property)) {
      // if the provided value is a string convert it in an array
      if (typeof value === 'string') value = [value];
      // add the property to the functions object
      this._functionObject[property] = value;
      this._setValue(this._getValueFromObject(this._functionObject));
      return true;
    } else if (autoAdd) {
      // if autoAdd automatically add the property if it doesn't exist
      this.add(property, value);
      return true;
    }
    return false;
  }
  /**
   * @param  {string} property
   */
  delete(property) {
    if (this.exists(property)) {
      delete this._functionObject[property];
      this._setValue(this._getValueFromObject(this._functionObject));
      return true;
    }
    return false;
  }
  /**
   * Returns true if property exists
   * @param  {string} property
   */
  exists(property) {
    // check if object has property
    return this._functionObject.hasOwnProperty(property);
  }
}

module.exports = ($element, attr) => new CssFunc($element, attr);
