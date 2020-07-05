export function getColorByNumber(val, opacity = 1) {
  const red = `rgba(253, 80, 73, ${opacity})`;
  const yellow = `rgba(253, 163, 40, ${opacity})`;
  const green = `rgba(36, 205, 111, ${opacity})`;
  return val >= 90 ? green : val < 90 && val >= 50 ? yellow : red;
}
