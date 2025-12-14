import { Code2, Palette, Database, Zap } from 'lucide-react';

const skills = [
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Language' },
  { name: 'Next.js', category: 'Framework' },
  { name: 'Tailwind CSS', category: 'Styling' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'GraphQL', category: 'API' },
  { name: 'Docker', category: 'DevOps' },
  { name: 'AWS', category: 'Cloud' },
  { name: 'Git', category: 'Version Control' },
  { name: 'Figma', category: 'Design' },
  { name: 'REST APIs', category: 'API' },
];

const highlights = [
  {
    icon: Code2,
    title: 'Clean Code',
    description: 'Writing maintainable, scalable code following best practices',
  },
  {
    icon: Palette,
    title: 'Modern Design',
    description: 'Creating beautiful, intuitive user interfaces',
  },
  {
    icon: Database,
    title: 'Full Stack',
    description: 'Building end-to-end solutions from database to deployment',
  },
  {
    icon: Zap,
    title: 'Performance',
    description: 'Optimizing for speed and seamless user experiences',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground text-lg">
            I'm a passionate full-stack developer with over 5 years of experience building 
            modern web applications. I love turning complex problems into simple, beautiful, 
            and intuitive solutions.
          </p>
        </div>

        {/* Highlights Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="glass-card rounded-2xl p-6 text-center group hover:scale-[1.02] transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-8">Technologies I Work With</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span
                key={skill.name}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-default"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
