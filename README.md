# flag-emoticon

A website providing searchable information on all country flag emojis and their subdivisions, along with their corresponding emoji Unicode. For example, Chile, a **country**, has its flag emoji represented by the Unicode `1f1e8-1f1f1`, while England, a **subdivision** of the United Kingdom, has its flag emoji represented by the Unicode `1f3f4-e0067-e0062-e0065-e006e-e0067-e007f`.

This website also offers an API for querying country names and their flag emoji Unicode. Simply pass the country name to obtain the result. For example, to find the emoji Unicode for the United Kingdom, use `/api/country/united%20kingdom`. There's no need to use dashes to replace whitespace; just encode the URL.

# Tech Used

| Aspect                 | Name           |
| ---------------------- | -------------- |
| Development Language   | TypeScipt      |
| Testing                | Vitest         |
| Styling                | PrimeVue       |
| Framework              | NuxtJS         |
| Build Automation Tool  | Make           |
| Dependency Management  | Pnpm           |
| Continuous Integration | GitHub Actions |

# Commands

| Command           | Usage                                             |
| ----------------- | ------------------------------------------------- |
| make preview      | Alias for `nuxt preview`                          |
| make generate     | Alias for `nuxt generate`                         |
| make development  | Alias for `nuxt dev`                              |
| make build        | Alias for `nuxt build`                            |
| make test         | Run all test code                                 |
| make format-check | Run prettier to check source and test code format |
| make format-write | Run prettier to format source and test code       |
