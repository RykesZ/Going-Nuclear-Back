const cron = require('node-cron');
const emailSender = require('./emailSender')
const dateServices = require('./dateServices')
const articles = require('../controllers/article');


const newsletterService = (article, subscriber) => {

    cron.schedule('* 17 1-31 * *', () => {
        article.find({}).sort({_id:-1}).limit(1)
        .then(articleData => {
            const newArticleChecked = articleData[0].title;
            const articleChecked = articleData[0].newsletterAdvertised;
            const articleId = articleData[0]._id;
            
                if (!articleChecked) {
                    console.log('nouvel article');
    
                    subscriber.find()
                        .then(subscribersData => {
                            console.log(subscribersData);
    
                            let subscribersEmailArray = subscribersData.map((subscriber) => {
                                const articleDate = dateServices.convertDate(articleData[0].createdAt);
                                let subscriberSignUpDate = dateServices.convertDate(subscriber.createdAt);
                                const whichIsMoreRecent = dateServices.compareDate(articleDate, subscriberSignUpDate);

                                if (whichIsMoreRecent === 1) {
                                    console.log({ "cet abonné n'a pas reçu la newsletter du dernier article" : subscriber.email });
                                    return subscriber.email;
                                }
                                
                            });
                            console.log(subscribersEmailArray);
                            try {
                                subscribersEmailArray.forEach(email => {
                                    let from = '"Going Nuclear" <going.nuclear.contact@gmail.com>';
                                    let object = 'Newsletter Going Nuclear';
                                    let text = "Un nouvel article est disponible !";
                                    let html = `<h1>Un nouvel article est en ligne : ${newArticleChecked} !</h1>
                                    <a href="${process.env.FRONT_END_URL}">Cliquez ici pour le consulter.</a>
                                    <p>Vous ne voulez plus recevoir d'e-mail de Going Nuclear ?</p>
                                    <a href="${process.env.FRONT_END_URL}/unsubscribe/${email}">Cliquer ici pour vous désabonner.</a>`;
                                    emailSender(from, email, object, text, html);
                                });
                            } catch(error) {
                                console.log({"erreur lors de l'envoi des newsletters" : error});
                                throw error;
                            }
                            console.log('newsletters envoyées');
                            articles.setAdvertised(articleId);
                        })
                        .catch(err => {
                            console.log('erreur lors de la récupération des abonnés')
                        })
                    lastArticleChecked = newArticleChecked;
                } else {
                    console.log('pas de nouvel article');
                }
            })
            .catch(err => {
                console.log('erreur lors de la récupération du dernier article')
            })
    });
}

module.exports = newsletterService;