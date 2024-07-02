require('dotenv').config();
const Sentry = require('@sentry/node');
const {  nodeProfilingIntegration } = require('@sentry/profiling-node');

Sentry.init({
    dsn: process.env.DSN,
    integrations: [
        nodeProfilingIntegration(),
    ],
    // Performance Monitoring
    tracesSampleRate: 1.0, //  Capture 100% of the transactions

    // Set sampling rate for profiling - this is relative to tracesSampleRate
    profilesSampleRate: 1.0,
});

const transaction = Sentry.startSpan({
    op: "test",
    name: "My First Test Span",
  }, () => {
    try {
      foo();
    } catch (e) {
      Sentry.captureException(e);
    }
  });

function testErrors() {
    try {
        testFunction(); 
    } catch (e) {
        Sentry.captureException(e);
    } finally {
        transaction;
    }
}

testErrors();
