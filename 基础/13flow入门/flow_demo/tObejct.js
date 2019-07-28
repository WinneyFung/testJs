// @flow
function method(x: Number, y: String, z: Boolean) {
  console.log(x, y, z);
}

method(new Number(42), new String("world"), new Boolean(false));
