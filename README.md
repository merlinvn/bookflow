# BookFlow

A modern self-publishing platform built with Next.js and MDX that allows authors to host multiple books with a beautiful, responsive interface.

## Features

- 📚 Multiple books support
- 📖 MDX-powered content
- 🌓 Dark/Light mode
- 📱 Responsive design
- 🎨 Beautiful typography
- 🚀 Fast and SEO-friendly

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm 9.0.0 or later

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/bookflow.git
cd bookflow
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Development Guidelines

### Project Structure

```
bookflow/
├── .ai/              # AI-assisted development files
├── src/
│   ├── app/         # Next.js app router pages
│   ├── components/  # Reusable React components
│   └── styles/      # Global styles and theme
├── content/         # Book content (MDX files)
└── public/         # Static assets
```

### Code Style

- Use TypeScript for type safety
- Follow ESLint rules
- Use Prettier for code formatting
- Follow React best practices
- Use Tailwind CSS for styling

### Commit Guidelines

Follow conventional commits:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for styling changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests (when implemented)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
