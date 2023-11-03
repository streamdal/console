window.Sentry && Sentry.onLoad(() => {
  Sentry.init({
    dsn:
      "https://3f6edea97aca1d46270c66aa4aab95d3@o464670.ingest.sentry.io/4506161671897088",
    integrations: [
      new Sentry.BrowserTracing(),
      new Sentry.Replay({ maskAllText: false }),
    ],
    replaysSessionSampleRate: 1.0,
    tracesSampleRate: 1.0,
  });
});
