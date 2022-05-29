<h1 align="center">Searchpets</h1>

![](https://img.shields.io/github/license/OpenFurs/searchpets?style=flat)
![](https://img.shields.io/github/issues/OpenFurs/searchpets?style=flat)
![](https://img.shields.io/github/commit-activity/w/OpenFurs/searchpets?style=flat)

Searchpets is an open source search engine to find characters and texts from comics (coming soon) from _Housepets!_ written in Next.js with TypeScript, Tailwind, and Flask.

This project was taken inspiration from this [forum post](https://www.housepetscomic.com/forums/viewtopic.php?f=13&t=5434&p=938783&hilit=search+engine#p938783).

<p align="center">
  <img src="https://user-images.githubusercontent.com/94678583/163629497-9f5c4921-5a39-4dfe-8729-e56705efb2f7.gif" alt="Searchpets Dev Demo">
</p>

## Project structure

- `app` - The Next.js app, bootstrapped with Tailwind CSS and Sass
- `server` - The Python backend, mostly responsible with auto-updaters and stuff
- `scripts` - For bulk install Pyhton and Node packages and for code formatting
and linting across Python and JavaScript codebases

## Running the app locally

### Prerequisites

- Node.js 12 or higher (LTS recommended)
- Python 3.9 or higher
- Git Bash or WSL (for Windows only, required to execute Bash scripts)
- Yarn Package Manager (npm can still be used but we strongly recommend using
- yarn!)

### Installation

The installation was complicated and will be automated via Bash script.
To install all the required Node and Python libraries, execute the `setup.sh`
file.

```console
sh setup.sh
```

Once all the libraries have been installed, it will execute `gen.py` to
generate a JSON file containing Housepets! data.

Once it's finished, simply run `yarn dev` or `npm run dev` to
concurrently start both Node and Python servers. Press `Ctrl+C` twice
to exit both running servers.

## Disclaimer

The use of third-party content is heavily transformative, and therefore, subject
of Fair Use. _Housepets!_ and its story and characters is a trademark of Rick Griffin.

## License

GPT-2.0
