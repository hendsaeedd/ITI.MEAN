// types
type shape = {
  x: number
  y: number
}

//union
var x: number | string

//function
function add(a: number, b: number): number {
  return a + b
}

//class
class Point2D {
  constructor(public x: number, public y: number) {}

  dist(point: Point2D): number {
    const dx = this.x - point.x
    const dy = this.y - point.y
    return Math.sqrt(dx * dx + dy * dy)
  }
}

const pointA = new Point2D(3, 4)
const pointB = new Point2D(6, 8)
console.log(pointA.dist(pointB))

///////////////
class Point3D extends Point2D {
  constructor(x: number, y: number, public z: number) {
    super(x, y)
  }

  dist(point: Point3D): number {
    const dx = this.x - point.x
    const dy = this.y - point.y
    const dz = this.z - point.z
    return Math.sqrt(dx * dx + dy * dy + dz * dz)
  }
}

const pointC = new Point3D(1, 2, 3)
const pointD = new Point3D(4, 6, 8)
console.log(pointC.dist(pointD))
