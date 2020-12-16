let datum = "";

let showCurrentRound = (queryResponse) => {
    //console.log({queryResponse});

    // Titel race round + race name
    let round = queryResponse.MRData.RaceTable.round;
    let raceName = queryResponse.MRData.RaceTable.Races[0].raceName;
    document.querySelector('.js-round-name').innerText = "Round " + round + " - " + raceName;

    listeners(round);

    // Vlag en circuit naam
    let vlag = queryResponse.MRData.RaceTable.Races[0].Circuit.Location.country;
    let circuitName = queryResponse.MRData.RaceTable.Races[0].Circuit.circuitName;

    document.querySelector('.js-flag').src = "img/Flags/" + vlag + ".jpg";
    document.querySelector('.js-flag').alt = "Flag of " + vlag;
    document.querySelector('.js-circuitName').innerText = circuitName;

    getDriverStandings(round);
    getConstructorStandings(round);

    //tijd
    let tijd_string = queryResponse.MRData.RaceTable.Races[0].time;
    let datum_string = queryResponse.MRData.RaceTable.Races[0].date;
    console.log(tijd_string);
    console.log(datum_string);

    let samengevoegde_datum = datum_string+"T"+tijd_string;
    datum = new Date(samengevoegde_datum);
    let now = new Date();
    console.log("date controle:" + now);
    if(datum < now){
        document.querySelector(".js-round-date").innerHTML = "Race passed on: " + datum_string;
    } else {
        document.querySelector(".js-round-date").innerHTML = "Race takes place on: " + datum_string;
    }

};

let calculateTime = () => {
    console.log("date " + datum);

    setInterval(function(){
        let now = new Date();
    
        let diff_time = datum - now;
    
        var seconds = Math.floor(diff_time / 1000);
        var minutes = Math.floor(seconds / 60);
        var hours = Math.floor(minutes / 60);
        var days = Math.floor(hours / 24);
    
        document.querySelector(".js-countdown-days").innerHTML = days;
        document.querySelector(".js-countdown-hours").innerHTML = hours%24;
        document.querySelector(".js-countdown-minutes").innerHTML = minutes%60;
        document.querySelector(".js-countdown-seconds").innerHTML = seconds%60;

    },1000); 
}

let showCurrentDriverStandings = (queryResponse) => {
    var json = queryResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings;

    var tabeldrivers = '<table class="c-table">';

    for (let index = 0; index < json.length; index++) {
        let achternaam = queryResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[index].Driver.familyName;
        let voornaam = queryResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[index].Driver.givenName;
        let points = queryResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[index].points;

        let position = queryResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[index].position;

        let constructor = queryResponse.MRData.StandingsTable.StandingsLists[0].DriverStandings[index].Constructors[0].name;
        tabeldrivers += `<tr>
                            <th class="c-table__position">#` + position + `</th>
                            <th><span class="c-table__name">` + voornaam + ' ' + achternaam + `</span><br> 
                            <span class="c-table__constructor">` + constructor +`</span></th>
                            <th class="c-table__points">` + points + `</th>
                        </tr>`;
    }
    tabeldrivers += '</table>';

    document.querySelector(".js-driver-standings").innerHTML = tabeldrivers;
};

let showCurrentConstructorStandings = (queryResponse) => {
    
    var json = queryResponse.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;

    var tabelconstructor = '<table class="c-table">';

    for (let index = 0; index < json.length; index++) {
        let constructor = queryResponse.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[index].Constructor.name;

        let points = queryResponse.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[index].points;

        let position = queryResponse.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[index].position;

        tabelconstructor += `<tr>
                            <th class="c-table__position">#` + position + `</th>
                            <th><span class="c-table__name">` + constructor +  `</span></th>
                            <th class="c-table__points">` + points + `</th>
                        </tr>`;
    }
    tabelconstructor += '</table>';

    document.querySelector(".js-constructor-standings").innerHTML = tabelconstructor;

};

const getRound = async(round) => {
        // Met de fetch API proberen we de data op te halen.
        const data = await fetch(`http://ergast.com/api/f1/2020/`+ round + `.json`)
		.then (r => r.json())
		.catch((err) => console.error("An error occured :", err));
        //console.log(data);
        // Als dat gelukt is, gaan we naar onze showResult functie.
        showCurrentRound(data);

};

const getDriverStandings = async(round) => {
    // Met de fetch API proberen we de data op te halen.
    round = parseInt(round) -1;
	const data = await fetch(`http://ergast.com/api/f1/current/`+ round + `/driverStandings.json`)
		.then (r => r.json())
		.catch((err) => console.error("An error occured :", err));
    // console.log(data);
    showCurrentDriverStandings(data);

};

const getConstructorStandings = async(round) => {
    // Met de fetch API proberen we de data op te halen.
    console.log(round);
    round = parseInt(round) -1;
    console.log(round);
    const data = await fetch('http://ergast.com/api/f1/current/'+round+'/constructorStandings.json')
        .then (r => r.json())
        .catch((err) => console.error("An error occured :", err));

    showCurrentConstructorStandings(data);
};

const animation_interaction = function (){
    for (let i = 0; i < 6; i++){
        document.querySelectorAll(".js-interaction-countdown")[i].style.display = 'none';
    }
    document.querySelector(".js-interaction-countdown-flex").style.display = "none";
    document.querySelector(".js-interaction").style.display="block";

    setTimeout(() => {          
        for (let i = 0; i < 6; i++){
            document.querySelectorAll(".js-interaction-countdown")[i].style.display = 'block';
        }
        document.querySelector(".js-interaction-countdown-flex").style.display = "flex";
        document.querySelector(".js-interaction").style.display="none";    
    }, 2000);

    console.log("animation done");

};

function listeners(round){
    let previous_race = document.querySelector('.js-button--previous'),
        next_race = document.querySelector('.js-button--next');
        //next_race_enter = document.querySelector('.js-button--next--enter'),
        //previous_race_enter = document.querySelector('.js-button--previous--enter');

        previous_race.addEventListener('click', function(){
            console.log("clicked");
            animation_interaction();
            round -= 1;
            getRound(round);
        });
        next_race.addEventListener('click', function(){
            animation_interaction();
            round = parseInt(round)+1;
            console.log(round);
            getRound(round);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    console.log('Script loaded!');
    getRound("17");
    calculateTime();
});