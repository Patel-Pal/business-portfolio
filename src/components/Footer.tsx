import { Code2, Github, Linkedin, Instagram, Heart } from 'lucide-react';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#services', label: 'Services' },
  { href: '#request', label: 'Get Website' },
  { href: '#contact', label: 'Contact' },
];

// const socialLinks = [
//   { icon: Github, href: 'https://github.com', label: 'GitHub' },
//   { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
//   { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
// ];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <a href="#" className="inline-flex items-center gap-2 mb-4 group">
              {/* <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Code2 className="w-5 h-5 text-primary" />
              </div> */}
              <span className="font-bold text-xl">Dev</span>
            </a>
            <p className="text-sm text-muted-foreground">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-3">
            {/* {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))} */}
          </div>
        </div>

        {/* Bottom */}
        {/* <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
            Built with <Heart className="w-4 h-4 text-destructive fill-current" /> using React & Tailwind
          </p>
        </div> */}
      </div>
    </footer>
  );
}
