const apiToken=2027943727349046;
let favouritesContainer=document.getElementById("Favourites-list");

// Render the favourites hero list
let renderFavourites=function(data){
    const heroDiv=document.createElement('div');
    heroDiv.innerHTML='<div class="hero-img"><img src='+data.image.url+'></div> <div><h4>'+data.name+'</div>';
    const powercontainer=document.createElement('ul');
    Object.entries(data.powerstats).forEach(([key, val]) => {
        console.log(key, val);
        let powerstats=document.createElement('li');
          powerstats.innerHTML=key +":    "+val;
          powercontainer.appendChild(powerstats);
      });
   
    heroDiv.appendChild(powercontainer);
    heroDiv.classList.add("hero-container");
    favouritesContainer.appendChild(heroDiv);
}

// get the Hero By id  
let getHero=function(id){
    let request=new XMLHttpRequest();
    request.open("GET","https://www.superheroapi.com/api.php/"+apiToken+"/"+id);
    request.send();
    request.onload=()=>{
        if(request.status===200){
            const data=JSON.parse(request.response);
             console.log(data);
             renderFavourites(data);
        }
    };
    request.onerror=()=>{
        console.log(err);
    }
}

// Get the all Favourites heros id from localstorage
let getAllfavouritesId=function(){
    let favourites=JSON.parse(localStorage.getItem("favourites"));
    console.log(favourites);
    if(favourites.length>0){
        favourites.forEach(element => {
            getHero(element);
        });  
    }else{
        favouritesContainer.innerHTML="No Favourites yet";
    }

    
}
getAllfavouritesId();