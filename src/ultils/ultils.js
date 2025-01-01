export function arrayToObject(array) {
  return array.reduce((acc, curr) => {
    acc[curr.key] = curr.value; // Gán giá trị vào khóa tương ứng
    return acc;
  }, {});
}

export function objectToArray(obj) {
  return Object.entries(obj).map(([key, value]) => ({
    key,
    value,
  }));
}
