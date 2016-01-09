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
>>[2.2.1 GET request](#Get)</br>
>>[2.2.2 POST request](#Post)</br>
>>[2.2.3 Param](#Param)</br>

>[2.3. Angular JS](#Angular-JS)</br>
>>[2.3.1 app.config](#AppConfig)</br>
>>>[2.3.1.1 $stateProvider](#StateProvider)</br>
>>>[2.3.1.2 $urlRouterProvider](#UrlRouterProvider)</br>
>>>[2.3.1.3 authProvider](#AuthProvider)</br>
>>>[2.3.1.4 jwtInterceptorProvider](#JwtInterceptorProvider)</br>
>>>[2.3.1.5 $httpProvider](#HttpProvider)</br>


>>[2.3.2 Controllers](#Controllers)</br>
>>>[2.3.2.1 Main controller](#MainCtrl)</br>
>>>[2.3.2.2 Les controller](#LesCtrl)</br>
>>>[2.3.2.3 Opdracht controller](#OpdrachtCtrl)</br>
>>>[2.3.2.4 Indienen controller](#IndienenCtrl)</br>
>>>[2.3.2.5 Opdracht indienen controller](#OpdrachtIndienenCtrl)</br>
>>>[2.3.2.6 Opdracht ingediend controller](#OpdrachtIngedientCtrl)</br>
>>>[2.3.2.7 Auth controller](#AuthCtrl)</br>

>>[2.3.3 Factories](#Factories)</br>
>>[2.3.4 NG-repeat, NG-hide, NG-show](#NG)</br>
>>>[2.3.4.1 NG show](#show)</br>
>>>[2.3.4.1 NG hide](#hide)</br>
>>>[2.3.4.1 NG repeat](#repeat)</br>

>[2.4. Node JS](#Node-JS)</br>
>[2.5. Auth0](#Auth0)</br>

[4. Conclusie](#Conclusie)

#<a id="Inleiding"></a>1. Inleiding

CodeGenie is een project dat we hebben gemaakt voor meneer Dams. De bedoeling is dat de meneer Dams (als admin) lessen kan maken en bekijken. De lessen worden gemaakt en er worden deelopdrachten aan toegevoegd. meneer Dams kan selecteren of er al dan niet code moet worden toegevoegd. Hij kan ook zien welke leerlingen de lessen hebben gemaakt, en welke deelopdrachten van de eerder gezegde les. Dit is allemaal gedaan om het quoteren te vergemakkelijken. Het is makkelijk te zien welke leerlingen gehele lessen niet hebben gemaakt, en daar kan je dus makkelijk een 0 voor geven. Ook bij de deelopdrachten staat dit goed aangegeven.

Als leerling kan je dus de lessen maken. Je kan selecteren of je de les hebt gemaakt, en daarna of je de deelopdrachten hebt gemaakt. Je kan aan de hand van de daarvoor voorziene textboxen de code toevoegen die je hebt geschreven.

#<a id="Specificaties"></a>2. Specificaties

Hier gaan we het hebben over de [MEAN-stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)) die we hebben gebruikt om het project te bouwen. We hebben gekozen om de MEAN stack te gebuiken omdat we hier nog niet zo veel over wisten en het dus een leuke uitdaging zou zijn voor ons. Een groot voordeel is ook dat dez enkel JavaScript als taal gebruikt dus moeten we niet met verschillende talen in één project zitten. We gaan de component hieronder uitleggen, en dan toelichten hoe wij deze hebben gebruikt in ons project.

##<a id="MongoDB"></a>2.1. MongoDB

Mongo DB wordt gebruikt voor het maken van databases. Het is niet de conventionele vorm die we altijd al kenden met tabellen. Het gebruikt documenten om de tabellen te beschrijven, met de veldnamen e.d. We gaan communiceren met MongoDB via Mongoose. dit maakt het mogelijk om via schema's onze database te beschrijven en dan moeten we ook niet met onze MongoDB bezig zijn want Mongoose regelt alles voor ons. De schema's van Mongoose zien er als volgt uit:

![Opdrachten schema](screenshots/OpdrachtenModel.png)

Je ziet hier dat er een nieuw Mongoose schema gemaakt wordt. Er moeten ook de velden gedefinieerd worden die in de database moeten zitten. Er zijn ook types aan de velden verbonden. Mongoose kent verschillende types waaronder een boolean, een string en een int maar ook `type: mongoose.Schema.Types.Objectid, ref: '<ander schema>'` dit zorgt ervoor dat je schema's aan elkaar kan linken. helemaal onderaan moet het schema ook een model naam krijgen zodat de connectie met de database gemaakt kan worden. via `mongoose.model('<naam>', <naam schema>` doe je dit.

##<a id="Express"></a>2.2. Express

Dit is een light weight web application framework dat wordt gebruikt door [NodeJS](#Node-JS). Je kan dit gebruiken voor single page, multi page en hybride web-applicaties. Het zorgt voor de MVC architectuur op de server zijde. Het is dus de backend van ons project. Express heeft een Express generator die ervoor zorgt dat het skelet van onze web applicatie gemaakt wordt, hierdoor hebben we een overzichtelijke mappen structuur en zijn de nodige bestanden voor ons aangemaakt en is er de nodige code om een Express webapplicatie te starten al aanwezig in de bestanden.

###<a id="Get"></a>2.2.1 Get request 
![GET request](screenshots/routerGet.png)

Als NodeJS een GET request op de URL `/lessons/:lesson` krijgt (waarvan :lesson een id is die meegegeven wordt in de URL) zal NodeJS de opdracht geven aan Mongoose om de nodige linken te leggen volgens de schema's en de juiste data door te geven via de functie `req.lesson.populate('opdrachten'`. vervolgens zal NodeJS de data naar de front-end sturen via de functie `req.json(lesson);`.

###<a id="Post"></a>2.2.2 Post Request
![POST request](screenshots/routerPost.png)

Als NodeJS een POST request krijgt op de URL `/lessons/:lessons/inleverenOpdrachten` (waarvan :lesson een id is die meegegeven wordt in de URL) dan zal deze Mongoose de opdracht geven de data in de database op te slaan en deze data ook te linken via de `exercise.save` function.

###<a id="Param"></a>2.2.3 Param
![Param](screenshots/routerParam.png)

Deze functie zorgt ervoor dat NodeJS de opdracht aan Mongoose geeft om een stukje van de data uit de database te halen voor URL's met :opdracht in, in dit geval. Dit zorgt ervoor dat NodeJS de hele URL en header niet moet gaan analyseren om de zeker nodige data uit de database te halen. Dit zorgt voor een tijdswinst omdat Mongoose al aan het werk gezet kan worden terwijl NodeJS de URL en header verder analyseert.

##<a id="AngularJS"></a>2.3. AngularJS

Angular gebruiken we als onze front-end. Dankzij de two-way databinding en de grote beschikbaarheid van verschillende libraries voor Angular zijn de mogelijkheden zeer groot voor onze website. Voor onze angularApp.js gebruiken we verschillende dingen. Deze worden hieronder allemaal uitgelegd.

###<a id="appConfig"></a>2.3.1 app.config

In de app.config gaan we het gedrag van onze website definiëren op verschillende routes. Deze routes zorgen ervoor dat onze website de juiste inhoud weergeeft.

####<a id="StateProvider"></a>2.3.1.1 $stateProvider
![Verschillende states](screenshots/Controllers.png)

In de $sateProvider gaan we de verschillende states defineren. Deze states zorgen ervoor dat als er naar een bepaalde URL gesurft wordt de juiste state geladen wordt en de pagina juist wordt weergegeven. Via de states kunnen we een controller definiëren die ervoor zorgt dat je een meer dynamische pagina kan maken. Via states kan je ook verschillende verschillende functies definiëren, die functies zorgen ervoor dat er bepaalde dingen uit de database gelande kunnen worden om te gebruiken in de controller of dat als je naar een bepaalde staat gaat er ingelogd moet zijn voor je ernaar toe kan gaan.
####<a id="UrlRouterProvider"></a>2.3.1.2 $urlRouterProvider
![OtherwiseState](screenshots/OtherwiseState.png)

De $urlRouterProvider zorgt ervoor dat als er geen enkele staat voor de URL gevonden kan worden er een bepaalde staat geladen wordt via `$urlRouterProvider.otherwise('/Home')` kan je definiëren dat als er geen overeenkomstige staat wordt gevonden er naar de Home staat verwezen wordt.
####<a id="AuthProvider"></a>2.3.1.3 authProvider
![authProvider](screenshots/AuthProvider.png)
 
Via de authProvider kan je via Angular de authenticatie regelen. Wij gebruiken enkel de `authProvider.init` functie om de authenticatie via [Auth0](#Auth0) te configureren.

####<a id="JwtInterceptorProvider"></a>2.3.1.4 jwtInterceptorProvider
![jwtInterceptorProvider](screenshots/jwtInterceptorProvider.png)

De jwtInterceptorProvider zorgt ervoor dat bij elke request de token wordt meegegeven zodat onze web applicatie deze kan nakijken.

####<a id="HttpProvider"></a>2.3.1.5 $httpProvider
![$httpProvider](screenshots/httpProvider.png)

Deze zorgt ervoor dat als je de url in de adresbalkvan je browser verander er wordt gekeken of je wel een token hebt.

###<a id="Controllers"></a>2.3.1 Controllers

Controllers worden gebruikt om data te verkrijgen, verwerken, tonen en door te sturen. Elke pagina die dit nodig heeft krijgt een controller. De controllers zorgen ervoor dat bepaalde code herbruikt kan worden of dat niet elke pagina de data hetzelfde moet verwerken of dezelfde data moet verkrijgen. 

![Controllers](screenshots/Controller.png)

####<a id="MainCtrl"></a>2.3.2.1 Main controller

Onze Main controller doet eigenlijk niets. Het is gewoon de standaard controller die we hadden meegegeven indien we wilde testen of we meer dynamische inhoud moesten hebben in bepaalde pagina's.

####<a id="LesCtrl"></a>2.3.2.2 Les controller

De Les controller wordt gebruikt door de admin om nieuwe lessen te maken of om lessen te bekijken die leerlingen al hebben gemaakt.

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


####<a id="OpdrachtIndienenCtrl"></a>2.3.2.5 Opdracht indienen Controller

<img src="screenshots/BekijkLes.png" width ="250"/>

Je kan selecteren of je de vraag al dan niet hebt opgelost, en indien wel, zal je als dit gevraagt wordt de code moeten copy-pasten om mee te uploaden naar de database.

####<a id="OpdrachtIngediendCtrl"></a>2.3.2.6 Opdracht ingediend Controller
![BekijkLes](screenshots/AdminBekijkLes.png)

Deze controller wordt gebruikt door de Admin om gemaakte lessen te kunnen bekijken. Als je de les selecteert kan je daarna zien welke leerlingen deze les gemaakt hebben.

<img src="screenshots/GemaakteLessenPerPersoon.png" width="350">

Als je een leerling selecteert kan je zien welke opdrachten van de les deze gemaakt heeft.

![Bekijk de ingediende les](screenshots/BekijkIngediendeLes.png)

####<a id="AuthCtrl"></a>2.3.2.7 Auth Controller

De controller die je kan gebruiken om in te loggen of uit te loggen. Via ng-show en ng-hide kunnen er de juiste links worden getoond en de knop inloggen of uitloggen.

<img src="screenshots/Login.png" width="250">

###<a id="Factories"></a>2.3.3 Factories

#Jente


###<a id="NG"></a>2.3.4 NG module
####<a id="show"></a>2.3.4.1 NG show
####<a id="hide"></a>2.3.4.2 NG hide
####<a id="repeat"></a>2.3.4.3 NG repeat

##<a id="Node-JS"></a>2.4. NodeJS

NodeJS is het platform waarmee we onze web-applicatie gaan draaien. In combinatie met een javascript engine, moet de browser zelf niets meer doen maar zal node de gehele applicatie gaan draaien

##<a id="Auth0"></a>2.4. Auth0

#Jente










