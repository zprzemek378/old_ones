var liczbaPiosenek=0;

var utwor = new Array();

var pozostalyCzas = 5;
var czyPodswietlic = 1;
var pieniadze = 100;
var czyPrzerwac = 0;
var piosenka;
var czasPiosenki;
var numerPiosenki;
var czyMoznaZgadywac = 0;
var ktoKliknal = 0;
var numerRundy = 1;
var zbanowanyGracz = null;

var gotowka = new Array(0,0,0,0);

onkeydown = sprawdzanieKlawisza;

function sprawdzanieKlawisza(przycisk)
{
	if(czyMoznaZgadywac == 1)
	{
		var wcisnietyKlawisz = przycisk.key;
		
		if((wcisnietyKlawisz == "q" || wcisnietyKlawisz == "Q") && zbanowanyGracz != 1)	ktosKliknal("1");
		if((wcisnietyKlawisz == "c" || wcisnietyKlawisz == "C") && zbanowanyGracz != 2)	ktosKliknal("2");
		if((wcisnietyKlawisz == "m" || wcisnietyKlawisz == "M") && zbanowanyGracz != 3)	ktosKliknal("3");
		if((wcisnietyKlawisz == "p" || wcisnietyKlawisz == "P") && zbanowanyGracz != 4)	ktosKliknal("4");
	}	
}


function odliczaniePosrednie()
{
	if (czyPodswietlic == 1) odliczanie();
}



function odliczanie()
{
	for (i=1; i<=4; i++) document.getElementById("money"+i).innerHTML = "$" + gotowka[i-1];
	
	
	
	document.getElementById("gracz1").style.filter= "brightness(100%)";
	document.getElementById("gracz2").style.filter= "brightness(100%)";
	document.getElementById("gracz3").style.filter= "brightness(100%)";
	document.getElementById("gracz4").style.filter= "brightness(100%)";

	if(zbanowanyGracz != null) {
			document.getElementById(`gracz${zbanowanyGracz}`).style.filter= "brightness(50%)";
	}
	
	
	
	czyPodswietlic = 0;
	podswietlenieOff();
	document.getElementById("tablica").style.cursor="auto";
	document.getElementById("napisy").innerHTML = "POCZĄTEK RUNDY ZA: " + pozostalyCzas;
	document.getElementById("napisy3").innerHTML = "PRZYGOTUJ SIĘ!";
	if(pozostalyCzas == 0)
	{
		let control = document.getElementById("wrzucaczPlikow");
		numerPiosenki = Math.floor(Math.random()*liczbaPiosenek);





		var audiox = document.createElement('audio');
		audiox.src = URL.createObjectURL(control.files[numerPiosenki]);

		piosenka = audiox;

		audiox.onloadedmetadata = function ()
		{
			var momentOdtworzenia = Math.floor(Math.random()*(audiox.duration-20));
			piosenka.currentTime = momentOdtworzenia;
			piosenka.play();
			czyMoznaZgadywac = 1;
			document.getElementById("napisy3").innerHTML = "ZGŁOŚ SIĘ ZA POMOCĄ PRZYCISKU!";
			
			var numerRundy = Math.floor(Math.random()*2)+1;
			if(numerRundy<2)
			{	
				czyPrzerwac = 0;
				pieniadze = 900;
				runda1();
			}
			
			else 
			{	
				czyPrzerwac = 0;
				pieniadze = 2100;
				runda2();
			}	
		
		}		
	}
	
	pozostalyCzas--;
	if (gotowka[0]>=10000 || gotowka[1]>=10000 || gotowka[2]>=10000 || gotowka [3]>=10000) setTimeout("koniecGry()",3500);
	else if (pozostalyCzas > -1) setTimeout("odliczanie()",1000);

}



function runda1()
{
	if (pieniadze>=2000)
	{
		czyPrzerwac = 1;
		niktNieKliknal();
	}
	
	else if (czyPrzerwac == 0)
	{	
		pieniadze = pieniadze + 100;
		document.getElementById("napisy").innerHTML = "$" + pieniadze + " ($ ROSNĄ)";
		setTimeout("runda1()",2000);
	}
}


