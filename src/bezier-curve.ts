import { calculateCubicRoots } from '@alesmenzel/cubic-equation';

export type Point = {
  x: number;
  y: number;
};

export type Points = [Point, Point] | [Point, Point, Point, Point];

class BezierCurve {
  p0: Point;

  p1: Point;

  p2: Point;

  p3: Point;

  /**
   * Construct a bezier curve.
   * Calculations based on https://stackoverflow.com/a/8218244
   * IMPORTANT: When passing only 2 points, it is assumed the start is [0,0] and end is [1,1]
   * ```ts
   * // The most simple definition where start and end points are [0,0] and [1,1] respectively
   * const linearCurve = new BezierCurve([{x: 0.5, y: 0.5}, {x: 0.5, y: 0.5}])
   * // Explicitly settings start and end points
   * const linearCurve = new BezierCurve([{x: 0, y: 0.2}, {x: 0.5, y: 0.5}, {x: 0.5, y: 0.5}, {x: 1, y: 0.7}])
   * // Using interval different from x:[0,1],y:[0,1], e.g. x:[0,100],y:[0,255]
   * const linearCurve = new BezierCurve([{x: 0, y: 100}, {x: 50, y: 120}, {x: 50, y: 140}, {x: 100, y: 255}], {
   *   minX: 0,
   *   maxX: 100,
   *   minY: 0,
   *   maxY: 255,
   * })
   * ```
   */
  constructor(points: Points) {
    if (!(points.length === 2 || points.length === 4)) {
      throw new Error(
        'Bezier curve requires 2 or 4 points. You can pass 2 points and your start and end points will implicitely be at [minX,minY] and [maxX,maxY].'
      );
    }
    const [p0, p1, p2, p3] =
      points.length === 4 ? points : [{ x: 0, y: 0 }, ...points, { x: 1, y: 1 }];
    this.p0 = p0;
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;
  }

  // _normalizePoint(point: Point): Point {
  //   return {
  //     x: point.x,
  //     x: point.x,
  //   };
  // }

  /**
   * Calculate the x position on the curve based on t (= progress) between [0,1]
   * X(t) = (1-t)^3 * X0 + 3*(1-t)^2 * t * X1 + 3*(1-t) * t^2 * X2 + t^3 * X3
   * @param {number} t Value between [0,1]
   * @returns {number}
   */
  x(t: number) {
    return (
      (1 - t) ** 3 * this.p0.x +
      3 * (1 - t) ** 2 * t * this.p1.x +
      3 * (1 - t) * t ** 2 * this.p2.x +
      t ** 3 * this.p3.x
    );
  }

  /**
   * Calculate the y position on the curve based on t (= progress) between [0,1]
   * Y(t) = (1-t)^3 * Y0 + 3*(1-t)^2 * t * Y1 + 3*(1-t) * t^2 * Y2 + t^3 * Y3
   * @param {number} t Value between [0,1]
   * @returns {number}
   */
  y(t: number) {
    return (
      (1 - t) ** 3 * this.p0.y +
      3 * (1 - t) ** 2 * t * this.p1.y +
      3 * (1 - t) * t ** 2 * this.p2.y +
      t ** 3 * this.p3.y
    );
  }

  /**
   * Calculate the y value on the bezier curve based on x coordinate
   * @param {number} x The x position
   * @returns {number}
   */
  value(x: number) {
    // Coefficients calculated based on the following formula
    // X(t) = (1-t)^3 * X0 + 3*(1-t)^2 * t * X1 + 3*(1-t) * t^2 * X2 + t^3 * X3
    const t = calculateCubicRoots(
      -this.p0.x + 3 * this.p1.x - 3 * this.p2.x + this.p3.x,
      3 * this.p0.x - 6 * this.p1.x + 3 * this.p2.x,
      -3 * this.p0.x + 3 * this.p1.x,
      this.p0.x - x
    ).find((t: number) => t >= 0 && t <= 1);
    return this.y(t ?? 0);
  }
}

export default BezierCurve;
