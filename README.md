# Local Lens
Originally developed during the **11th National ICT Fest 2024 OpenAPI Hackathon**, winning the 1st Runner Up position.

## Overview

The main purpose of this app is to aid the user in discovering interesting places such as restaurants, schools, hospitals in a city. The user can chose to share their location and their city will be automatically detected. User can view the places in a map and also look at environmental conditions such temperature, humidity, air quality of the city. If a particular place is unlisted then the user can add this place and it will be synced with the data source. And the user can get an AI generated tour plan for a particular city.

## Map view

Places are categorized as education(schools), catering(restaurants), healthcare etc. The user can view places belonging to selected set of categories in a map. There is a convenient search bar that can be used to focus on the searched place.

https://github.com/renzhamin/local-attractions-finder/assets/57265942/b0316b8e-7aa6-4327-98f2-19ef5856f6f3

## Place listing

Instead of viewing in a map, the user can see a list of places in the city with detailed information such as postcode, address line. Some weather information of the city will also be shown.

https://github.com/renzhamin/local-attractions-finder/assets/57265942/33ff3f99-7e26-4eb6-85de-5288bdbc274e

## Tour planning

This is the high level overview of the tour planning mechanism.

1. The user will first select a city and then chose a tour nature such as a family or solo tour and the transportation system such as driving, bus, train etc.
2. Some local attraction points, restaurants, hotels nearby will be fetched using geoapify api.
3. The those places will be provided to an generative ai model which will output a tour plan.

https://github.com/renzhamin/local-lens/assets/57265942/0b0e767f-886d-4291-a708-e363c8c726de

## Add a new local attraction

The user can submit a place that is unlisted. That place will be added to a private database. When places are fetched, entries from the private database will be combined with data obtained from geoapify.

https://github.com/renzhamin/local-attractions-finder/assets/57265942/b174e7d4-2fba-4134-8067-94e29b11d3e2

## Development Setup

Install packages with,

```sh
bun install
```

populate `.env` as specified in `.env.example`

### Setup Database

1. Start the postgres container. Make sure to populate `.dockerenv`.

   ```sh
   bun db:start
   ```

2. Push schema changes to database.

   ```sh
   bun db:migrate:deploy
   ```

3. Generate prisma definitions.

   ```sh
   bun db:generate
   ```
