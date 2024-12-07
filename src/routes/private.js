import { Router } from "express";
const router = Router();

/* How to use: 

    For any function that requires authentication, it should follow this format: 

    app.get('/route', requireAuth, (req, res) => {
        // do authenticated shit.
    });

    Where the requireAuth is a middleware that runs before the route is executed.
*/
const requireAuth = (req, res, next) => {
    if (req.session.userId) {
        next(); // User is authenticated, continue to next middleware
    } else {
        res.redirect('/login'); // User is not authenticated, redirect to login page
    }
}

export default router;
