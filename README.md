<h1 align="center">
  <img width="110" alt="searchpets-peanut-transparent" src="https://user-images.githubusercontent.com/94678583/170873665-9d07cb32-abb9-45b6-8aea-8e361da84bd7.png">
  <br>
  <em>Searchpets!</em>
</h1>
<p align="center">
  <img src="https://user-images.githubusercontent.com/94678583/192121601-8083d9a5-a607-4201-8db1-d15369e240b7.png" alt="Searchpets Dev Demo">
</p>
<p align="center">
  <img src="https://img.shields.io/github/license/foosky-labs/searchpets?style=flat" alt="GPL 2.0 License" />
  <img src="https://img.shields.io/github/issues/foosky-labs/searchpets?style=flat" alt="Searchpets' open issues" />
  <img src="https://img.shields.io/github/last-commit/foosky-labs/searchpets" />
  <img src="https://img.shields.io/github/contributors/foosky-labs/searchpets" />
</p>
<p align="center">
<em>Searchpets!</em> is comic search engine for querying characters, texts from comics, and chapter arcs from the entire <em>Housepets!</em> catalog! Written in Python and TypeScript - it was taken inspiration from this <a href="https://www.housepetscomic.com/forums/viewtopic.php?f=13&t=5434&p=938783&hilit=search+engine#p938783">forum post</a>.
</p>

## Infrastructure

The website is written in Next.js, and the database
and search functionality is powered by Redis. While the back-end is written in Python
to update latest comics from the [official website](https://www.housepetscomic.com).
Searchpets! is hosted from Linode and Netlify and delivered through the
interwebs with Cloudflare.

## Running the app locally

### Prerequisites

- Node.js 20 or higher (LTS recommended)
- Python 3.10 or higher
- Yarn (npm can still be used but we strongly recommend using
  yarn!)

## Disclaimer

_Searchpets!_ is an open source fan project. SP does not own any of the
contents used on this website and has no direct affiliation with the entire
_Housepets!_ web comic or all of Rick Griffin's intellectual property.

## License

GPL-2.0
