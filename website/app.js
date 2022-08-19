/* Global Variables */
const openWeatherMap = "https://api.openweathermap.org/data/2.5/weather?q=";//api website
const myApiKey = "a0c7d3b097137a82379bac0537d41ca1&units=imperial";// my api key
const zipCode = document.getElementById("zip");// to get zip code from text field
const theFeelings = document.getElementById('feelings');// to get feel from text area
const submitBtn = document.getElementById('generate');// get btn to add click event
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//add event listener to Btn
submitBtn.addEventListener('click', function clicked(){
    //check if zipCode feel empty or not
    if(zipCode.value.trim()==='' || theFeelings.value.trim()===''){
        //if empty alert user to fill them
        window.alert("zipeCode and feelings is required");
        return;
    }
    // if not empty send data to getInputs function in mainApp object
    mainApp.getInputs(openWeatherMap,zipCode.value,myApiKey)
    // to get data from api and save it in object
    .then(data => mainApp.dataOuputs({
        temp:data.main.temp ,
        date:newDate ,
        theFeelings: theFeelings.value
    }) )
    // to show information in front end
    .then(()=> mainApp.retrieveData());
});

// the main object
const mainApp = {
    getInputs: async function (link ,zip ,key){
        // to get information from api
        const dataFetching = await fetch(link+''+zip+'&APPID='+key/*+"&units=metric"*/);
        try{
            const res = await dataFetching.json();
            return res;

        }catch(error){
            console.log("error", error);
            // appropriately handle the error
        }

    },
    // function to send data to back end
    dataOuputs : async function(output={}){
        const dataSend = await fetch('/dataRepo', {
            method: "POST",
            credentials: "same-origin",
            body: JSON.stringify(output),
            headers:{
                'Content-Type':"application/json"
            }
        });
        try{
            const res = await dataSend.json();
            return res;

        }catch(error){
            console.log("error", error);
            // appropriately handle the error
        }
    },

// functions retrieveData to view data in frontend
    retrieveData : async function (){
        // to fetch data from path we send data            
            const request = await fetch('/dataBox');
            try {
                // Transform into JSON
                const allData = await request.json()
                console.log(allData)
                // Write updated data to DOM elements
                document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
                document.getElementById('content').innerHTML = allData.theFeelings;
                document.getElementById("date").innerHTML =allData.date;
                }
            catch(error) {
                console.log("error", error);
                // appropriately handle the error
            }
            
    },



};