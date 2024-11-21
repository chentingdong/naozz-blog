interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Naozz',
    description: `Naozz is a company that builds AI-powered products to improve the quality of life.`,
    imgSrc: '/static/images/naozz.png',
    href: 'https://www.naozz.com',
  },
  {
    title: 'Trainme',
    description: `AI-powered workout app for athletes.`,
    imgSrc: '/static/images/trainme.png',
    href: 'https://trainme.naozz.com',
  },
]

export default projectsData
