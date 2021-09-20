export declare enum Environment {
    /**
       * The API client is used in a production environment and will connect to the production
       * services.
       */
    Production = 0,
    /**
       * The API client is used in a local development environment and will only connect to the local server specified in the constructor or to the default 'https://localhost:8000/' server.
       */
    LocalDevelopment = 1
}
