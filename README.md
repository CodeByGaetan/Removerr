# Removerr

Removerr is a straightforward application designed for deleting movies and series within a Plex environment. Deletion is achieved by sending deletion requests to Radarr or Sonarr, as well as Overseerr. No authentication, use locally only !

![Static Badge](https://img.shields.io/badge/NextJS-14.1.3-black)
![Static Badge](https://img.shields.io/badge/React-18-lightblue)
![Static Badge](https://img.shields.io/badge/TailwindCSS-3.3.0-blue)
![Static Badge](https://img.shields.io/badge/ShadcnUI-0.8.0-black)

## Getting Started

### Development

- Clone the project repository

```bash
git clone <repository-url>
```

- Set up your environment variables by creating a .env.local file based on the provided .env.local.example
- Start the development server

```bash
npm run dev
# or
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result

### Docker Deployment

- Build the Docker image

```bash
docker build -t removerr-img .
```

- Run the Docker image

```bash
docker run -p 3000:3000 removerr-img
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
