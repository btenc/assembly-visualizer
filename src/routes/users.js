import e, { Router } from "express";
const router = Router();

// get the new acct page
router.route('/signup').get((req, res) => {
    try {
        res.render('pages/signup')
    } catch (e) {
        return res.status(500).json(e)
    }
});

// Creating a new user account
// assumes a form with a username and a password.
router.route('/signup').post((req, res) => {
    const pass = req.body.user_password
    const user = req.body.user_name 

    return res.status(200).json({"username": user, "password": pass});
});

// get the new acct page
router.route('/login').get((req, res) => {
    try {
        res.render('pages/login')
    } catch (e) {
        return res.status(500).json(e)
    }
});

// Creating a new user account
// assumes a form with a username and a password.
router.route('/login').post((req, res) => {
    const pass = req.body.user_password
    const user = req.body.user_name 
    
    return res.status(200).json({"username": user, "password": pass});
});

router.route('/:id').get((req, res) => {
    const userID = req.params.id
    
    return res.status(200).json({'id': userID});
})

export default router;
