// Content for the home page.
// TODO: Replace the placeholder sermons, events and slide copy with real ones.
// A slide with an `image` shows that photo over its gradient `tone`
// ("gold" | "crimson" | "night"); one without shows its `art` instead.

const home = {
  slides: [
    {
      id: "sermon",
      eyebrow: "Latest sermon",
      title: "There Is Power In The Blood",
      subtitle: "Samuel Faith Ministries", // TODO: real speaker
      caption: "Watch the latest message",
      tone: "gold",
      art: "logo",
      primary: { label: "Watch sermon", href: "/sermons/power-in-the-blood" },
      secondary: { label: "View more sermons", href: "/sermons" },
    },
    {
      id: "campus",
      eyebrow: "Campus Fellowships",
      title: "Find Your Family On Campus",
      subtitle: "Christ for all schools",
      caption: "Fellowships meeting in schools across the nation",
      tone: "night",
      image: "/images/hero/minister-speaking.jpg",
      primary: { label: "Find a fellowship", href: "/campus-fellowships" },
      secondary: { label: "Start one at your school", href: "/contact" },
    },
    {
      id: "leadership",
      eyebrow: "Leadership",
      title: "Led With Purpose",
      subtitle: "Christ For All Schools Worldwide",
      caption: "Meet the people serving the ministry",
      tone: "gold",
      image: "/images/hero/minister-blue-suit.jpg",
      primary: { label: "Meet our leaders", href: "/leadership" },
      secondary: { label: "Our story", href: "/about" },
    },
    {
      id: "event",
      eyebrow: "Upcoming event",
      title: "Heaven Populating Revival",
      subtitle: "November 14, 2026", // TODO: real event and date
      caption: "An evening of worship, the Word and prayer",
      tone: "crimson",
      image: "/images/hero/minister-grey-suit.jpg",
      primary: { label: "Save your seat", href: "/events/heaven-populating-revival" },
      secondary: { label: "All events", href: "/events" },
    },
  ],

  experiences: [
    {
      id: "online",
      label: "Online",
      items: [
        {
          title: "Watch sermons",
          text: "Catch up on recent messages and series wherever you are.",
          href: "/sermons",
          icon: "play",
        },
        {
          title: "Join us live",
          text: "Stream services and prayer meetings live on YouTube.",
          href: "https://www.youtube.com/", // TODO: real channel URL
          icon: "live",
        },
        {
          title: "Give online",
          text: "Partner with us to reach every school with the gospel.",
          href: "/give",
          icon: "heart",
        },
      ],
    },
    {
      id: "campus",
      label: "On campus",
      items: [
        {
          title: "Campus fellowships",
          text: "Meet students who love Jesus in schools near you.",
          href: "/campus-fellowships",
          icon: "users",
        },
        {
          title: "Start a fellowship",
          text: "No fellowship at your school yet? We'll help you begin one.",
          href: "/contact",
          icon: "spark",
        },
        {
          title: "Meet our leaders",
          text: "Get to know the people serving the ministry.",
          href: "/leadership",
          icon: "star",
        },
      ],
    },
    {
      id: "person",
      label: "In person",
      items: [
        {
          title: "Upcoming events",
          text: "Revivals, conferences and outreaches you can attend.",
          href: "/events",
          icon: "calendar",
        },
        {
          title: "About CFAS",
          text: "Our story, what we believe and where we're going.",
          href: "/about",
          icon: "book",
        },
        {
          title: "Get in touch",
          text: "Have a question or prayer request? We'd love to hear from you.",
          href: "/contact",
          icon: "chat",
        },
      ],
    },
  ],

  // TODO: real sermons
  sermons: [
    {
      slug: "power-in-the-blood",
      title: "There Is Power In The Blood",
      series: "The Cross",
      date: "Sep 21, 2026",
      tone: "gold",
    },
    {
      slug: "populating-heaven",
      title: "Populating Heaven",
      series: "Great Commission",
      date: "Sep 14, 2026",
      tone: "crimson",
    },
    {
      slug: "light-of-the-school",
      title: "The Light Of The School",
      series: "Campus Life",
      date: "Sep 7, 2026",
      tone: "night",
    },
    { slug: "unashamed", title: "Unashamed", series: "Great Commission", date: "Aug 31, 2026", tone: "gold" },
    {
      slug: "a-difference-globally",
      title: "A Difference Globally",
      series: "Vision",
      date: "Aug 24, 2026",
      tone: "crimson",
    },
  ],

  // TODO: real events
  events: [
    {
      slug: "heaven-populating-revival",
      title: "Heaven Populating Revival",
      date: "2026-11-14",
      time: "4:00 PM",
      place: "Main auditorium",
    },
    {
      slug: "campus-leaders-summit",
      title: "Campus Leaders Summit",
      date: "2026-10-17",
      time: "9:00 AM",
      place: "Online",
    },
    {
      slug: "schools-outreach",
      title: "Schools Outreach Week",
      date: "2026-10-05",
      time: "All week",
      place: "Partner schools",
    },
  ],
};

export default home;
