---
layout: post
title:  "Fizzbuzz"
date:   2014-11-16 19:41:18 +0100
categories: jekyll update
---


### Long code

Récemment j'ai fait quelques katas en ruby, javascript et python sur le site Codewars.
J'ai essayé durant ces exercices de résoudre quelques katas avec une ligne de code.
Exemple Fizzbuzz:

{% highlight ruby %}
def fizzbuzz(n)
  return (1..n).map{ |num| (num % 3 == 0 && num % 5 == 0 ? "FizzBuzz" :(num % 5 == 0 ? "Buzz" :(num % 3 == 0 ? "Fizz" : num) ) ) }
end
{% endhighlight ruby %}

Assez marrant mais surement non utilisable en production. Je continue d'apprendre.
