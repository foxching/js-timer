import moment from 'moment'

const countDown = document.querySelector('.countdown');
const datepicker = document.querySelector('#datepicker');
const landing = document.querySelector('.landing');
const launchMsg = document.querySelector('.landing h3');
const launchMsg2 = document.querySelector('.landing h1');

document.addEventListener('DOMContentLoaded', function(e){
    e.preventDefault();


    //const today = moment().format("YYYY-MM-DDTH:SS");

    const today = moment(new Date()).format("YYYY-MM-DDTHH:mm");
    

    datepicker.setAttribute('value', today)
})

datepicker.addEventListener('blur', setDate)

function setDate(e) {
    e.preventDefault();

    const pickdate = datepicker.value;

    if (pickdate === '') {
        alert("All Fields must be filled");
    } else {

        const intvl = setInterval(() => {

            let days,hours,mins,secs;

            const launchDate = new Date(pickdate).getTime();

            const today = new Date().getTime();

            const distance = launchDate - today

            days = Math.floor(distance / (1000 * 60 * 60 * 24));
            hours = Math.floor((distance / (1000 * 60 * 60 )) % 24);
            mins = Math.floor((distance / 1000 / 60) % 60);
            secs = Math.floor((distance / 1000) % 60);


            countDown.innerHTML = `
			<div>${days}<span>Days</span></div>
			<div>${hours}<span>Hours</span></div>
			<div>${mins}<span>Mins</span></div>
			<div>${secs}<span>Secs</span></div>

		    `;
            launchMsg.innerHTML = `Time until ${moment(launchDate).format("dddd, MMMM Do YYYY")}`;
            datepicker.disabled = true;
            launchMsg.style.display = 'block';
            launchMsg2.style.display = 'none';


            if (distance < 0) {
                clearInterval(intvl);

                countDown.style.color = '#17a2b8';
                countDown.style.margin = '30px';
                countDown.innerHTML = 'TIME PASSED!';
                launchMsg.style.display = 'none';

                setTimeout(() => {
                    window.location.reload(true);
                },2000)
            }

        }, 1000)


    }


}

landing.addEventListener('click', resetTimer)


function resetTimer(e){

    if(e.target.classList.contains('reset')){
        window.location.reload(true)
        
    }
    datepicker.setAttribute('value', moment().format("YYYY-MM-DDTH:SS"));
}



