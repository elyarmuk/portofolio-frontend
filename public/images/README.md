# Images

## Professional headshot (hero)

Drop the approved photo here to replace the abstract hero visual:

    public/images/ahmed-moussa.jpg

- Recommended: portrait orientation, ~800×1000px (4:5), JPG or PNG, well-lit,
  professional. It is displayed with `object-cover` in a rounded frame.
- The swap is automatic: the hero shows the photo when this file exists (checked
  at build time) and falls back to the abstract visual otherwise. Rebuild/redeploy
  after adding it.
- To use a different filename/path, update `profile.headshot.src` in
  `src/content/profile.ts`.

## Other assets

- Joe Limo case study media lives in `public/images/joe-limo/`
  (architecture diagram + customer/chauffeur app screenshots).
