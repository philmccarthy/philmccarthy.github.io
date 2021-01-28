---
layout: post
title:  "Rails params Magic"
date:   2021-01-28 2:00:00 -0700
categories: turing, rails
---

How does Rails build a `params` object?

There are two kinds of parameters: `query string params` and `POST data`. In a URL, everything after the `?` is a query param. And `POST data`, like it sounds, usually comes from an HTML form that a user has filled out within the web app. It can only be sent with an HTTP `POST` request, hence the name. Rails doesn't make any distinctions of one param type over the other within the `request.parameters` hash.

However, path parameters will override a query parameter if they have matching keys (i.e. `:id`). 

#### Confirming a case of `params` override

In this example project, I'm starting from the show page for an application to adopt pets. The application has a 'search for pets' form, which submits a GET request to the `applications_controller` with params[:search] and redirects to the same show page with matching pets.

In my view, here's the form where I added an arbitrary `:id` query parameter:

```rb
  <%= form_tag(application_path(@application.id), method: :get) do %>
    <%= text_field_tag :search, params[:search] %></br>
    <%= text_field_tag :id %>
    <%= submit_tag 'Search', id: 'search-pets-button' %></br></br>
  <% end %>
```

And here's the `applications_controller#show` action with a pry so I can see what's happening in params:

```rb
  def show
    require 'pry'; binding.pry
    @application = Application.find(params[:id])
    if params[:search]
      @match_pets = Pet.search_by_name(params[:search])
    end
  end
```

I navigated to the application show page for application with an id of 3 — `/applications/3/` — and submitted the search form with `7` in the `:id` field.

In pry:

```sh
  pry(#<ApplicationsController>)> request.parameters
  => {"utf8"=>"✓", "search"=>"e", "id"=>"3", "commit"=>"Search", "controller"=>"applications", "action"=>"show"}
```

Alright! At the highest level, `params[:id]` isn't overriden by the arbitrary `?id=7` query param. Nice. But does it still exist somewhere in params?

```sh
  pry(#<ApplicationsController>)> request.query_parameters
  => {"utf8"=>"✓", "search"=>"e", "id"=>"7", "commit"=>"Search"}
```

Aha! There it is...`id: 7` is buried away in the request's query_parameters. 

So, an `ActionController::Parameters` object is produced from merging multiple sources of parameters? It seems so!

```sh
  pry(#<ApplicationsController>)> request.path_parameters
  => {:controller=>"applications", :action=>"show", :id=>"3"}
```

Yep, there's the source of truth for `params[:id]`, which is pulled from the dynamic placeholder in the URI `/applications/:id/`.

I haven't dug into the construction chain for `params` enough to be completely certain about its complexities, but I was able to confirm that `:id` in `path_parameters` overrides a matching `:id` from `query_parameters`.
