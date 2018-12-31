class CssFunc {
  constructor($element, attr) {
    this.$element = $element;
    this.attr = attr;
    // some sort of "virtual style" object
    this._functionObject = this._getFunctions(this._getValue($element, attr));
  }
  _getValue($element, attr) {
    return $element.style[attr];
    // return window.getComputedStyle($element).getPropertyValue(attr);
  }
  _setValue(value) {
    this.$element.style[this.attr] = value;
  }
  /**
   * Generates a string from object functions
   * @param  {object} object
   * @return {string}
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
   * @return {object}
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
   * Gets the property from element
   * @example
   * cssfunc(element, 'transform').get(); // "translate(10px, 20px) scale(1.1)"
   *
   * @return {string} Element property value
   */
  get() {
    return this._getValue(this.$element, this.attr);
  }
  /**
   * Adds or updates a function
   * @example
   * cssfunc(element, 'transform').add('rotate', '10px');
   * cssfunc(element, 'transform').add('translate', ['10px', '20px']);
   * cssfunc(element, 'transform').add('translateX', ['10px']);
   *
   * @param  {string} fproperty CSS function name
   * @param  {(string|array)} value CSS function parameters
   * @param  {boolean} [autoUpdate=true] True to automatically update function if aleady presentTrue to automatically add new function if not present
   * @return {boolean} True if a function was added or updated
   */
  add(fproperty, value, autoUpdate = true) {
    if (!this.exists(fproperty)) {
      if (typeof value === 'string') value = [value];
      this._functionObject[fproperty] = value;
      this._setValue(this._getValueFromObject(this._functionObject));
      return true;
    } else if (autoUpdate) {
      // if autoUpdate automatically update the function if it doesn't exist
      this.update(fproperty, value);
      return true;
    }
    return false;
  }
  /**
   * Updates or adds a function
   * @example
   * cssfunc(element, 'transform').update('rotate');
   *
   * @param  {string} fproperty CSS function name
   * @param  {string|array} value CSS function parameters
   * @param  {boolean} [autoAdd=true] True to automatically add new function if not present
   * @return {boolean} True if a function was updated or added
   */
  update(fproperty, value, autoAdd = true) {
    if (this.exists(fproperty)) {
      // if the provided value is a string convert it in an array
      if (typeof value === 'string') value = [value];
      // add the function to the functions object
      this._functionObject[fproperty] = value;
      this._setValue(this._getValueFromObject(this._functionObject));
      return true;
    } else if (autoAdd) {
      // if autoAdd automatically add the function if it doesn't exist
      this.add(fproperty, value);
      return true;
    }
    return false;
  }
  /**
   * Delete functoin from element style property
   * @example
   * cssfunc(element, 'transform').delete('rotate');
   *
   * @param  {string} fproperty CSS function name
   * @return {boolean} True if there was a function to delete
   */
  delete(fproperty) {
    if (this.exists(fproperty)) {
      delete this._functionObject[fproperty];
      this._setValue(this._getValueFromObject(this._functionObject));
      return true;
    }
    return false;
  }
  /**
   * Returns true if function exists
   * @example
   * cssfunc(element, 'transform').exists('rotate');
   *
   * @param  {string} fproperty CSS function name
   * @return {boolean} True if function exists
   */
  exists(fproperty) {
    // check if object has property
    return this._functionObject.hasOwnProperty(fproperty);
  }
}

module.exports = ($element, attr) => new CssFunc($element, attr);
