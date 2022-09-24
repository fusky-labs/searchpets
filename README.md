<h1 align="center">
  <img width="110" alt="searchpets-peanut-transparent" src="https://user-images.githubusercontent.com/94678583/170873665-9d07cb32-abb9-45b6-8aea-8e361da84bd7.png">
  <br>
  <em>Searchpets!</em>
</h1>
<p align="center">
  <img src="https://user-images.githubusercontent.com/94678583/192121601-8083d9a5-a607-4201-8db1-d15369e240b7.png" alt="Searchpets Dev Demo">
</p>
<p align="center">
  <img src="https://img.shields.io/github/license/OpenFurs/searchpets?style=flat" alt="GPL 2.0 License" />
  <img src="https://img.shields.io/github/issues/OpenFurs/searchpets?style=flat" alt="Searchpets' open issues" />
  <img src="https://img.shields.io/github/last-commit/OpenFurs/searchpets" />
  <img src="https://img.shields.io/website?label=searchpets.xyz&up_message=up%20and%20running%21&url=https%3A%2F%2Fsearchpets.xyz%2F" />
  <img src="https://img.shields.io/github/contributors/OpenFurs/searchpets" />
</p>
<p align="center">
<em>Searchpets!</em> is comic search engine for searching characters, texts from comics, and chapter arcs from the entire <em>Housepets!</em> catalog! Written in Python and TypeScript - it was taken inspiration from this <a href="https://www.housepetscomic.com/forums/viewtopic.php?f=13&t=5434&p=938783&hilit=search+engine#p938783">forum post</a>.
</p>


## 🏗️ Infrastructure/Tech Stack

The website is written in Next.js with TypeScript; with Tailwind CSS, and the database
and search functionality is powered by Redis. While the back-end is written in Python
to update latest comics from the [official website](https://www.housepetscomic.com).

Searchpets! is hosted from Linode and Netlify and delivered through the
interwebs with CloudFlare.

## 🚀 Running the app locally

### 📚 Prerequisites

- Node.js 14 or higher (LTS recommended)
- Python 3.9 or higher
- Git Bash or WSL (for Windows only, required to execute Bash scripts)
- Yarn (npm can still be used but we strongly recommend using
  yarn!)

### 💿 Installation

The installation was complicated and will be automated via Bash script.
To install all the required Node and Python libraries, execute the `setup.sh`
file.

```console
sh scripts/setup.sh
```

Once all the libraries have been installed, it will execute `gen.py` to
generate a JSON file containing Housepets! data. (This will take a while!)

Once it's finished, simply run `yarn dev` or `npm run dev` to
concurrently start both Node and Python servers.

## ⚠️ Disclaimer

_Searchpets!_ is an open source fan project. SP does not own any of the
contents used on this website and has no direct affiliation with the entire
_Housepets!_ web comic or all of Rick Griffin's intellectual property.

## ⚖️ License

GPL-2.0
