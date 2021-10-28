/*module.exports = app => {
    const articles = require('../controllers/article');
    const express = require('express');
    const router = express.Router();

    router.get('/', articles.getAllArticles);

}*/

const articles = require('../controllers/article');
const express = require('express');
const router = express.Router();


router.get('/', articles.getAllArticles);
router.get('/last', articles.getLastArticle);
router.get('/count', articles.getNumberOfArticles);
//router.get('/:id', articleController.getOneArticle);
router.post('/', articles.create);

module.exports = router;