import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export async function POST(req: Request) {
  if (req.method === 'POST') {
    const { title, description, content, date } = await req.json()

    // Create the frontmatter and markdown content
    const fileContent = `---
title: "${title}"
description: "${description}"
date: "${date}"
---

${content}`

    // Save the post as a markdown file
    const postsDirectory = path.join(process.cwd(), './data/blog/naozz/')
    const filePath = path.join(postsDirectory, `${title.toLowerCase().replace(/\s+/g, '-')}.mdx`)
    console.log('filePath', filePath)
    console.log('fileContent', fileContent)
    try {
      fs.writeFileSync(filePath, fileContent)
      return new Response(JSON.stringify({ message: 'Post created successfully!' }), {
        status: 200,
      })
    } catch (error) {
      console.error('Error saving post:', error)
      return new Response(JSON.stringify({ error: 'Failed to save post' }), {
        status: 500,
      })
    }
  } else {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
    })
  }
}
