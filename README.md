[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

</br>
<p align="center">
	<img src="./public/logo-readme.png" alt="Erin's Eats Logo"/> </br>
	<a href="https://erins-eats.herokuapp.com/">View Deployed Site</a>
</p>
</br>


Erin's Eats is a restaurant finder that allows users to filter restaurants by state, genre, or keyword. The application consumes an API to retrieve a list of restaurants and displays them on a table, 10 at a time, sorted alphabetically by name. The next version of this application will allow users to view the restaurants' website, business hours, address, and appropriate attire for dining in.

## Technologies Used

- [TypeScript](https://www.typescriptlang.org/docs/)
- [React hooks](https://reactjs.org/docs/hooks-intro.html)
- [SCSS](https://sass-lang.com/documentation)
- Deployed with Heroku

## Install/Setup Instructions

Prerequisites: [Node](https://nodejs.org/en/download/)

- Clone the repo using `git clone` in your terminal
- `cd` into the directory
- Run `npm install` to install the required dependencies
- Run `npm start` to view the application in your browser. If the browser does not open automatically, navigate to `http://localhost:3000/`.

## Next Steps

View the [open issues](https://github.com/ErinUntermeyer/erins-eats/issues) for a list of next steps and known issues.

## Wins

- The filter and search functions work smoothly in conjunction with one another, regardless of the page the user is currently on.
- A conditions value was used in state to allow for many conditions to be checked against an array of data without complicated `if else` statements.

## Challenges

- Building a table that was dynamic enough to take in any data object and only display the headers that I wanted. Instead, the table was built for the specific data I needed to display.

## Acknowledgements

- [FlatIcon](https://www.flaticon.com/home)

[contributors-shield]: https://img.shields.io/github/contributors/ErinUntermeyer/erins-eats.svg?style=flat-square
[contributors-url]: https://github.com/ErinUntermeyer/erins-eats/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ErinUntermeyer/erins-eats.svg?style=flat-square
[forks-url]: https://github.com/ErinUntermeyer/erins-eats/network/members
[stars-shield]: https://img.shields.io/github/stars/ErinUntermeyer/erins-eats.svg?style=flat-square
[stars-url]: https://github.com/ErinUntermeyer/erins-eats/stargazers
[issues-shield]: https://img.shields.io/github/issues/ErinUntermeyer/erins-eats.svg?style=flat-square
[issues-url]: https://github.com/ErinUntermeyer/erins-eats/issues