---
layout: post
title:  "Turing wrap up: I did the thing"
date:   2021-05-05 8:00:00 -0700
category: turing
---

During the first quarter of the backend engineering program at Turing School, one of my instructors, Mike Dao, often ended a project evaluation with a simple, positive refrain: "You did the thing."

As I progressed through the program, I came to appreciate this saying more and more. Getting a script or app to work is no small feat. It's one thing to pursue perfectly optimized functions, but I've learned that iteration is a key aspect of software development.

### Make it work

It's easy to look at the ~1500 hours of work I did during my time at Turing and feel like I "did the thing" _a lot_. 

When I review code from my early days of the program, I see opportunities to make it more efficient, and easier for other developers to read. But I never gave up on a feature; I always got the thing to work. I struggled—at times unproductively—but I followed project requirements, instructor feedback, and user stories, and I got the job done.

### Make it right

I have the most learning still to do in the intermediate realm of programming. I'd describe myself as an advanced beginner at this point, with my future areas of focus determined by personal interest and professional necessity.

I'm currently revisiting Ruby fundamentals and exploring more advanced Rails features while I job hunt, like optimization. I'm planning to further explore background jobs with Sidekiq and update apps from Rails 5.2 to 6.1 to better understand how the framework has evolved.

### Make it fast

During my capstone project at Turing, my team was a combined frontend and backend team. I was responsible for building out our backend database and implemented GraphQL for the first time. Once I had the basic CRUD functionality down for our minimum viable app, I began digging into what GraphQL was doing under the hood.

I realized that our relational queries were causing an unmanaged N+1 query problem, and I implemented the graphql-batch Ruby gem to batch `has_many` and `belongs_to` relationships and reduce our initial page-load query's response time by 30%.

I enjoyed this benchmarking and problem solving challenge, and I'm looking forward to more research and learnings in how to design data-intensive applications at scales I haven't encountered yet.
