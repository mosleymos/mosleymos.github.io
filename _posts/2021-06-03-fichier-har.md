---
layout: post
title: Fichiers Har
date: 2021-06-03 09:43 +0100
---

Les fichiers HAR sont une mine d'informations. Ils sont utiles pour developpement,  debug et test.

Ce sont des cassettes utiles.
J'ai procédé souvent à l'envoi de ces cassettes à des personnes en production. On arrive à trouver un language commun sur des erreurs qui peuvent avoir sur la transmission http.

Le lien sur la [documentation chrome](https://developer.chrome.com/docs/devtools/network/reference/#save-as-har)

Pour générer la cassette sous chrome 

* Ouvrir les outils de développements Chrome et/ou Firefox
* Naviguer sur votre site
* Au sein du panneau Network > Cliquer sur le bouton Export HAR. Un fichier sera à enregistrer au sein de votre ordinateur.


La visualisation de ces cassettes peut s'effectuer par des outils tiers tels que [Harviewer](https://github.com/janodvarko/harviewer)

A plus.