function runda2()
{
	if (pieniadze<=1000)
	{
		czyPrzerwac = 1;
		niktNieKliknal();
	}
	
	
	else if (czyPrzerwac == 0)
	{
		pieniadze = pieniadze - 100;
		document.getElementById("napisy").innerHTML = "$" + pieniadze + " ($ MALEJĄ)";
		setTimeout("runda2()",2000);
	}
}


function niktNieKliknal()
{
	piosenka.pause();
	document.getElementById("napisy").innerHTML = "NIKT SIĘ NIE ZGŁOSIŁ! ($" + pieniadze + ")";
	document.getElementById("napisy3").innerHTML = "PIOSENKA: "  + utwor[numerPiosenki];
	czyMoznaZgadywac = 0;
	
	document.getElementById("gracz1").style.filter= "brightness(40%)";
	document.getElementById("gracz2").style.filter= "brightness(40%)";
	document.getElementById("gracz3").style.filter= "brightness(40%)";
	document.getElementById("gracz4").style.filter= "brightness(40%)";
		
	zbanowanyGracz = null;
	
	pozostalyCzas=5
	
	document.getElementById("zatwierdzaniePytanie").style.visibility="visible";
	document.getElementById("zatwierdzaniePytanie").style.top="50px";	
	document.getElementById("zatwierdzaniePytanie").style.width="600px";
	document.getElementById("zatwierdzaniePytanie").innerHTML = "Runda " + numerRundy + " dobiegła końca. Nikt nie otrzymuje pieniędzy ($" + pieniadze + ").";
	setTimeout("odliczanie()",5000);
	setTimeout("zamknijPowiadomienie()",8500);


	document.getElementById("zatwierdzanieNie").style.visibility="hidden";
	document.getElementById("zatwierdzanieTak").style.visibility="hidden";
	
	
	

}

function sek10() {
	document.getElementById("napisy").innerHTML = "$" + pieniadze;


	  let czas = 10;

	  const timer = setInterval(() => {
	    if (czas === 0) {
	      clearInterval(timer);
		document.getElementById("napisy").innerHTML = "$" + pieniadze + " Koniec czasu!";
	    } else {
		document.getElementById("napisy").innerHTML = "$" + pieniadze + " " + czas;
	      czas--;
	    }
	  }, 1000);
	
	
}


function ktosKliknal(ktoKliknalLokalne)
{
	if(czyMoznaZgadywac==1)
	{
		ktoKliknal = ktoKliknalLokalne;
		zbanowanyGracz = null;
		piosenka.pause();
		czyPrzerwac = 1;
		czyMoznaZgadywac = 0;
		document.getElementById("gracz1").style.filter= "brightness(40%)";
		document.getElementById("gracz2").style.filter= "brightness(40%)";
		document.getElementById("gracz3").style.filter= "brightness(40%)";
		document.getElementById("gracz4").style.filter= "brightness(40%)";
		
		document.getElementById("gracz" + ktoKliknal).style.filter= "brightness(170%)";
		document.getElementById("napisy").innerHTML = "$" + pieniadze;
		document.getElementById("napisy3").innerHTML = "ODPOWIADA GRACZ " + ktoKliknal;
		
		document.getElementById("zatwierdzanieOdpowiedz").style.visibility="visible";

		console.log("ktoś kliknął! gracz ", ktoKliknal);
		sek10();
	}
	
}


function ktosKliknal2()
{
	document.getElementById("zatwierdzanieOdpowiedz").style.visibility="hidden";	
	document.getElementById("zatwierdzaniePytanie").style.visibility="visible";
	document.getElementById("zatwierdzanieNie").style.visibility="visible";
	document.getElementById("zatwierdzanieTak").style.visibility="visible";

	document.getElementById("napisy3").innerHTML = "PIOSENKA: "  + utwor[numerPiosenki];
	document.getElementById("zatwierdzaniePytanie").innerHTML = "Czy Gracz " + ktoKliknal + " odpowiedział poprawnie?";
}

