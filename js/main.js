/* Main User Obj */

const user ={
    name: "Andy Repp",
    callsCompleted: 21,
    callsTotal: 27,
    calls: [
        {
        date:{
            tomorrow: true,
            time: 15.00,
            day: 12,
            month: "November",
            year: 2017
        },
        account: "Clinton Ackerman",
        speciality:["Respiratory therapist", "Assistive Therapy"],
        profile: "Confident"
    },
    {
        date:{
            tomorrow: false,
            time: 9.00,
            day: 13,
            month: "November",
            year: 2017
        },
        account: "Kathleen Adler",
        speciality:["Gastroenterelogy", "Colorectal"],
        profile: "Fairly Confident"
    },
    {
        date:{
            tomorrow: false,
            time: 14.00,
            day: 13,
            month: "November",
            year: 2017
        },
        account: "Jon Rixon",
        speciality:["Cardiology", "Vascular Surgeon"],
        profile: "Not known"
    },
    {
        date:{
            tomorrow: false,
            time: 10.30,
            day: 14,
            month: "November",
            year: 2017
        },
        account: "Michael Jones",
        speciality:["Endocrine Therapy", "Assistive Theraphy"],
        profile: "Not Confident"
    },
    {
        date:{
            tomorrow: false,
            time: 16.40,
            day: 14,
            month: "November",
            year: 2017
        },
        account: "Barbara Adolphe",
        speciality:["Clinical pharmacology", "Consultant pharmacist"],
        profile: "Very Confident"
        }
    ]
}

/* Initial call number */

let callNumber = 0;

/* Load User */

const userNameTag = document.getElementById("user-name");
userNameTag.innerHTML = user.name;

/* Empty Metric Graphs Function */

function cleanMetricGraphs(){
    const metricAvgTag = document.getElementById("micro-avg");
    const metricCautiousTag = document.getElementById("micro-cautious");
    const metricComplacentTag = document.getElementById("micro-complacent");
    const metricConfidentTag = document.getElementById("micro-confident");
    
    metricAvgTag.innerHTML=''; metricCautiousTag.innerHTML=''; 
    metricComplacentTag.innerHTML =''; metricConfidentTag.innerHTML='';
}

/* Next-Previous call functions*/

function nextCall(){
    callNumber++;
    user.callsCompleted++;
    const nextWrapperTag = document.getElementById("next-wrapper");
    
    console.log(callNumber)
    if(callNumber===4){
         nextWrapperTag.innerHTML = `
            <button type="button" class="btn btn-dark" onclick="previousCall()">Previous</button>
        `
    }
    else if(callNumber>0){
        nextWrapperTag.innerHTML = `
            <button type="button" class="btn btn-dark" onclick="previousCall()">Previous</button>
            <button type="button" class="btn btn-dark" onclick="nextCall()">Next</button>
        `
    }
    cleanMetricGraphs();
    renderCall();
}

function previousCall(){
    callNumber--;
    user.callsCompleted--;
    const nextWrapperTag = document.getElementById("next-wrapper");
    if(callNumber===0){
        nextWrapperTag.innerHTML = `
            <button type="button" class="btn btn-dark" onclick="nextCall()">Next</button>
        `
    }else{
        nextWrapperTag.innerHTML = `
            <button type="button" class="btn btn-dark" onclick="previousCall()">Previous</button>
            <button type="button" class="btn btn-dark" onclick="nextCall()">Next</button>
        `
    }
    cleanMetricGraphs();
    renderCall();
}


/* Generate random value functions */

function generateRandom(max, thecount) {
  var r = [];
  var currsum = 0;
  for(var i=0; i<thecount-1; i++) {
     r[i] = randombetween(13, 24);
     currsum += r[i];
  }
  r[thecount-1] = max - currsum;
    if (r[thecount-1] <0){ r[thecount-1]=0}
  return r;
}

