import { Globe, Laptop, PenTool, Wrench, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Globe,
    title: 'Website Development',
    description: 'Custom websites that are fast, responsive, and optimized for search engines. From landing pages to complex web applications.',
    features: ['Responsive Design', 'SEO Optimized', 'Fast Loading'],
  },
  {
    icon: Laptop,
    title: 'Web App Development',
    description: 'Scalable web applications built with modern technologies. From MVPs to enterprise-grade solutions.',
    features: ['Custom Functionality', 'API Integration', 'Database Design'],
  },
  {
    icon: PenTool,
    title: 'UI/UX Design',
    description: 'User-centered design that looks great and works even better. Creating intuitive interfaces that users love.',
    features: ['User Research', 'Wireframing', 'Prototyping'],
  },
  {
    icon: Wrench,
    title: 'Maintenance & Support',
    description: 'Ongoing support to keep your applications running smoothly. Updates, security patches, and performance optimization.',
    features: ['24/7 Monitoring', 'Security Updates', 'Performance Tuning'],
  },
];

export function ServicesSection() {
  return (
    <section id="services" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services</h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive web development services tailored to your needs. 
            From concept to deployment and beyond.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="glass-card rounded-2xl p-8 group hover:scale-[1.02] transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button variant="ghost" className="group/btn p-0 h-auto font-semibold text-primary" asChild>
                <a href="#request">
                  Get Started
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
