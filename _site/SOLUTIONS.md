SOLUTIONS - NOTES
=====

Nb suppression des infos a garder sur le rss

```

    <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

```

NB - reflechir aux inclusions hopwork ou non


```
    {% include header.html %}

        {{ content }}

    {% include footer.html %}
    {% include analytics.html %}
    {% include hopwork.html %}

```
Ajout pour xml

```
  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>

```

SVG inline twitter
[gist ](https://gist.github.com/mbostock/3094619)

Good codepen about social media svg
[codepen](https://codepen.io/ruandre/pen/howFi)
