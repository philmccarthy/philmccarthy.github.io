---
layout: post
title:  "Midway through Turing's backend program"
date:   2021-03-15 12:45:00 -0700
category: turing
---

I'm two-thirds of the way through [Turing's](https://turing.edu) backend engineering program, and woo, I built some exciting stuff.

Before Mod 3 (the third quarter of Turing's 4-Mod program), I hadn't consumed or built an API. Six weeks later, I've learned to use Faraday to power my program's consumption of external applications and data. I've also built Rails API-only backends with databases, and exposed tons of RESTful and non-RESTful endpoints and written documentation.

Here are the projects I worked on during Mod 3:

### Whether Sweater?

[GitHub Repo](https://github.com/philmccarthy/whether_sweater)

Whether Sweater? is a Rails API built to JSON:API specifications. The API serves up endpoints that consume and aggregate information from MapQuest, OpenWeather and Pexels Image Search APIs.

Things I practiced in this project:

- How to expose an API that aggregates data from multiple external APIs
- How to expose an API that requires an authentication token
- How to expose an API for CRUD functionality
- Determined completion criteria based on the needs of other developers from specs
- Researched & selected an API based on your needs as a developer


### Chess Quest

[GitHub Repos](https://github.com/chessquest)

Thunderdome meets Hearthstone Arena meets Chess...it's CHESS QUEST! Online chess, except you play your next game with just the pieces you last won with. How far will your quest take you?

Built with a 7-person team, this project was a massive learning opportunity in planning and design. The team spent several days upfront planning our Minimum Viable Product and reassessing our plans before we dove into code.

Chess Quest also taught me important lessons about Service Oriented Architecture. My team built the following system of apps, including a full-stat Rails app, backend API, and a Sinatra microservice:

![Chess Quest system architecture](https://raw.githubusercontent.com/chessquest/chess-quest/main/app/assets/images/architecture.jpg)

### Rails Engine

[GitHub Repo](https://github.com/philmccarthy/rails-api)

This Rails-backed JSON API was built in 6 days. I was given a Postgres dump to build a database, and then exposed 15 endpoints through a TDD workflow. One cool aspect of this project was using a Postman test suite to ensure the API endpoints were fully functional, accounting for extensive sad path and edge cases.

Areas of exploration and learning on this project included:

- Expose an API
- Use serializers to format JSON responses
- Test API exposure with RSpec and Postman
- Compose advanced ActiveRecord queries to analyze information stored in PostgreSQL database
- Write SQL statements without the assistance of an ORM
- Implement json:api standards
- Add custom error responses for invalid API requests

### Viewing Party

[GitHub Repo](https://github.com/philmccarthy/viewing_party)

Viewing party is an application in which users can explore movie options and create a viewing party event for the user and friend's. This one week project is a collaboration with two cohortmates. We developed using TDD and consumed data from The Movie DB API.

### On to Mod 4

I'm excited to start my final 6-week quarter after a 1-week intermission. Mod 4 will combine the backend cohort with the frontend cohort, so I'm stoked to get some exposure to the JavaScript chops my counterparts have been refining. We're sure to build some cool things together!
