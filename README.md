# Rick & Morty Collection 🧪🚀

An Angular application to browse, manage, and visualize Rick and Morty characters — with features like favoriting, creating, editing, deleting, and mapping character locations.

---

## Features

- ✅ View characters from the official [Rick & Morty API](https://rickandmortyapi.com/)
- 🌟 Mark characters as favorites and view them in a dedicated section
- 📝 Create, edit, and delete custom characters
- 🌍 Display characters' locations on an interactive Google Map
- 🌐 Multilingual support (English / Hebrew) with automatic RTL switching
- 📱 Fully responsive design for mobile and desktop
- 🔍 Filter and search characters
- 🧪 High test coverage with Jest (90%+)

---

## Project Structure

src/
├── app/
│ ├── components/
│ │ ├── character-card/ # Character cards
│ │ ├── character-collection/ # All characters view
│ │ ├── add-edit-character/ # Form for editing/creating characters
│ │ ├── favorites-characters/ # Favorites view
│ │ ├── map/ # Character location map
│ │ └── header/ # Top navigation header
│ ├── services/ # Data, store, and location services
│ ├── directives/ # Custom directives (e.g., clickOutside)
│ ├── models/ # Interfaces, enums, constants
│ ├── app.component.ts # Root component
│ └── app.routes.ts # Routing configuration

yaml
Copy
Edit


---

## Installation

```bash
git clone https://github.com/your-username/rick-morty-collection.git
cd rick-morty-collection
npm install
```

## Running Locally

```bash
Copy
Edit
```


## Running Tests
```bash
npm test
# or
nx test rick-morty-collection --coverage
```


## Available Scripts

| Command                           | Description                      |
| --------------------------------- | -------------------------------- |
| `npm run build`                   | Builds the project               |
| `npm run lint`                    | Runs linter                      |
| `npm run test`                    | Runs unit tests with Jest        |
| `nx run-many --target=test --all` | Runs all test targets in Nx apps |



## Main Dependencies

@angular/core (v17+)

@ngx-translate/core – for i18n

Google Maps JavaScript API – for location display

Jest – for testing



## Notes

No external UI libraries (e.g. Angular Material) were used.

Styling is handcrafted with SCSS for full customization.

On mobile, a responsive hamburger menu replaces the full nav.


## Credits

Rick & Morty API

Angular

Built with ❤️ for learning and showcasing component design



## Contact

For questions or contributions, feel free to reach out or open an issue.


