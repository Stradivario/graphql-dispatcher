type Commands = '--wss' | '--secret' | '--port' | '--random-port';
export const includes = (i: Commands) => process.argv.toString().includes(i);
export const nextOrDefault = (
  i: Commands,
  fb: unknown = true,
  type = (p) => p,
) => {
  if (process.argv.toString().includes(i)) {
    const isNextArgumentPresent = process.argv[process.argv.indexOf(i) + 1];
    if (!isNextArgumentPresent) {
      return fb;
    }
    if (isNextArgumentPresent.includes('--')) {
      return fb;
    }
    return type(isNextArgumentPresent);
  }
  return fb;
};
console.log(nextOrDefault('--port', false));
export const Environment = {
  SUBSCRIPTION_URI:
    process.env.GRAPHQL_RUNNER_SUBSCRIPTION_URI || nextOrDefault('--wss', ''),
  SECRET_KEY:
    process.env.GRAPHQL_RUNNER_SECRET_KEY || nextOrDefault('--secret', ''),
  API_PORT: process.env.API_PORT || nextOrDefault('--port', '42042'),
};
