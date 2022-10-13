---
layout: post
title: Cypress fonctionel
date: 2021-12-10 09:43 +0100
---

Cypress est une solution que j'ai usé lors d'un développement sur une application Rails. Bien que dubitatif sur l'usage de ce framework pour test d'integration (e2e), les developpements effectués ont permis de lever les doutes.

Au sein de ce post je vais faire un exposé bref de l'approche de cypress usée sur le projet. 

Pour exemple nous userons d'une TodoList. Notre application permet la gestion des tâches. Par exemple: "Nettoyer le grenier - A faire pour le 15 avril 2022". Cette tâche comporte un titre et une description.

Après installation de cypress et des dépendences associées nous procédons à l'écriture des tests.

```javascript

describe('Gestion Todolist', ()=>{

        it("cree une todo", ()=>{
            cy.visit('/todos/new')
            cy.get('#todo_titre').type("Nettoyer le grenier")
            cy.get('#todo_description').type("A faire pour le 15 avril 2021")
            cy.get('.actions > input').click()
            cy.get('#notice').should('have.text', "Todo was successfully created.")
        })

    
        it("edite une todo", ()=>{
            cy.visit('/todos/1/edit')
            cy.get('#todo_titre').type("Nettoyer le grenier fissa")
            cy.get('#todo_description').type("A faire pour le 15 avril 2021 - les balais sont aux sous-sol")
            cy.get('.actions > input').click()
            cy.get('#notice').should('have.text', "Todo was successfully updated.")
            
        })

        it("supprime une todo", ()=>{
            cy.visit('/todos')
            cy.get('body > table > tbody > tr:nth-child(1) > td:nth-child(8) > a').click()
            cy.get('#notice').should('have.text', "Todo was successfully destroyed.")
        })

})

```

L'exemple ci-desssus est éloquent. Il s'agit de la creation, mise à jour et suppression d'une todo. 

L'écriture de ce test suit les instructions de la documentation cypress. 

Le premier point a observer est que l'écriture de tests est impérative (effectuer étape1 puis étape2 ...).
Le second point concerne la gestion des assertions. Les assertions réussissent ou échouent en fonction de la présence d'un d'une notice indiquant le statut de l'opération.


Les points négatifs de cette approche:

* Abstraction manquante sur les sujets de test. Nous restons trop dans l'informatique pour un test d'intégration. Sans la présence du "it" nous ne pouvons pas deviner d'un coup d'oeil le contexte du test. Il s'agit de rendre la maintenance du code de test plus facile pour le futur.
* L'impérativité du code empêche une souplesse. Des actions distinctes telles que la création et la destruction d'une tache ont des propriétés similaires.

Afin de contrebalancer ces aspects négatifs, j'ai pensé de la manière suivante:

> "L'utilisateur n'est qu'un objet, les actions d'un utilisateur sur une interface logicielle ne sont que des fonctions".

Cette approche n'est pas nouvelle. J'use du paradigme fonctionnel de javascript pour créer des fonctions "helpers" (visitePage, cliqueBouton...) et des fonctions "utilisateurs" (visitePageTodos, cliqueBoutonCreerTodos ...). Je crée un objet utilisateur et j'opère par l'usage d'outils qui vont me servir de raccourcis pour Cypress (map, et K).

Nous arrivons à ce résultat

```javascript
const K = a => b => a

const visitePage = lien => c =>
    K(c)(c.visit(lien))

const entrerTexteChamp = selector => texteAentrer => c =>
    K(c)(c.get(selector).type(texteAentrer))


const cliquerBouton = selector => c =>
    K(c)(c.get(selector).click())

const assurerNoticePresente = message => c => 
    K(c)(c.get('#notice').should('have.text', message))

const Utilisateur = {
  visitPageListeTodos: visitePage('/todos'),
  visitPageCreerNouvelleTodo: visitePage('/todos/new'),
  entrerTitre: entrerTexteChamp('#todo_titre'),
  editerUneTodo: visitePage('/todos/1/edit'),
  entrerDescription: entrerTexteChamp('#todo_description'),
  clickSurBoutonSuppressionTodo: cliquerBouton('body > table > tbody > tr:nth-child(1) > td:nth-child(8) > a'),
  cliqueBoutonConfirmationTodo: cliquerBouton('.actions > input'),
  sassurerCreationTodo: assurerNoticePresente("Todo was successfully created."),
  sassurerModificationTodo: assurerNoticePresente("Todo was successfully updated."),
  sassurerDestructionTodo: assurerNoticePresente("Todo was successfully destroyed.") 
}


describe('Gestion Todolist', ()=>{

        it("cree une todo", ()=>{

            [cy].map(Utilisateur.visitPageCreerNouvelleTodo)
                .map(Utilisateur.entrerTitre('Nettoyer le grenier'))
                .map(Utilisateur.entrerDescription('A faire pour le 15 avril 2021'))
                .map(Utilisateur.cliqueBoutonConfirmationTodo)
                .map(Utilisateur.sassurerCreationTodo)
            
        })

    
       it("edite une todo", ()=>{
            [cy].map(Utilisateur.editerUneTodo)
                .map(Utilisateur.entrerTitre('Nettoyer le grenier - fissa'))
                .map(Utilisateur.entrerDescription('A faire pour le 15 avril 2021 - les balais sont aux sous-sol'))
                .map(Utilisateur.cliqueBoutonConfirmationTodo)
                .map(Utilisateur.sassurerModificationTodo)
        })

        it("supprime une todo", ()=>{
            [cy].map(Utilisateur.visitPageListeTodos)
                .map(Utilisateur.clickSurBoutonSuppressionTodo)
                .map(Utilisateur.sassurerDestructionTodo)
        })

})

```

Je règle par ce code précédent plusieurs problèmes:
* Le manque d'abstraction. On est sur un code de test d'intégration qui décrit ces actions. On a une meilleure compréhension du contexte.
* La répétivité de certaines actions est refactorisé sur une seule fonction ex: visiterPage.
* Souplesse du code sur l'usage. Les messages de confirmations peuvent être facilement changés.

Le point bonus de cette approche est la possibilité de génerer plus facilement une documentation pour des usages futurs.

A plus
