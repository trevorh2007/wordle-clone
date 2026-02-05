# Wordle Clone

A modern Wordle clone built with React, Vite, and styled-components.

##### By Trevor Howard

## 🚀 Features

- Modern React 19 with Vite for fast development
- Styled-components for styling
- TypeScript support
- Comprehensive testing with Jest
- ESLint and Prettier for code quality
- Automated deployment to GitHub Pages

## 📦 Tech Stack

- **React 19** - UI library
- **Vite** - Build tool and dev server
- **Styled Components** - CSS-in-JS styling
- **Jest** - Testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 🛠️ Development

### Prerequisites

- Node.js >= 20.0.0
- npm >= 10.0.0

### Installation

```bash
npm install
```

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type check
npm run type-check

# Validate all (type-check + lint + test + build)
npm run validate

# Deploy to GitHub Pages
npm run deploy
```

## 📝 Project Structure

```
wordle-clone/
├── config/              # Configuration files
│   ├── jest/           # Jest configuration
│   ├── eslint.config.js
│   └── prettier.config.js
├── public/             # Static assets
├── src/
│   ├── components/     # React components
│   ├── __tests__/      # Test files
│   ├── App.js
│   └── index.js
├── .github/
│   └── workflows/      # GitHub Actions
└── vite.config.js      # Vite configuration
```

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup GitHub Pages

1. Go to your repository settings
2. Navigate to **Pages** → **Build and deployment**
3. Set **Source** to "GitHub Actions"
4. Push to main branch to trigger deployment

Your site will be available at: `https://trevorh2007.github.io/wordle-clone/`

## 📄 License

MIT

## 👤 Author

**Trevor Howard**
- GitHub: [@trevorh2007](https://github.com/trevorh2007)
