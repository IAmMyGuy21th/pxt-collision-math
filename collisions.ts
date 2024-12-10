
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#ff5500 icon=""
//% groups="['Normal', 'Object Oriented (OOP)']"
namespace collisionTests {
    export type Point = vectors.Vector2
    export class Circle {
        pos: vectors.Vector2
        r: number
        public constructor(pos: vectors.Vector2, r: number) {
            this.pos = pos
            this.r = r
        }
    }

    export class Rectangle {
        start: vectors.Vector2
        end: vectors.Vector2
        public constructor(start: vectors.Vector2, end: vectors.Vector2) {
            this.start = end
            this.end = start
        }

        public left() {
            return Math.min(this.start.x, this.end.x)
        }

        public right() {
            return Math.max(this.start.x, this.end.x)
        }

        public top() {
            return Math.min(this.start.y, this.end.y)
        }

        public bottom() {
            return Math.max(this.start.y, this.end.y)
        }
    }

    export class Line {
        start: vectors.Vector2
        end: vectors.Vector2
        public constructor(start: vectors.Vector2, end: vectors.Vector2) {
            this.start = end
            this.end = start
        }
    }

    export class Triangle {
        a: vectors.Vector2
        b: vectors.Vector2
        c: vectors.Vector2
        public constructor(a: vectors.Vector2, b: vectors.Vector2, c: vectors.Vector2) {
            this.a = a
            this.b = b
            this.c = c
        }
    }

    //% block="Circle $pos radius $r"
    //% group="Object Oriented (OOP)"
    //% blockId="createCircle"
    //% pos.shadow="createPoint"
    export function createCircle(pos: vectors.Vector2, r: number) {
        return new Circle(pos, r)
    }

    //% block="Point $x $y"
    //% group="Object Oriented (OOP)"
    //% blockId="createPoint"
    export function createPoint(x: number, y: number) {
        return new vectors.Vector2(x,y)
    }

    //% block="Triangle $a $b $c"
    //% group="Object Oriented (OOP)"
    //% blockId="createTri"
    //% a.shadow="createPoint"
    //% b.shadow="createPoint"
    //% c.shadow="createPoint"
    export function createTri(a: vectors.Vector2, b: vectors.Vector2, c: vectors.Vector2) {
        return new Triangle(a, b, c)
    }

    //% block="Rectangle start $start end $end"
    //% group="Object Oriented (OOP)"
    //% blockId="createRect"
    //% start.shadow="createPoint"
    //% end.shadow="createPoint"
    export function createRect(start: vectors.Vector2, end: vectors.Vector2) {
        return new Rectangle(start, end)
    }

    //% block="Line start $start end $end"
    //% group="Object Oriented (OOP)"
    //% blockId="createLine"
    //% start.shadow="createPoint"
    //% end.shadow="createPoint"
    export function createLine(start: vectors.Vector2, end: vectors.Vector2) {
        return new Line(start, end)
    }

    /**
     * Distance between two points
     * @param x0 Point 1 X
     * @param y0 Point 1 Y
     * @param x1 Point 2 X
     * @param y1 Point 2 Y
     */
    //% block="distance between point $x0 $y0 and point $x1 $y1"
    //% group="Normal"
    export function dist(x0: number, y0: number, x1: number, y1: number) {
        let distX = x1 - x0
        let distY = y1 - y0
        return Math.sqrt((distX ** 2) + (distY ** 2))
    }

    /**
     * Boolean - Checks for point to line collision
     * @param lx0 First Line Point X
     * @param ly0 First Line Point Y
     * @param lx1 Second Line Point X
     * @param ly1 Second Line Point Y
     * @param px Collision Point X
     * @param py Collision Point Y
     */
    //% block="line to point collision line start $lx0 $ly0 end $lx1 $ly1 point $px $py"
    //% group="Normal"
    export function linePoint(lx0: number, ly0: number, lx1: number, ly1: number, px: number, py: number) {
        let lineLen = dist(lx0, ly0, lx1, ly1)
        let d1 = dist(px, py, lx0, ly0)
        let d2 = dist(px, py, lx1, ly1)
        let buffer = 0.1
        return (d1 + d2 >= (lineLen - buffer)) && (d1 + d2 <= (lineLen + buffer))
    }

