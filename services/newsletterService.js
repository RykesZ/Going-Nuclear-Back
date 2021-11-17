const cron = require('node-cron');
const emailSender = require('./emailSender')


const newsletterService = (article, subscriber) => {
    let lastArticleChecked = '';
    let newArticleChecked = null;

    cron.schedule('0 17 1-31 * *', () => {
        article.find({}).sort({_id:-1}).limit(1)
        .then(data => {
            newArticleChecked = data[0].title;
            console.log({'dernier article ':  lastArticleChecked});
            console.log({'nouvel article ': newArticleChecked});
                if (newArticleChecked !== lastArticleChecked) {
                    console.log('nouvel article');
    
                    subscriber.find()
                        .then(subscribersData => {
                            console.log(subscribersData);
    
                            let subscribersEmailArray = subscribersData.map((subscriber) => {
                                return subscriber.email;
                            });
                            console.log(subscribersEmailArray);
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