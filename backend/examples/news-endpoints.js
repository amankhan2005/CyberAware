// Examples of additional endpoints to implement in newsrouter.js

// Add endpoint for clapping on a news article
router.post('/clap/:id', auth, async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        
        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News article not found'
            });
        }
        
        // Increment claps
        news.claps = (news.claps || 0) + 1;
        await news.save();
        
        res.json({
            success: true,
            data: {
                claps: news.claps
            }
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error updating claps',
            error: err.message
        });
    }
});

// Note: Follow functionality should be implemented in expertrouter.js
// Example:

// Follow an expert
router.post('/follow/:expertId', auth, async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.expertId);
        
        if (!expert) {
            return res.status(404).json({
                success: false,
                message: 'Expert not found'
            });
        }
        
        const user = await User.findById(req.user._id);
        
        // Check if already following
        if (user.following && user.following.includes(req.params.expertId)) {
            return res.status(400).json({
                success: false,
                message: 'Already following this expert'
            });
        }
        
        // Add to user's following list
        if (!user.following) user.following = [];
        user.following.push(req.params.expertId);
        await user.save();
        
        // Add to expert's followers list
        if (!expert.followers) expert.followers = [];
        expert.followers.push(req.user._id);
        await expert.save();
        
        res.json({
            success: true,
            message: 'Expert followed successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error following expert',
            error: err.message
        });
    }
});

// Unfollow an expert
router.post('/unfollow/:expertId', auth, async (req, res) => {
    try {
        const expert = await Expert.findById(req.params.expertId);
        
        if (!expert) {
            return res.status(404).json({
                success: false,
                message: 'Expert not found'
            });
        }
        
        const user = await User.findById(req.user._id);
        
        // Check if actually following
        if (!user.following || !user.following.includes(req.params.expertId)) {
            return res.status(400).json({
                success: false,
                message: 'Not following this expert'
            });
        }
        
        // Remove from user's following list
        user.following = user.following.filter(id => id.toString() !== req.params.expertId);
        await user.save();
        
        // Remove from expert's followers list
        if (expert.followers) {
            expert.followers = expert.followers.filter(id => id.toString() !== req.user._id.toString());
            await expert.save();
        }
        
        res.json({
            success: true,
            message: 'Expert unfollowed successfully'
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Error unfollowing expert',
            error: err.message
        });
    }
});
