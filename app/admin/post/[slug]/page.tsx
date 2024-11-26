import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import markdownToHtml from 'next-mdx-remote/render-to-string'

export async function getStaticPaths() {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const fileNames = fs.readdirSync(postsDirectory)
  const paths = fileNames.map((fileName) => ({
    params: { slug: fileName.replace(/\.md$/, '') },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const filePath = path.join(postsDirectory, `${params.slug}.md`)
  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  const contentHtml = await markdownToHtml(content)

  return {
    props: {
      post: { ...data, contentHtml },
    },
  }
}

export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
    </div>
  )
}
