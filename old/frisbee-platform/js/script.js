// Login

const YOUR_CLIENT_ID = "ea52dfa1b062b4dd688206d2fd0a6c"
const client_secret = "57623563394553bad3db0138cfc242"
const response_type = "token"
const redirect_uri = "http://127.0.0.1:5500/frisbee-platform/"
const scope = "universal"

const baseURL = "https://www.leaguevine.com"
const apiURL = "https://api.leaguevine.com"

let offset = 0;

var beginpoint = `${baseURL}`
var endpoint = `${baseURL}/oauth2/authorize/?client_id=${YOUR_CLIENT_ID}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${scope}`

const loginBtn = document.querySelector("#login").addEventListener("click", leagueLogin);
const logoutBtn = document.querySelector("#logout").addEventListener("click", leagueLogout);

const apiLeague = `${apiURL}/v1/leagues/`
const apiTournament = `${apiURL}/v1/tournaments/`
const teams = `${apiURL}/v1/teams/`
const pools = `${apiURL}/v1/pools/`
const brackets = `${apiURL}/v1/brackets/`

function leagueLogin(e){
    // console.log(e)
    window.location.href=`${endpoint}`
}

function leagueLogout(){
  window.location.href=`${redirect_uri}`
}
// get token from url

getUrlValue()

function getUrlValue(){
  const querystring = window.location.hash
  //console.log(querystring)
  return querystring;
  
}

checkLogin()

function checkLogin(){
  let url = window.location.href;
  if(url.includes('#access_token')){
    document.querySelector("#login").classList.add('hidden')
    document.querySelector("#logout").classList.add('show')
    getUrlToken()
  }else{
    console.log(url);
    document.querySelector("#login").classList.add('show')
    document.querySelector("#logout").classList.add('hidden')
  }
}



function getUrlToken(querystring){
  const urlParams = new URLSearchParams(querystring);
  const token = urlParams.get('#access_token')
  // console.log(token)

    let requestURL = `${apiURL}/v1/games/234/?access_token=${token}`

    rightUrlPicker
    fetchData(rightUrlPicker()/*requestURL*/)
   // console.log({requestURL})
}

// Get data

function rightUrlPicker(){
  pickRightUrl = apiLeague + `?offset=` + offset
  console.log(pickRightUrl)
  return pickRightUrl
}



// function fetchData(pickRightUrl){
function fetchData(pickRightUrl){

  //he fetch() method returns a Promise so you can use the then() and catch() methods to handle it:
  fetch(`${pickRightUrl}`
  // ,{
  //   method: `POST`, 
  //   headers: {
  //     'Content-Type' : 'application/json'
  //   },
  //   body: JSON.stringify({
      
  //   })
  // }
  // https://www.youtube.com/watch?v=cuEtnrL9-H0&ab_channel=WebDevSimplified
  )
  .then(res => {
    if(res.ok){
      console.log('connectie klopt')
      return res.json()
      .then(data => {
        console.log(data.objects)
        for (var i = 0; i < 20; i++){
          document.querySelector(`main section ul:first-child`).insertAdjacentHTML('beforeend', 
                `<li><a href="${data.objects[i].leaguevine_url}">
                    <img src="${data.objects[i].profile_image_50}" alt="${data.objects[i].name}">
                    <h2>${data.objects[i].name}</h2>
                    <p>${data.objects[i].sport}</p>
                    </a></li>`) 
        }
        document.querySelector(`main section ul:first-child`).insertAdjacentHTML(`afterend`, "<div><button id='previous'>Previous</button><button id='next'>Next</button><div>")

        // knoppen hier aanroepen omdat ze in deze functie worden aangemaakt
        document.querySelector("#next").addEventListener("click", offsetNext);

        previous = document.querySelector("#previous")
        previous.addEventListener("click", offsetPrev);
        previous.classList.add('disabled')
        if(!offset == 0){
          previous.disabled = false;
          previous.classList.remove('disabled')
        }
      })
    }
    else{
      console.log('connectie faalde')
    }
  }
  )
  
  .catch(error => {
    console.log(' | er is iets fout gegaan | ', error) // dit werkt echter alleen als je internet uit staat
  })
}


/* Extra knoppen */

function offsetNext(){
  offset = offset + 20;
  removeUl()
  document.querySelector('section div').remove()
  fetchData()
}

function offsetPrev(){
  if(!offset == 0){
    offset = offset - 20;
    removeUl()
    document.querySelector('section div').remove()
    fetchData()
  }
}

function removeUl(){
  document.querySelector('section ul').innerHTML = ''
}

/* Navigatieknoppen home screen */

document.querySelector('#teams').addEventListener('click' , function() {
  pickRightUrl = `${teams}`
  removeUl()
  rightUrlPicker()
})

/* When the request completes, the resource is available. At this time, the promise will resolve into a Response object.
The Response object is the API wrapper for the fetched resource. The Response object has a number of useful properties and methods to inspect the response. */
