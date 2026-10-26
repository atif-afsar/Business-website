export const defaultData = {
  hero: {
    headline: "MODULAR CONSTRUCTION IS OUR",
    philosophyText: "NEW PHILOSOPHY.",
    subtext: "We design and build modern\nturnkey modular houses\naccording to your needs\nfor living and recreation",
    buttonText: "DISCUSS THE PROJECT",
    image: "/images/hero_model_m.png",
    labelNumber: "01",
    labelTitle: "Model M"
  },
  about: {
    badge: "// ABOUT",
    description: "MODE-7 its a new modern homes inspired by nature forms and materials. Our houses are design to achieve the optimal balance between functionality, quality, cost and construction times",
    buttonText: "LEARN MORE",
    stats: [
      {
        id: "stat-1",
        number: "100+",
        label: "Completed projects",
        isDark: true
      },
      {
        id: "stat-2",
        number: "23",
        label: "Professionals",
        isDark: false
      },
      {
        id: "stat-3",
        number: "15",
        label: "Years on the market",
        isDark: false
      }
    ]
  },
  projects: [
    {
      id: "43",
      number: "PROJECT #43",
      title: "Forest Haven Cabin",
      location: "Saimaa Lake District, Finland",
      year: "2025",
      area: "620 SF",
      type: "Model S Custom",
      exteriorImage: "/images/cabin_exterior.png",
      interiorImage: "/images/cabin_interior.png",
      description: "Nestled between granite boulders and dense pine woodland, Project #43 is a testament to sensitive site integration and precision off-site prefabrication."
    },
    {
      id: "44",
      number: "PROJECT #44",
      title: "Lakeside Sanctuary",
      location: "Lake Tahoe, California",
      year: "2025",
      area: "1,280 SF",
      type: "Model M Flagship",
      exteriorImage: "/images/hero_model_m.png",
      interiorImage: "/images/cabin_interior.png",
      description: "Engineered to withstand heavy snow loads while offering uninterrupted views across the alpine shoreline with custom thermally broken aluminum frames."
    },
    {
      id: "45",
      number: "PROJECT #45",
      title: "Pine Ridge Pavilion",
      location: "Telemark, Norway",
      year: "2026",
      area: "1,960 SF",
      type: "Model L Linear",
      exteriorImage: "/images/forest_cabin_long.png",
      interiorImage: "/images/cabin_exterior.png",
      description: "Constructed on a steep slope utilizing minimal helical pile foundations to protect the root network of centenary Scots pine trees."
    }
  ],
  advantages: [
    {
      id: "adv-1",
      title: "RAPID CONSTRUCTION",
      text: "From the moment we arrive at your construction site, to the last finishing, takes less than 8 weeks. By eliminating any guesswork from the building process, we can operate precisely and efficiently across all construction phases, without the usual project stress.",
      metric: "< 8 WEEKS"
    },
    {
      id: "adv-2",
      title: "BUILD ANYWHERE",
      wireframeImage: "/images/wireframe_axonometric.png",
      text: "Every component is precisely manufactured in our production facilities and then transported to construction site. This allows us to build high-quality homes anywhere in the world – even in the quietest, most secluded corners – without compromising on quality",
      metric: "WORLDWIDE"
    },
    {
      id: "adv-3",
      title: "BEST INSULATION",
      text: "Each home is custom insulated to suit your region's year-round temperature and humidity. From a thermal perspective, wood-frame buildings are inherently more efficient than steel-frame or concrete constructions, delivering optimal comfort at all times.",
      metric: "PASSIVE-READY"
    }
  ],
  houses: [
    {
      id: "model-s",
      name: "MODEL S",
      subtitle: "1 Bedroom, 1 Bathroom",
      dimensions: "25' x 36'",
      squareFeet: "774 SF",
      basePrice: "$47,875",
      basePriceNum: 47875,
      image: "/images/model_s_render.png",
      description: "A compact yet spacious modernist retreat crafted with fluted metal facade, panoramic gable glazing, and Nordic timber interior.",
      features: ["Panoramic glass gable", "Pre-installed HVAC", "Scandinavian pine lining", "Smart climate integration"],
      idealFor: "Guest house, weekend retreat, or nature rental"
    },
    {
      id: "model-m",
      name: "MODEL M",
      subtitle: "2 Bedrooms, 2 Bathrooms",
      dimensions: "34' x 48'",
      squareFeet: "1,280 SF",
      basePrice: "$86,400",
      basePriceNum: 86400,
      image: "/images/hero_model_m.png",
      description: "Our flagship modular home. Featuring high vaulted ceilings, expansive wrap-around deck, integrated solar array and open-concept living.",
      features: ["Expansive timber deck", "Floor-to-ceiling glass", "Dual en-suite bedrooms", "Architectural canopy"],
      idealFor: "Full-time family residence or lakeside vacation home"
    },
    {
      id: "model-l",
      name: "MODEL L",
      subtitle: "3 Bedrooms, 2.5 Bathrooms",
      dimensions: "42' x 60'",
      squareFeet: "1,960 SF",
      basePrice: "$134,500",
      basePriceNum: 134500,
      image: "/images/forest_cabin_long.png",
      description: "An elongated linear architectural pavilion harmonizing with forest landscapes. Designed for spacious luxury living with minimal footprint.",
      features: ["Linear timber deck", "Integrated outdoor kitchen", "Master wing separation", "Triple-pane thermal windows"],
      idealFor: "Permanent luxury living or multi-generational retreat"
    }
  ],
  inquiries: [],
  quotes: [],
  services: [
    {
      id: "srv-01",
      number: "01",
      title: "Architectural Concept & BIM Design",
      subtitle: "From sketch to millimetric precision",
      description: "Custom architectural concepts, 3D BIM parametric modeling, zoning feasibility, and environmental light/thermal simulations tailored to your land topography.",
      tags: ["BIM 3D Modeling", "Topography Study", "Permit Docs", "Sun & Wind Simulation"],
      order: 1,
      isActive: true
    },
    {
      id: "srv-02",
      number: "02",
      title: "Precision Factory Prefabrication",
      subtitle: "Zero weather delays, zero waste",
      description: "Precision manufacturing in a climate-controlled robotics facility using Austrian CLT timber, automated joinery, and German hardware with 1mm accuracy.",
      tags: ["Robotic Joinery", "Austrian CLT Timber", "Triple-Glazed Framing", "Factory QC Stamped"],
      order: 2,
      isActive: true
    },
    {
      id: "srv-03",
      number: "03",
      title: "Extreme Terrain Logistics & Transport",
      subtitle: "Delivered anywhere on earth",
      description: "End-to-end heavy haulage, specialized multi-axle freight, and helicopter or crane maneuvering to erect modules on cliff edges, islands, or dense woodlands.",
      tags: ["Helicopter Delivery", "Multi-Axle Heavy Haul", "Island Freight", "Helical Piling"],
      order: 3,
      isActive: true
    },
    {
      id: "srv-04",
      number: "04",
      title: "Turnkey On-Site Assembly (< 8 Weeks)",
      subtitle: "Fast assembly with zero site stress",
      description: "Rapid on-site installation by certified MOD-7 assembly crews. Watertight envelope sealed in 48 hours; complete interior and utility handover in under 8 weeks.",
      tags: ["48-Hr Weather Sealing", "Plug & Play MEP", "Foundation Mounting", "Turnkey Handover"],
      order: 4,
      isActive: true
    },
    {
      id: "srv-05",
      number: "05",
      title: "Passive House & Off-Grid Engineering",
      subtitle: "Self-sufficient luxury living",
      description: "Integration of high-yield solar roofs, battery energy storage, closed-loop rainwater harvesting, and geothermal ground-source heat pump circuits.",
      tags: ["Solar PV Integration", "Battery Energy Bank", "Rainwater Recovery", "Net-Zero Thermal"],
      order: 5,
      isActive: true
    },
    {
      id: "srv-06",
      number: "06",
      title: "Interior Architecture & Custom Millwork",
      subtitle: "Curated Scandinavian craftsmanship",
      description: "Bespoke Nordic oak cabinetry, flush architectural doors, concealed dimmable warm LED reveals, and integrated minimalist kitchen and bathroom suites.",
      tags: ["Custom Oak Millwork", "Minimalist Bathrooms", "Concealed Architecture", "Smart Home Setup"],
      order: 6,
      isActive: true
    }
  ]
};

