# Thoughts & Considerations

## Tech Stack

When considering my choices for the tech stack, Ruby on Rails for the backend was an easy decision. I'm familiar with Rails, enjoy working with it, and wanted to align with what you're using at Thanx. Opting to use MySQL for the database was also a straightforward choice for similar reasons. I chose to dockerize the backend and database as it's an approach I personally like for development, and also for simplicity in passing the application along for review. Because I already had the Docker setup, it was easy to slot in Sidekiq and Redis later on (which I'll touch on in another section).

After speaking with Josh about the React Native use at Thanx, I opted to use React Native for my frontend client. Even though it's been a bit since I last dabbled in React Native, it seemed like a fun excuse to build something with the technology. I've also heard some good things about how far along Expo has come and wanted to give it a whirl (even though the scope of the project may not give me a great sense of whatever limitations it may currently have).

## Considerations

While the scope of the application isn't particularly large, I know Josh recommended I only spend a couple of hours on this. With that in mind, I think there are a lot of things that aren't necessarily built how I'd ordinarily implement them (which I hope goes without saying) but I wanted to add some thoughts on particular points and how they could be improved, or why I considered them.

- Having implemented authentication, serializers, etc., along with using a standardized spec (JSON API spec, for example), could definitely lead to providing the client with better scoped and more appropriate data, which would have helped to avoid things like having a custom endpoint to grab redemptions by user ID or needing to make separate calls for rewards and redemptions.
- Although it wouldn't likely have been impactful for the needs of the project, obviously things like testing, security, accessibility, error handling, and design/UX could benefit from significant attention, and I could easily spend hours polishing this up.
- I would have liked to have spent a little bit more time reviewing React Native best practices and what options were available. How well does React Native support `React.Suspense`? What are some common best practices around separating concerns in Expo between layouts and other components?
- While considering the possible pitfalls in redeeming rewards, (for example race conditions leading a user to potentially have negative points, or partially completed transactions leading to the need for a refund) I implemented a secondary asynchronous creation endpoint for `redemptions` that make uses of Sidekiq and Redis, and the frontend can be updated to use in `redemption_client/utils/api.ts` (although there is no feedback for the async job being created).

## Conclusion

Despite the obvious ~~jank~~ lack of polish, I'm overall pretty happy with how this turned out given the time frame it was completed in. Even after spending some time fighting XCode and Ngrok, I think it was a solid learning experience and a decent opportunity to show a little bit of how I approach things.
