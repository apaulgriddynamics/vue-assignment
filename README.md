# Rick and Morty Characters App

A Vue 3 application that displays Rick and Morty characters with filtering, search, and favorites functionality.

## Features

### 📋 Characters Page
- **Filters**: Filter characters by species (Human, Alien, Animal, Robot, etc.)
- **Search**: Search characters by name with real-time filtering
- **Character Cards**: Display character image, name, species, status, and favorite toggle
- **Pagination**: Navigate through multiple pages of characters
- **Click to View**: Click on any character card to view detailed information

### 👤 Character Detail Page
- **Character Information**: 
  - Large character image
  - Name, species, and status
  - Last known location
  - First episode appearance
- **Favorites**: Add or remove character from favorites
- **Responsive Design**: Optimized for both desktop and mobile

### ⭐ Favorites Page
- **Saved Characters**: View all favorited characters
- **Local Storage**: Favorites persist between browser sessions
- **No Pagination**: Simple grid layout without filters
- **Empty State**: Shows "no cards" message when no favorites exist

### 🧭 Navigation
- **Header Navigation**: Easy switching between Characters and Favorites pages
- **Favorites Counter**: Real-time counter showing number of saved favorites
- **Responsive**: Mobile-friendly navigation

## Technology Stack

- **Vue 3** with Composition API
- **TypeScript** for type safety
- **Vue Router** for navigation
- **Rick and Morty API** for character data
- **Local Storage** for favorites persistence
- **Responsive CSS** with mobile-first design

## Installation & Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:5173`

## API Integration

The app uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch:
- Character lists with pagination
- Individual character details
- Episode information for character appearances

## Local Storage

Favorites are stored in browser's Local Storage under the key `rickmorty_favorites`. This allows:
- Persistence between browser sessions
- Cross-tab synchronization
- No server-side storage required

## Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── AppHeader.vue   # Navigation header
│   ├── CharacterCard.vue # Character display card
│   └── PaginationComponent.vue # Pagination controls
├── views/              # Page components
│   ├── CharactersView.vue # Main characters listing
│   ├── CharacterDetailView.vue # Character details
│   └── FavouritesView.vue # Favorites page
├── services/           # API and data services
│   ├── api.ts         # Rick and Morty API integration
│   └── favorites.ts   # Local storage management
├── types/             # TypeScript type definitions
│   └── character.ts   # Character and API types
└── router/            # Vue Router configuration
    └── index.ts       # Route definitions
```

## Features Implementation

### Character Filtering
- Real-time search with 500ms debounce
- Species dropdown with predefined options
- Automatic page reset when filters change

### Responsive Design
- Mobile-first CSS approach
- Flexible grid layouts
- Touch-friendly interface elements

### Error Handling
- API error states with retry functionality
- Image loading fallbacks
- Loading states for better UX

### Performance
- Lazy loading of route components
- Debounced search to reduce API calls
- Efficient favorites management

## Browser Support

- Modern browsers with ES2020 support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design for all screen sizes

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run serve
```