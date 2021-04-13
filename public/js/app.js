console.log('test');



const form = document.querySelector('form')
const address = document.querySelector('input')
let errorMessage = document.getElementById('error')
let successMessage = document.getElementById('success')


form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    errorMessage.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + address.value)
    .then(resp => {
    resp.json().then(data => {
        if (data.error) {
            errorMessage.textContent = data.error
        } else {
            errorMessage.innerHTML = `<b>Location</b>: ${data.location} <br/>
            <b>Forectast</b>: ${data.forecast}`
        }
    })
    })

})

