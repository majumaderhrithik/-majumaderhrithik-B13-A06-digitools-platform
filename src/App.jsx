import { useEffect, useMemo, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ShoppingCart, Trash2, LogIn, Menu, Check } from "lucide-react";
import banner from "./assets/banner.png";
import playIcon from "./assets/Play.png";
import packageIcon from "./assets/package.png";
import rocketIcon from "./assets/rocket.png";
import userIcon from "./assets/user.png";
import designToolIcon from "./assets/design-tool.png";
import operationIcon from "./assets/operation.png";
import portfolioIcon from "./assets/portfolio.png";
import socialMediaIcon from "./assets/social-media.png";
import writingIcon from "./assets/writing.png";


const products = [
  {
    id: 1,
    name: "AI Writing Pro",
    description:
      "Generate high-quality blog posts, product copy, and social captions in seconds.",
    price: 29,
    period: "monthly",
    tag: "Best Seller",
    tagType: "best-seller",
    features: ["Unlimited AI writing", "50+ templates", "Grammar support"],
    icon: writingIcon,
  },
  {
    id: 2,
    name: "Design Templates Pack",
    description:
      "A polished collection of templates for presentations, ads, and social campaigns.",
    price: 49,
    period: "one-time",
    tag: "Popular",
    tagType: "popular",
    features: ["200+ premium templates", "Commercial use", "Regular updates"],
    icon: designToolIcon,
  },
  {
    id: 3,
    name: "Premium Stock Assets",
    description:
      "Access photos, illustrations, and creative assets for client and personal work.",
    price: 19,
    period: "monthly",
    tag: "New",
    tagType: "new",
    features: ["10M+ assets", "No attribution", "Commercial license"],
    icon: portfolioIcon,
  },
  {
    id: 4,
    name: "Automation Toolkit",
    description:
      "Streamline repetitive workflows and save hours with plug-and-play automations.",
    price: 79,
    period: "monthly",
    tag: "Popular",
    tagType: "popular",
    features: ["50+ automations", "API-ready", "Custom workflows"],
    icon: operationIcon,
  },
  {
    id: 5,
    name: "Resume Builder Pro",
    description:
      "Build clean ATS-friendly resumes and cover letters that look professional.",
    price: 15,
    period: "one-time",
    tag: "New",
    tagType: "new",
    features: ["10 resume layouts", "ATS optimization", "Export to PDF"],
    icon: userIcon,
  },
  {
    id: 6,
    name: "Social Media Content Kit",
    description:
      "Create engaging content faster with ready-made assets and posting resources.",
    price: 39,
    period: "monthly",
    tag: "Best Seller",
    tagType: "best-seller",
    features: ["5000+ assets", "Posting planner", "Analytics support"],
    icon: socialMediaIcon,
  },
];

const steps = [
  {
    id: 1,
    title: "Create Account",
    description:
      "Sign up in seconds and explore premium digital tools without any complicated setup.",
    icon: userIcon,
  },
  {
    id: 2,
    title: "Choose Products",
    description:
      "Browse the product collection and select the tools that match your workflow.",
    icon: packageIcon,
  },
  {
    id: 3,
    title: "Start Creating",
    description:
      "Download your resources and start using them immediately in your next project.",
    icon: rocketIcon,
  },
];

const plans = [
  {
    id: 1,
    name: "Starter",
    price: "$0",
    subtitle: "Perfect for getting started",
    features: [
      "Access to 10 free tools",
      "Basic templates",
      "Community support",
      "1 project per month",
    ],
    buttonText: "Get Started Free",
  },
  {
    id: 2,
    name: "Pro",
    price: "$29",
    subtitle: "Best for professionals",
    features: [
      "All premium tools",
      "Unlimited templates",
      "Priority support",
      "Unlimited projects",
      "Cloud sync",
      "Advanced analytics",
    ],
    buttonText: "Start Pro Trial",
    featured: true,
  },
  {
    id: 3,
    name: "Enterprise",
    price: "$99",
    subtitle: "For teams and businesses",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "Custom branding",
    ],
    buttonText: "Contact Sales",
  },
];

