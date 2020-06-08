---
layout: page
permalink: /posts/
---

<h2>Posts</h2>

<div class="post-content">

  <ul class="post-list">
    {% for post in site.posts %}
      <li>
          <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
</div>
