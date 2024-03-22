# Setup Instructions

### Language Versions

- Node.js: 21.6.2
- Ruby: 3.2.2

## Server Setup

### Docker Setup (Recommended)

1. Navigate to the `rewards_api` directory.
2. Run the following command:
   ```bash
   docker compose up --build
   ```
3. This command will generate containers for Rails, MySQL, Sidekiq, and Redis (optional).
4. To check if the containers are running, use:

   ```bash
   docker-compose ps
   ```

   ```
   | NAME                | IMAGE             | COMMAND                                                                                                           		| SERVICE | CREATED      | STATUS     | PORTS                   |
   |---------------------|-------------------|------------------------------------------	-------------------------------------------------------------------------|---------|---	-----------|------------|-------------------------|
   | rewards_api-app-1   | rewards_api-app  | "bash -c 'bundle exec rails 	db:create && bundle exec rails db:migrate && bundle exec rails s -p 3000	 	-b '0.0.0.0''" | app     | 2 hours ago  | Up 2 hours | 0.0.0.0:3000->3000/tcp 	|
   | rewards_api-db-1    | mysql:5.7        | "docker-entrypoint.sh mysqld"                                                                                     	| db      | 40 hours ago | Up 2 hours | 3306/tcp, 33060/tcp    |
   | rewards_api-redis-1 | redis:latest     | "docker-entrypoint.sh redis-	server"                                                                               | redis   | 40 hours 	ago | Up 2 hours | 0.0.0.0:6379->6379/tcp |
   | rewards_api-sidekiq-1 | rewards_api-sidekiq | "bundle exec sidekiq"                                                                                            	| sidekiq | 2 hours ago  | Up 2 hours | 3000/tcp                |

   ```

5. Once the containers are up, seed the reward data by executing the following command from within the Rails container:
   ```bash
   docker-compose exec app rails db:seed
   ```

### Non-Docker Setup

1. Ensure MySQL is up and running.
2. Navigate to the `rewards_api` folder.
3. Ensure the `database.yml` file is configured correctly for your MySQL environment.
4. Run bundle install:
   ```bash
   bundle install
   ```
5. Run the following command to set up the database:
   ```bash
   rails db:setup
   ```
6. Start the server:
   ```bash
   rails s
   ```
7. Optionally, run Sidekiq and Redis:
   ```bash
   bundle exec sidekiq
   ```
   (For Redis Instructions see: https://redis.com/ )

## Client Setup

1. Navigate to the `redemption_client` directory.
2. Install dependencies using npm (or yarn, pnpm, or whatever alternative):
   ```bash
   npm install
   ```
3. Start the client:
   ```bash
   npm run start
   ```
4. Follow the instructions provided by Expo to run the app in either a web view, Expo Go app, or Android SDK.

   ```bash
   npm run start
   ```

   ```
   	› Metro waiting on exp://192.168.1.88:8081
   	› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)

   	› Web is waiting on http://localhost:8081

   	› Using Expo Go
   	› Press s │ switch to development build

   	› Press a │ open Android
   	› Press i │ open iOS simulator
   	› Press w │ open web

   	› Press j │ open debugger
   	› Press r │ reload app
   	› Press m │ toggle menu
   	› Press o │ open project code in your editor

   	› Press ? │ show all commands

   ```

5. Note: Running in anything other than the web view may require using ngrok (or similar) to expose the backend (`localhost:3000`).
6. If using ngrok, configure `rewards_api/config/environments/development.rb` to add the host, and `redemption_client/utils/api.ts` to adjust the API endpoint.
7. If running in web view, it's recommended to use dev tools to view the application in mobile mode.

## API Reference (cURL, Postman, etc)

#### Create/Find User

```
GET /v1//users/<USER NAME>
```

Example Response

```json
{
  "id": 4,
  "name": "name",
  "points": 1000,
  "created_at": "2024-03-21T04:57:29.921Z",
  "updated_at": "2024-03-21T20:16:14.101Z"
}
```

#### List Rewards

```
GET v1/rewards
```

Example Response

```json
[
  {
    "id": 1,
    "name": "Synergistic Marble Wallet",
    "points_required": 194,
    "image_url": "https://source.unsplash.com/random/150×150?sig=151",
    "created_at": "2024-03-20T05:56:33.801Z",
    "updated_at": "2024-03-20T05:56:33.801Z"
  },
  {
    "id": 2,
    "name": "Practical Copper Plate",
    "points_required": 373,
    "image_url": "https://source.unsplash.com/random/150×150?sig=195",
    "created_at": "2024-03-20T05:56:33.807Z",
    "updated_at": "2024-03-20T05:56:33.807Z"
  }
]
```

#### List Redemptions (by User)

```
GET v1/redemptions/user/<USER ID>
```

Example Response

```json
[
  {
    "id": 9,
    "user_id": 4,
    "reward_id": 1,
    "created_at": "2024-03-21T05:13:11.527Z",
    "updated_at": "2024-03-21T05:13:11.527Z"
  },
  {
    "id": 10,
    "user_id": 4,
    "reward_id": 2,
    "created_at": "2024-03-21T05:16:46.525Z",
    "updated_at": "2024-03-21T05:16:46.525Z"
  }
]
```

#### Redeem Reward (Sync)

```
POST v1/redemptions
```

Payload

```json
{
  "redemption": {
    "user_id": 32,
    "reward_id": 1
  }
}
```

Example Response

```json
{
  "redemption": {
    "id": 18,
    "user_id": 32,
    "reward_id": 1,
    "created_at": "2024-03-22T02:52:52.604Z",
    "updated_at": "2024-03-22T02:52:52.604Z"
  }
}
```

#### Redeem Reward (Async)

```
POST v1/redemptions/async
```

Payload

```json
{
  "redemption": {
    "user_id": 32,
    "reward_id": 1
  }
}
```

Example Response

```json
{}
```

## Troubleshooting

There's a pretty good amount of documentation available on the [Expo](https://docs.expo.dev/) and [Ngrok](https://ngrok.com/docs/faq/) sites, for example, so those are worth looking at for sure.

If any issues arise with these instructions though, please don't hestitate to reach out and contact me. Hopefully I should be able to clear anything up, or help with troubleshooting any errors.
