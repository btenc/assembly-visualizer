import { Router } from "express";
const router = Router();

// will get private information abt the user
router.get('/', requireAuth, (req, res) => {
    
});

// updates user information
router.post('/', requireAuth, (req, res) => {

});

// will load the user's dashboard
router.get('/:userId', requireAuth, (req, res) => {
    
});

export default router;
