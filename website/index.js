
/* Global Variables */
let temprature;
let newData;
// Create a new date instance dynamically with JS
let d = new Date();
 newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();
    //console.log(newDate);
const baseUrl='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=df7431b7ad23916febf24d79c33c9e6a';
let generate = document.getElementById('generate'); //access the button of id generate to addEvent listener
let zip = document.getElementById('zip') ; //access the value of input of id zip to add it to the query in fetch process
let fellings = document.getElementById('feelings'); // access the value of textarea of felling to update the UI
async function getData(url,query,key){
    try {
        const response = await fetch(`${url}${query}${key}&units=metric`);

     let data = await response.json();

        console.log(data);    
        console.log(data.main.temp);  
        return data.main.temp
        } 
    catch (error) {
        alert('enter valid ZIP code')
        console.log(error);
        }
    }
//getData();
generate.addEventListener('click',async ()=>{
    document.getElementById('entryHolder').style.border='3px solid #1368b3';
    if(zip.value==""||fellings.value=="")
    {
        alert('please enter value');
    }
    else{
    try{
        await getData(baseUrl,zip.value,apiKey).then(async(temp)=>{
            console.log(temp);
            const feeling=fellings.value;
            await fetch('/postRoute',{
                method:'POST',
                credentials:"same-origin",
                headers:{
                    "Content-type":"application/json"
                },
                body:JSON.stringify({
                    temp:temp,
                    feeling
                })
            })
            const res = await fetch('/getRoute',{
                method:"GET",
                credentials:"same-origin",
                
            })
            let weather = await res.json();
            console.log(weather);
            return weather;

        })
        .then(async (weather)=>{
            document.getElementById('temp').innerText=`temprature : ${weather.temp}Celisius`;
            document.getElementById('date').innerText=`Current Date : ${newDate}`;
            document.getElementById('content').innerText=`Your feeling : ${weather.feeling}`;
        })
    }
    catch(error)
    {
        console.log(error);
    }}
    
    //temprature=await getData(baseUrl,zip.value,apiKey);
    //console.log(temprature);
  //  document.getElementById('temp').innerText=temprature;
    zip.value='';
    fellings.value='';
})


