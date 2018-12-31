const Cssfunc = require('./index');
document.body.innerHTML = `<p>test</p>`;
const $element = document.querySelector('p');
const transformValue = 'translate(10px, 20px) scale(1.1)rotate(45deg)';
$element.style.transform = transformValue;

describe('css-func', () => {
  let cssFunc = Cssfunc($element, 'transform');

  describe('_getValue()', () => {
    it('gets the value of the style property', () => {
      expect(cssFunc._getValue($element, 'transform')).toEqual(
        $element.style.transform
      );
    });
  });
  describe('_setValue()', () => {
    it('sets the value to the dom element', () => {
      cssFunc._setValue('translate(10px, 20px)');
      expect($element.style.transform).toEqual('translate(10px, 20px)');
      $element.style.transform = transformValue;
    });
  });
  describe('_getFunctions()', () => {
    expect(cssFunc._getFunctions(transformValue)).toEqual({
      translate: ['10px', '20px'],
      scale: ['1.1'],
      rotate: ['45deg'],
    });
  });
  describe('get()', () => {
    it('gets the value of the style property', () => {
      expect(cssFunc.get()).toEqual($element.style.transform);
    });
  });
  describe('exists()', () => {
    it('returns true if the element has a specified function name', () => {
      expect(cssFunc.exists('translate')).toBeTruthy();
      expect(cssFunc.exists('rotate')).toBeTruthy();
      expect(cssFunc.exists('scale')).toBeTruthy();
    });
    it("returns false if the element doesn't have a specified function name", () => {
      expect(cssFunc.exists('matrix')).toBeFalsy();
    });
  });
  describe('_getValueFromObject()', () => {
    it('returns a string contaiuning the functions', () => {
      expect(
        cssFunc._getValueFromObject({
          translate: ['10px', '20px'],
          scale: ['1.1'],
          rotate: ['45deg'],
        })
      ).toEqual('translate(10px, 20px) scale(1.1) rotate(45deg)');
    });
  });
  describe('update()', () => {
    afterEach(() => {
      $element.style.transform = transformValue;
      cssFunc = Cssfunc($element, 'transform');
    });
    const object = { ...cssFunc._functionObject };
    it('updates internal functions object', () => {
      expect(cssFunc.update('rotate', ['90deg'])).toBeTruthy();
      expect(cssFunc._functionObject).toEqual({ ...object, rotate: ['90deg'] });
    });
    it("automatically adds the property if it doesn't exist", () => {
      expect(cssFunc.update('rotateY', '90deg')).toBeTruthy();
      expect(cssFunc._functionObject).toEqual({
        ...object,
        rotateY: ['90deg'],
      });
    });
    it('updates the dom element style property', () => {
      expect(cssFunc.update('rotateY', '90deg')).toBeTruthy();
      expect($element.style.transform).toEqual(
        'translate(10px, 20px) scale(1.1) rotate(45deg) rotateY(90deg)'
      );
    });
    it('returns false if property does not exist and autoAdd is not enabled', () => {
      expect(cssFunc.update('rotateX', '90deg', false)).toBeFalsy();
    });
  });
  describe('add()', () => {
    afterEach(() => {
      $element.style.transform = transformValue;
      cssFunc = Cssfunc($element, 'transform');
    });
    const object = { ...cssFunc._functionObject };
    it('adds the property to the functions object', () => {
      expect(cssFunc.add('rotateY', ['90deg'])).toBeTruthy();
      expect(cssFunc._functionObject).toEqual({
        ...object,
        rotateY: ['90deg'],
      });
    });
    it('automatically updates the property if it is aleardy present', () => {
      expect(cssFunc.add('rotate', '90deg')).toBeTruthy();
      expect(cssFunc._functionObject).toEqual({
        ...object,
        rotate: ['90deg'],
      });
    });
    it('updates the dom element style property', () => {
      expect(cssFunc.add('rotateY', '90deg')).toBeTruthy();
      expect($element.style.transform).toEqual(
        'translate(10px, 20px) scale(1.1) rotate(45deg) rotateY(90deg)'
      );
    });
    it('returns false if property exists and autoUpdate is not enabled', () => {
      expect(cssFunc.add('rotate', '90deg', false)).toBeFalsy();
    });
  });
  describe('delete()', () => {
    afterEach(() => {
      $element.style.transform = transformValue;
      cssFunc = Cssfunc($element, 'transform');
    });
    const object = { ...cssFunc._functionObject };
    it('deletes the property', () => {
      expect(cssFunc.delete('rotate')).toBeTruthy();
      delete object['rotate'];
      expect(cssFunc._functionObject).toEqual({
        ...object,
      });
    });
    it('updates the dom element style property', () => {
      expect(cssFunc.delete('rotate')).toBeTruthy();
      expect($element.style.transform).toEqual(
        'translate(10px, 20px) scale(1.1)'
      );
    });
    it('returns false if property does not exist', () => {
      expect(cssFunc.delete('something')).toBeFalsy();
    });
  });
});
