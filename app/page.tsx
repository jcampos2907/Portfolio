import ProjectSection from "@/components/landing/project-section";
import projects from "@/lib/const/projects";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaReact,
} from "react-icons/fa";
import { SiKubernetes, SiLaravel, SiNextdotjs } from "react-icons/si";

export default function Home() {
  return (
    <div className="flex flex-col h-screen p-10 overflow-scroll">
      <div className="h-fit border-2 border-black rounded-sm p-8 flex flex-col gap-8 ">

        <header className="flex flex-col gap-2">
          <h1 className="text-4xl font-semibold tracking-tight">
            Juan Ignacio Campos
          </h1>
          <p className="text-lg text-neutral-700">
            UI/UX Designer • DevOps & Full-Stack Builder • Bike Racer
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-3 text-xl">
            <a
              href="https://github.com/jcampos2907"
              target="_blank"
              className="hover:text-black hover:scale-110 transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/juan-ignacio-campos-ruiz-3692212b2/"
              target="_blank"
              className="hover:text-black hover:scale-110 transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:juanicamposruiz@gmail.com"
              className="hover:text-black hover:scale-110 transition"
            >
              <FaEnvelope />
            </a>
            {/* CV Button */}
            <a
              href="/JuanCamposCV.pdf" // place your file in /public
              target="_blank"
              className="border border-black rounded-sm px-3 py-1 text-sm hover:bg-black hover:text-white transition ml-4"
            >
              Download CV
            </a>
          </div>
        </header>

        {/* Tech Icons */}
        <section>
          <div className="flex flex-wrap gap-4 text-3xl text-neutral-700">
            <FaReact title="React" />
            <SiNextdotjs title="Next.js" />
            <SiKubernetes title="Kubernetes" />
            <SiLaravel title="Laravel" />
          </div>
        </section>

        {/* About Section */}
        <section className="max-w-2xl">
          <h2 className="text-2xl font-medium mb-2">About Me</h2>
          <p className="leading-relaxed text-neutral-800">
            I’m a multidisciplinary designer and developer who enjoys building
            clean, functional interfaces and robust systems. My work blends design
            clarity with engineering reliability — from rapid UX prototyping to
            Kubernetes automation and backend architecture.
          </p>
        </section>

        {/* Work Section */}
        {/* <section className="max-w-full ">
          <h2 className="text-2xl font-medium mb-2">Selected Work</h2>
          <ul className="flex flex-col ">
            {projects.map((project, index) => (
              <ProjectCard key={index} index={index} title={project.title} description={project.description} id={project.id} />
            ))}
          </ul>
        </section> */}

        <section className="w-full">
          <h2 className="text-2xl font-medium mb-2">Selected Work</h2>
          <ul className="flex flex-col ">
            {projects.map((project, index) => (
              <ProjectSection id={project.id} key={index} index={index} title={project.title || ""} description={project.description_long || project.description || ""} git_link={project.git_link ?? ''} url={project.url ?? ''} labels={project.labels ?? []} />
            ))}
          </ul>
        </section>

        {/* Footer */}
        <footer className="mt-auto text-neutral-600 text-sm">
          © {new Date().getFullYear()} Juan Campos — Designed & built by me.
        </footer>
      </div>
    </div >
  );
}
