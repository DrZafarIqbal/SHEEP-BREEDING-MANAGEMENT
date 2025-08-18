"use client";
import { BarChart3, User, CheckCircle, Star, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const features = [
    {
      icon: (
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl">
          🏥
        </div>
      ),
      title: "Health Records",
      description:
        "Track medical history, treatments, and health status for each sheep with comprehensive veterinary records",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-2xl">
          🧶
        </div>
      ),
      title: "Wool Production",
      description:
        "Monitor wool quality, shearing schedules, and production yields to optimize your harvest cycles",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-2xl">
          🚚
        </div>
      ),
      title: "Transfer Management",
      description:
        "Keep detailed logs of sheep movements, ownership changes, and location tracking",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-2xl">
          💉
        </div>
      ),
      title: "Vaccination Tracking",
      description:
        "Maintain vaccination schedules, immunization history, and health compliance records",
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-primary" />,
      title: "Growth Analytics",
      description:
        "Monitor weight gains, size measurements, and development milestones with detailed analytics",
    },
    {
      icon: (
        <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-2xl">
          📊
        </div>
      ),
      title: "Performance Reports",
      description:
        "Generate comprehensive reports on flock performance, productivity trends, and financial insights",
    },
  ];

  const benefits = [
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Increase Productivity",
      description:
        "Optimize your flock management and increase overall farm productivity by up to 35%",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Reduce Costs",
      description:
        "Lower veterinary expenses and prevent losses through proactive health monitoring",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Save Time",
      description:
        "Eliminate paperwork and reduce administrative tasks by up to 70%",
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-primary" />,
      title: "Data-Driven Decisions",
      description:
        "Make informed decisions based on comprehensive analytics and historical data",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Hillside Farm Owner",
      content:
        "SheepTracker revolutionized our farm management. We've seen a 40% improvement in flock health monitoring and saved countless hours on record-keeping.",
      rating: 5,
      avatar: "SM",
    },
    {
      name: "David Rodriguez",
      role: "Green Valley Ranch",
      content:
        "The wool tracking feature helped us optimize our shearing schedule and increase yield by 25%. Best investment we've made for our operation.",
      rating: 5,
      avatar: "DR",
    },
    {
      name: "Emma Thompson",
      role: "Mountain View Farm",
      content:
        "Outstanding support and intuitive interface. Our team adapted quickly, and we're now managing 300+ sheep more efficiently than ever.",
      rating: 5,
      avatar: "ET",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-lg">
                🐑
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                SheepTracker
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Benefits
              </a>
              <a
                href="#testimonials"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Reviews
              </a>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                How It Works
              </a>

              <a
                href="#faq"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                FAQ
              </a>
              <a
                href="#statistics"
                className="text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                Statistics
              </a>
              <button
                onClick={() => router.push("/auth/signin")}
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-4xl shadow-lg">
                🐑
              </div>
            </div>
            <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Modern Sheep Farm
              <span className="text-primary block">Management</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Transform your sheep farming operations with our comprehensive
              digital management system. Track your flock, monitor health, and
              optimize productivity with powerful analytics and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push("/auth/signin")}
                className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <span>Start Now</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-card text-card-foreground px-8 py-4 rounded-lg text-lg font-semibold border-2 border-border hover:bg-muted transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Everything You Need for Your Flock
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools designed specifically for modern sheep farming
              operations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl border border-border hover:shadow-lg transition-all duration-200 group"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-semibold text-card-foreground mb-3">
                  {feature.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-4xl font-bold text-foreground mb-6">
                Why Choose SheepTracker?
              </h3>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join already farms who have transformed their operations with
                our comprehensive sheep management platform.
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">{benefit.icon}</div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-12 rounded-3xl">
                <div className="text-center">
                  <div className="w-32 h-32 bg-primary rounded-3xl flex items-center justify-center text-primary-foreground text-6xl mx-auto mb-6 shadow-xl">
                    🐑
                  </div>
                  <h4 className="text-2xl font-semibold text-foreground mb-4">
                    Trusted by 5+ Farms
                  </h4>
                  <p className="text-muted-foreground text-lg">
                    Managing over 50,000 sheep worldwide with 99.9% uptime and
                    data accuracy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              What Farms Say
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real experiences from sheep farmers using SheepTracker
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card p-8 rounded-2xl border border-border shadow-sm"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="font-semibold text-card-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-secondary fill-current"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              How It Works
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started with SheepTracker in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Sign Up & Setup
              </h4>
              <p className="text-muted-foreground">
                Create your account and add your flock information. Our setup
                wizard guides you through the process in minutes.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Track Your Sheep
              </h4>
              <p className="text-muted-foreground">
                Use our mobile app or web dashboard to record health data, track
                movements, and monitor your flock's progress.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">
                Analyze & Optimize
              </h4>
              <p className="text-muted-foreground">
                Review detailed reports and analytics to make data-driven
                decisions that improve your farm's productivity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about SheepTracker
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="text-lg font-semibold text-card-foreground mb-3">
                How quickly can I get started with SheepTracker?
              </h4>
              <p className="text-muted-foreground">
                You can set up your account and start tracking your flock within
                15 minutes. Our guided setup process walks you through adding
                your sheep information, and you can begin recording data
                immediately.
              </p>
            </div>
            <div className="bg-card p-6 rounded-xl border border-border">
              <h4 className="text-lg font-semibold text-card-foreground mb-3">
                Can I access SheepTracker from my mobile device?
              </h4>
              <p className="text-muted-foreground">
                Yes! SheepTracker works perfectly on mobile devices through your
                web browser.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section id="statistics" className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-foreground mb-4">
              Trusted by Farms
            </h3>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join thousands of farmers who have transformed their operations
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <p className="text-muted-foreground">Active Farms</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <p className="text-muted-foreground">Sheep Tracked</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <p className="text-muted-foreground">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">35%</div>
              <p className="text-muted-foreground">
                Avg. Productivity Increase
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Farm?
          </h3>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join farms who have already digitized their flock management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push("/auth/signin")}
              className="bg-background text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-background/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Start Now
            </button>
            <button className="bg-transparent text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold border-2 border-primary-foreground/30 hover:bg-primary-foreground/10 transition-all duration-200">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-900 text-lg">
                  🐑
                </div>
                <span className="font-bold text-xl">SheepTracker</span>
              </div>
              <p className="text-slate-300 max-w-md">
                Modern sheep farm management made simple. Track, monitor, and
                optimize your flock with powerful digital tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#benefits"
                    className="hover:text-white transition-colors"
                  >
                    Benefits
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#statistics"
                    className="hover:text-white transition-colors"
                  >
                    Statistics
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>&copy; 2024 SheepTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
