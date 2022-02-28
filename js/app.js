const ctaButton = document.querySelector('button#calltoaction')
const likeButton = document.querySelectorAll('.likes svg')
const sendContact = document.querySelector('#send')



ctaButton.addEventListener('click', (click) => {
    let offset = document.querySelector('#contact').offsetTop
    window.scrollTo({ top: offset, behavior: 'smooth' });
})

sendContact.addEventListener('click', click => {
    debugger
    if (validator.isEmail(document.querySelector('#email').value) && document.querySelector('#text').value !== "" && document.querySelector('#name').value !== "") {
        console.log(true)
    } else if (!validator.isEmail(document.querySelector('#email').value)) {
        document.querySelector('#email').classList.add('invalid-input')
        setTimeout(() => {
            document.querySelector('#email').classList.remove('invalid-input')
        }, 6 * 1000)
    } else if (document.querySelector('#text').value === "") {
        document.querySelector('#text').classList.add('invalid-input')
        setTimeout(() => {
            document.querySelector('#text').classList.remove('invalid-input')
        }, 6 * 1000)
    } else if (document.querySelector('#name').value === "") {
        document.querySelector('#name').classList.add('invalid-input')
        setTimeout(() => {
            document.querySelector('#name').classList.remove('invalid-input')
        }, 6 * 1000)
    }
})



// Like

// for (const button of likeButton) {
//     button.addEventListener('click', click => {
//         if (click.target.parentElement.nodeName === 'DIV') {
//             let id = click.target.parentElement.getAttribute('x-id')
//             click.target.parentElement.children[0].textContent = parseInt(click.target.parentElement.children[0].textContent) + 1
//         } else if (click.target.parentElement.nodeName === 'svg') {
//             console.log(click.target.parentElement.parentElement.getAttribute('x-id'), click.target.parentElement.nodeName)
//         }
//     })
// }