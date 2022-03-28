### a useful tool to run and monitor multiple applications is [pm2](https://pm2.keymetrics.io/docs/usage/process-management/)

## basic commands

##### install pm2 with `$ npm i -g pm2`

##### [configuration docs](https://pm2.keymetrics.io/docs/usage/application-declaration/)

| action                    | command                         |
| ------------------------- | ------------------------------- |
| create config script      | `$ pm2 init simple`             |
| run all applications      | `$ pm2 start`                   |
| run specific app          | `$ pm2 start --only <app-name>` |
| stop running all apps     | `$ pm2 delete all`              |
| stop running specific app | `$ pm2 delete <app-name>`       |
| see logs of an app        | `$ pm2 log <app-name>`          |
| reload after changing shit| `$ pm2 stop all; pm2 relaod all`|
| clear logs                | `$ pm2 flush`                   |
| see apps status           | `$ pm2 list`                    |
