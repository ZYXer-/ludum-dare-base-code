
function rand(min, max) {
  return min + Math.floor((1 + max - min) * Math.random());
}


function randFloat(min, max) {
  return min + ((max - min) * Math.random());
}


function zeroOrOne(probability) {
  return rand(0, 999999) < (probability * 1000000);
}


function distance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return Math.sqrt((dx * dx) + (dy * dy));
}


function angle(x1, y1, x2, y2) {
  return Math.atan2(x1 - x2, y2 - y1) * 57.29578;
}


function inPolygon(polygon, pointX, pointY) {
  var inside = false;
  var j = (polygon.length - 1);
  for(var i = 0; i < polygon.length; i++) {
    if(((polygon[i].y > pointY) != (polygon[j].y > pointY)) &&
        (pointX < (polygon[j].x - polygon[i].x) * (pointY - polygon[i].y) / (polygon[j].y - polygon[i].y) + polygon[i].x)) {
      inside = !inside;
    }
    j = i;
  }
  return inside;
}


function normalize(vector) {
  var length = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
  if(length == 0) {
    return { x : 0, y : 0 };
  }
  return { x : (vector.x / length), y : (vector.y / length) };
}


function setInRange(value, min, max) {
  if(value < min) {
    return min;
  }
  if(value > max) {
    return max;
  }
  return value;
}


function drawEllipse(c, x, y, w, h) {
  var kappa = 0.5522848;
  var ox = (w / 2) * kappa;
  var oy = (h / 2) * kappa;
  var xe = x + w;
  var ye = y + h;
  var xm = x + w / 2;
  var ym = y + h / 2;

  c.beginPath();
  c.moveTo(x, ym);
  c.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
  c.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
  c.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
  c.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
  c.closePath();
  c.stroke();
}