import BezierCurve from './bezier-curve';

describe('BezierCurve', () => {
  it('returns linear bezier curve', () => {
    const curve = new BezierCurve([
      { x: 0.5, y: 0.5 },
      { x: 0.5, y: 0.5 },
    ]);
    expect([
      curve.value(0).toFixed(2),
      curve.value(0.25).toFixed(2),
      curve.value(0.5).toFixed(2),
      curve.value(0.75).toFixed(2),
      curve.value(1).toFixed(2),
    ]).toEqual(['0.00', '0.25', '0.50', '0.75', '1.00']);
  });

  it('returns linear bezier curve with start and end points', () => {
    const curve = new BezierCurve([
      { x: 0, y: 0 },
      { x: 0.5, y: 0.5 },
      { x: 0.5, y: 0.5 },
      { x: 1, y: 1 },
    ]);
    expect([
      curve.value(0).toFixed(2),
      curve.value(0.25).toFixed(2),
      curve.value(0.5).toFixed(2),
      curve.value(0.75).toFixed(2),
      curve.value(1).toFixed(2),
    ]).toEqual(['0.00', '0.25', '0.50', '0.75', '1.00']);
  });

  it('returns a custom bezier curve (easeInOutSine)', () => {
    const curve = new BezierCurve([
      { x: 0, y: 0 },
      { x: 0.37, y: 0 },
      { x: 0.63, y: 1 },
      { x: 1, y: 1 },
    ]);
    expect([
      curve.value(0).toFixed(2),
      curve.value(0.25).toFixed(2),
      curve.value(0.5).toFixed(2),
      curve.value(0.75).toFixed(2),
      curve.value(1).toFixed(2),
    ]).toEqual(['0.00', '0.14', '0.50', '0.86', '1.00']);
  });

  it('returns a custom bezier curve (easeInOutSine) with start and end points', () => {
    const curve = new BezierCurve([
      { x: 0, y: 0 },
      { x: 0.37, y: 0 },
      { x: 0.63, y: 1 },
      { x: 1, y: 1 },
    ]);
    expect([
      curve.value(0).toFixed(2),
      curve.value(0.25).toFixed(2),
      curve.value(0.5).toFixed(2),
      curve.value(0.75).toFixed(2),
      curve.value(1).toFixed(2),
    ]).toEqual(['0.00', '0.14', '0.50', '0.86', '1.00']);
  });

  it('returns linear bezier curve with start and end points and custom minimum and maximum', () => {
    const curve = new BezierCurve([
      { x: 0, y: 100 },
      { x: 40, y: 100 },
      { x: 60, y: 30 },
      { x: 100, y: 30 },
    ]);
    expect([
      curve.value(0).toFixed(2),
      curve.value(25).toFixed(2),
      curve.value(50).toFixed(2),
      curve.value(75).toFixed(2),
      curve.value(100).toFixed(2),
    ]).toEqual(['100.00', '90.53', '65.00', '39.47', '30.00']);
  });
});
