---
layout: page
title: Posts
permalink: /posts/
---

<ul class="post-list">
  {% for post in site.posts %}
    <li>
        <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

