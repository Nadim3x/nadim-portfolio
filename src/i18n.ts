export type Lang = 'en' | 'bn';

export type TranslationKey =
  | 'nav.about'
  | 'nav.work'
  | 'nav.services'
  | 'nav.contact'
  | 'nav.cta'
  | 'hero.eyebrow'
  | 'hero.headline'
  | 'hero.sub'
  | 'hero.cta1'
  | 'hero.cta2'
  | 'hero.scroll'
  | 'reel.tag'
  | 'reel.caption'
  | 'reel.addVideo'
  | 'reel.addInfo'
  | 'reel.clip1.title'
  | 'reel.clip1.desc'
  | 'reel.clip2.title'
  | 'reel.clip2.desc'
  | 'reel.clip3.title'
  | 'reel.clip3.desc'
  | 'reel.clip4.title'
  | 'reel.clip4.desc'
  | 'reel.clip5.title'
  | 'reel.clip5.desc'
  | 'reel.clip6.title'
  | 'reel.clip6.desc'
  | 'about.tag'
  | 'about.heading'
  | 'about.bio1'
  | 'about.bio2'
  | 'about.addPhoto'
  | 'services.tag'
  | 'services.heading'
  | 'services.card1.title'
  | 'services.card2.title'
  | 'services.tag.talkingHead'
  | 'services.tag.splitScreen'
  | 'services.tag.fullScreen'
  | 'services.tag.vlogs'
  | 'services.quoteHeading'
  | 'services.quoteSub'
  | 'services.quoteBtn'
  | 'contact.tag'
  | 'contact.heading'
  | 'contact.sub'
  | 'contact.whatsapp'
  | 'contact.instagram'
  | 'contact.email'
  | 'lightbox.playing'
  | 'footer.tagline';

export type TranslationDict = Record<TranslationKey, string>;

