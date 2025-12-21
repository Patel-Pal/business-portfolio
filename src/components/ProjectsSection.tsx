import { ExternalLink, Github } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: 'sandwitch delight Platform',
    description: 'A fully responsive restaurant website designed to present menu offerings, brand story, and key information with a clean and modern UI. Built with performance, accessibility, and scalability in mind.',
    image: 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    liveUrl: 'https://sandwich-delight-launch.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'Mehndi Art Studio',
    description: 'An aesthetically pleasing website crafted to celebrate the beauty of mehndi art, featuring elegant layouts, rich visuals, and a seamless browsing experience across devices.',
    image: 'https://henna-haven-designs.vercel.app/assets/hero-mehndi-DUGJE0e-.jpg',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'WebSocket'],
    liveUrl: 'https://henna-haven-designs.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'E-Learning Platform',
    description: 'SaaS platform leveraging AI to generate marketing copy, blog posts, and social media content.',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_px8ZhKKke5i15eGRvs1JW3NQYtGsgKCIqQ&s',
    tags: ['React', 'OpenAI', 'Tailwind', 'Supabase'],
    liveUrl: 'https://js-explorer-nine.vercel.app/',
    githubUrl: '#',
  },
  {
    title: 'Nail Art Showcase Website',
    description: 'A professional online showcase for nail artists, created to attract clients, display design portfolios, and strengthen brand presence through a visually engaging interface.',
    image: 'https://img.freepik.com/premium-photo/nail-art-design-hd-8k-wallpaper-stock-photographic-image_853645-45251.jpg',
    tags: ['React', 'D3.js', 'GraphQL', 'MongoDB'],
    liveUrl: 'https://nail-art-showcase-in.vercel.app/',
    githubUrl: '#',
  },
  // {
  //   title: 'Digital haven make your own design',
  //   description: 'A creative, mobile-first platform that allows users to explore, customize, and create unique designs effortlessly. Focused on usability, flexibility, and modern aesthetics for a smooth design experience.',
  //   image: '	https://design-haven-eight.vercel.app/assets/hero-banner-DmJCq6Mp.jpg',
  //   tags: ['React Native', 'TypeScript', 'Firebase'],
  //   liveUrl: 'https://design-haven-eight.vercel.app/',
  //   githubUrl: '#',
  // },
  // {
  //   title: 'Dental Clinic Website',
  //   description: 'A modern dental clinic website designed to showcase services, build patient trust, and simplify appointment bookings through a clean, responsive, and user-friendly interface.',
  //   image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWnbq8LYAs0klxTGGBbT6W1xRUIhOaOeZZ3g&s',
  //   tags: ['Next.js', 'Redis', 'PostgreSQL', 'AWS'],
  //   liveUrl: 'https://smile-studio-project.vercel.app/',
  //   githubUrl: '#',
  // },

  
//    {
//     title: 'Dental Clinic Website',
//     description: 'A modern dental clinic website designed to showcase services, build patient trust, and simplify appointment bookings through a clean, responsive, and user-friendly interface.',
//     image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWnbq8LYAs0klxTGGBbT6W1xRUIhOaOeZZ3g&s',
//     tags: ['Next.js', 'Redis', 'PostgreSQL', 'AWS'],
//     liveUrl: 'https://smile-studio-project.vercel.app/',
//     githubUrl: '#',
//   },
];

export function ProjectsSection() {
  const ITEMS_PER_PAGE = 6;
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(projects.length / ITEMS_PER_PAGE));

  const paginated = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return projects.slice(start, start + ITEMS_PER_PAGE);
  }, [page]);

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-lg">
            A selection of projects I've worked on. Each one presented unique challenges 
            and opportunities to create something meaningful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginated.map((project, index) => (
            <article
              key={`${project.title}-${index}-${(page - 1)}`}
              className="group glass-card rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {pageCount > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Prev
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: pageCount }).map((_, i) => {
                const pageNumber = i + 1;
                const isCurrent = pageNumber === page;
                return (
                  <Button
                    key={pageNumber}
                    size="sm"
                    variant={isCurrent ? 'default' : 'ghost'}
                    onClick={() => setPage(pageNumber)}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              size="sm"
              variant="ghost"
              onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
              disabled={page === pageCount}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
