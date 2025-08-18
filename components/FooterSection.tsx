import Link from "next/link";

export const FooterSection = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-white text-lg font-semibold mb-4">
              About Nearheal
            </h3>
            <p className="text-sm leading-relaxed">
              Nearheal is an Australian information technology company
              compassionately building an innovative, resilient, and
              self-sufficient healthcare ecosystem.{" "}
            </p>
          </div>

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about-us"
                  className=" hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy-policy"
                  className=" hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms-and-conditions"
                  className=" hover:text-white transition-colors"
                >
                  Terms and Conditions
                </Link>
              </li>

              {/* <li>
                <Link
                  href="/contact"
                  className=" hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className=" hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className=" hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li> */}
            </ul>
          </div>

          {/* <div>
            <h3 className="text-white text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={process.env.NEXT_PUBLIC_JOB_PORTAL_URL || "/jobs"}
                  className="hover:text-white transition-colors"
                >
                  Career Portal
                </Link>
              </li>
              <li>
                <Link
                  href={process.env.NEXT_PUBLIC_ECOMMERCE_URL || "/marketplace"}
                  className="hover:text-white transition-colors"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/telehealth" className="hover:text-white transition-colors">
                  Telehealth
                </Link>
              </li>
              <li>
                <Link href="/elearning" className="hover:text-white transition-colors">
                  E-learning
                </Link>
              </li>
            </ul>
          </div> */}

          <div>
            <h3 className="text-white text-lg font-semibold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>Address: 3/8 Mackie st, Coniston, NSW 2500, Australia </li>
              <li>Phone: +61451645094</li>
              <li>Email: info@nearheal.com.au</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-sm">© 2021-2025 Nearheal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
