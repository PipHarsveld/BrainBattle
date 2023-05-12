# Brain Battle

Voor het vak Realtime Web hebben we met een groepje een basic Chatroom app gemaakt, genaamd SpeakEasy, die ik als basis ga gebruiken voor mijn individuele app.

Voor het individuele deel ga ik een Trivia app maken, waarbij je met meerdere mensen tegelijkertijd een quiz kunt doen. Ik ben nog niet echt begonnen aan deze trivia app, dus de live link gaat naar de SpeakEasy app.

BrainBattle is te spelen via [deze link](https://brainbattle.up.railway.app/)


<image src="https://github.com/PipHarsveld/BrainBattle/assets/54938035/4b56e488-0fab-42c8-912e-55bd1fea3c5b" height=500px>

## Table of Contents
* [Concept](#concept)
* [Features](#features)
* [API](#api)
* [Installeren](#installeren)
* [Data lifecycle](#data-lifecycle)
* [Realtime events](#realtime-events)
* [Rooms met socket.io](#rooms-met-socketio)
* [Coding style](#coding-style)
* [Wishlist](#wishlist)
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
- [X] Zie wanneer een een andere gebruiker aan het typen is


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

### UML data model
<img src="https://github.com/PipHarsveld/BrainBattle/assets/54938035/6bb3dfd9-67c8-4d35-b5d4-76201844cdd0" height=500px>


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
<image src="https://github.com/PipHarsveld/BrainBattle/assets/54938035/bfdd4dea-4fb0-4fa8-b343-c68a18a4519d" height=400px>


## Realtime events
<details>
<summary>Socket event: createRoom</summary>
Wanneer de gebruiker op de 'create room' knop klikt, wordt er een nieuwe room aangemaakt. Er wordt een random roomnumber gegenereed en samen met de gebruikersnaam wordt dit naar de client gestuurd. Aan de clientside wordt de gebruiker dan toegevoegd aan de room met het gegenereerde roomnumber.

Serverside:

```javascript
    if (button === "create-room-btn") {
        console.log('create-room-btn');
        // Emit the createRoom event to the server with the username
        socket.emit("createRoom", roomNumber, username);
    }
```

Clientside:

```javascript
    socket.on("createRoom", (room, username) => {
        const roomNumber = room;
        socket.join(roomNumber);
        console.log(socket.rooms);
        console.log(`Room ${roomNumber} created`);

        // Add the room to the activeRooms array
        activeRooms.push(roomNumber);
        console.log('activeRooms updated', activeRooms);

        // Emit the roomCreated event only to the socket that triggered the createRoom event
        socket.emit("roomCreated", roomNumber, username);
    });
```
</details>
<details>
<summary>Socket event: roomCreated</summary>
In de ```socket.on("createRoom")``` functie wordt de room aangemaakt en wordt de gebruiker toegevoegd aan de room. Vervolgens wordt de ```roomCreated``` event geëmit naar de client. De client wordt dan geredirect naar een /room pagina met een speciek roomnumber.

Serverside:

```javascript
    socket.on("createRoom", (room, username) => {
        const roomNumber = room;
        socket.join(roomNumber);
        console.log(socket.rooms);
        console.log(`Room ${roomNumber} created`);

        // Add the room to the activeRooms array
        activeRooms.push(roomNumber);
        console.log('activeRooms updated', activeRooms);

        // Emit the roomCreated event only to the socket that triggered the createRoom event
        socket.emit("roomCreated", roomNumber, username);
    });
```

Clientside:

```javascript
socket.on("roomCreated", (roomNumber, username) => {
    console.log(`Room ${roomNumber} created by ${username}`);
    window.location.href = `/room/${roomNumber}?username=${username}`;
});
```

</details>
<details>
<summary>Socket event: joinRoom</summary>
Zodra de gebruiker een bestaande room wil joinen, wordt hij doorgestuurd naar de /room pagina en wordt in de URL de username en roomnumber meegegeven. Vervolgens worden die gegevens op de clientside weer uit de URL opgehaald. Vervolgs wordt het ```joinRoom``` event geëmit naar de server. De server checkt of de room actief is en voegt de gebruiker toe aan de room of laat een error pagina zien. 

Serverside:

```javascript
socket.on("joinRoom", ({ username, roomNumber}) => {
        // Check if the room is active
        const socketRooms = socket.rooms;
        console.log('joinRoom', socketRooms);
        if (activeRooms.includes(roomNumber)) {
            console.log(`${username} joined room ${roomNumber}`);
            socket.join(`${roomNumber}`);
            socket.emit("roomJoined", { roomNumber, username });
        } else {
            console.log(`Room ${roomNumber} does not exist`);
            // Render the error page
            socket.emit("roomNotFound", { roomNumber, username });
        }
    });
```

Clientside:

```javascript
else if (button === "join-room-btn") {
        console.log('join-room-btn');

        const roomNumberInput = document.querySelector("#room-number");
        console.log(username + ' : ' + roomNumberInput);

        const roomNumber = roomNumberInput.value;
        console.log('roomnumber' + roomNumber);

        // Emit the joinRoom event to the server with the username and room number
        socket.emit("joinRoom", { roomNumber: roomNumber, username: username, res: null });
    }
```
</details>
<details>
  <summary>Socket event: roomJoined</summary>
Wanneer het ```joinRoom``` event succesvol is, wordt het ```roomJoined``` event geëmit naar de client. De client wordt dan geredirect naar een /room pagina met een speciek roomnumber.
  
Serverside:
    
```javascript
socket.on("joinRoom", ({ username, roomNumber}) => {
        // Check if the room is active
        const socketRooms = socket.rooms;
        console.log('joinRoom', socketRooms);
        if (activeRooms.includes(roomNumber)) {
            console.log(`${username} joined room ${roomNumber}`);
            socket.join(`${roomNumber}`);
            socket.emit("roomJoined", { roomNumber, username });
        } else {
            console.log(`Room ${roomNumber} does not exist`);
            // Render the error page
            socket.emit("roomNotFound", { roomNumber, username });
        }
    });
```


Clientside:

```javascript
// Listen for the roomJoined event from the server
socket.on("roomJoined", ({ roomNumber, username }) => {
    console.log(`${username} joined room ${roomNumber}`);
    window.location.href = `/room/${roomNumber}?username=${username}`;
});
```

</details>
<details>
  <summary>Socket event: roomNotFound</summary>
In het event ```joinRoom``` wordt gecheckt of het roomnummer wat de gebruiker heeft ingevuld op dit moment een actieve room is. Als dat niet het geval is, wordt het ```roomNotFound``` event geëmit naar de client. De client wordt dan geredirect naar de /error pagina, die de gebruiker erop wijst dat hij mogelijk een verkeerd roomnummer heeft ingevuld.

Serverside:

```javascript
socket.on("joinRoom", ({ username, roomNumber}) => {
        // Check if the room is active
        const socketRooms = socket.rooms;
        console.log('joinRoom', socketRooms);
        if (activeRooms.includes(roomNumber)) {
            console.log(`${username} joined room ${roomNumber}`);
            socket.join(`${roomNumber}`);
            socket.emit("roomJoined", { roomNumber, username });
        } else {
            console.log(`Room ${roomNumber} does not exist`);
            // Render the error page
            socket.emit("roomNotFound", { roomNumber, username });
        }
    });
```

Clientside:

```javascript
socket.on("roomNotFound", ({ roomNumber }) => {
    // Render the error page
    console.log(`Room ${roomNumber} does not exist`);
    window.location.href = `/error`;
});
```

</details>
<details>
  <summary>Socket event: rejoinRoom</summary>
Zodra de gebruiker wordt doorgestuurd naar de /room pagina, wordt de gebruiker uit de room gegooid. Om dit probleem op te lossen, wordt het ```rejoinRoom``` event geëmit naar de server. De server voegt de gebruiker weer toe aan de room.

Serverside:

```javascript
    socket.on("rejoinRoom", (roomNumber) => {
        console.log('rejoinRoom');
        socket.join(roomNumber);
        console.log(socket.rooms);
    });
```

Clientside:

```javascript
if (url.includes("room")) {
    console.log("chat page");

    let messages = document.querySelector('section ul');
    let inputText = document.querySelector('input#message');
    let send = document.querySelector('button#send');
    let typingState = document.querySelector('.room>section>p');

    // Read the username from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    const roomNumber = url.split('/').pop().split('?')[0];
    console.log(roomNumber);

    socket.emit("rejoinRoom", roomNumber, username);

    // Overige code
}
```

</details>
<details>
  <summary>Socket event: chat</summary>
Wanneer de gebruiker een bericht verstuurd, wordt het ```chat``` event geëmit naar de server. De server stuurt het bericht vervolgens door naar alle die zich in dezelfde room bevinden.

Serverside:

```javascript
socket.on('chat', (data) => {
        console.log(data);
        console.log(data.roomNumber)
        console.log(socket.rooms)
        io.to(data.roomNumber).emit("chat", data);
    });
```


Clientside:

```javascript
// send text
document.querySelector('form').addEventListener('submit', event => {
    event.preventDefault()
    let data = { name: username, message: inputText.value, roomNumber: roomNumber }
    socket.emit('chat', data);

    inputText.value = '';
});
```
</details>
<details>
  <summary>Socket event: typing</summary>
Wanneer de gebruiker aan het typen is, wordt het ```typing``` event geëmit naar de server. De server stuurt vervolgens een bericht naar alle gebruikers in dezelfde room, dat de gebruiker aan het typen is.

Clientside:

```javascript
    inputText.addEventListener('keypress', (username) => {
        socket.emit('typing', username)
    });
```	
</details>
<details>
  <summary>Socket event: sendCorrectAnswer</summary>
Wanneer de gebruiker een antwoord heeft gegeven op de eerste vraag, wordt het ```sendCorrectAnswer``` event geëmit naar de server. De server stuurt vervolgens het correcte antwoord terug naar de client, zoda er clientside gechecked kan worden of het gegeven antwoord correct is.

Serverside:

```javascript
 io.on('connection', (socket) => {
            socket.emit('sendCorrectAnswer', firstQuestionCorrectAnswer);

            socket.on('sendAnswers', (clickedAnswer, firstQuestionCorrectAnswer) => {
                // check if answer is correct
                if (clickedAnswer === firstQuestionCorrectAnswer) {
                    console.log('Correct answer');
                } else {
                    console.log('Wrong answer');
                }
            });
        });
```

Clientside:

```javascript
socket.on("sendCorrectAnswer", (firstQuestionCorrectAnswer) => {
    const buttonsContainer = document.querySelector(".quiz>section");

    buttonsContainer.addEventListener('click', (event) => {
        // Check if the clicked element is a button
        if (event.target.tagName === 'BUTTON') {
            // Handle the button click event here
            console.log('Button clicked:', event.target.textContent);
            const clickedAnswer = event.target.textContent;
            socket.emit("sendAnswers", clickedAnswer, firstQuestionCorrectAnswer);
        }
    });
})
```

</details>



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

Vervolgens wordt op de room pagina in de clientside javascript het roomnummer en de gebruikersnaam uit de URL gehaald en meegestuurd met een socket emit naar de server.

``` javascript
// Read the username an roomnumber from the URL
const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get('username');
const roomNumber = url.split('/').pop().split('?')[0];

socket.emit("rejoinRoom", roomNumber, username);
```

De server ontvangt dit en joint opnieuw de room met de juiste roomcode, om zo de gebruiker terug te brengen naar de room waar hij/zij in zat.
``` javascript
io.on('connection', (socket) => {
    socket.on("rejoinRoom", (roomNumber) => {
        console.log('rejoinRoom');
        socket.join(roomNumber);
        console.log(socket.rooms);
    });
});
```

Op deze manier komt de gebruiker weer terug in de room waar hij/zij in zat, zonder dat de gebruiker door heeft dat hij tijdelijk de room heeft verlaten. Dit is natuurlijk niet de meest nette manier om dit op te lossen, maar het werkt wel. Als ik meer tijd zou hebben, had ik mij hier mogelijk meer in kunnen verdiepen en een nettere oplossing kunnen vinden, maar ik ben enorm blij dat het op deze manier werkt.


## Coding style
Om ervoor te zorgen dat mijn code overzichtelijk en netjes is, hebben ik een aantal regels opgesteld. Deze regels zijn:

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
- Gebruik arrow functions

## Wishlist
Helaas waren mijn plannen groter en uitdagender dan ik van te voren had bedacht, waardoor ik niet de tijd heb gehad om alles op mijn wishlist uit te werken. Mocht ik in de toekomst nog gaan verderwerken aan dit project, dan zijn dit de dingen die ik nog graag zou willen toevoegen:

- [ ] Bij het aanmaken van een nieuwe room kan de gebruiker de onderwerpen en moeilijkheid van de vragen kiezen
- [ ] Meerdere rondes met triviavragen
- [ ] Het opslaan van de score van elke speler
- [ ] Na afloop van het spel een ranglijst op basis van de behaalde score
- [ ] Na afloop van het spel een chatfunctie om het spel te bespreken
- [ ] Mogelijkheid om een nieuw potje te starten

## Maker
Deze Chatroom app is gemaakt door:
[Pip Harsveld](https://github.com/PipHarsveld)


## License
Copyright © 2023 

Dit project is [MIT](https://github.com/Inevdhoven/chatroom/blob/main/LICENSE) licensed.
