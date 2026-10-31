# Before you launch: content only the shop owner can supply

Nothing below is invented by the site. If it is empty, it is hidden. Fill in what is true.

- [ ] Contact email, phone and WhatsApp (Vercel environment variables, see `.env.example`).
- [ ] Instagram, TikTok and X links.
- [ ] Payment instructions (`VITE_PAYMENT_NOTE` here and `PAYMENT_NOTE` on Render, same wording).
- [ ] Real products with real photos (`public/images/`) and prices, loaded with the CSV importer.
- [ ] Home page hero image and "our story" images are samples: replace `public/images/hero-image.jpg`, `our-story-image.webp`, `our-story-alt.webp` with your own.
- [ ] Read the About and Home wording once and change anything that is not true for your business.
- [ ] Reviews: `src/data/reviews.js` holds sample text only. Leave `VITE_SHOW_REVIEWS=false` until you replace it with real customer reviews you have permission to publish.
- [ ] Do not add claims such as "dermatologist approved", "cruelty-free" or ingredient promises unless the brands you stock can prove them.
- [ ] Add a Privacy Policy and Terms / returns page (Nigeria Data Protection Act applies because you collect names, addresses and phone numbers). The site does not include legal text.
