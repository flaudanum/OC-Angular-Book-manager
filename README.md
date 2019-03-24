# BookManager

This project is part of the MOOC from OpenClassroom [Développez des applications web avec Angular](ttps://openclassrooms.com/fr/courses/4668271-developpez-des-applications-web-avec-angular)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

You can use [HttpServer](https://www.npmjs.com/package/httpserver) for serving up the application resources in the `dist/` directory. From the application root directory:

```bash
> cd dist
> cd book-manager
> httpserver
lo: 127.0.0.1
wlp6s0: 192.168.1.7
server started: http://0.0.0.0:8080
```

The application will then be served at the default URL [http://0.0.0.0:8080/book-manager/](http://0.0.0.0:8080/book-manager/).
