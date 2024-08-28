var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//union
var x;
//function
function add(a, b) {
    return a + b;
}
//class
var Point2D = /** @class */ (function () {
    function Point2D(x, y) {
        this.x = x;
        this.y = y;
    }
    Point2D.prototype.dist = function (point) {
        var dx = this.x - point.x;
        var dy = this.y - point.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    return Point2D;
}());
var pointA = new Point2D(3, 4);
var pointB = new Point2D(6, 8);
console.log(pointA.dist(pointB));
///////////////
var Point3D = /** @class */ (function (_super) {
    __extends(Point3D, _super);
    function Point3D(x, y, z) {
        var _this = _super.call(this, x, y) || this;
        _this.z = z;
        return _this;
    }
    Point3D.prototype.dist = function (point) {
        var dx = this.x - point.x;
        var dy = this.y - point.y;
        var dz = this.z - point.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };
    return Point3D;
}(Point2D));
var pointC = new Point3D(1, 2, 3);
var pointD = new Point3D(4, 6, 8);
console.log(pointC.dist(pointD));