    /**
     * Boolean - Checks for circle to line collision
     * @param lx0 First Line Point X
     * @param ly0 First Line Point Y
     * @param lx1 Second Line Point X
     * @param ly1 Second Line Point Y
     * @param cx Circle X
     * @param cy Circle Y
     * @param r Circle Radius
     */
    //% block="line to circle collision line start $lx0 $ly0 end $lx1 $ly1 circle position $px $py radius $r"
    //% group="Normal"
    export function circleLine(lx0: number, ly0: number, lx1: number, ly1: number, cx: number, cy: number, r: number) {
        let inside1 = pointCircle(lx0, ly0, cx, cy, r);
        let inside2 = pointCircle(lx1, ly1, cx, cy, r);
        if (inside1 || inside2) {return true}
        let len = dist(lx0, ly0, lx1, ly1)
        let dot = (((cx - lx0) * (lx1 - lx0)) + ((cy - ly0) * (ly1 - ly0))) / Math.pow(len, 2);
        let closestX = lx0 + (dot * (lx1 - lx0));
        let closestY = ly0 + (dot * (ly1 - ly0));
        let onSegment = linePoint(lx0, ly0, lx1, ly1, closestX, closestY)
        if (!onSegment) {return false}
        let distance = dist(cx,cy,closestX,closestY)
        if (distance <= r) {
            return true;
        }
        return false;
    }

    /**
     * Boolean - Checks for point to point collision
     * @param p0x Point 1 X
     * @param p0y Point 1 Y
     * @param p1x Point 2 X
     * @param p1y Point 2 Y
     */
    //% block="point to point collision point 1 pos $p0x $p0y point 2 pos $p1x $p1y"
    //% group="Normal"
    export function pointPoint(p0x: number, p0y: number, p1x: number, p1y: number) {
        return (p0x === p1x) && (p0y === p1y)
    }

    /**
     * Boolean - Checks for point to circle collision
     * @param px Point X
     * @param py Point Y
     * @param cx Circle X
     * @param cy Circle Y
     * @param r Radius
     */
    //% block="circle to point collision point position $px $py circle position $cx $cy radius $r"
    //% group="Normal"
    export function pointCircle(px: number, py: number, cx: number, cy: number, r: number) {
        return dist(px,py,cx,cy) < r
    }

    /**
     * Boolean - Checks for circle to circle collision
     * @param c0x Circle 1 X
     * @param c0y Circle 1 Y
     * @param c1x Circle 2 X
     * @param c1y Circle 2 Y
     * @param c0r Circle 1 Radius
     * @param c1r Circle 2 Radius
     */
    //% block="circle to circle collision circle 1 pos $c0x $c0y 2 pos $c1x $c1y radius 1 $c0r 2 $c1r"
    //% group="Normal"
    export function circleCircle(c0x: number, c0y: number, c1x: number, c1y: number, c0r: number, c1r: number) {
        return dist(c0x, c0y, c1x, c1y) < (c0r + c1r)
    }

    /**
     * Boolean - Checks point to rectangle collision
     * @param px Point X
     * @param py Point Y
     * @param rx0 Rect Start X
     * @param ry0 Rect Start Y
     * @param rx1 Rect End X
     * @param ry1 Rect End Y
     */
    //% block="rect to point collision point $px $py rect start $rx0 $ry0 end $rx1 $ry1"
    //% group="Normal"
    export function pointRect(px: number, py: number, rx0: number, ry0: number, rx1: number, ry1: number) {
        const left = Math.min(rx0,rx1)
        const right = Math.max(rx0,rx1)
        const top = Math.min(ry0,ry1)
        const bottom = Math.max(ry0,ry1)
        let inRight = px > left
        let inLeft = px < right
        let inTop = py > top
        let inBottom = py > bottom
        return (inRight && inLeft && inTop && inBottom)
    }

