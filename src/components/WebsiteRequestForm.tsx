import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import emailjs from '@emailjs/browser';
import { useToast } from '@/hooks/use-toast';


interface FormData {
  fullName: string;
  email: string;
  phone: string;
  websiteType: string;
  budget: string;
  description: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  websiteType?: string;
  budget?: string;
  description?: string;
}

const websiteTypes = [
  { value: '', label: 'Select website type' },
  { value: 'portfolio', label: 'Portfolio / Personal' },
  { value: 'business', label: 'Business / Corporate' },
  { value: 'ecommerce', label: 'E-Commerce / Online Store' },
  { value: 'blog', label: 'Blog / Content Site' },
  { value: 'webapp', label: 'Web Application' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: '', label: 'Select budget range' },
  { value: '1000-2500', label: '$1,000 - $2,500' },
  { value: '2500-5000', label: '$2,500 - $5,000' },
  { value: '5000-10000', label: '$5,000 - $10,000' },
  { value: '10000-25000', label: '$10,000 - $25,000' },
  { value: '25000+', label: '$25,000+' },
];

export function WebsiteRequestForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    websiteType: '',
    budget: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');



  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\d\s\-+()]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.websiteType) {
      newErrors.websiteType = 'Please select a website type';
    }

    if (!formData.budget) {
      newErrors.budget = 'Please select a budget range';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your project';
    } else if (formData.description.trim().length < 20) {
      newErrors.description = 'Please provide more details (at least 20 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('submitting');

    try {
      // Step 1: Send message to YOU
      await emailjs.send(
        "service_c2eu6el",            // service ID
        "template_powroxq",           // template ID for contact form
        {
          from_name: formData.fullName,
          from_email: formData.email,
          phone: formData.phone,
          website_type: formData.websiteType,
          budget: formData.budget,
          description: formData.description,
        },
        "Wj19oO9fMwepspPK1"           // PUBLIC_KEY
      );

      // Step 2: Auto reply to USER
      await emailjs.send(
        "service_c2eu6el",
        "template_bn44tsw",           // template ID for auto reply
        {
          to_name: formData.fullName,
          user_email: formData.email,
          website_type: formData.websiteType,
        },
        "Wj19oO9fMwepspPK1"
      );

      toast({
        title: "Request submitted!",
        description: "Thank you for your interest! I'll review your project and get back to you soon.",
      });

      setFormData({
        fullName: '',
        email: '',
        phone: '',
        websiteType: '',
        budget: '',
        description: '',
      });
      setStatus('success');

      // Reset after showing success
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error('Email error:', error);
      toast({
        title: "Error sending request",
        description: "Please try again.",
        variant: "destructive",
      });
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (status === 'success') {
    return (
      <section id="request" className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Request Submitted!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest! I'll review your project details and get back to you within 24-48 hours.
            </p>
            <Button onClick={() => setStatus('idle')}>Submit Another Request</Button>
          </div>
        </div>
      </section>
    );
  }

  if (status === 'error') {
    return (
      <section id="request" className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto glass-card rounded-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Something Went Wrong</h3>
            <p className="text-muted-foreground mb-6">
              We encountered an error while submitting your request. Please check the browser console for details and try again.
            </p>
            <Button onClick={() => setStatus('idle')}>Try Again</Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="request" className="section-padding">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Your Website</h2>
          <p className="text-muted-foreground text-lg">
            Ready to bring your vision to life? Fill out the form below and let's discuss your project.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto glass-card rounded-2xl p-8 md:p-10">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors",
                  errors.fullName && "border-destructive focus:ring-destructive/50"
                )}
                placeholder="John Doe"
              />
              {errors.fullName && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address <span className="text-destructive">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors",
                  errors.email && "border-destructive focus:ring-destructive/50"
                )}
                placeholder="john@example.com"
              />
              {errors.email && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium">
                Phone Number <span className="text-destructive">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors",
                  errors.phone && "border-destructive focus:ring-destructive/50"
                )}
                placeholder="+1 (555) 123-4567"
              />
              {errors.phone && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Website Type */}
            <div className="space-y-2">
              <label htmlFor="websiteType" className="block text-sm font-medium">
                Type of Website <span className="text-destructive">*</span>
              </label>
              <select
                id="websiteType"
                name="websiteType"
                value={formData.websiteType}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none cursor-pointer",
                  errors.websiteType && "border-destructive focus:ring-destructive/50"
                )}
              >
                {websiteTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.websiteType && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.websiteType}
                </p>
              )}
            </div>

            {/* Budget */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="budget" className="block text-sm font-medium">
                Budget Range <span className="text-destructive">*</span>
              </label>
              <select
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={cn(
                  "w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors appearance-none cursor-pointer",
                  errors.budget && "border-destructive focus:ring-destructive/50"
                )}
              >
                {budgetRanges.map(range => (
                  <option key={range.value} value={range.value}>
                    {range.label}
                  </option>
                ))}
              </select>
              {errors.budget && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.budget}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Project Description <span className="text-destructive">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className={cn(
                  "w-full px-4 py-3 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none",
                  errors.description && "border-destructive focus:ring-destructive/50"
                )}
                placeholder="Tell me about your project, goals, features you'd like, timeline, etc..."
              />
              {errors.description && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.description}
                </p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            variant="hero"
            size="lg"
            className="w-full mt-8"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                Submit Request
                <Send className="w-5 h-5" />
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
