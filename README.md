# Brain Battle

Voor het vak Realtime Web hebben we met een groepje een basic Chatroom app gemaakt, genaamd SpeakEasy, die ik als basis ga gebruiken voor mijn individuele app.

Voor het individuele deel ga ik een Trivia app maken, waarbij je met meerdere mensen tegelijkertijd een quiz kunt doen. Ik ben nog niet echt begonnen aan deze trivia app, dus de live link gaat naar de SpeakEasy app.

BrainBattle is te spelen via [deze link](https://brainbattle.up.railway.app/)

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

## Table of Contents
* [Concept](#concept)
* [Features](#features)
* [API](#api)
* [Schetsen](#schetsen)
* [Coding style](#coding-style)
* [Installeren](#installeren)
* [Maker](#maker)
* [License](#license)


## Concept
Ik wil een app maken waarbij vrienden tegen elkaar een spelletje trivia kunnen spelen. De gebruikers komen eerst in een verzamelruimte, waarbij vrienden het spel kunnen joinen. De gebruikers kunnen dan een nickname kiezen en zodra alle vrienden aanwezig zijn; een quiz starten. De quizvragen komen uit een tivia API, waarover ik [hier meer details](#api) over geschreven heb. De gebruikers zien vervolgens allemaal tegelijk de vraag en 4 antwoord opties, waarvan ze er een kunnen kiezen. Na een aantal seconden is de antwoordtijd voorbij en wordt er in de achtergrond van de app bekeken welke gebruiker het juiste antwoord had. Voor elk goed antwoord krijgt de gebruiker een punt, en zo wordt er een winnaar bepaald. Aan het einde van de quiz wordt er een scorebord getoond met de namen van de gebruikers en hun score, en kan er een nieuwe quiz gestart worden.

### Opties voor uitbereiden
Ik wil beginnen met een zo simpel mogelijke app die alleen de basis functionaliteiten heeft, aangezien ik dit al een hele uitdaging vind. Als ik meer tijd heb, heb ik wel al een aantal ideeën voor uitbreidingen:
- [X] Meerdere rooms die betreden kunnen worden door het invullen van een roomcode
- [ ] Naast het kiezen van een nickname, ook een profielfoto kunnen uploaden of kiezen uit een aantal aangeboden characters. Elk persoon zou ook een random character kunnen krijgen.
- [ ] Optie voor de gebruiker om een nieuwe room te maken met instellingen voor het aantal vragen, de categorie van de vragen en moeilijkheid van de vragen
- [ ] Verschillende punten toekennen op basis van de snelheid van het antwoord (eerste persoon krijgt 5 punten, tweede persoon krijgt 4 punten etc.)

### Benodigde schermen
- [X] Welkomsscherm waar je een nickname kan kiezen en een room kan aanmaken of een room kan joinen
- [X] Scherm van een specifieke room met een optie om te chatten
- [X] Scherm met een quizvraag en 4 antwoordopties
- [ ] Scherm met een scorebord en een optie om een nieuwe quiz te starten

### Feedback op concept van Justus
Begin klein, babysteps, en bereid het daarna uit. Er staat een goede tutorial over rooms op de socket.io website, kijk daar naar en begin met het maken van verschillende rooms. De moeilijkheid van dit concept zit hem in de rondes. Na het maken van de rooms kun je het beste aan de slag gaan met het uitwerken van één ronde, dus het genereren van een random vraag en deze sturen naar alle gebruikers. Voeg daarna een timer toe en zorg dat na die tijd gebruikers geen antwoord meer kunnen geven. Vervolgens kun je het antwoord controleren en de punten toekennen. Als dit allemaal werkend is, kun je gaan uitbreiden met meerdere rondes en een scorebord. 


## Features
- [X] Kies een nickname
- [X] Sla de nickname op
- [X] Genereer een random room
- [X] Join een room door middel van een roomnummer
- [X] Verstuur berichten binnen een room
- [X] Ontvang berichten van andere gebruikers in dezelfde room
- [ ] Zie wanneer een een andere gebruiker aan het typen is

## API
De quizvragen en antwoorden komen uit [deze trivia API](https://the-trivia-api.com/). The Trivia API is de grootste internet trivia API en bevat meer dan 9.777 goedgekeurde vragen, verdeeld over 10 categorieën. 

### Authentication
Deze API is te gebruiken zonder API key, wat het makkelijker maakt voor anderen om ook aan deze app te gaan werken. 

### Rate Limiting
De API heeft een rate limit van 5 requests per seconde voor elk IP-adres, dit is dus voldoende voor mijn app.

### Endpoints
De trivia API heeft twee endpoints:
- GET /v1/categories: Geeft een lijst met beschikbare categorieën van trivia vragen. Je kunt deze endpoint gebruiken om een lijst met categorieën en hun bijbehorende IDs te krijgen, waarmee je vervolgens vragen uit specifieke categorieën kunt ophalen.
- GET /v1/questions: Geeft een willekeurige trivia vraag uit de database. Je kunt optionele query parameters opgeven voor de categorie en moeilijkheidsgraad van de vraag. Als je geen parameters opgeeft, geeft de endpoint een willekeurige vraag uit elke categorie en moeilijkheidsgraad.

Voor mijn app ga ik gebruik maken van de GET /v1/questions endpoint, omdat ik dan een willekeurige vraag kan ophalen uit elke categorie en moeilijkheidsgraad.

### Response format
De API geeft JSON data terug met daarin de vraag, het antwoord, de categorie en de moeilijkheidsgraad van de vraag. Om het aantal gekregen vragen te beïvloeden kun je de query parameter `limit` gebruiken. De default waarde is 10, maar je kunt ook een waarde tussen 1 en 100 opgeven.

```
https://the-trivia-api.com/v1/questions?limit=20
```

### Voorbeeld API request
API request om willekeurige trivia vragen op te halen:
```
https://the-trivia-api.com/v2/questions
```

API request om trivia vragen op te halen in de categorie science en met de moeilijkheidsgraad medium:

```
https://the-trivia-api.com/v1/questions?category=science&difficulty=medium
```


## Schetsen


### Uiteindelijke ontwerp


## Installeren
Om aan deze app te werken, moet je deze repository clonen. Je kunt dit doen door het volgende commando in je terminal te typen:

```
git clone 
```

Na het clonen van de repo, moet je de dependencies installeren. Dit kun je doen door het volgende commando in je terminal te typen:

```
npm install
```

Zodra de dependencies zijn geïnstalleerd, kan je naar de projectmap gaan met dit commando:

```
cd chatroom
```

Vervolgens kun je de app starten met dit commando:

```
npm run start
```

Yes, je bent nu helemaal klaar! Ga naar `http://localhost:4200/` en have fun met BrainBattle!


## Data lifecycle
<!-- This would be a good place for your data life cycle ♻️-->


<!-- ## Coding style
Om ervoor te zorgen dat onze code overzichtelijk en netjes is, hebben we een aantal regels opgesteld. Deze regels zijn:

**Html**

- Schrijf semantische HTML en gebruik niet onnodige `<div>`'s
- Schrijf comments waar nodig om de code te verduidelijken
- Gebruik regelmatig formatters om de code op te schonen

**CSS**

- Maak gebruik van CSS variabelen
- Groepeer CSS met comments, alles van hetzelfde onderdeel bij elkaar
- Gebruik relatieve eenheden voor afmetingen (Rem, em, %, etc.)

**Javascript**

- Gebruik camelCase voor variabelen
- Gebruik const en let in plaats van var
- Schrijf comments waar nodig om de code te verduidelijken
- Gebruik arrow functions -->

## Rooms met socket.io
Ik ben enorm veel tijd bezig geweest met het werkend krijgen van de verschillende rooms, wat nog vrij veel voeten in de aarde had. Bij het doorsturen van de gebruiker naar een nieuwe pagina, werd het roomnummer niet onthouden en de gebruiker uit de room gegooid. Samen met Shyanta heb ik een tijdje gekeken hoe we dit konden oplossen, maar helaas was het niet gelukt. Shyanta gaf toen als tip dat ik de rooms beter even links kan laten liggen, ondanks dat ik heel dichtbij was, en te gaan focussen op de API. Eigenwijs als ik ben, kon ik het niet laten rusten en heb ik toch een oplossing gevonden. Ik zie zelf ook in dat dit niet de meest nette manier is om te werken met rooms, maar zonder database en met de kennis die ik nu heb zag ik geen andere manier om in dezelfde room te blijven. Ik heb dit nu als volgt opgelost:

Zodra de gebruiker een nieuwe room aanmaakt of een room joined, wordt de gebruiker doorgestuurd naar een nieuwe pagina en wordt het roomnummer meegestuurd in de URL.

``` javascript
socket.on("roomCreated", (roomNumber, username) => {
    console.log(`Room ${roomNumber} created by ${username}`);
    window.location.href = `/room/${roomNumber}?username=${username}`;
});

// Listen for the roomJoined event from the server
socket.on("roomJoined", ({ roomNumber, username }) => {
    console.log(`${username} joined room ${roomNumber}`);
    window.location.href = `/room/${roomNumber}?username=${username}`;
});
```



## Wishlist
Helaas waren mijn plannen groter en uitdagender dan ik van te voren had bedacht, waardoor ik niet de tijd heb gehad om alles op mijn wishlist uit te werken. Mocht ik in de toekomst nog gaan verderwerken aan dit project, dan zijn dit de dingen die ik nog graag zou willen toevoegen:

- [ ] Bij het aanmaken van een nieuwe room kan de gebruiker de onderwerpen en moeilijkheid van de vragen kiezen
- [ ] Meerdere rondes met triviavragen
- [ ] Het opslaan van de score van elke speler
- [ ] Na afloop van het spel een ranglijst op basis van de behaalde score
- [ ] Na afloop van het spel een chatfunctie om het spel te bespreken
- [ ] Mogelijkheid om een nieuw potje te starten


## Reflectie
Ik ben erg trots op het eindresultaat, maar ben ook zeker kritisch op mijn eigen werk. 


## Maker
Deze Chatroom app is gemaakt door:
[Pip Harsveld](https://github.com/PipHarsveld)


## License
Copyright © 2023 

Dit project is [MIT](https://github.com/Inevdhoven/chatroom/blob/main/LICENSE) licensed.
