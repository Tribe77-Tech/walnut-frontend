# Walnut Health

Walnut Health is a modern patient management system for healthcare providers. This application provides an intuitive interface for managing patient information, communications, and medical records.

![Walnut Health Screenshot](./public/screenshot.png)

## Features

- **Patient Registry**: Manage and view patient information with a responsive interface
- **Chat System**: Communicate with patients through a secure messaging system
- **Dashboard**: Get an overview of patient statistics and recent activities
- **Mobile Responsive**: Fully functional on both desktop and mobile devices

## Tech Stack

- **Framework**: Vue 3 with TypeScript
- **UI Components**: Shadcn/Vue, Radix Vue
- **Styling**: TailwindCSS
- **State Management**: Pinia
- **Router**: Vue Router
- **Utilities**: VueUse, Lucide Icons

## Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tribe77-Tech/walnut-frontend.git
   cd walnut-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview the production build**
   ```bash
   npm run preview
   ```

## Project Structure

```
walnut/
├── public/            # Static assets
├── src/
│   ├── assets/        # Application assets
│   │   ├── chat/      # Chat related components
│   │   ├── layout/    # Layout components
│   │   ├── patients/  # Patient management components
│   │   └── ui/        # UI components from shadcn
│   ├── config/        # Application configuration
│   ├── lib/           # Utility functions and helpers
│   ├── mock/          # Mock data for development
│   ├── types/         # TypeScript type definitions
│   ├── views/         # Page components
│   ├── App.vue        # Root component
│   ├── main.ts        # Application entry point
│   └── style.css      # Global styles
└── ...configuration files
```

## Deployment

This project is configured for easy deployment on Netlify:

1. Push your repository to GitHub
2. Connect your repository to Netlify
3. Netlify will automatically detect the build settings from netlify.toml

## License

[MIT](LICENSE)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
