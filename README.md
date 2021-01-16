# Instant Stock

Instant Stock is an application that monitors a product's page for stock availability. Upon availability, notification will be send based on notification configurations.

## Initial setup for running the application locally

Create a `local_secrets.env` from the `local_secrets.env.template`. Contains environment variables that the application will need in order to successfully run.

[Guideline how to initialize environment variables](TBD)
```
make init
```

Builds Instant Stock app container image.
```
make build
```

### Setup DynamoDB
Run DynamoDB container standalone.
```
make run-dynamodb
```

Create tables.
```
make create-tables 
```

Insert items into table.
```
make insert-items
```


## Available Commands
Runs the app in development mode.
```
make run
```

Lints the codebase.
```
make lint
```

Lints the codebase with the `--fix` option, which fixes errors that can be automatically fixed.
```
make lint-fix
```

Delete tables in DynamoDB.
- Requires DynamoDB container to be up and running.
```
make delete-tables
```

Reset tables in DynamoDB. Deletes existing tables that may contain inserted items and re-creates fresh tables.
- Requires DynamoDB container to be up and running.
```
make reset-tables
```
