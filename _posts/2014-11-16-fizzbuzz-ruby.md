---
layout: post
title:  "Fizzbuzz"
date:   2014-11-16 19:41:18 +0100
categories: jekyll update
---
### Long code

Recently I make some katas in ruby, javascript and python with the site Codewars
I try during these exercices to solve the problem with one line of code.

{% highlight ruby %}
def fizzbuzz(n)
  return (1..n).map{ |num| (num % 3 == 0 && num % 5 == 0 ? "FizzBuzz" :(num % 5 == 0 ? "Buzz" :(num % 3 == 0 ? "Fizz" : num) ) ) } 
end
{% endhighlight ruby %}

Quite funny but not usable in my state of knowledge but I'll continue to learn.
