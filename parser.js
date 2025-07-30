// @todo: напишите здесь код парсера

function parsePage() {
    const currencyMap = {
        '$': 'USD',
        '€': 'EUR',
        '₽': 'RUB'
      };
      
    return {
        meta: {
             language : document.querySelector('html').getAttribute('lang'),
             title : document.querySelector('title').textContent.split('—')[0].trim(),
             keywords : document.querySelector('[name="keywords"]').getAttribute('content').split(',').map(keyword => keyword.trim()),
             description : document.querySelector('[name="description"]').getAttribute('content'),
             opengraph: {
                [document.querySelector('meta[property]').getAttribute('property').split(':')[1].trim()] :  document.querySelector('meta[property]').getAttribute('content').split('—')[0].trim(),
                [document.querySelector('meta[property="og:image"]').getAttribute('property').split(':')[1].trim()] : document.querySelector('meta[property="og:image"]').getAttribute('content'),
                [document.querySelector('meta[property="og:type"]').getAttribute('property').split(':')[1].trim()] : document.querySelector('meta[property="og:type"]').getAttribute('content')
             }
        },

        product: {
            id : document.querySelector('.product').dataset.id,
            images: Array.from(document.querySelectorAll('button img')).map(img => ({
                preview: img.getAttribute('src'),
                full: img.dataset.src,
                alt: img.getAttribute('alt')
              })),
            isLiked : document.querySelector('figure button').classList.contains('active'),
            name : document.querySelector('h1').textContent,
            tags : {
                category : [document.querySelector('.tags span.green').textContent],
                discount : [document.querySelector('.tags span.red').textContent],
                label : [document.querySelector('.tags span.blue').textContent]
            },
            price : Number(document.querySelector('.price').childNodes[0].textContent.replace(/[^\d]/g, '').trim()),
            oldPrice : Number(document.querySelector('.price span').textContent.replace(/[^\d]/g, '').trim()),
            discount : Number(document.querySelector('.price span').textContent.replace(/[^\d]/g, '').trim()) - Number(document.querySelector('.price').childNodes[0].textContent.replace(/[^\d]/g, '').trim()),
            discountPercent : (((Number(document.querySelector('.price span').textContent.replace(/[^\d]/g, '').trim()) - Number(document.querySelector('.price').childNodes[0].textContent.replace(/[^\d]/g, '').trim())) / Number(document.querySelector('.price span').textContent.replace(/[^\d]/g, '').trim())) * 100).toFixed(2)  + '%',
            currency : currencyMap[document.querySelector('.price').childNodes[0].textContent.trim()[0]],
            properties : {
                [document.querySelector('.properties li span').textContent.trim()] : document.querySelector('.properties li ').querySelectorAll('span')[1].textContent.trim(),
                [document.querySelectorAll('.properties li')[1].querySelector('span').textContent.trim()] : document.querySelectorAll('.properties li')[1].querySelectorAll('span')[1].textContent.trim(),
                [document.querySelectorAll('.properties li')[2].querySelector('span').textContent.trim()] : document.querySelectorAll('.properties li')[2].querySelectorAll('span')[1].textContent.trim(),
            
            },
            description : document.querySelector('.description').innerHTML.trim().replace(' class="unused"', ''),
        },
        suggested: Array.from(document.querySelectorAll('.suggested .items article')).map(article => (
           
            {
                name : article.querySelector('h3').textContent.trim(),
                description : article.querySelector('p').textContent.trim(),
                image : article.querySelector('img').getAttribute('src'),
                price : article.querySelector('b').textContent.replace(/[^\d]/g, ''),
                currency : currencyMap[article.querySelector('b').childNodes[0].textContent.trim()[0]],
            }
            
        ))

    ,
        reviews:  Array.from(document.querySelectorAll('.reviews .items article')).map(article => (
                {
                title : article.querySelector('.title').textContent.trim(),
                description : article.querySelector('p').textContent.trim(),
                date : article.querySelector('.author i').textContent.trim().split('/').join('.'),
                rating : article.querySelectorAll('.rating .filled').length,
                author : {
                    avatar : article.querySelector('.author img').getAttribute('src'),
                    name : article.querySelector('.author span').textContent.trim()
                }
                




                })
            )


        
    };
}

window.parsePage = parsePage;