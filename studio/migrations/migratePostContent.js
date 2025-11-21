// Migration script to convert old post content to new flexible content blocks
// Run with: npx sanity migration run migratePostContent.js

import {createClient} from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  token: process.env.SANITY_MIGRATION_TOKEN, // Need a token with write access
  apiVersion: '2023-01-01',
  useCdn: false,
})

const migration = {
  title: 'Convert post content to flexible content blocks',
  
  async run() {
    const posts = await client.fetch(`*[_type == "post" && defined(content) && content[0]._type == "block"]`)
    
    console.log(`Found ${posts.length} posts to migrate`)
    
    for (const post of posts) {
      const oldContent = post.content
      
      // Convert old blockContent to new contentBlock format
      const newContent = [{
        _type: 'contentBlock',
        _key: generateKey(),
        content: oldContent
      }]
      
      await client
        .patch(post._id)
        .set({ content: newContent })
        .commit()
      
      console.log(`Migrated post: ${post.title}`)
    }
    
    console.log('Migration complete!')
  }
}

function generateKey() {
  return Math.random().toString(36).substring(2, 15)
}

// Run the migration
migration.run().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})