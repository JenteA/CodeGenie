# Cloud Applications
## CodeGenie

Kenny Embrechts & Jente Adams

3EA1



##Voorwoord
We hebben dit project gekregen van Tim Dams. Het is een persoonlijk project voor hem dat hij graag zou gebruiken voor het quoteren van zijn studenten. Het project was leuk, met af en toe wat obstakels, maar we hebben het toch toch een redelijk goed einde gebracht.


# Inhoudsopgave

[1. Inleiding](#Inleiding)</br>
[2. Specificaties](#Specificaties)</br>
>[2.1. Mongo DB](#Mongo-DB)</br>
>[2.2. Express JS](#Express-JS)</br>
>>[2.2. HTTP service](#HTTP-Service)</br>
>>[2.2. Request handler](#Request-handler)</br>

>[2.3. Angular JS](#Angular-JS)</br>
>>[2.3.1 States](#States)</br>
>>[2.3.2 Controllers](#Controllers)</br>
>>>[2.3.2.1 Main controller](#MainCtrl)</br>
>>>[2.3.2.2 Les controller](#LesCtrl)</br>
>>>[2.3.2.3 Opdracht controller](#OpdrachtCtrl)</br>
>>>[2.3.2.4 Indienen controller](#IndienenCtrl)</br>
>>>[2.3.2.5 Opdracht indienen controller](#OpdrachtIndienenCtrl)</br>
>>>[2.3.2.6 Opdracht ingediend controller](#OpdrachtIngedientCtrl)</br>
>>>[2.3.2.7 Login controller](#LoginCtrl)</br>
>>>[2.3.2.8 Logout controller](#LogoutCtrl)</br>

>>[2.3.3 Factories](#Factories)</br>
>>[2.3.3 NG-repeat, NG-hide, NG-show](#NG)</br>
>>>[2.3.3.1 NG show](#show)</br>
>>>[2.3.3.1 NG hide](#hide)</br>
>>>[2.3.3.1 NG repeat](#repeat)</br>

>[2.3. Node JS](#Node-JS)</br>
>[2.3. Auth0](#Auth0)</br>

[4. Conclusie](#Conclusie)


#<a id="Inleiding"></a>1. Inleiding

CodeGenie is een project dat we hebben gemaakt voor meneer Dams. De bedoeling is dat de meneer Dams (als admin) lessen kan maken en bekijken. De lessen worden gemaakt en er worden deelopdrachten aan toegevoegd. meneer Dams kan selecteren of er al dan niet code moet worden toegevoegd. Hij kan ook zien welke leerlingen de lessen hebben gemaakt, en welke deelopdrachten van de eerder gezegde les. Dit is allemaal gedaan om het quoteren te vergemakkelijken. Het is makkelijk te zien welke leerlingen gehele lessen niet hebben gemaakt, en daar kan je dus makkelijk een 0 voor geven. Ook bij de deelopdrachten staat dit goed aangegeven.

Als leerling kan je dus de lessen maken. Je kan selecteren of je de les hebt gemaakt, en daarna of je de deelopdrachten hebt gemaakt. Je kan aan de hand van de daarvoor voorziene textboxen de code toevoegen die je hebt geschreven.


#<a id="Specificaties"></a>2. Specificaties

Hier gaan we het hebben over de [MEAN-stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) die we hebben gebruikt om het project te bouwen. We gaan de component uitleggen, en dan toelichten hoe wij dit hebben gebruikt in ons project
##<a id="Mongo-DB"></a>2.1. Mongo DB

Mongo DB wordt gebruikt voor het maken van databases. Het is niet de conventionele vorm die we altijd al kenden met tabellen. Het gebruikt documenten om de tabellen te beschrijven, met de veldnamen e.d.
##<a id="Express-JS"></a>2.2. Express JS

Dit is een framework dat wordt gebruikt door [Node JS](#Node-JS). Je kan dit gebruiken voor single page, multi page en hybride web-applicaties. Het is dus de backend van ons project.

###<a id="HTTP-Service"></a>2.2.1 HTTP service

Dit maakt het mogelijk om een web service te starten. 
![HTTP](screenshots/http.png)

Moest je nu surfen naar localhost:1337, zou je 'Hello world!" krijgen op het scherm. Dit is dus een enorm simpele manier om een webpagina up and running te krijgen.
###<a id="Request-handler"></a>2.2.1 Request handler

Als je een request doet naar de server, zal de request handler deze request handlen. 

![request handler](screenshots/request-handler.png)

Je gaat een GET request doen naar de server. De handler gaat de data doorsturen naar de server

De response (in het stukje 'response') geeft je volledige, en bruikbare responses.
##<a id="Angular-JS"></a>2.3. Angular JS

Voor onze angular.app.js gebruiken we verschillende dingen. Deze worden allemaal uitgelegd.

###<a id="States"></a>2.3.1 States
![Verschillende states](screenshots/AngularStates.png)

In de app.config gaan we verschillende states definiëren. Deze states worden gebruikt voor het klikken op een url op onze pagina. Per pagina die je wil kunnen bezoeken. Indien je een url wil bezoeken die niet bestaat, zal je via de otherwise state, naar de home pagina worden doorverwezen.

![OtherwiseState](screenshots/OtherwiseState.png)

###<a id="Controllers"></a>2.3.1 Controllers

Controllers worden gebruikt om data te verkrijgen, verwerken, tonen en door te sturen. Elke pagina die dit nodig heeft krijgt een aparte controller.

![Controllers](screenshots/Controllers.png)

####<a id="MainCtrl"></a>2.3.2.1 Main controller

Onze Main controller doet eigenlijk niets. Het is gewoon de standaard controller die we hadden meegegeven indien we iets nodig hadden op onze top-level pages.

####<a id="LesCtrl"></a>2.3.2.2 Les controller

De Les controller wordt gebruikt door de admin op nieuwe lessen te maken of om lessen te bekijken die leerlingen al hebben gemaakt.

![BewerkLes](screenshots/AdminBewerkLes.png)

Bij het bewerken kan je nog extra vragen toevoegen aan een les. Het verwijderen van vragen is een functie die nog moet worden toegevoegd.

![BekijkLes](screenshots/AdminBekijkLes.png)



####<a id="OpdrachtCtrl"></a>2.3.2.4 Opdracht controller

De opdracht controller wordt gebruikt om deelopdrachten toe te voegen aan de lessen. Je kan dit in 1 keer doen, of je kan 2 weken na het maken van een les nog eens terugkomen om een opdracht toe te voegen.

<img src="screenshots/OpdrachtCtrl.png" width ="250"/>

De 'Add' knop kan je gebruiken om een deelopdracht toe te voegen. De 'Submit' knop gebruik je om alle deelopdrachten door te sturen naar de database.

####<a id="IndienenCtrl"></a>2.3.2.3 Indienen Controller
Indien je bent ingelogd als leerling, wordt deze controller gebruikt om alle lessen te tonen die de leerkracht heeft gemaakt.

![IndienenController](screenshots/IndienenController.png)

Je kan de les kiezen die je wil indienen, en dan word je doorgestuurd naar de lespagina.

<img src="screenshots/BekijkLes.png" width ="250"/>

Je kan selecteren of je de vraag al dan niet hebt opgelost, en indien wel, zal je de code moeten copy-pasten om mee te uploaden naar de database.

####<a id="OpdrachtIndienenCtrl"></a>2.3.2.5 Opdracht indienen Controller

Deze controller wordt gebruikt om het uitlezen van de lessen voor het indienen mogelijk te maken. Zonder deze controller zou het ongemogelijk...

#Jente


####<a id="OpdrachtIngediendCtrl"></a>2.3.2.6 Opdracht ingediend Controller

Deze controller wordt gebruikt door de Admin om gemaakte lessen te kunnen bekijken. 

<img src="screenshots/GemaakteLessenPerPersoon.png" width="350">

Je kan hier de les selecteren die je wil en dan kan je zo makkelijk zien welke persoon deze les heeft gemaakt.

####<a id="LoginCtrl"></a>2.3.2.7 Login Controller

De controller die je kan gebruiken om in te loggen.

<img src="screenshots/Login.png" width="250">


####<a id="LogoutCtrl"></a>2.3.2.8 Logout Controller

De controller die wordt gebruikt om uit te loggen.

###<a id="Factories"></a>2.3.3 Factories

#Jente


###<a id="NG"></a>2.3.4 NG module
####<a id="show"></a>2.3.4.1 NG show
####<a id="hide"></a>2.3.4.2 NG hide
####<a id="repeat"></a>2.3.4.3 NG repeat

##<a id="Node-JS"></a>2.4. Node JS

Node JS is het platform waarmee we onze web-applicatie gaan draaien. In combinatie met een javascript engine, moet de browser zelf niets meer doen maar zal node de gehele applicatie gaan draaien

##<a id="Auth0"></a>2.4. Auth0

#Jente










