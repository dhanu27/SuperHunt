(function(){
const apiToken=2027943727349046;
const suggestList=document.getElementById("suggests-list");
let searchBar=document.getElementById("search-bar");
let suggestionList=[];
const localStorage=window.localStorage;

// console.log(localStorage);

// Render the  suggestions for search input
let addSuggest=function(obj){ 
    // console.log(obj);
    const div= document.createElement('div');
    div.classList.add("suggest");
    div.innerHTML='<img src="'+ obj.image.url+'"><div class="hero-info"><h4>'+obj.name+'</h4><ul><li>Intelligence :'+obj.powerstats.intelligence+'</li><li>power'+obj.powerstats.power+ '</li><li>Speed :'+obj.powerstats.speed +'</li><li>Strength :'+ obj.powerstats.strength+'</li></ul></div>'
     const button=document.createElement('button');
     
     button.setAttribute("id",""+obj.id);
     let favourites=JSON.parse(localStorage.getItem("favourites")); 

    if((favourites!=null&&favourites.includes(obj.id)){
            button.innerHTML="Remove From Favourites";
            button.classList.add("bg-red");
            button.classList.add("remove-from-Fav");
    } 
    else{
     button.innerHTML="Add To Favourites";
     button.classList.add("bg-blue");
     button.classList.add("add-to-Fav");
    }
    button.classList.add('action-bttn');
     div.appendChild(button);  
    suggestList.prepend(div);
}

// Adding a suggestions in a suggestions list 
let fillSuggesstionsList=function(){
    console.log(suggestionList);
    if(!suggestionList){
        return ;
    }
    for(let i =0; i<suggestionList.length&&i<10; i++){
        if(suggestionList[i]!=undefined){
      for(let j=0; j<suggestionList[i].length&&j<10; j++){
         addSuggest(suggestionList[i][j]);
       }
     }
   }
}

//  Get the the suggestions
let listSuggestions=function(tosearch){
    if(!tosearch){
        suggestList.innerHTML="No Result Found";
        return;
    }
    let request=new XMLHttpRequest();
    request.open("GET","https://www.superheroapi.com/api.php/"+apiToken+"/search/"+tosearch);
    request.send();
    request.onload=()=>{
        if(request.status===200){
            const data=JSON.parse(request.response);
            suggestionList.splice(0, suggestionList.length) 
            suggestList.innerHTML="";
            suggestionList.unshift(data.results);
            fillSuggesstionsList();
        }
    };
    request.onerror=()=>{
        suggestList.innerHTML=="No Result Found";
        console.log("Error while searching");
    }
}

let suggestions= function(e){
    let tosearch=searchBar.value;
     listSuggestions(tosearch);
}
searchBar.addEventListener("keyup",suggestions);

// Add a hero to localStorage as favourite
let addHeroLocal=function(id){
    let favourites=JSON.parse(localStorage.getItem("favourites"));

     if(favourites==null){
        favourites=[];
     }
   favourites.push(id);
   localStorage.setItem("favourites",JSON.stringify(favourites));
   console.log( localStorage.getItem("favourites"));
}

// Remove a hero from localstorage
let delHeroLocal=function(id){
    let favourites=JSON.parse(localStorage.getItem("favourites")); 
    var filtered = favourites.filter(function(value, index, arr){ return value != id+"";});
    localStorage.setItem("favourites",JSON.stringify(filtered));
    console.log( localStorage.getItem("favourites"));
}

// Handle all user clicks
let handleclick=function(e){
    const target=e.target;
   if(target.classList.contains("add-to-Fav")){
      let favId=target.id;
    //   favourites=localStorage.getItem();
      console.log(favId);
      addHeroLocal(favId);
      target.classList.remove("add-to-Fav");
      target.classList.remove("bg-blue");
      target.classList.add("bg-red");
      target.classList.add("remove-from-Fav");
      target.innerHTML="Remove From Favourites";
   }
    else if(target.classList.contains("remove-from-Fav")){
        let favId=target.id;
        console.log(favId);
        delHeroLocal(favId);
        target.classList.remove("bg-red");
        target.classList.remove("remove-from-Fav");
        target.classList.add("add-to-Fav");
        target.classList.add("bg-blue");
        target.innerHTML="Add to Favourites";
    }  
}
document.addEventListener("click",handleclick);
})();