function Tag({ children, type }) {
  const styles = {
    popular: "bg-violet-100 text-violet-600",
    new: "bg-emerald-100 text-emerald-600",
    "best-seller": "bg-amber-100 text-amber-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${styles[type]}`}
    >
      {children}
    </span>
  );
}

function ProductCard({ product, onAdd, inCart }) {
  return (
    <div className="flex min-h-92.5 flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <div className="flex items-start justify-between">
    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-50">
          <img
            src={product.icon}
            alt={product.name}
            className="h-5 w-5 object-contain"
          />
    </div>
        <Tag type={product.tagType}>{product.tag}</Tag>
    </div>

      <h3 className="mt-4 text-[22px] font-bold leading-tight text-slate-800">
        {product.name}
      </h3>

      <p className="mt-2 min-h-15 text-[12px] leading-5 text-slate-400">
        {product.description}
      </p>

      <div className="mt-2 flex items-end gap-1">
      <span className="text-[30px] font-bold leading-none text-slate-900">
          ${product.price}
      </span>
      <span className="pb-1 text-[11px] text-slate-400">
          /{product.period}
      </span>
      </div>

      <div className="mt-3">
      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500">
          {product.tagType}
      </span>
      </div>

      <ul className="mt-4 space-y-2">
        {product.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-[12px] text-slate-500"
          >
            <Check className="h-3.5 w-3.5 text-emerald-500" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

    <button
        onClick={() => onAdd(product)}
        className="mt-auto rounded-full bg-violet-600 py-2.5 text-[12px] font-semibold text-white transition hover:bg-violet-700"
      >
        {inCart ? "Added to cart" : "Buy Now"}
    </button>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("products");
  const [cart, setCart] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [activeNav, setActiveNav] = useState("products");

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price, 0),
    [cart]
  );

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.info(`${product.name} is already in the cart`);
      return;
    }
    setCart((prev) => [...prev, product]);
    toast.success(`${product.name} added to cart`);
  };

  const removeItem = (id) => {
    const removed = cart.find((item) => item.id === id);
    setCart((prev) => prev.filter((item) => item.id !== id));
    if (removed) {
      toast.error(`${removed.name} removed from cart`);
    }
  };

  const checkout = () => {
    if (cart.length === 0) {
      toast.info("Your cart is empty");
      return;
    }
    setCart([]);
    toast.success("Proceed to checkout completed");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-slate-800">
    
      <ToastContainer position="top-right" autoClose={1800} />

      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-295 items-center justify-between px-4 sm:px-6">
          <h1 className="text-[26px] font-bold text-violet-600">DigiTools</h1>

       <nav className="hidden items-center gap-7 md:flex">
  <a
    href="#products"
    onClick={() => setActiveNav("products")}
    className={`text-[12px] transition ${
      activeNav === "products"
        ? "text-violet-600 font-semibold"
        : "text-slate-500 hover:text-violet-600"
    }`}
  >
    Products
  </a>

  <a
    href="#features"
    onClick={() => setActiveNav("features")}
    className={`text-[12px] transition ${
      activeNav === "features"
        ? "text-violet-600 font-semibold"
        : "text-slate-500 hover:text-violet-600"
    }`}
  >
    Features
  </a>

  <a
    href="#pricing"
    onClick={() => setActiveNav("pricing")}
    className={`text-[12px] transition ${
      activeNav === "pricing"
        ? "text-violet-600 font-semibold"
        : "text-slate-500 hover:text-violet-600"
    }`}
  >
    Pricing
  </a>

  <a
    href="#cta"
    onClick={() => setActiveNav("cta")}
    className={`text-[12px] transition ${
      activeNav === "cta"
        ? "text-violet-600 font-semibold"
        : "text-slate-500 hover:text-violet-600"
    }`}
  >
    Testimonials
  </a>

  <a
    href="#footer"
    onClick={() => setActiveNav("footer")}
    className={`text-[12px] transition ${
      activeNav === "footer"
        ? "text-violet-600 font-semibold"
        : "text-slate-500 hover:text-violet-600"
    }`}
  >
    FAQ
  </a>
</nav>

        
            <div className="hidden items-center gap-4 md:flex">
            <div className="relative">
            <button
             onClick={() => setActiveTab("cart")}
             className="relative rounded-full p-2 transition hover:bg-violet-50"
>
            <ShoppingCart className="h-5 w-5 text-slate-600" />
            <span className="absolute -top-2 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
             {cart.length}
            </span>
             </button>
             </div>
            

            <button  onClick={() => setShowLogin(true)}
             className="flex items-center gap-1 text-[12px] text-slate-500">
              <LogIn className="h-3.5 w-3.5" />
              Login
            </button>

            <button
  onClick={() => setShowSignup(true)}
  className="rounded-full bg-violet-600 px-4 py-2 text-[11px] font-semibold text-white transition hover:scale-105 hover:bg-violet-700"
>
  Get Started
</button>
          </div>

          <button className="md:hidden">
            <Menu className="h-5 w-5 text-slate-600" />
          </button>
        </div>
      </header>

      <section className="mx-auto grid max-w-295 items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 md:py-20">
        <div className="max-w-130">
        <div className="relative inline-flex items-center gap-2 rounded-full px-5 py-2 text-[11px] font-semibold text-white bg-linear-to-r from-violet-600 to-purple-600 shadow-lg">
        <span className="absolute inset-0 rounded-full bg-linear-to-r from-violet-600 to-purple-600 blur opacity-40"></span>
          <span className="relative flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-white animate-ping"></span>
            ✨ New: AI Powered Tools Available
          </span>
        </div>

          <h2 className="mt-6 text-[40px] font-bold leading-[1.06] tracking-[-0.03em] text-slate-800 sm:text-[48px] lg:text-[58px]">
            Supercharge Your Digital Workflow
          </h2>

          <p className="mt-5 max-w-107.5 text-[13px] leading-6 text-slate-400 sm:text-[14px]">
            Access premium AI tools, design assets, templates, and productivity
            software all in one place. Start creating faster today.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#products" className="inline-flex cursor-pointer rounded-full bg-violet-600 px-5 py-2.5 text-[12px] font-semibold text-white transition hover:scale-105 hover:bg-violet-700"
>
              Explore Products
             </a>
            

            <button
              onClick={() => alert("Demo coming soon")}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-violet-300 bg-white px-5 py-2.5 text-[12px] font-semibold text-violet-600 transition hover:scale-105 hover:bg-violet-50"
  >
           <img
            src={playIcon}
            alt="Play"
            className="h-3.5 w-3.5 object-contain"
             />
              Watch Demo
            </button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <img
            src={banner}
            alt="Banner"
            className="h-75 w-75 rounded-md object-cover sm:h-87.5 sm:w-87.5 lg:h-97.5 lg:w-97.5"
          />
        </div>
      </section>

      <section className="bg-linear-to-r from-[#5d2dff] via-[#8a27ff] to-[#b61eff] py-10 text-white">
        <div className="mx-auto grid max-w-275 grid-cols-1 gap-8 px-6 text-center sm:grid-cols-3">
          <div>
            <h3 className="text-[40px] font-bold">50K+</h3>
            <p className="mt-2 text-[12px] text-violet-100">Active Users</p>
          </div>
          <div className="relative">
            <div className="absolute left-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/25 sm:block" />
            <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-white/25 sm:block" />
            <h3 className="text-[40px] font-bold">200+</h3>
            <p className="mt-2 text-[12px] text-violet-100">Premium Tools</p>
          </div>
          <div>
            <h3 className="text-[40px] font-bold">4.9</h3>
            <p className="mt-2 text-[12px] text-violet-100">Rating</p>
          </div>
        </div>
      </section>

      <section id="products" className="mx-auto max-w-295 px-4 py-16 sm:px-6 md:py-20">
        
        <div className="text-center">
          <h2 className="text-[34px] font-bold tracking-[-0.02em] text-slate-800 sm:text-[42px] lg:text-[50px]">
            Premium Digital Tools
          </h2>
          <p className="mx-auto mt-3 max-w-117.5 text-[11px] leading-5 text-slate-400 sm:text-[12px]">
            Choose from our curated collection of premium digital products
            designed to boost your productivity and creativity.
          </p>
        </div>

        <div className="mt-7 flex items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab("products")}
            className={`rounded-full px-5 py-2 text-[11px] font-semibold ${
              activeTab === "products"
                ? "bg-violet-600 text-white"
                : "border border-slate-200 bg-white text-slate-500"
            }`}
          >
            Products
          </button>

          <button
            onClick={() => setActiveTab("cart")}
            className={`rounded-full px-5 py-2 text-[11px] font-semibold ${
              activeTab === "cart"
                ? "bg-violet-600 text-white"
                : "border border-slate-200 bg-white text-slate-500"
            }`}
          >
            Cart ({cart.length})
          </button>
        </div>

        {activeTab === "products" ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={addToCart}
                inCart={cart.some((item) => item.id === product.id)}
              />
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-212.5">
            {cart.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-[14px] text-slate-400">
                Your cart is empty. Choose a product to see it here.
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col items-start justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.icon}
                          alt={item.name}
                          className="h-8 w-8 object-contain"
                        />
                        <div>
                          <p className="text-[14px] font-semibold text-slate-800">
                            {item.name}
                          </p>
                          <p className="text-[12px] text-slate-400">
                            ${item.price}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="rounded-full border border-red-200 p-2 text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold">Total: ${total}</h3>
                      <p className="text-[12px] text-slate-400">
                        {cart.length} selected product
                        {cart.length > 1 ? "s" : ""}
                      </p>
                    </div>

                    <button
                      onClick={checkout}
                      className="rounded-full bg-violet-600 px-6 py-2.5 text-[12px] font-semibold text-white"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </section>

      <section id="features" className="mx-auto max-w-295 px-4 py-8 sm:px-6 md:py-14">
        <div className="text-center">
          <h2 className="text-[34px] font-bold tracking-[-0.02em] text-slate-800 sm:text-[42px] lg:text-[48px]">
            Get Started In 3 Steps
          </h2>
          <p className="mt-2 text-[11px] text-slate-400 sm:text-[12px]">
            Start using premium digital tools in three simple steps.
          </p>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="relative rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm"
            >
              <div className="absolute right-5 top-5 flex h-7 w-7 items-center justify-center rounded-full bg-violet-600 text-[10px] font-semibold text-white">
                0{step.id}
              </div>

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
                <img
                  src={step.icon}
                  alt={step.title}
                  className="h-7 w-7 object-contain"
                />
              </div>

              <h3 className="mt-5 text-[22px] font-bold text-slate-800">
                {step.title}
              </h3>
              <p className="mt-3 text-[11px] leading-5 text-slate-400">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-295 px-4 py-16 sm:px-6 md:py-20">
        
        <div className="text-center">
          <h2 className="text-[34px] font-bold tracking-[-0.02em] text-slate-800 sm:text-[42px] lg:text-[48px]">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-2 text-[11px] text-slate-400 sm:text-[12px]">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border p-6 shadow-sm ${
                plan.featured
                  ? "border-violet-500 bg-linear-to-b from-[#7b2dff] to-[#b61eff] text-white"
                  : "border-slate-200 bg-white text-slate-800"
              }`}
            >
              {plan.featured && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300 px-3 py-1 text-[10px] font-semibold text-amber-900">
                  Most Popular
                </div>
              )}

              <h3 className="text-[24px] font-bold">{plan.name}</h3>
              <p
                className={`mt-2 text-[11px] ${
                  plan.featured ? "text-violet-100" : "text-slate-400"
                }`}
              >
                {plan.subtitle}
              </p>

              <div className="mt-5 flex items-end gap-1">
                <span className="text-[42px] font-bold leading-none">
                  {plan.price}
                </span>
                <span
                  className={`pb-1 text-[11px] ${
                    plan.featured ? "text-violet-100" : "text-slate-400"
                  }`}
                >
                  /Month
                </span>
              </div>

              <ul className="mt-5 space-y-2">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className={`flex items-center gap-2 text-[11px] ${
                      plan.featured ? "text-white" : "text-slate-500"
                    }`}
                  >
                    <span className={plan.featured ? "text-white" : "text-emerald-500"}>
                      ✓
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

        <button
           className={`mt-7 w-full rounded-full py-2.5 text-[12px] font-semibold ${
             plan.featured ? "bg-white text-violet-700" : "bg-violet-600 text-white"
             }`}
            >
  {plan.buttonText}
        </button>
            </div>
          ))}
        </div>
      </section>

      <section
        id="cta"
        className="bg-linear-to-r from-[#5d2dff] via-[#8a27ff] to-[#b61eff] py-20 text-center text-white"
      >
        <div className="mx-auto max-w-200 px-6">
          <h2 className="text-[32px] font-bold tracking-[-0.02em] sm:text-[40px] md:text-[46px]">
            Ready To Transform Your Workflow?
          </h2>
          <p className="mx-auto mt-4 max-w-140 text-[12px] leading-6 text-violet-100">
            Join thousands of professionals who are already using DigiTools to
            work smarter. Start your free trial today.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
  
         <a
               href="#products"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-2.5 text-[12px] font-semibold text-violet-700 transition hover:scale-105"
             >
            Explore Products
        </a>

         <a
              href="#pricing"
              className="inline-flex items-center justify-center rounded-full border border-white px-6 py-2.5 text-[12px] font-semibold text-white transition hover:scale-105"
  >
            View Pricing
        </a>
         </div>

          <p className="mt-6 text-[11px] text-violet-100">
            14-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      <footer id="footer" className="bg-[#07142d] py-16 text-white">
        <div className="mx-auto max-w-295 px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
       <h3 className="text-[34px] font-bold">DigiTools</h3>
       <p className="mt-4 max-w-72.5 text-[12px] leading-6 text-slate-300">
         Premium digital tools for creators, professionals, and
         businesses. Work smarter with our suite of powerful tools.
        </p>
        </div>

            <div>
            <h4 className="text-[13px] font-semibold">Product</h4>
            <ul className="mt-4 space-y-2 text-[12px] text-slate-300">
                <li>Features</li>
                <li>Pricing</li>
                <li>Templates</li>
                <li>Integrations</li>
           </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold">Company</h4>
              <ul className="mt-4 space-y-2 text-[12px] text-slate-300">
                <li>About</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Press</li>
             </ul>
            </div>

            <div>
              <h4 className="text-[13px] font-semibold">Resources</h4>
              <ul className="mt-4 space-y-2 text-[12px] text-slate-300">
                <li>Documentation</li>
                <li>Help Center</li>
                <li>Community</li>
                <li>Contact</li>
            </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 text-[11px] text-slate-400 sm:flex sm:items-center sm:justify-between">
            <p>© 2026 DigiTools. All rights reserved.</p>
            <div className="mt-3 flex gap-5 sm:mt-0">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Cookies</span>
            </div>
          </div>
        </div>
      </footer>
      {showLogin && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-800">Login</h2>
        <button
          onClick={() => setShowLogin(false)}
          className="text-sm text-slate-500"
        >
          Close
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
        />

        <input
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm"
        />

        <button
          onClick={() => {
            toast.success("Login submitted");
            setShowLogin(false);
          }}
          className="w-full rounded-full bg-violet-600 py-3 text-sm font-semibold text-white"
        >
          Login
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}