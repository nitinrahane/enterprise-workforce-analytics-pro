# Analytics Dashboard

A modern, mobile-first analytics dashboard built with Astro, React, Tailwind CSS, and Recharts.

## Features

- 📊 **Interactive Data Visualization** - Bar charts, pie charts, and line charts using Recharts
- 📱 **Mobile-First Design** - Responsive layout that works on all devices
- 🌙 **Dark/Light Mode** - Toggle between dark and light themes
- ⚡ **Fast Performance** - Built with Astro for optimal loading speeds
- 🎨 **Modern UI** - Clean design with Tailwind CSS
- 📈 **Real-time Statistics** - Automatic calculation of key metrics

## Tech Stack

- **Astro** - Static site generator with partial hydration
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Composable charting library for React
- **React Icons** - Icon library with Feather icons

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:4321`

## Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx          # Main dashboard component
│   ├── StatCard.jsx          # Reusable stat card component
│   └── ChartContainer.jsx    # Chart wrapper component
├── data/
│   └── survey.json           # Sample survey data
├── pages/
│   └── index.astro           # Main page
└── styles/
    └── global.css            # Global styles
```

## Dashboard Components

### Statistics Cards
- **Total Responses** - Number of survey responses
- **Average Experience** - Mean experience level in years
- **Average Satisfaction** - Mean satisfaction score (1-10)
- **Top Role** - Most common job role

### Charts
1. **Satisfaction by Respondent** - Bar chart showing individual satisfaction scores
2. **Role Distribution** - Pie chart showing the breakdown of job roles
3. **Experience Trend** - Line chart showing experience levels over time

## Customization

### Adding New Data
Update `src/data/survey.json` with your own survey data. The expected format:

```json
{
  "id": 1,
  "respondent": "Name",
  "role": "Job Title",
  "experience": 5,
  "satisfaction": 8,
  "date": "2024-01-15"
}
```

### Styling
- Colors can be customized in the chart components
- Tailwind classes can be modified for layout changes
- Dark mode styles are automatically handled

## Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.

## License

MIT License - feel free to use this project for your own analytics dashboards!
