---
layout: post
title: Cypress fonctionel
date: 2021-12-10 09:43 +0100
---

Cypress est une solution que j'ai usé lors d'un développement sur une application Rails. Bien que dubitatif sur l'usage de ce framework pour test d'integration (e2e), les developpements effectués ont permis de lever les doutes.

Au sein de ce post je vais faire un exposé bref de l'approche de cypress et de l'écriture de tests usée sur ce projet. 

L'application qui va nous servir d'exemple est une simple Todolist. Notre application permet la création d'une tache à finir pour une date donnée. Par exemple: "Nettoyer le grenier pour le 15 avril 2022 - A faire".

Après installation de la gem cypress-on-rails et des dépendences associées nous procédons à l'écriture des tests.

```javascript

describe('Gestion Todolist', ()=>{

        // before - initialisation du contexte avant chaque test

        it("cree une todo", ()=>{
            cy.visit('/todos')
            cy.get('#todo_new').click()
            cy.get('#todo_titre').type("Nouvelle todo")
            cy.get('#todo_description').type("Todo de test et description")
            cy.get('#todo_submit').click()
            cy.get('#flash_success').should('have.text', "Todo cree")
        })

        it("edite une todo", ()=>{
            cy.visit('/todos')
            cy.get('#todo_id_1').click()
            cy.get('#todo_titre').type("Todo Modifie")
            cy.get('#todo_description').type("Todo de test et description modifiee")
            cy.get('#todo_submit').click()
            cy.get('#flash_success').should('have.text', "Todo edite")
            
        })

        it("supprime une todo", ()=>{
            cy.visit('/todos')
            cy.get('#todo_id_1_suppr').click()
            cy.get('#flash_success').should('have.text', "Todo supprimee")
        })
})

```

L'exemple ci-desssus est éloquent. Il s'agit de la creation, mise à jour et suppression d'une todo. 
Le premier point a observer est que l'écriture de tests est impérative (effectuer étape1 puis étape2 ...).
Les assertions de réussite du test s'effectue par la présence ou non d'éléments.

L'écriture de ce test suit les recommendations mis en tutoriel de cypress. 

Les points négatifs de cette approche:

* Abstraction manquante sur les sujets de test. Nous restons trop dans l'informatique pour un test d'intégration. Sans la présence du "it" nous ne pouvons pas deviner d'un coup d'oeil. Il s'agit de rendre la maintenance du code de test plus facile pour le futur. Plusieurs contexte sont manquants tels que les éléments composant une tache.
* L'impérativité du code empêche une souplesse. Des actions distinctes tels que la création et la destruction d'une tache ont des propriétés similaires.
* Avoir une souplesse sur la manipulation des éléments du DOM ou de la page. Nous répétons du code pour la visite de la page principale ou sur l'entrée d'informations dans les tags inputs de la page.

Afin de contrebalancer ces aspects négatifs, j'ai procédé à une approche fonctionnelle. L'idée fut la suivante: "les actions d'un utilisateur sur une interface logicielles ne sont que des fonctions". Un objet Todo servira à contextualiser les actions utilisateurs doit être présent et des fonctions raccourcis sur Cypress éviteront la répétition de code.

J'use de la capacité de javascript à posséder un paradigme fonctionnel pour créer des fonctions "utilisateurs" telles que visitePageTodos, cliqueBoutonCreerTodos ...
J'opère par l'usage d'outils qui vont me servir de raccourcis pour Cypress (map,composition, Monads ...).
Je procède par la création d'un objet Todo qui va me servir de contexte et permettre l'ecriture des elements de DOM associés à des actions diverses. Cet objet Todo me sert de "données" pour mes "fonctions utilisateurs".

Nous arrivons à ce résultat

Raccourcis Cypress
```javascript
// RaccourcisCypress.js

const id = x => x

const visitePage = lien => c =>
    c.visit(lien)

const entrerTexteChamp = selector => texteAentrer => c =>
    c.get(selector).type(texteAentrer)

const cliquerBouton = selector => c =>
    c.get(selector).click()

module.exports({ 
  cliquerBouton: cliquerBouton,
  entrerTexteChamp: entrerTexteChamp,
  visitePage: visitePage
})

```


```javascript
// Todo object pour le contexte
import { visit, visitPage, entrerTexteChamp, cliquerBouton } from './RaccourcisCypress.js'

let page_principale = '/todos'
const Todo = {
  visitPagePrincipale: visit(page_principale),
  entrerTitre: entrerTexteChamp('#texte_val'),
  cliqueBoutonCreerTodo: cliqueBouton('#validerTodo')
}

module.exports({ 
  Todo: Todo
})
```

Le test refactoré.

```javascript
let TodoGestion = import *

describe('Gestion Todolist', ()=>{

        it("cree une todo", ()=>{
            [cy].map(TodoGestion.visitePageTodos)
                .map(TodoGestion.cliqueBoutonCreerTodos)
                .map(TodoGestion.entrerTitre("Nouvelle Todo"))
                .map(TodoGestion.entrerDescription("Nouvelle description"))
                .map(TodoGestion.entrerBoutonConfirmation)
                .map(TodoGestion.assertPresenceMessageConfirmation("Création Todo"))
        })

        it("edite une todo", ()=>{
            [cy].map(TodoGestion.visitePageTodos)
                .map(TodoGestion.editeTodo)
                .map(TodoGestion.entreTitreModifie("Todo modifié"))
                .map(TodoGestion.entreDescriptionModifie("Todo Description modifié"))
                .map(TodoGestion.cliquePourEnregistrement)
                .map(TodoGestion.assertPresenceMessageConfirmationEditionTodo("Edition Todo"))
            
        })

        it("supprime une todo", ()=>{
            [cy].map(TodoGestion.visitePageTodos)
                .map(TodoGestion.cliqueBoutonSupprimer)
                .map(TodoGestion.assertPresenceMessageConfirmationSuppressionTodo("Suppression Todo"))
        })
})

```

Je règle par le code précédent plusieurs problèmes:
* Le manque d'abstraction. On est sur un code de test d'intégration qui décrit ces actions.
* La répétivité de certaines actions est refactorisé sur une seule fonction ex: visiterPageTodos  
* Souplesse du code sur l'usage.


Est ce de l'over-engineering pour une Todo ? Oui ; mais non dans le cadre de plusieurs modèle ou on a besoin de:
- Comprendre le contexte
- Réutiliser les tests associées au contexte 

Le point bonus de cette approche est la possibilité de génerer une documentation par l'usage d'un monad Reader. Ainsi selon la présence d'une variable d'environnement dans le cypress.json je peux générer de la documentation.

```
// Exemple a mettre avec de la génération de documentation
```

A plus
