import { motion } from 'framer-motion';
import { AnimatedSection } from './AnimatedSection';

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Twitter', href: '#' },
  { label: 'Goodreads', href: '#' },
];

export const Footer = () => {
  return (
    <footer id="contact" className="py-16 md:py-24 border-t border-border">
      <div className="container-wide">
        <AnimatedSection>
          <div className="grid md:grid-cols-3 gap-12 md:gap-8 items-start">
            {/* Logo & Tagline */}
            <div>
              <a href="#" className="font-display text-2xl text-foreground block mb-4">
                <span className="text-primary">The</span> Poet
              </a>
              <p className="font-body text-sm text-muted-foreground leading-relaxed">
                Where words become worlds,<br />
                and silence speaks volumes.
              </p>
            </div>

            {/* Contact */}
            <div className="text-center">
              <h4 className="font-display text-lg text-foreground mb-4">Get in Touch</h4>
              <a 
                href="mailto:hello@thepoet.com" 
                className="font-body text-muted-foreground hover:text-primary transition-colors link-underline"
              >
                hello@thepoet.com
              </a>
            </div>

            {/* Social Links */}
            <div className="md:text-right">
              <h4 className="font-display text-lg text-foreground mb-4">Follow Along</h4>
              <div className="flex gap-6 md:justify-end">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors link-underline"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom Bar */}
        <motion.div 
          className="mt-16 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="font-body text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Poet. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Crafted with intention
          </p>
        </motion.div>
      </div>
    </footer>
  );
};
