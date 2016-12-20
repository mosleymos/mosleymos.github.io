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
