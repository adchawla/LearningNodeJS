var rect = require("./rectangle-2");

// function solveRect(l, b) {
//     console.log("Solving for rectangle with l = " + l + " and b = " + b);

//     rect(l,b, function(err, rectangle) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("The area of the rectanlge of dimension length = " + l + " and breadth = " + b + " is " + rectangle.area() );
//             console.log("The perimeter of the rectanlge of dimension length = " + l + " and breadth = " + b + " is " + rectangle.perimeter() );    
//         }
//     });
// }

// solveRect(2, 4);
// solveRect(3, 5);
// solveRect(3, -5);

rect(2,3, function(err, rectangle) {
    if (err) {
        console.log(err);
    } else {
        console.log("area is " + rectangle.area());
    }
});