import Contact from '@/components/Homepage/Contact'
import Hero from '@/components/Homepage/Hero'
import MyProjects from '@/components/Homepage/MyProjects'
import PageExperience from '@/components/PageExperience'

export default function Home() {
  return (
    <main className="relative isolate overflow-x-clip">
      <PageExperience sectionCount={5} />

      <div className="relative z-20">
        <Hero />
        <MyProjects firstIndex={1} />
        <Contact index={4} />
      </div>
    </main>
  )
}
