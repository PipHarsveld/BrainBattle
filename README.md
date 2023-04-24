# Brain Battle

Voor het vak Realtime Web hebben we met een groepje een basic Chatroom app gemaakt, genaamd SpeakEasy, die ik als basis ga gebruiken voor mijn individuele app.

Voor het individuele deel ga ik een Trivia app maken, waarbij je met meerdere mensen tegelijkertijd een quiz kunt doen. Ik ben nog niet echt begonnen aan deze trivia app, dus de live link gaat naar de SpeakEasy app.



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
Ik wil een app maken waarbij vrienden tegen elkaar een spelletje trivia kunnen spelen. De gebruikers komen eerst in een verzamelruimte, waarbij vrienden het spel kunnen joinen.De gebruikers kunnen dan een nickname kiezen en zodra alle vrienden aanwezig zijn; een quiz starten. De quizvragen komen uit een tivia API, waarover ik [hier meer details](#api) over geschreven heb. De gebruikers zien vervolgens allemaal tegelijk de vraag en 4 antwoord opties, waarvan ze er een kunnen kiezen. Na een aantal seconden is de antwoordtijd voorbij en wordt er in de achtergrond van de app bekeken welke gebruiker het juiste antwoord had. Voor elk goed antwoord krijgt de gebruiker een punt, en zo wordt er een winnaar bepaald. Aan het einde van de quiz wordt er een scorebord getoond met de namen van de gebruikers en hun score, en kan er een nieuwe quiz gestart worden.

### Opties voor uitbereiden
Ik wil beginnen met een zo simpel mogelijke app die alleen de basis functionaliteiten heeft, aangezien ik dit al een hele uitdaging vind. Als ik meer tijd heb, heb ik wel al een aantal ideeën voor uitbreidingen:
- [ ] Meerdere rooms die betreden kunnen worden door het invullen van een roomcode
- [ ] Naast het kiezen van een nickname, ook een profielfoto kunnen uploaden of kiezen uit een aantal aangeboden characters. Elk persoon zou ook een random character kunnen krijgen.
- [ ] Optie voor de gebruiker om een nieuwe room te maken met instellingen voor het aantal vragen, de categorie van de vragen en moeilijkheid van de vragen
- [ ] Verschillende punten toekennen op basis van de snelheid van het antwoord (eerste persoon krijgt 5 punten, tweede persoon krijgt 4 punten etc.)

### Benodigde schermen
- [ ] Welkomsscherm waar je een nickname kan kiezen
- [ ] Scherm met een overzicht van alle aanwezige gebruikers en een optie om te chatten
- [ ] Scherm met een quizvraag en 4 antwoordopties
- [ ] Scherm met het goede antwoord
- [ ] Scherm met een scorebord en een optie om een nieuwe quiz te starten


## Features
- [ ] Kies een nickname
- [ ] Sla de nickname op
- [ ] Verstuur berichten
- [ ] Ontvang berichten van andere gebruikers
- [ ] Zie wanneer een een andere gebruiker aan het typen is



## API
De quizvragen en antwoorden komen uit [deze trivia API](https://the-trivia-api.com/). The Trivia API is de grootste internet trivia API en bevat meer dan 9.777 goedgekeurde vragen, verdeeld over 10 categorieën. Deze API is te gebruiken zonder API key, wat het makkelijker maakt voor anderen om ook aan deze app te gaan werken.



## Schetsen


### Uiteindelijke ontwerp


## Coding style
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
- Gebruik arrow functions


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

Yes, je bent nu helemaal klaar! Ga naar `http://localhost:4200/` en geniet van SpeakEasy!







## Maker
Deze Chatroom app is gemaakt door:
[Pip Harsveld](https://github.com/PipHarsveld)


## License
Copyright © 2023 

Dit project is [MIT](https://github.com/Inevdhoven/chatroom/blob/main/LICENSE) licensed.



<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- ☝️ replace this description with a description of your own work -->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- What external data source is featured in your project and what are its properties 🌠 -->

<!-- This would be a good place for your data life cycle ♻️-->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- How about a license here? 📜  -->
