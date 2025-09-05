# COVID-19 Stats Dashboard

> A modern Vue 3 application for tracking global COVID-19 statistics

This project has been fully modernized to use Vue 3, Vite, and the latest web technologies.

## Features

- 📊 **Global Statistics**: View worldwide COVID-19 data
- 🌍 **Countries Data**: Browse statistics by country with search functionality
- 🇺🇸 **US States**: Detailed breakdown of US state data
- 📈 **Historical Data**: Timeline view of COVID-19 progression
- 🎨 **Modern UI**: Dark theme with Bootstrap 5
- ⚡ **Fast Performance**: Built with Vite for lightning-fast development
- 🧪 **Testing**: Comprehensive test suite with Vitest

## Technology Stack

- **Vue 3**: Latest Vue.js with Composition API
- **Vite**: Next-generation frontend build tool
- **Pinia**: Modern state management for Vue
- **Bootstrap 5**: Modern CSS framework
- **Vitest**: Fast unit testing framework
- **ESLint + Prettier**: Code quality and formatting

## Setup & Development

### Prerequisites

- Node.js 20.x or higher
- npm 10.x or higher

### Installation

```bash
# Install dependencies
npm install

# Start development server at localhost:8080
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development Commands

```bash
# Run tests
npm run test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Lint and format code
npm run lint

# Type checking (if using TypeScript)
npm run type-check
```

## API Data Sources

This application uses the [disease.sh API](https://disease.sh/) for COVID-19 data:

- Global statistics: `https://disease.sh/v3/covid-19/all`
- Countries data: `https://disease.sh/v3/covid-19/countries`
- US states data: `https://disease.sh/v3/covid-19/states`
- Historical data: `https://disease.sh/v3/covid-19/historical`

## Project Structure

```
src/
├── components/          # Vue components
│   ├── Home.vue        # Global stats
│   ├── Countries.vue   # Countries data
│   ├── States.vue      # US states data
│   └── Historical.vue  # Historical timeline
├── router/             # Vue Router configuration
├── stores/             # Pinia stores
├── test/               # Test files and setup
└── main.js            # Application entry point
```

## Migration Notes

This project has been migrated from:
- Vue 2 → Vue 3 (Composition API)
- Webpack → Vite
- Vuex → Pinia
- Bootstrap Vue → Bootstrap 5
- Jest/Nightwatch → Vitest
- Node.js 6+ → Node.js 20+

## Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests: `npm run test`
4. Lint your code: `npm run lint`
5. Commit your changes
6. Push to the branch
7. Create a Pull Request

## Links

- [Live Website](http://covid.casjay.coffee/)
- [Backend API](https://github.com/now-sh/covid-19-api)

## License

GNU General Public License v3.0
