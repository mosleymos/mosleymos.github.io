---
layout: post
title: Cypress fonctionel
date: 2021-12-10 09:43 +0100
---

Cypress est une solution usé lors d'un développement sur une application Rails. Bien que dubitatif sur l'usage de ce framework pour test d'integration (e2e), les developpements effectués ont permis de lever les doutes.

Au sein de ce post je vais faire une introduction rapide de cypress et de l'approche de test usée.

L'application de base est une Todolist avec un schema simple pour ce qui est de la Todo

* titre: string
* description: text 
* effectue: boolean 
* echeance: datetime 

Après installation de la gem cypress-on-rails et des dépendences associées nous procédons à l'écriture des tests. Le code est le suivant:

Nous avons le contexte Gestion Todolist et les cas de tests associés. Chaque cas de test indique la marche à suivre dans le cadre de ce test e2e.

```javascript

describe('Gestion Todolist', ()=>{

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

Le test est simple il s'agit de la creation, mise à jour et suppression d'une todo. C'est une écriture de code qui suit les recommendations cypress. 

Lors du travail sur notre application, plusieurs points négatifs sont apparus.

- L'impérativité du code 
    - Nous sommes dans un cas d'usage, la description des utilisateur est plutôt je crée une todo, alors j'entre et non cy.click('#element_precis').type(texte). Il s'agit de rendre le cas d'usage plus naturel pour la maintenance.
    - Cette impérativité du code n'inclue pas les variations , la manipulation des date est à ce titre un exemple. Si nous ajoutons une validation au niveau du modèle pour empêcher la creation d'une date d'échéance dans le passé, il faut que notre code soit souple.
    - Abstraction manquante de quoi on parle ? Nous restons trop dans l'informatique pour un test d'intégration.
- La répétivité du code
    - La réutilisation du code est absente, il s'agit littéralement de copier le code ou de ne pas l'utiliser 
    - Des fonctionnalités sont similaires s'assurer de la création et de la destruction, n'est pas une action distincte mais similaire.
    - Si base de donnée normalisée alors présence dans un autre modèle de champs titre, description  - peut t'on ne pas user des éléments de Todo pour le nouveau modèle

En abordant une base fonctionnelle on arrive sur un code plus simple

```javascript

const visitPageTodos = c => {
    c.visit('/todos')
    return c
}
const cliqueBoutonCreerTodos = c =>{
    c.get('#todo_new').click()
    return c
}

const entrerTitre = todo_titre => c => {
    c.get('#todo_titre').type(todo_titre)
    return c
}

const entrerDescription = todo_description => c => {
    c.get('#todo_description').type(todo_description)
    return c
}

const cliquerBoutonConfirmation = c => {
    c.get('#todo_submit').click()
    return c
}

const assertPresenceMessageConfirmation = message_confirmation => c => {
    c.get('#flash_success').should('have.text', message_confirmation)
    return c
}

const editeTodo = c =>{
    c.get('#todo_id_1').click()
    return c
}

describe('Gestion Todolist', ()=>{

        it("cree une todo", ()=>{
            [cy].map(visitePageTodos)
                .map(cliqueBoutonCreerTodos)
                .map(entrerTitre("Nouvelle Todo"))
                .map(entrerDescription("Nouvelle description"))
                .map(entrerBoutonConfirmation)
                .map(assertPresenceMessageConfirmation("Création Todo"))
        })

        it("edite une todo", ()=>{
            [cy].map(visitePageTodos)
                .map(editeTodo)
                .map(entreTitreModifie("Todo modifié"))
                .map(entreDescriptionModifie("Todo Description modifié"))
                .map(cliquePourEnregistrement)
                .map(assertPresenceMessageConfirmationEditionTodo("Edition Todo"))
            
        })

        it("supprime une todo", ()=>{
            [cy].map(visitePageTodos)
                .map(cliqueBoutonSupprimer)
                .map(assertPresenceMessageConfirmationSuppressionTodo("Suppression Todo"))
        })
})

```

On est sur meilleure approche. Les avantages sont présents sous la forme:
- Fonctions qui décrivent l'action utilisateur et non l'impérativité des actions utilisateurs.
- Fonctions qui permettent une variation des cas  


Est ce de l'over-engineering pour une Todo ; Oui mais non dans le cadre de plusieurs modèle ou on a besoin de:
- Comprendre le contexte
- Réutiliser les tests associées au contexte 

Passage du code pour fonctionnel

```javascript

const id = x => x

const visitePage = lien => c =>
    c.visit(lien)

const entrerTexteChamp = selector => texteAentrer => c =>
    c.get(selector).type(texteAentrer)

const cliquerBouton = selector => c =>
    c.get(selector).click()


const assertionMessage = c => 
const executerSuite = fns => c => 
    [...fns, id].map(fn=>fn(c))

const visitPageTodos = c => 
    executerSuite(visit('/todos')) 

const cliqueBoutonCreerTodos = c =>
    executerSuite(cliquerBouton('#todo_new'))

const entrerTitre = todo_titre => c => 
    executerSuite(entrerTexteChamp('#todo_titre', todo_titre))

const entrerDescription = todo_description => c => 
    executerSuite(entrerTexteChamp('#todo_description', todo_description))

const cliquerBoutonConfirmation = c => 
    executerSuite(cliquerBouton('#todo_submit'))

const assertPresenceMessageConfirmation = message_confirmation => c => {
    c.get('#flash_success').should('have.text', message_confirmation)
    return c
}

const editeTodo = c =>{
    c.get('#todo_id_1').click()
    return c
}

describe('Gestion Todolist', ()=>{

        it("cree une todo", ()=>{
            [cy].map(visitePageTodos)
                .map(cliqueBoutonCreerTodos)
                .map(entrerTitre("Nouvelle Todo"))
                .map(entrerDescription("Nouvelle description"))
                .map(entrerBoutonConfirmation)
                .map(assertPresenceMessageConfirmation("Création Todo"))
        })

        it("edite une todo", ()=>{
            [cy].map(visitePageTodos)
                .map(editeTodo)
                .map(entreTitreModifie("Todo modifié"))
                .map(entreDescriptionModifie("Todo Description modifié"))
                .map(cliquePourEnregistrement)
                .map(assertPresenceMessageConfirmationEditionTodo("Edition Todo"))
            
        })

        it("supprime une todo", ()=>{
            [cy].map(visitePageTodos)
                .map(cliqueBoutonSupprimer)
                .map(assertPresenceMessageConfirmationSuppressionTodo("Suppression Todo"))
        })
})

```

La dernière approche est de procéder l'usage d'un objet page qui aura la responsabilité de regrouper les fonctionnalité de la page

```javascript
// ActionUtilisateur.js

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
// TodoPage.js
import { visit, cliquerBouton }  from './ActionUtilisateur'

export {
    pagePrincipale: visit('/todos')
    cliquerBoutonCreerTodo: cliquerBouton('#todo_new')
}
```

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

```