function randombetween(min, max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

/* Main data function */

function renderCall (){
    
    const currentCall = user.calls[callNumber];

    /* Load date */

    const timePeriod =["AM", "PM"];

    let appointmentTime = `${currentCall.date.time > 12 ? (currentCall.date.time -12).toFixed(2) + timePeriod[1] : (currentCall.date.time).toFixed(2) + timePeriod[0]}`;

    const dateTag = document.getElementById("call-date");
    dateTag.innerHTML= `${currentCall.date.tomorrow ? "Tomorrow" : ""} ${appointmentTime}
                        <br>
                     ${currentCall.date.day} ${currentCall.date.month} ${currentCall.date.year}`;
    /* Load account */
    
    const accountTag = document.getElementById("call-account");
    accountTag.innerHTML = `${currentCall.account}`
    
    /* Load speciality */
    
    const specialityTag = document.getElementById("call-speciality");
    specialityTag.innerHTML = `${currentCall.speciality.map( speciality =>`<li>${speciality}</li>`).join('')}`
    
    /* Load profile */
    
    const profileTag = document.getElementById("call-profile");
    profileTag.innerHTML = `${currentCall.profile}`;
    
    /* Load call score */

    const circleTag = document.querySelector("#circle-info path");
    circleTag.style.strokeDasharray = user.callsCompleted/user.callsTotal*100;

    const callNumberTag = document.getElementById("calls-score");
    callNumberTag.innerHTML = `<p>${user.callsCompleted}</p>
                                <p>${user.callsTotal}</p>`;
    
    /* Load detailing bars */
    
    const barColours = ["#4b59ff", "#33efe7", "#d9ef33", "#ef3333", "#a05bc4", "#a8a8a8"];
    
    /* Cautious Bar */
    
    let cautiousValues = generateRandom(100, 6);
    const cautiousBarTag = document.getElementById("cautious-bar");
    cautiousBarTag.innerHTML =`${cautiousValues.map( (value, index) => {
        return `<td class="animate__animated animate__pulse" style="width:${value}%;background-color:${barColours[index]};"></td>`
    }).join('')
    }`
    
  
    /* Complacent Bar */
    
    let complacentValues = generateRandom(100, 6);
    const complacentBarTag = document.getElementById("complacent-bar");
    complacentBarTag.innerHTML =`${complacentValues.map( (value, index) => {
        return `<td class="animate__animated animate__pulse" style="width:${value}%;background-color:${barColours[index]};"></td>`
    }).join('')
    }`
    
    /* Confident Bar */
    
    let confidentValues = generateRandom(100, 6);
    const confidentBarTag = document.getElementById("confident-bar");
    confidentBarTag.innerHTML =`${confidentValues.map( (value, index) => {
        return `<td class="animate__animated animate__pulse" style="width:${value}%;background-color:${barColours[index]};"></td>`
    }).join('')
    }`
    
    /* Avg Bar */ 
    
    let avgValues = confidentValues.map( (confidentValue, index) => {
        return (confidentValue + complacentValues[index] + cautiousValues[index])/3
    });
    
    const avgBarTag = document.getElementById("avg-bar");
    avgBarTag.innerHTML =`${avgValues.map( (value, index) => {
        return `<td class="animate__animated animate__pulse" style="width:${value}%;background-color:${barColours[index]};">
        </td>`
    }).join('')
    }`
    
    /* Avg Bar Notes */ 
    
    const avgBarTagNotes = document.getElementById("avg-bar-notes");
    avgBarTagNotes.innerHTML =`${avgValues.map( (value, index) => {
        return `<td class="animate__animated animate__pulse notes" style="width:${value}%;">
        <span>${Math.round(value)}%</span>
        </td>`
    }).join('')
    }`
    
    /* Load Upcoming calls table */ 
    
    const tableUpcCallsTag = document.getElementById("table-upcoming-calls");
    tableUpcCallsTag.innerHTML = `${user.calls.map((call, index) => {
       return `<tr ${index === Number(callNumber) ? `class="table-warning"` : null}>
            <th scope="row" id=${index} onclick="callClicked(this.id)">${call.account}</th>
            <td>${call.date.day} ${call.date.month.substring(0, 3)}.</td>
            <td>${call.date.time.toFixed(2)}</td>
        </tr>`
    }).join('')}`
    
    /* Load detailing targets modal */ 
    
    const parametersName = ["Adherence", "Combination Therapy", "Dosing", "Guidelines", "Safety"];

    const parameters = parametersName.map((name, index) => {
        return{
            name: name,
            values: {
               cautious: cautiousValues[index],
                complacent: complacentValues[index],
                confident: confidentValues[index],
                avg: avgValues[index]
            }
        }
    })

    const tableModalTarget = document.getElementById("modal-targets-table");
    
    tableModalTarget.innerHTML = parameters.map((parameter, index) => {
        return `${
                `<tr>
                        <th scope="row">${parameter.name}</th>
                        <td>${Math.round(parameter.values.cautious)}%</td>
                        <td>${Math.round(parameter.values.complacent)}%</td>
                        <td>${Math.round(parameter.values.confident)}%</td>
                    </tr>`
            }`    
    }).join('')
    

    /* Pentagon Chart*/
    

    /* --- Avg --- */
    radar.show('#micro-avg', {
      size: 320,
      curve: false,
      metrics: parameters.map( parameter => {
          return {
              name: parameter.name.substring(0, 11),
              range: [
                    "Value 0",
                    "Value 10",
                    "Value 20",
                    "Value 30"
              ],
              target: randombetween(5, 30)*0.085,
              actual: parameter.values.avg*0.085
          }
      })
    });
    
    /* --- Cautious --- */

        radar.show('#micro-cautious', {
      size: 320,
      curve: false,
      metrics: parameters.map( parameter => {
          return {
              name: parameter.name.substring(0,11),
              range: [
                    "Value 0",
                    "Value 10",
                    "Value 20",
                    "Value 30"
              ],
              target: randombetween(25, 30)*0.085,
              actual: parameter.values.avg*0.085
          }
      })
    });


    /* --- Complacent --- */

        radar.show('#micro-complacent', {
      size: 320,
      curve: false,
      metrics: parameters.map( parameter => {
          return {
              name: parameter.name.substring(0,11),
              range: [
                    "Value 0",
                    "Value 10",
                    "Value 20",
                    "Value 30"
              ],
              target: randombetween(25, 30)*0.085,
              actual: parameter.values.complacent*0.085
          }
      })
    });
    
    /* --- Confident --- */

        radar.show('#micro-confident', {
      size: 320,
      curve: false,
      metrics: parameters.map( parameter => {
          return {
              name: parameter.name.substring(0,11),
              range: [
                    "Value 0",
                    "Value 10",
                    "Value 20",
                    "Value 30"
              ],
              target: randombetween(25, 30)*0.085,
              actual: parameter.values.confident*0.085
          }
      })
    });
    
}

/* Load render function on web load*/

window.onload = renderCall;


/* call clicked */

function callClicked(id){
    callNumber = id;
    user.callsCompleted = 21 + Number(id);
    cleanMetricGraphs();
    renderCall();
}



/* toggle calls tab*/

const callsTab = document.getElementById("nav-calls");

callsTab.addEventListener("click", function(){
    let upcomingCalls = document.getElementById("container-upcoming-calls");
    let infoCalls = document.getElementById("calls-info-wrapper");
      if (upcomingCalls.style.display === "" || upcomingCalls.style.display === "none") {
            infoCalls.style.display = "none";
            upcomingCalls.style.display = "block"
      }
})

const overviewTab = document.getElementById("nav-overview");

overviewTab.addEventListener("click", function(){
    let upcomingCalls = document.getElementById("container-upcoming-calls");
    let infoCalls = document.getElementById("calls-info-wrapper");
      if (infoCalls.style.display === "none") {
            infoCalls.style.display = "block";
            upcomingCalls.style.display = "none";
      }
})

/* Set Active Tab*/

const navTags = Array.from(document.getElementsByClassName("nav-links"))

console.log(navTags)
navTags.forEach( tag => {
    
    return tag.addEventListener("click", function(e){
        /* Remove active class from other elements */
        navTags.forEach(t => t.classList.remove("active"));
        /* Add active class */
        e.target.classList.add("active")
})
})

