const searchParams = new URLSearchParams(window.location.search)
//Referencias html
const lblEscritorio = document.querySelector('h1')
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('.alert')

if(!searchParams.has('escritorio')){
    window.location = 'index.html'
    throw new Error('El escritorio es obligatorio')
}

const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = escritorio
divAlerta.style.display = 'none'

const socket = io()

socket.on('connect', () => {
    btnAtender.disabled = false;
});

socket.on('disconnect', () => {
    btnAtender.disabled = true;
});

socket.on('ultimo-ticket', (ultimo) => {
    //lblNuevoTicket.innerText = 'Ticket ' + ultimo;
})

btnAtender.addEventListener( 'click', () => {

    socket.emit('atender-ticket', {escritorio}, ({ok, msg, ticket}) => {
        if(!ok){
            lblTicket.innerText = 'Nadie'
            return divAlerta.style.display = ''
        }

        lblTicket.innerText = `Ticket ${ticket.numero}`
    })
   
    // socket.emit( 'siguiente-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    // });

});