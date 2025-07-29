import Image from "next/image"
import Link from "next/link"

export const ServicesSection = () => {
  return (
    <section className="py-12 sm:py-20">
      <div className="container mx-auto px-4 space-y-16 sm:space-y-32">
        {/* Affordable Assistance - Stacked Cards */}
        <div className="relative">
          <div className="bg-[#F1F0FB] p-6 sm:p-12 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
                  Affordable Assistance for Everyone
                </h3>
                <p className="text-lg sm:text-xl text-primary-foreground/85 mb-6">
                  Access quality services without breaking the bank.
                </p>
              </div>
              <div className="relative">
                <div className="absolute top-4 right-4 w-full h-full bg-primary/5 rounded-2xl"></div>
                <div className="absolute top-2 right-2 w-full h-full bg-primary/10 rounded-2xl"></div>
                <Image
                  src="https://images.unsplash.com/photo-1464998857633-50e59fbf2fe6?auto=format&fit=crop&w=800"
                  alt="Affordable Assistance"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-xl w-full relative z-10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Tailored Services - Stacked Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#D3E4FD] p-6 sm:p-12 rounded-3xl">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Image
              src="https://images.unsplash.com/photo-1461532257246-777de18cd58b?auto=format&fit=crop&w=800"
              alt="Tailored Services"
              width={800}
              height={600}
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
              Tailored Services Just for You
            </h3>
            <p className="text-lg sm:text-xl text-primary-foreground/85 mb-6">
              Uncover options that perfectly fit your unique needs.
            </p>
          </div>
        </div>

        {/* Inclusive Community - Split with Diagonal */}
        <div className="relative">
          <div className="absolute inset-0 bg-[#FFDEE2] transform -skew-y-3"></div>
          <div className="relative container mx-auto px-4 py-12 sm:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <Image
                  src="https://images.unsplash.com/photo-1687360441027-27e70655b27e?auto=format&fit=crop&w=800"
                  alt="Inclusive Community"
                  width={800}
                  height={600}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
                  Be Part of Our Inclusive Community
                </h3>
                <p className="text-lg sm:text-xl text-primary-foreground/85 mb-6">
                  Join a network that values connection and support.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Caring Community - Card Grid Layout */}
        <div className="bg-[#FEF7CD] p-6 sm:p-12 rounded-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">A Community That Cares</h3>
            <p className="text-lg sm:text-xl text-primary-foreground/85">
              Engage with a group of people ready to support you.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Image
              src="https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?auto=format&fit=crop&w=400"
              alt="Caring Community 1"
              width={400}
              height={300}
              className="rounded-2xl shadow-xl w-full aspect-video object-cover"
            />
            <Image
              src="https://images.unsplash.com/photo-1544928147-79a2dbc1f389?auto=format&fit=crop&w=400"
              alt="Caring Community 2"
              width={400}
              height={300}
              className="rounded-2xl shadow-xl w-full aspect-video object-cover"
            />
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400"
              alt="Caring Community 3"
              width={400}
              height={300}
              className="rounded-2xl shadow-xl w-full aspect-video object-cover hidden lg:block"
            />
          </div>
        </div>

        {/* Support Budget - Circular Image Layout */}
        <div className="bg-[#F2FCE2] p-6 sm:p-12 rounded-3xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="relative">
              <div className="aspect-square rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1574607407517-cd664b1504f5?auto=format&fit=crop&w=600"
                  alt="Support Budget"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-primary-foreground mb-4">
                Support That Fits Your Wallet
              </h3>
              <p className="text-lg sm:text-xl text-primary-foreground/85 mb-6">
                Discover solutions that match your budget and lifestyle.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=400"
              alt="Explore Nearheal"
              width={400}
              height={300}
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="relative bg-gradient-to-r from-primary/90 to-primary/70 p-8 sm:p-16 text-center">
            <h2 className="text-2xl sm:text-3xl text-primary-foreground font-bold mb-4">
              Explore Nearheal and Find Support Today
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/85 mb-6 sm:mb-8">
              Start navigating the support options designed for your needs.
            </p>
            <Link
              href="/explore"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors text-base sm:text-lg font-medium"
            >
              Get Started Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