    /**
     * Boolean - Checks rect to rect collision
     * @param rxa0 Rect A Start X
     * @param rya0 Rect A Start Y
     * @param rxa1 Rect A End X
     * @param rya1 Rect A End Y
     * @param rxb0 Rect B Start X
     * @param ryb0 Rect B Start Y
     * @param rxb1 Rect B End X
     * @param ryb1 Rect B End Y
     */
    //% block="rect to rect collision A start end $rxa0 $rya0 $rxa1 $rya1 B $rxb0 $ryb0 $rxb1 $ryb1"
    //% group="Normal"
    export function rectRect(rxa0: number, rya0: number, rxa1: number, rya1: number, rxb0: number, ryb0: number, rxb1: number, ryb1: number) {
        const leftA = Math.min(rxa0, rxa1)
        const rightA = Math.max(rxa0, rxa1)
        const topA = Math.min(rya0, rya1)
        const bottomA = Math.max(rya0, rya1)
        const leftB = Math.min(rxb0, rxb1)
        const rightB = Math.max(rxb0, rxb1)
        const topB = Math.min(ryb0, ryb1)
        const bottomB = Math.max(ryb0, ryb1)
        let inRight = rightA > leftB
        let inLeft = leftA < rightB
        let inBottom = bottomA > topB
        let inTop = topA < bottomB
        return (inLeft && inRight && inTop && inBottom)
    }

    /**
     * Boolean - Checks circle to rectangle collision
     * @param cx Circle X
     * @param cy Circle Y
     * @param r Circle Radius
     * @param rx0 Rect Start X
     * @param ry0 Rect Start Y
     * @param rx1 Rect End X
     * @param ry1 Rect End Y
     */
    //% block="rect to circle collision circle $cx $cy radius $r rect start $rx0 $ry0 end $rx1 $ry1"
    //% group="Normal"
    export function circleRect(rx0: number, ry0: number, rx1: number, ry1: number, cx: number, cy: number, r: number) {
        const left = Math.min(rx0, rx1)
        const right = Math.max(rx0, rx1)
        const top = Math.min(ry0, ry1)
        const bottom = Math.max(ry0, ry1)
        let testX = cx
        let testY = cy
        if (cx < left) testX = left
        else if (cx > right) testX = right
        if (cy < top) testY = top
        else if (cy > bottom) testY = bottom
        let distance = dist(testX, testY, cx, cy)
        return distance <= r
    }

    /**
     * Boolean - Checks line to line collision
     * @param x1 Line 1 Start X
     * @param y1 Line 1 Start Y
     * @param x2 Line 1 End X
     * @param y2 Line 1 End Y
     * @param x3 Line 2 Start X
     * @param y3 Line 2 Start Y
     * @param x4 Line 2 End X
     * @param y5 Line 2 End Y
     */
    //% block="line to line collision A $x1 $y1 $x2 $y2 B $x3 $y3 $x4 $y4"
    //% group="Normal"
    export function lineLine(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
        const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        return (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1)
    }

    /**
     * Array - Returns an array with two numbers (x and y) of the intersection point of two lines
     * @param x1 Line 1 Start X
     * @param y1 Line 1 Start Y
     * @param x2 Line 1 End X
     * @param y2 Line 1 End Y
     * @param x3 Line 2 Start X
     * @param y3 Line 2 Start Y
     * @param x4 Line 2 End X
     * @param y5 Line 2 End Y
     */
    //% block="intersection lines A $x1 $y1 $x2 $y2 B $x3 $y3 $x4 $y4"
    //% group="Normal"
    export function linesIntersection(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
        const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        const intersectionX = x1 + (uA * (x2 - x1))
        const intersectionY = y1 + (uA * (y2 - y1))
        return [intersectionX,intersectionY]
    }

    /**
     * Boolean - Checks line to rect collision
     * @param x1 Line Start X
     * @param y1 Line Start Y
     * @param x2 Line End X
     * @param y2 Line End Y
     * @param rx0 Rect Start X
     * @param ry0 Rect Start Y
     * @param rx1 Rect End X
     * @param ry1 Rect End Y
     */
    //% block="line to rect collision line $x1 $y1 $x2 $y2 rect start $rx0 $ry0 end $rx1 $ry1"
    //% group="Normal"
    export function lineRect(x1: number, y1: number, x2: number, y2: number, rx0: number, ry0: number, rx1: number, ry1: number) {
        const left = Math.min(rx0, rx1)
        const right = Math.max(rx0, rx1)
        const top = Math.min(ry0, ry1)
        const bottom = Math.max(ry0, ry1)
        let collidingA = pointRect(x1, y1, rx0, ry0, rx1, ry1)
        let collidingB = pointRect(x2, y2, rx0, ry0, rx1, ry1)
        if (collidingA || collidingB) {
            return true
        }
        let collidingLeft = lineLine(x1, y1, x2, y2, left, top, left, bottom)
        let collidingRight = lineLine(x1, y1, x2, y2, right, top, right, bottom)
        let collidingTop = lineLine(x1, y1, x2, y2, left, top, right, top)
        let collidingBottom = lineLine(x1, y1, x2, y2, left, bottom, right, bottom)
        return (collidingA || collidingB || collidingBottom || collidingLeft || collidingRight || collidingTop)
    }

