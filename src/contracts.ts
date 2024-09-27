type Point = {
    lat: number,
    lon: number
}

type Shape = Point & {
    distance: number
}

export {
    Point,
    Shape,
}