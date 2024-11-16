
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
     * TODO: Distance between two points
     * @param x0 Point 1 X
     * @param y0 Point 1 Y
     * @param x1 Point 2 X
     * @param y1 Point 2 Y
     */
    //% block="Distance between point $x0 $y0 and point $x1 $y1"
    export function dist(x0: number, y0: number, x1: number, y1: number) {
        let distX = x1 - x0
        let distY = y1 - y0
        return Math.sqrt((distX ** 2) + (distY ** 2))
    }

    /**
     * TODO: Boolean - Checks for point to line collision
     * @param lx0 First Line Point X
     * @param ly0 First Line Point Y
     * @param lx1 Second Line Point X
     * @param ly1 Second Line Point Y
     * @param px Collision Point X
     * @param py Collision Point Y
     */
    //% block="Check line to point collision line start $lx0 $ly0 end $lx1 $ly1 point $px $py"
    export function linePoint(lx0: number, ly0: number, lx1: number, ly1: number, px: number, py: number) {
        let lineLen = dist(lx0, ly0, lx1, ly1)
        let d1 = dist(px, py, lx0, ly0)
        let d2 = dist(px, py, lx1, ly1)
        let buffer = 0.1
        return (d1 + d2 >= (lineLen - buffer)) && (d1 + d2 <= (lineLen + buffer))
    }

    /**
     * TODO: Boolean - Checks for circle to line collision
     * @param lx0 First Line Point X
     * @param ly0 First Line Point Y
     * @param lx1 Second Line Point X
     * @param ly1 Second Line Point Y
     * @param cx Circle X
     * @param cy Circle Y
     * @param r Circle Radius
     */
    //% block="Check line to circle collision line start $lx0 $ly0 end $lx1 $ly1 circle position $px $py radius $r"
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
     * TODO: Boolean - Checks for point to circle collision
     * @param px Point X
     * @param py Point Y
     * @param cx Circle X
     * @param cy Circle Y
     * @param r Radius
     */
    //% block="Check circle to point collision point position $px $py circle position $cx $cy radius $r"
    export function pointCircle(px: number, py: number, cx: number, cy: number, r: number) {
        return dist(px,py,cx,cy) < r
    }
}