    /**
     * Boolean - Checks polygon to point collision
     * @param px Point X
     * @param py Point Y
     * @param vertices Array of Vector2 objects from the vectors extension, representing positions of each vert in the poly
     */
    //% block="poly to point collision point $px $py polygon (array of vectors) $vertices"
    //% group="Normal"
    export function polyPoint(px: number, py: number, vertices: vectors.Vector2[]) {
        let collision = false
        let next = 0;
        for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == vertices.length) next = 0;
            const vc = vertices[current]
            const vn = vertices[next]
            if (((vc.y > py) != (vn.y > py)) && (px < (vn.x - vc.x) * (py - vc.y) / (vn.y - vc.y) + vc.x)) {
                collision = !collision;
            }
        }
        return collision
    }

    /**
     * Boolean - Checks polygon to circle collision
     * @param cx Circle X
     * @param cy Circle Y
     * @param r Circle Radius
     * @param vertices Array of Vector2 objects from the vectors extension, representing positions of each vert in the poly
     * @param includeInside Whether to include the first shape completely inside the other. Takes more calculations.
     */
    //% block="poly to circle collision circle $px $py r $r polygon (array of vectors) $vertices include inside: $includeInside"
    //% group="Normal"
    export function polyCircle(cx: number, cy: number, vertices: vectors.Vector2[], r: number, includeInside?: boolean) {
        let collision = false
        let next = 0;
        for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == vertices.length) next = 0;
            const vc = vertices[current]
            const vn = vertices[next]
            collision = circleLine(vc.x, vc.y, vn.x, vn.y, cx, cy, r)
            if (collision) return true;
        }
        if ((typeof includeInside !== 'undefined') && includeInside) {
            let centerInside = polyPoint(cx, cy, vertices)
            if (centerInside) return true
        }
        return false
    }

    /**
     * Boolean - Checks polygon to rect collision
     * @param rx0 Rect Start X
     * @param ry0 Rect Start Y
     * @param rx1 Rect End X
     * @param ry1 Rect End Y
     * @param includeInside Whether to include the first shape completely inside the other. Takes more calculations.
     * @param vertices Array of Vector2 objects from the vectors extension, representing positions of each vert in the poly
     */
    //% block="poly to rect collision rect start $rx0 $ry0 end $rx1 $ry1 polygon (array of vectors) $vertices include inside: $includeInside?"
    //% group="Normal"
    export function polyRect(rx0: number, ry0: number, rx1: number, ry1: number, vertices: vectors.Vector2[], includeInside?: boolean) {
        let next = 0;
        for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == vertices.length) next = 0;
            const vc = vertices[current]
            const vn = vertices[next]
            let collision = lineRect(vc.x, vc.y, vn.x, vn.y, rx0, ry0, rx1, ry1);
            if (collision) return true;
        }
        if ((typeof includeInside !== 'undefined') && includeInside) {
            let inside = polyPoint(rx0, ry0, vertices);
            if (inside) return true;
        }
        return false
    }

    /**
     * Boolean - Checks polygon to line collision
     * @param x1 Line Start X
     * @param y1 Line Start Y
     * @param x2 Line End X
     * @param y2 Line End Y
     * @param includeInside Whether to include the first shape completely inside the other. Takes more calculations.
     * @param vertices Array of Vector2 objects from the vectors extension, representing positions of each vert in the poly
     */
    //% block="poly to line collision line start $x1 $y1 end $x2 $y2 polygon (array of vectors) $vertices"
    //% group="Normal"
    export function polyLine(x1: number, y1: number, x2: number, y2: number, vertices: vectors.Vector2[]) {
        let next = 0;
        for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == vertices.length) next = 0;
            const vc = vertices[current]
            const vn = vertices[next]
            let x3 = vertices[current].x;
            let y3 = vertices[current].y;
            let x4 = vertices[next].x;
            let y4 = vertices[next].y;
            let hit = lineLine(x1, y1, x2, y2, x3, y3, x4, y4);
            if (hit) {
                return true;
            }
        }
        return false
    }

    /**
     * Boolean - Checks polygon to line collision
     * @param includeInside Whether to include the first shape completely inside the other. Takes more calculations.
     * @param p1 Array of Vector2 objects from the vectors extension, representing positions of each vert in the first poly
     * @param p2 Array of Vector2 objects from the vectors extension, representing positions of each vert in the second poly
     */
    //% block="poly to poly collision a $p1 b $p2 include inside: $includeInside"
    export function polyPoly(p1: vectors.Vector2[], p2: vectors.Vector2[], includeInside?: boolean) {
        // Made by Jeff Thompson, all credit to him.
        // go through each of the vertices, plus the next
        // vertex in the list
        let next = 0;
        for (let current = 0; current < p1.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == p1.length) next = 0;

            // get the PVectors at our current position
            // this makes our if statement a little cleaner
            const vc = p1[current];    // c for "current"
            const vn = p1[next];       // n for "next"

            // now we can use these two points (a line) to compare
            // to the other polygon's vertices using polyLine()
            let collision = polyLine(vc.x, vc.y, vn.x, vn.y, p2);
            if (collision) return true;

            // optional: check if the 2nd polygon is INSIDE the first
            if ((typeof includeInside !== 'undefined')  && includeInside) {
                collision = polyPoint(p2[0].x, p2[0].y, p1);
                if (collision) return true;
            }
        }
        return false;
    }

    /**
     * Boolean - Checks for triangle to point collision.
     * @param point Vector2 with the x and y of the point
     * @param a Vector2 with the x and y of point a of the triangle
     * @param b Vector2 with the x and y of point b of the triangle
     * @param c Vector2 with the x and y of point c of the triangle
     */
    //% block="point to triangle collision point (Vector2) $point triangle (vectors) $a $b $c"
    //% group="Normal"
    export function triPoint(point: vectors.Vector2, a: vectors.Vector2, b: vectors.Vector2, c: vectors.Vector2) {
        const x1 = a.x, x2 = b.x, x3 = c.x, y1 = a.y, y2 = b.y, y3 = c.y, px = point.x, py = point.y
        let areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1))
        let area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py))
        let area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py))
        let area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py))
        return (area1 + area2 + area3) == areaOrig
    }

    /* ________________________ ↓ Object Oriented Functions ↓ ________________________ */

    //% block="line to point collision line $l point $p"
    //% group="Object Oriented (OOP)"
    //% l.shadow="createLine"
    //% p.shadow="createPoint"
    export function linePointOOP(l: Line, p: Point) {
        let lineLen = dist(l.start.x, l.start.y, l.end.x, l.end.y)
        let d1 = dist(p.x, p.y, l.start.x, l.start.y)
        let d2 = dist(p.x, p.y, l.end.x, l.end.y)
        let buffer = 0.1
        return (d1 + d2 >= (lineLen - buffer)) && (d1 + d2 <= (lineLen + buffer))
    }

    //% block="line to circle collision line $l circle $c"
    //% group="Object Oriented (OOP)"
    //% l.shadow="createLine"
    //% c.shadow="createCircle"
    export function circleLineOOP(l: Line, c: Circle) {
        const lx0 = l.start.x, lx1 = l.end.x, ly0 = l.start.y, ly1 = l.end.y
        let inside1 = pointCircle(lx0, ly0, c.pos.x, c.pos.y, c.r);
        let inside2 = pointCircle(lx1, ly1, c.pos.x, c.pos.y, c.r);
        if (inside1 || inside2) { return true }
        let len = dist(lx0, ly0, lx1, ly1)
        let dot = (((c.pos.x - lx0) * (lx1 - lx0)) + ((c.pos.y - ly0) * (ly1 - ly0))) / Math.pow(len, 2);
        let closestX = lx0 + (dot * (lx1 - lx0));
        let closestY = ly0 + (dot * (ly1 - ly0));
        let onSegment = linePoint(lx0, ly0, lx1, ly1, closestX, closestY)
        if (!onSegment) { return false }
        let distance = dist(c.pos.x, c.pos.y, closestX, closestY)
        if (distance <= c.r) {
            return true;
        }
        return false;
    }

    //% block="point to point collision point 1 $p0 2 $p1"
    //% group="Object Oriented (OOP)"
    //% p0.shadow="createPoint"
    //% p1.shadow="createPoint"
    export function pointPointOOP(p0: Point, p1: Point) {
        return (p0.x === p1.x) && (p0.y === p1.y)
    }

    //% block="circle to point collision point $p circle $c"
    //% group="Object Oriented (OOP)"
    //% c.shadow="createCircle"
    //% p.shadow="createPoint"
    export function pointCircleOOP(p: Point, c: Circle) {
        return dist(p.x, p.y, c.pos.x, c.pos.y) < c.r
    }

    //% block="circle to circle collision circle 1 $c0 2 $c1"
    //% group="Object Oriented (OOP)"
    //% c0.shadow="createCircle"
    //% c1.shadow="createCircle"
    export function circleCircleOOP(c0: Circle, c1: Circle) {
        return dist(c0.pos.x, c0.pos.y, c1.pos.x, c1.pos.y) < (c0.r + c1.r)
    }

    //% block="rect to point collision point $p rect $rect"
    //% group="Object Oriented (OOP)"
    //% p.shadow="createPoint"
    //% rect.shadow="createRect"
    export function pointRectOOP(p: Point, rect: Rectangle) {
        const left = rect.left()
        const right = rect.right()
        const top = rect.top()
        const bottom = rect.bottom()
        let inRight = p.x > left
        let inLeft = p.x < right
        let inTop = p.y > top
        let inBottom = p.y > bottom
        return (inRight && inLeft && inTop && inBottom)
    }

    //% block="rect to rect collision A $a B $b"
    //% group="Object Oriented (OOP)"
    //% a.shadow="createRect"
    //% b.shadow="createRect"
    export function rectRectOOP(a: Rectangle, b: Rectangle) {
        const leftA = a.left()
        const rightA = a.right()
        const topA = a.top()
        const bottomA = a.bottom()
        const leftB = b.left()
        const rightB = b.right()
        const topB = b.top()
        const bottomB = b.bottom()
        let inRight = rightA > leftB
        let inLeft = leftA < rightB
        let inBottom = bottomA > topB
        let inTop = topA < bottomB
        return (inLeft && inRight && inTop && inBottom)
    }

    //% block="rect to circle collision circle $c rect $rect"
    //% group="Object Oriented (OOP)"
    //% c.shadow="createCircle"
    //% rect.shadow="createRect"
    export function circleRectOOP(c: Circle, rect: Rectangle) {
        const left = rect.left(), right = rect.right(), top = rect.top(), bottom = rect.bottom()
        let testX = c.pos.x
        let testY = c.pos.y
        if (c.pos.x < left) testX = left
        else if (c.pos.x > right) testX = right
        if (c.pos.y < top) testY = top
        else if (c.pos.y > bottom) testY = bottom
        let distance = dist(testX, testY, c.pos.x, c.pos.y)
        return distance <= c.r
    }

    //% block="line to line collision A $l0 B $l1"
    //% group="Object Oriented (OOP)"
    //% l0.shadow="createLine"
    //% l1.shadow="createLine"
    export function lineLineOOP(l0: Line, l1: Line) {
        let x1 = l0.start.x, x2 = l0.end.x, x3 = l1.start.x, x4 = l1.end.x, y1 = l0.start.x, y2 = l0.end.x, y3 = l1.start.x, y4 = l1.end.x
        const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        return (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1)
    }

    //% block="intersection lines A $l0 B $l1"
    //% group="Object Oriented (OOP)"
    //% l0.shadow="createLine"
    //% l1.shadow="createLine"
    export function linesIntersectionOOP(l0: Line, l1: Line) {
        let x1 = l0.start.x, x2 = l0.end.x, x3 = l1.start.x, x4 = l1.end.x, y1 = l0.start.x, y2 = l0.end.x, y3 = l1.start.x, y4 = l1.end.x
        const uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        const uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1))
        const intersectionX = x1 + (uA * (x2 - x1))
        const intersectionY = y1 + (uA * (y2 - y1))
        return [intersectionX, intersectionY]
    }

    //% block="line to rect collision line $l rect $rect"
    //% group="Object Oriented (OOP)"
    //% l.shadow="createLine"
    export function lineRectOOP(l: Line, rect: Rectangle) {
        let x1=l.start.x,x2=l.end.x,y1=l.start.y,y2=l.end.y
        const left = rect.left()
        const right = rect.right()
        const top = rect.top()
        const bottom = rect.bottom()
        let collidingA = pointRect(x1, y1, rect.start.x, rect.start.y, rect.end.x, rect.end.y)
        let collidingB = pointRect(x2, y2, rect.start.x, rect.start.y, rect.end.x, rect.end.y)
        if (collidingA || collidingB) {
            return true
        }
        let collidingLeft = lineLine(x1, y1, x2, y2, left, top, left, bottom)
        let collidingRight = lineLine(x1, y1, x2, y2, right, top, right, bottom)
        let collidingTop = lineLine(x1, y1, x2, y2, left, top, right, top)
        let collidingBottom = lineLine(x1, y1, x2, y2, left, bottom, right, bottom)
        return (collidingA || collidingB || collidingBottom || collidingLeft || collidingRight || collidingTop)
    }

    //% block="poly to point collision point $p polygon (array of vectors) $vertices"
    //% group="Object Oriented (OOP)"
    //% p.shadow="createPoint"
    export function polyPointOOP(p: Point, vertices: vectors.Vector2[]) {
        let collision = false
        let next = 0;
        for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == vertices.length) next = 0;
            const vc = vertices[current]
            const vn = vertices[next]
            if (((vc.y > p.y) != (vn.y > p.y)) && (p.x < (vn.x - vc.x) * (p.y - vc.y) / (vn.y - vc.y) + vc.x)) {
                collision = !collision;
            }
        }
        return collision
    }

    //% block="poly to circle collision circle $px $py r $r polygon (array of vectors) $vertices include inside: $includeInside"
    //% group="Object Oriented (OOP)"
    //% c.shadow="createCircle"
    export function polyCircleOOP(c: Circle, vertices: vectors.Vector2[], includeInside?: boolean) {
        let collision = false
        let next = 0;
        for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == vertices.length) next = 0;
            const vc = vertices[current]
            const vn = vertices[next]
            collision = circleLine(vc.x, vc.y, vn.x, vn.y, c.pos.x, c.pos.y, c.r)
            if (collision) return true;
        }
        if ((typeof includeInside !== 'undefined') && includeInside) {
            let centerInside = polyPoint(c.pos.x, c.pos.y, vertices)
            if (centerInside) return true
        }
        return false
    }

    //% block="poly to rect collision rect $rect polygon (array of vectors) $vertices include inside: $includeInside?"
    //% group="Object Oriented (OOP)"
    //% rect.shadow="createRect"
    export function polyRectOOP(rect: Rectangle, vertices: vectors.Vector2[], includeInside?: boolean) {
        let next = 0;
        for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == vertices.length) next = 0;
            const vc = vertices[current]
            const vn = vertices[next]
            let collision = lineRect(vc.x, vc.y, vn.x, vn.y, rect.start.x, rect.start.y, rect.end.x, rect.end.y);
            if (collision) return true;
        }
        if ((typeof includeInside !== 'undefined') && includeInside) {
            let inside = polyPoint(rect.start.x, rect.start.y, vertices);
            if (inside) return true;
        }
        return false
    }

    //% block="poly to line collision line $line polygon (array of vectors) $vertices"
    //% group="Object Oriented (OOP)"
    //% line.shadow="createLine"
    export function polyLineOOP(line: Line, vertices: vectors.Vector2[]) {
        let next = 0;
        for (let current = 0; current < vertices.length; current++) {

            // get next vertex in list
            // if we've hit the end, wrap around to 0
            next = current + 1;
            if (next == vertices.length) next = 0;
            const vc = vertices[current]
            const vn = vertices[next]
            let x3 = vertices[current].x;
            let y3 = vertices[current].y;
            let x4 = vertices[next].x;
            let y4 = vertices[next].y;
            let hit = lineLine(line.start.x, line.start.y, line.end.x, line.end.y, x3, y3, x4, y4);
            if (hit) {
                return true;
            }
        }
        return false
    }

    //% block="point to triangle collision point (Vector2) $point triangle $tri"
    //% group="Object Oriented (OOP)"
    //% tri.shadow="createTri"
    //% point.shadow="createPoint"
    export function triPointOOP(point: vectors.Vector2, tri: Triangle) {
        const a = tri.a, b = tri.b, c = tri.c
        const x1 = a.x, x2 = b.x, x3 = c.x, y1 = a.y, y2 = b.y, y3 = c.y, px = point.x, py = point.y
        let areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1))
        let area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py))
        let area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py))
        let area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py))
        return (area1 + area2 + area3) == areaOrig
    }

}
