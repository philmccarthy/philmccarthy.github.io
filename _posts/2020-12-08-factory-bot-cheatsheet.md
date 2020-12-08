---
layout: post
title:  "Expanding on FactoryBot"
date:   2020-12-8 8:03:00 -0700
categories: turing, rails
---
[FactoryBot](https://github.com/thoughtbot/factory_bot) is an excellent tool to create objects for seeding and testing in Rails. According to thoughtbot (the creators of FactoryBot):

> "factory_bot is a fixtures replacement with a straightforward definition syntax, support for multiple build strategies (saved instances, unsaved instances, attribute hashes, and stubbed objects), and support for multiple factories for the same class (user, admin_user, and so on), including factory inheritance."

### Setup

First, ensure the `gem 'factory_bot_rails'` is in your Gemfile.

Next, `mkdir spec/support` and `touch spec/support/factory_bot.rb`.

Inside of that file, add:

```ruby
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

This allows you to use FactoryBot methods like #create in your RSpec files without explicitly declaring FactoryBot before it. Instead of FactoryBot.create, you can just call create on its own.

The following line should currently be commented out in rails_helper.rb. Find it and uncomment it. This line will allow us to require all ruby files that we put inside of the spec/support directory.

```ruby
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
```

Factories are automatically loaded if they are in the following directories:

Per thoughtbot, the creators of FactoryBot, [their preference is](https://thoughtbot.com/upcase/videos/factory-bot) to use a single `factories.rb` file. At the scale of Turing projects, this approach makes sense to me!

So, run `touch /spec/factories/factories.rb`.

### Usage

In this file, define your Factories like so:

```ruby
FactoryBot.define do
  factory :artist do
    name { "Imagine Dragons" }
  end
end

FactoryBot.define do
  factory :song do
    sequence(:title) {|n| "Title #{n}" }
    sequence(:length) {|n| n*10 }
    play_count { 0 }
    artist
  end
end
```

That's it for now! As I explore FactoryBot in projects, I may drop some more examples below.
