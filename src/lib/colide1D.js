/**
 * Check if two line segments touch each other
 * @param {number} p1 The first position
 * @param {number} s1 The first size
 * @param {number} p2 The second position
 * @param {number} s2 The second size
 * @returns {boolean}
 */
const colide1D = (p1, s1, p2, s2) =>
  // segment 2's end is segment 1's start
  (p2 < p1 && p2 + s2 > p1) ||
  // segment 1's end is segment 2's start
  (p1 < p2 && p1 + s1 > p2) ||
  // Segment 2 is inside segment 1
  (p2 >= p1 && p2 + s2 <= p1 + s1) ||
  // Segment 1 is inside segment 2
  (p1 >= p2 && p1 + s1 <= p2 + s2);

export default colide1D;
