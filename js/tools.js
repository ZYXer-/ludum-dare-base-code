
function rand(min, max) {
  return min + Math.floor((1 + max - min) * Math.random());
}


function randFloat(min, max) {
  return min + ((max - min) * Math.random());
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
  return { x : (vector.x / length), y : (vector.y / length) };
}