function odpowiedzialDobrze()
{
	gotowka[ktoKliknal-1] = gotowka[ktoKliknal-1] + pieniadze;
	pozostalyCzas = 5;

	
	document.getElementById("zatwierdzaniePytanie").style.top="50px";
	document.getElementById("zatwierdzaniePytanie").style.width="600px";		
	document.getElementById("zatwierdzaniePytanie").innerHTML = "Runda " + numerRundy + " dobiegła końca. Gracz " + ktoKliknal + " otrzymuje $" + pieniadze;
	if (gotowka[0]<10000 && gotowka[1]<10000 && gotowka[2]<10000 && gotowka [3]<10000) 
		
		{
			odliczanie()
			setTimeout("zamknijPowiadomienie()",3500);
		}

	if (gotowka[0]>=10000 || gotowka[1]>=10000 || gotowka[2]>=10000 || gotowka [3]>=10000) setTimeout("koniecGry()",3500);

	document.getElementById("zatwierdzanieNie").style.visibility="hidden";
	document.getElementById("zatwierdzanieTak").style.visibility="hidden";
}

function odpowiedzialZle()
{
	pozostalyCzas=5
	odliczanie()

	zbanowanyGracz = ktoKliknal;
	
	document.getElementById("zatwierdzaniePytanie").style.top="50px";	
	document.getElementById("zatwierdzaniePytanie").style.width="600px";
	document.getElementById("zatwierdzaniePytanie").innerHTML = "Runda " + numerRundy + " dobiegła końca. Nikt nie otrzymuje pieniędzy ($" + pieniadze + ").";
	setTimeout("zamknijPowiadomienie()",3500);


	document.getElementById("zatwierdzanieNie").style.visibility="hidden";
	document.getElementById("zatwierdzanieTak").style.visibility="hidden";
}


function zamknijPowiadomienie()
{
	document.getElementById("zatwierdzaniePytanie").style.top="17px";		
	document.getElementById("zatwierdzaniePytanie").style.width="330px";
	document.getElementById("zatwierdzaniePytanie").style.visibility="hidden";	
	document.getElementById("zatwierdzaniePytanie").innerHTML = "Czy Gracz 1 odpowiedział poprawnie?";
	numerRundy++;
}


function koniecGry()
{	
	document.getElementById("zatwierdzaniePytanie").style.top="50px";	
	document.getElementById("zatwierdzaniePytanie").style.width="600px";
	if (gotowka[0]>=10000)document.getElementById("zatwierdzaniePytanie").innerHTML = "KONIEC GRY! Wygrał gracz 1!";
	if (gotowka[1]>=10000)document.getElementById("zatwierdzaniePytanie").innerHTML = "KONIEC GRY! Wygrał gracz 2!";
	if (gotowka[2]>=10000)document.getElementById("zatwierdzaniePytanie").innerHTML = "KONIEC GRY! Wygrał gracz 3!";
	if (gotowka[3]>=10000)document.getElementById("zatwierdzaniePytanie").innerHTML = "KONIEC GRY! Wygrał gracz 4!";
	for (i=1; i<=4; i++) document.getElementById("money"+i).innerHTML = "$" + gotowka[i-1];
	document.getElementById("napisy").innerHTML = "KONIEC GRY!";
	document.getElementById("napisy3").innerHTML = "\"W tym momencie Robert Janowski zaprasza na kolejny odcinek!\"";
	
}





function podswietlenieOn()
{
	if (czyPodswietlic == 1) document.getElementById("tablica").style.filter= "brightness(130%)";
}

function podswietlenieOff()
{
	document.getElementById("tablica").style.filter= "brightness(100%)";
}






function przypiszPliki(control)
{
    var piosenkaxxx = document.createElement('audio');
	piosenkaxxx.src = URL.createObjectURL(control.files[0]);
	liczbaPiosenek = control.files.length;



	for (i=0;i<liczbaPiosenek;i++)
	{
		utwor[i] = control.files[i].name;
	}

}
