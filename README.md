# Personenregister Word Parser

## Installation

### Node JS
"Latest" Version von Node hier (https://nodejs.org/en/)[https://nodejs.org/en/] herunterladen und installieren.

### Quelltext runterladen und entpacken
Unter "Code" mit dem Grünen Butten "Code" klicken und den Quelltext als ZIP herunterladen und an einen beliebigen Ort entpacken.

### Pakete installieren
Im Ordner mit dem entpackten Quelltext eine Kommandozeile öffnen (im Windows Explorer auf den Pfad clicken, "cmd" eingeben und "Enter" klicken) und dann folgenden Befehl ausführen:

```
npm install
```

Kommandozeile **nicht** schließen, diese wird zum Ausführen benötigt (erneutes ```npm install``` ist bei neuer Ausführung nicht nötig).

## Konfiguration

In der "config.js" im entpackten Quelltext die zeile ```export const inputFolder = '.';``` so ändern, dass statt ```.``` dort ```Pfad/zu/den/docx/``` steht (egal ob "\" oder "/"). Wichtig: Dieser Pfad muss ein Ordner sein!

## Ausführen

Nun in der Kommandozeile von eben folgenden Befehl ausführen:

```
npm start
```

Danach sollte im Ordner des Quelltextes eine "personen.xml" erscheinen. Diese enthält das Ergebnis.