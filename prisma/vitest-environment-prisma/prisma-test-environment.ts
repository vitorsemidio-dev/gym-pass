import { Environment } from 'vitest'

export default <Environment>{
  name: 'prisma',
  async setup() {
    // Setup the environment
    console.log('setup')
    return {
      // Teardown the environment
      async teardown() {
        // ...
        console.log('teardown')
      },
    }
  },
}
