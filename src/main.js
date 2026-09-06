import p5 from 'p5';

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(800, 600);
  };

  p.draw = () => {
    p.background(220);

    p.circle(p.mouseX, p.mouseY, 50);
  };
};

new p5(sketch);
