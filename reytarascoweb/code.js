// JavaScript Document
function _(query){
	return document.querySelector(query);
}
function _all(query){
	return document.querySelectorAll(query);
}
let songList = [
	{
		thumbnail:"rey14.jpg",
		audio:"A Donde vas Ballada.wav",
		songname:"A donde Vas Ballada",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"ADondeVasCumbia.mp3",
		songname:"A Donde Vas Cumbia",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"Bonita (Cumbia Mex).mp3",
		songname:"Bonita (Cumbia Mex)",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"BONITA BALADA.mp3",
		songname:"Bonita Balada",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"Bonita Yo Te Quiero.mp3",
		songname:"Bonita Yo Te Quiero",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"BonitaNortena.mp3",
		songname:"Bonita Nortena",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"Buenos Aires Yoga.mp3",
		songname:"Buenos Aires Yoga",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"Fin de Semena - Del Rey.mp3",
		songname:"Fin de Semena - Del Rey",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"Hoy Brilla El Sol Por Ti Mi Amor.mp3",
		songname:"Hoy Brilla El Sol Por Ti Mi Amor",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"HOY BRILLA EL SOL.mp3",
		songname:"Hoy Brilla El Sol",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"Mentira Fue Ballada.mp3",
		songname:"Mentira Fue Ballada",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"MENTIRA FUE.mp3",
		songname:"Mentira Fue",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"ORGULLO MICHOACANO.mp3",
		songname:"Orgullo Michoacano",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"ReyTarascoCumbia.mp3",
		songname:"Rey Tarasco Cumbia",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"SECRETOS DE PAREJA.mp3",
		songname:"Secretos De Pareja",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"secretos.mp3",
		songname:"Secretos",
		artistname:"Rey Tarasco"
	},
	{
		thumbnail:"rey14.jpg",
		audio:"Ya Se Fue.mp3",
		songname:"Ya Se Fue",
		artistname:"Rey Tarasco"
	},
];

let currentSongIndex = 0;

let player = _(".player"),
	toggleSongList = _(".player .toggle-list");

let main = {
	audio:_(".player .main audio"),
	thumbnail:_(".player .main img"),
	seekbar:_(".player .main input"),
	songname:_(".player .main .details h2"),
	artistname:_(".player .main .details p"),
	prevControl:_(".player .main .controls .prev-control"),
	playPauseControl:_(".player .main .controls .play-pause-control"),
	nextControl:_(".player .main .controls .next-control")
}

toggleSongList.addEventListener("click", function(){
	toggleSongList.classList.toggle("active");
	player.classList.toggle("activeSongList");
});

_(".player .player-list .list").innerHTML = (songList.map(function(song,songIndex){
	return `
		<div class="item" songIndex="${songIndex}">
			<div class="thumbnail">
				<img src="../reytarasco/${song.thumbnail}">
			</div>
			<div class="details">
				<h2>${song.songname}</h2>
				<p>${song.artistname}</p>
			</div>
		</div>
	`;
}).join(""));

let songListItems = _all(".player .player-list .list .item");
for(let i=0;i<songListItems.length;i++){
	songListItems[i].addEventListener("click",function(){
		currentSongIndex = parseInt(songListItems[i].getAttribute("songIndex"));
		loadSong(currentSongIndex);
		player.classList.remove("activeSongList");
	});
}

function loadSong(songIndex){
	let song = songList[songIndex];
	main.thumbnail.setAttribute("src","../reytarasco/"+song.thumbnail);
	document.body.style.background = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url("../reytarasco/${song.thumbnail}") center no-repeat`;
	document.body.style.backgroundSize = "cover";	
	main.songname.innerText = song.songname;
	main.artistname.innerText = song.artistname;
	main.audio.setAttribute("src","../reytarasco/"+song.audio);
	main.seekbar.setAttribute("value",0);
	main.seekbar.setAttribute("min",0);
	main.seekbar.setAttribute("max",0);
	main.audio.addEventListener("canplay",function(){
		main.audio.play();
		if(!main.audio.paused){
			main.playPauseControl.classList.remove("paused");
		}
		main.seekbar.setAttribute("max",parseInt(main.audio.duration));
		main.audio.onended = function(){
			main.nextControl.click();
		}
	})
}
setInterval(function(){
	main.seekbar.value = parseInt(main.audio.currentTime);
},1000);

main.prevControl.addEventListener("click",function(){
	currentSongIndex--;
	if(currentSongIndex < 0){
		currentSongIndex = songList.length + currentSongIndex;
	}
	loadSong(currentSongIndex);
});
main.nextControl.addEventListener("click",function(){
	currentSongIndex = (currentSongIndex+1) % songList.length;
	loadSong(currentSongIndex);
});
main.playPauseControl.addEventListener("click",function(){
	if(main.audio.paused){
		main.playPauseControl.classList.remove("paused");
		main.audio.play();
	} else {
		main.playPauseControl.classList.add("paused");
		main.audio.pause();
	}
});
main.seekbar.addEventListener("change",function(){
	main.audio.currentTime = main.seekbar.value;
});
loadSong(currentSongIndex);