export const translations: Record<Lang, TranslationDict> = {
  en: {
    'nav.about': 'About',
    'nav.work': 'Work',
    'nav.services': 'Services',
    'nav.contact': 'Contact',
    'nav.cta': 'Get in Touch',
    'hero.eyebrow': 'REC — VIDEO EDITOR',
    'hero.headline': 'Stories that keep people watching.',
    'hero.sub': 'Your content, shaped into engaging videos. Made with quality and adapted to your style.',
    'hero.cta1': 'See My Work',
    'hero.cta2': 'Get in Touch',
    'hero.scroll': 'Scroll',
    'reel.tag': 'VIDEOS',
    'reel.caption': 'A few frames from recent edits.',
    'reel.addVideo': 'Add Video',
    'reel.addInfo': 'Add title & description',
    'reel.clip1.title': 'Split Screen',
    'reel.clip1.desc': 'Split-screen editing with a curated selection of striking visuals, dynamic pacing, highlighted keywords, and storytelling-driven editing, designed to keep viewers engaged and maintain strong retention from start to finish.',
    'reel.clip2.title': 'Dynamic Full Screen',
    'reel.clip2.desc': 'Full-screen editing with a fast-paced rhythm, quick cuts, and a strong visual identity, combining storytelling and dynamic elements to capture attention and keep viewers engaged from start to finish.',
    'reel.clip3.title': 'Dynamic Full Screen',
    'reel.clip3.desc': 'Full-screen editing with a fast-paced rhythm, quick cuts, and a strong visual identity, combining storytelling and dynamic elements to capture attention and keep viewers engaged from start to finish.',
    'reel.clip4.title': 'Dynamic Talking Head',
    'reel.clip4.desc': 'Dynamic editing with a visual text hook, fast cuts, icons, B-rolls, and highlighted text, creating an engaging pace and keeping the video visually appealing from start to finish.',
    'reel.clip5.title': 'Storytelling',
    'reel.clip5.desc': 'Emotion-driven storytelling edit featuring representative imagery, an immersive soundtrack, carefully crafted pacing, and visual elements that enhance the emotions and narrative throughout the video.',
    'reel.clip6.title': 'Split Screen',
    'reel.clip6.desc': 'Split-screen editing with a curated selection of striking visuals, dynamic pacing, highlighted keywords, and storytelling-driven editing, designed to keep viewers engaged and maintain strong retention from start to finish.',
    'about.tag': 'ABOUT',
    'about.heading': "Who's Editing",
    'about.bio1': "I'm Nadim, a video editor specializing in short-form content, such as Reels, while also working with long-form videos.",
    'about.bio2': 'My goal is simple: let creators spend less time editing and more time creating. Beyond the edit itself, I like thinking about structure, retention, and strategies that help a video reach more people and get real results.',
    'about.addPhoto': 'Add your photo',
    'services.tag': 'SERVICES',
    'services.heading': 'What I Edit',
    'services.card1.title': 'Short Videos',
    'services.card2.title': 'Long Videos',
    'services.tag.talkingHead': 'Talking Head',
    'services.tag.splitScreen': 'Split Screen',
    'services.tag.fullScreen': 'Full Screen',
    'services.tag.vlogs': 'Vlogs',
    'services.quoteHeading': 'Every project is different.',
    'services.quoteSub': "Tell me what you need and I'll send a quote.",
    'services.quoteBtn': 'Request a Quote',
    'contact.tag': 'CONTACT',
    'contact.heading': "Let's Make Something",
    'contact.sub': 'Got a project in mind? Reach out.',
    'contact.whatsapp': 'WhatsApp',
    'contact.instagram': 'Instagram',
    'contact.email': 'Email',
    'lightbox.playing': 'Now Playing',
    'footer.tagline': '© 2026 NADIM EDITOR — VIDEO EDITING',
  },
  bn: {
    'nav.about': 'সম্পর্কে',
    'nav.work': 'কাজ',
    'nav.services': 'সেবা',
    'nav.contact': 'যোগাযোগ',
    'nav.cta': 'যোগাযোগ করুন',
    'hero.eyebrow': 'REC — ভিডিও এডিটর',
    'hero.headline': 'গল্প যা মানুষকে দেখতে আটকে রাখে।',
    'hero.sub': 'আপনার কন্টেন্ট, আকর্ষণীয় ভিডিওতে রূপান্তরিত। মানসম্পন্ন এবং আপনার শৈলী অনুযায়ী তৈরি।',
    'hero.cta1': 'আমার কাজ দেখুন',
    'hero.cta2': 'যোগাযোগ করুন',
    'hero.scroll': 'স্ক্রল করুন',
    'reel.tag': 'ভিডিও',
    'reel.caption': 'সাম্প্রতিক সম্পাদনার কিছু ফ্রেম।',
    'reel.addVideo': 'ভিডিও যোগ করুন',
    'reel.addInfo': 'শিরোনাম ও বিবরণ যোগ করুন',
    'reel.clip1.title': 'স্প্লিট স্ক্রিন',
    'reel.clip1.desc': 'স্ট্রাইকিং ভিজ্যুয়াল, ডায়নামিক পেসিং, হাইলাইটেড কীওয়ার্ড এবং স্টোরিটেলিং-চালিত সম্পাদনার সাথে স্প্লিট-স্ক্রিন সম্পাদনা, দর্শকদের ব্যস্ত রাখতে এবং শুরু থেকে শেষ পর্যন্ত শক্তিশালী ধরে রাখা বজায় রাখতে ডিজাইন করা।',
    'reel.clip2.title': 'ডায়নামিক ফুল স্ক্রিন',
    'reel.clip2.desc': 'দ্রুত ছন্দ, দ্রুত কাট এবং শক্তিশালী ভিজ্যুয়াল পরিচয় সহ ফুল-স্ক্রিন সম্পাদনা, মনোযোগ আকর্ষণ এবং দর্শকদের শুরু থেকে শেষ পর্যন্ত ব্যস্ত রাখতে স্টোরিটেলিং এবং ডায়নামিক উপাদান একত্রিত করে।',
    'reel.clip3.title': 'ডায়নামিক ফুল স্ক্রিন',
    'reel.clip3.desc': 'দ্রুত ছন্দ, দ্রুত কাট এবং শক্তিশালী ভিজ্যুয়াল পরিচয় সহ ফুল-স্ক্রিন সম্পাদনা, মনোযোগ আকর্ষণ এবং দর্শকদের শুরু থেকে শেষ পর্যন্ত ব্যস্ত রাখতে স্টোরিটেলিং এবং ডায়নামিক উপাদান একত্রিত করে।',
    'reel.clip4.title': 'ডায়নামিক টকিং হেড',
    'reel.clip4.desc': 'ভিজ্যুয়াল টেক্সট হুক, দ্রুত কাট, আইকন, বি-রোল এবং হাইলাইটেড টেক্সট সহ ডায়নামিক সম্পাদনা, একটি আকর্ষণীয় ছন্দ তৈরি করে এবং ভিডিওটিকে শুরু থেকে শেষ পর্যন্ত ভিজ্যুয়ালি আকর্ষণীয় রাখে।',
    'reel.clip5.title': 'স্টোরিটেলিং',
    'reel.clip5.desc': 'প্রতিনিধিত্বমূলক চিত্র, একটি নিমগ্ন সাউন্ডট্র্যাক, যত্নসহকারে তৈরি পেসিং এবং ভিজ্যুয়াল উপাদান যা ভিডিও জুড়ে আবেগ এবং বর্ণনা বাড়ায় তা নিয়ে গঠিত আবেগ-চালিত স্টোরিটেলিং সম্পাদনা।',
    'reel.clip6.title': 'স্প্লিট স্ক্রিন',
    'reel.clip6.desc': 'স্ট্রাইকিং ভিজ্যুয়াল, ডায়নামিক পেসিং, হাইলাইটেড কীওয়ার্ড এবং স্টোরিটেলিং-চালিত সম্পাদনার সাথে স্প্লিট-স্ক্রিন সম্পাদনা, দর্শকদের ব্যস্ত রাখতে এবং শুরু থেকে শেষ পর্যন্ত শক্তিশালী ধরে রাখা বজায় রাখতে ডিজাইন করা।',
    'about.tag': 'সম্পর্কে',
    'about.heading': 'কে সম্পাদনা করছেন',
    'about.bio1': 'আমি সার্জিও পনজোনি, একজন ২০ বছর বয়সী ব্রাজিলিয়ান ভিডিও এডিটর যিনি রিলসের মতো শর্ট-ফর্ম কন্টেন্টে বিশেষজ্ঞ, পাশাপাশি লং-फর्म ভিডিও নিয়েও কাজ করেন।',
    'about.bio2': 'আমার লক্ষ্য সহজ: নির্মাতাদের সম্পাদনায় কম সময় এবং নির্মাণে বেশি সময় ব্যয় করতে দিন। সম্পাদনা ছাড়াও, আমি কাঠামো, ধরে রাখা এবং এমন কৌশল নিয়ে ভাবতে পছন্দ করি যা একটি ভিডিওকে আরও বেশি মানুষের কাছে পৌঁছাতে এবং বাস্তব ফলাফল অর্জনে সাহায্য করে।',
    'about.addPhoto': 'আপনার ছবি যোগ করুন',
    'services.tag': 'সেবা',
    'services.heading': 'আমি যা সম্পাদনা করি',
    'services.card1.title': 'শর্ট ভিডিও',
    'services.card2.title': 'লং ভিডিও',
    'services.tag.talkingHead': 'টকিং হেড',
    'services.tag.splitScreen': 'স্প্লিট স্ক্রিন',
    'services.tag.fullScreen': 'ফুল স্ক্রিন',
    'services.tag.vlogs': 'ভ্লগ',
    'services.quoteHeading': 'প্রতিটি প্রকল্প আলাদা।',
    'services.quoteSub': 'আমাকে বলুন আপনার কী প্রয়োজন এবং আমি একটি উদ্ধৃতি পাঠাব।',
    'services.quoteBtn': 'উদ্ধৃতি অনুরোধ করুন',
    'contact.tag': 'যোগাযোগ',
    'contact.heading': 'চলুন কিছু তৈরি করি',
    'contact.sub': 'মনে কোনো প্রকল্প আছে? যোগাযোগ করুন।',
    'contact.whatsapp': 'হোয়াটসঅ্যাপ',
    'contact.instagram': 'ইনস্টাগ্রাম',
    'contact.email': 'ইমেইল',
    'lightbox.playing': 'এখন চলছে',
    'footer.tagline': '© 2026 নাদিম এডিটর — ভিডিও এডিটিং',
  },
};

export const CONTACT_LINKS = {
  whatsapp: 'https://wa.link/2yrggp',
  instagram: 'https://www.instagram.com/nadim.editor/',
  email: 'mailto:sixtynineplays.info@gmail.com',
};

export const CLIP_COUNT = 6;

export const CLIP_COVERS: string[] = [
  'https://images.pexels.com/photos/8770513/pexels-photo-8770513.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/29505140/pexels-photo-29505140.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/17147713/pexels-photo-17147713.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/1188751/pexels-photo-1188751.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/695730/pexels-photo-695730.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  'https://images.pexels.com/photos/7679465/pexels-photo-7679465.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
];

export const PROFILE_PHOTO =
  'https://images.pexels.com/photos/7408085/pexels-photo-7408085.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';
