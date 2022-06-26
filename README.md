# ⤴⤵ Bezier Curve

Javascript implementation of bezier curve calculation. [Bezier calculation](https://stackoverflow.com/a/8218244)

## Installation

```bash
npm install @alesmenzel/bezier-curve
```

## Usage

```ts
// The most simple definition where start and end points are [0,0] and [1,1] respectively
const linearCurve = new BezierCurve([{x: 0.5, y: 0.5}, {x: 0.5, y: 0.5}])
// Explicitly settings start and end points
const offsetCurve = new BezierCurve([{x: 0, y: 0.2}, {x: 0.5, y: 0.5}, {x: 0.5, y: 0.5}, {x: 1, y: 0.7}])
// Using interval different from x:[0,1],y:[0,1], e.g. x:[0,100],y:[0,255]
const customCurve = new BezierCurve([{x: 0, y: 100}, {x: 50, y: 120}, {x: 50, y: 140}, {x: 100, y: 255}])
```
