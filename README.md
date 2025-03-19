# Conduktor Frontend Task

## Run the app

First, make sure the environment variables are set in `.env`

```bash
npm run build
npm run serve
```

## Notes

- This app is not responsive. I normally build everything mobile-first as default but, in this case, in order to save time, I decided not to. It's based on a desktop app anyway!

### Potential improvements

- Increase test coverage.
- Add validation to form inputs.
- Add retry attempts to `useAuthToken` hook.
- Add logic to refresh access token upon expiration.
- Add Mock Service Worker for integration tests.
- When the user sets theme to "system", have a listener auto update the app theme when they change their system theme.
