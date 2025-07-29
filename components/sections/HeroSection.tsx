export const HeroSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-primary-foreground mb-6 leading-snug">
              Your Complete Healthcare & Learning Platform
            </h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Discover opportunities in healthcare, education, and more with Nearheal's comprehensive suite of services.
            </p>
            <a 
              href="/providers" 
              className="inline-block px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg"
            >
              Get Started
            </a>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1713942589752-6c6bb58ca8b6?auto=format&fit=crop&w=800"
              alt="Healthcare Professional"
              className="rounded-lg shadow-xl w-full"
            />
            <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
          </div>
        </div>
      </div>
    </section>
  );
};