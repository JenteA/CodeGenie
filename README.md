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
##<a id="Node-JS"></a>2.4. Node JS
##<a id="Auth0"></a>2.4. Auth0










