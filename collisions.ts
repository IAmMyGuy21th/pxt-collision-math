
/**
* Use this file to define custom functions and blocks.
* Read more at https://arcade.makecode.com/blocks/custom
*/

/**
 * Custom blocks
 */
//% weight=100 color=#ff5500 icon=""
namespace collisionTests {
    /**
     * Distance between two points
     * @param x0 Point 1 X
     * @param y0 Point 1 Y
     * @param x1 Point 2 X
     * @param y1 Point 2 Y
     */
    //% block="distance between point $x0 $y0 and point $x1 $y1"
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

    export function polyRect(rx0: number, ry0: number, rx1: number, ry1: number, vertices: vectors.Vector2[], r: number, includeInside?: boolean) {
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

    export function triPoint(point: vectors.Vector2, a: vectors.Vector2, b: vectors.Vector2, c: vectors.Vector2) {
        const x1 = a.x, x2 = b.x, x3 = c.x, y1 = a.y, y2 = b.y, y3 = c.y, px = point.x, py = point.y
        let areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1))
        let area1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py))
        let area2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py))
        let area3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py))
        return (area1 + area2 + area3) == areaOrig
    }
}
