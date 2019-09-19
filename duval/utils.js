/**
 * Convert angles to radians
 * @param func {Function}
 * @param angle {Number}
 * @returns {Number}
 */
export const toRad = (func, angle) => func(angle * Math.PI / 180)

/**
 * Calculate triangle height by edge width
 * @param width {Number}
 * @returns {Number}
 */
export const calculateTriangleHeight = width => Math.sqrt(3) / 2 * width