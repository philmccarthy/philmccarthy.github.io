---
layout: post
title:  "Rails project setup cheatsheet"
date:   2020-12-08 7:30:00 -0700
categories: turing, rails
---
One small piece of [Turing's](https://turing.io/) backend mod 2 program is engraining the setup of a Rails project. This cheatsheet is a helpful reference for Gems, config files, migrations, and more.

My awesome classmates have contributed tons of resources like the one below. Primary credit to [Ely Hess](https://www.linkedin.com/in/ely-hess-766716141/) for first compiling this rails setup cheatsheet.

## Create project file in specific Rails version

`rails _5.2.4.3_ new music -T --database=postgresql --skip-spring --skip-turbolinks`

- -T - rails has minitest by default, when this flag is used, gem 'minitest' will not be in the Gemfile
- --database=postgresql - by default, Rails uses sqlite3. We want to tell it to use postgresql instead because platforms we use for deploying our projects will expect to use a PostgreSQL database.
- --skip-spring - Spring is a Rails application preloader. It speeds up development by keeping your application running in the background so you don’t need to boot it every time you run a test, rake task or migration but it benefits more advanced developers the most. We are going to not include it in our Gemfile.
- --skip-turbolinks - Enables faster page loading by using AJAX call behind the scenes but has some nasty/subtle edge cases where your app will not work as expected. For those reasons, we don’t enable it by default.

## Gems - add to Gemfile under development: :test

```ruby
gem 'rspec-rails'
gem 'capybara'
gem 'launchy'
gem 'simplecov'
gem 'pry'
gem 'shoulda-matchers'
gem 'factory_bot_rails'
gem 'nyan-cat-formatter' # Optional CLI colorful craziness
```

Then run `bundle install` in terminal to ensure our new gems are installed.

## Configure RSpec

`rails g rspec:install`

## Add SimpleCov

(goes at top of rails_helper.rb)
require 'simplecov'
SimpleCov.start

## Add Shoulda Matchers to rails_helper.rb

(inside the RSpec block)

```ruby
Shoulda::Matchers.configure do |config|
  config.integrate do |with|
    with.test_framework :rspec
    with.library :rails
  end
end
```

## Create databases

`db:create` creates the database

`db:drop` deletes the database

`db:migrate` runs (single) migrations that have not run yet.

`db:schema:load` creates tables and columns within the (existing) database following schema.rb

`db:seed` only runs the db/seed.rb file

`db:setup` does db:create, db:schema:load, db:seed

`db:reset` does db:drop, db:setup

`db:migrate:reset` does db:drop, db:create, db:migrate

source: [BKSpurgeon & moritz at SO](https://stackoverflow.com/a/10302357/14060786)

## Drop, create & migrate (last resort)

Only do this if a setup step was missed or messed up. We prefer to fix forward with migrations if the project is already off the ground.

`rake db:drop`
`rake db:create`
`rake db:migrate`

## Add tables to DB

`rails g migration CreateThemeParks name:string city:integer open:boolean`
`rails g migration CreateRides name:string max_occupants:integer`
`rails db:migrate`

## Go back in time

`rake db:rollback STEP=1 - rolls back one migration.`

## Connect table's primary key to foreign key

`rails g migration AddThemeParkToRides band:references`
`rails g migration AddResortToVacationers venue:references`
`rails db:migrate`

## Using FactoryBot

Confirm `gem 'factory_bot_rails'` is in your Gemfile.

`mkdir spec/support` and `touch spec/support/factory_bot.rb`.

Inside of that file, add:

```ruby
RSpec.configure do |config|
  config.include FactoryBot::Syntax::Methods
end
```

In `rails_helper.rb` uncomment this line:

```ruby
Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }
```

Create a single factories file: `touch /spec/factories/factories.rb`.

In this file, define your Factories like so:

```ruby
FactoryBot.define do
  factory :artist do
    name { "Imagine Dragons" }
  end

  factory :user, class: User do
    sequence(:email) { |n| "user_#{n}@gmail.com" }
    sequence(:password) { "password" }
    sequence(:name) { |n| "User Name #{n}" }
    role { 0 }
    active { true }
  end
end
```