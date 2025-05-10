// Get article by ID
router.get('/getbyid/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
            .populate('expertId', 'firstName lastName email profileImage bio articles')
            .populate('comments');
        
        if (!article) {
            return res.status(404).json({ message: 'Article not found' });
        }

        // Increment views
        article.views = (article.views || 0) + 1;
        await article.save();

        res.json(article);
    } catch (error) {
        console.error('Error fetching article:', error);
        res.status(500).json({ message: 'Error fetching article', error: error.message });
    }
}); 