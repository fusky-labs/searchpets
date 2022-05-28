<h1 align="center">Searchpets</h1>

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

## Installation

- Fork or clone the repo locally
- cd into the `app` folder and install with npm or yarn

```sh
# cd into the 'app' folder
cd app

# Install with npm
npm i

# or yarn
yarn
```

- Go back to root project directory and cd into the `server` folder and
install all the Python libraries and generate the database locally from
your computer

```sh
# cd into the 'server' folder
cd server

# Install required Python libraries
pip install -r requirements.txt

# Run update.py to generate Housepets database
python update.py
```

- Go back to root project directory once again and run both servers with
`npm run dev` or `yarn dev`

```sh
# Go back to project root
cd ..

# Run local dev server with npm
npm run dev

# or yarn
yarn dev
```

## Disclaimer

The use of third-party content is heavily transformative, and therefore, subject
of Fair Use. _Housepets!_ and its story and characters is a trademark of Rick Griffin.

## License

GPT-2.0
