# My Ideal Map

A full-stack web app for those who love exploring cities to save places on the embedded Google Maps _with links to external sites_—a feature unavailable with Google Maps’s official app unless you use clunky [Google My Maps](https://www.google.com/maps/about/mymaps/).

## URL

https://my-ideal-map.app

Accessing the above URL redirects you to a login page. Please follow the instruction there to log in to a demo account so that you can see how the app works.

It is hosted by [Vercel](https://vercel.com/), chosen for its seamless integration with a full-stack Next.js app.

## How It’s Made

### 1. Integration of front-end and back-end

The app is built with [Next.js](https://nextjs.org) so that I can seamlessly integrate code bases for the front-end UI ([src/pages/](https://github.com/masakudamatsu/mima/tree/main/src/pages)) and for the back-end server ([src/pages/api](https://github.com/masakudamatsu/mima/tree/main/src/pages/api)).

### 2. Embedded Google Maps

For a map, I rely on Google Maps, rather than map services based on OpenStreetMap (e.g., Mapbox), because I find its place search feature is the best. Place search is at the core of _My Ideal Map_ because its main feature, saving a place of interest, cannot be done without searching a place.

Consequently, with [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview), the app embeds custom-styled Goole Maps fullscreen ([src/components/Map.js](https://github.com/masakudamatsu/mima/blob/main/src/components/Map.js)). 

Since I use Next.js, the actual implementation requires a little customization rather than simply following what the API documentation tells us to do. For detail, see my blog post “[4 gotchas when setting up Google Maps API with Next.js and ESLint](https://medium.com/web-dev-survey-from-kyoto/3-gotchas-of-google-maps-api-when-used-with-next-js-and-eslint-dba627c9657d)”.

### 3. Text editor

The app allows the user to save a place on the map along with a note that turns URLs into link text—a feature missing in Google Maps’s official app.

This feature is built with [TipTap](https://tiptap.dev), a very-easy-to-use rich-text editor library that extends ProseMirror, combined with [DOMPurify](https://github.com/cure53/DOMPurify#readme) for security and [Autolinker.js](https://github.com/gregjacobs/Autolinker.js#readme) for detecting URL strings. See the following React components for how I implement it:
- [src/components/SavedPlaces.js](https://github.com/masakudamatsu/mima/blob/main/src/components/SavedPlaces.js)
- [src/components/TiptapEditor.js](https://github.com/masakudamatsu/mima/blob/main/src/components/TiptapEditor.js)

### 4. Dark mode after 6pm

Google Maps's official app does not automatically switch between light and dark modes. The map in light mode is glaring when the user is walking outside after dark. The map in dark mode is difficult to see under the sunlight. _My Ideal Map_ aims to improve this aspect of user experience. 

The app detects the user’s local time with JavaScript’s `Date` object ([src/wrappers/NightModeContext.js](https://github.com/masakudamatsu/mima/blob/main/src/wrappers/NightModeContext.js)).

Then if it’s between 6pm and 6am, the app applies a `data-*` attribute to the `<body>` element to render the UI in dark mode ([src/hooks/useNightMode.js](https://github.com/masakudamatsu/mima/blob/main/src/hooks/useNightMode.js)).

For detail on implementation, see my blog post “[Switching embedded Google Maps into custom dark mode after 6pm](https://medium.com/p/9bd8bafa8040)”.

In the future, I plan to advance this feature by switching on the dark mode after the sunset in the user’s local area.

### 5. Autocomplete place search

It is a tough job to build autocomplete search from scratch with accessibility taken into account (see “[Editable Compobox with List Autocomplete](https://www.w3.org/WAI/ARIA/apg/example-index/combobox/combobox-autocomplete-list.html)” in _ARIA Authoring Practices Guide_). Consequently, I rely on battle-tested [Downshift.js](https://www.downshift-js.com). To customize the UI of the search box and autocomplete suggestions, I incorporate [Google Maps Places API](https://developers.google.com/maps/documentation/places/web-service/overview) into Downshift.js. 

See the following React components for how I implement it:
- [src/components/Search.js](https://github.com/masakudamatsu/mima/blob/main/src/components/Search.js)
- [src/components/SearchBox.js](https://github.com/masakudamatsu/mima/blob/main/src/components/SearchBox.js)

For more detail, see a trilogy of my blog posts on this topic:
- “[Making autocomplete search accessible for React apps with Downshift](https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-24-making-autocomplete-search-accessible-for-react-apps-with-downshift-1326cc6f86aa)”
- “[Adding Google Maps autocomplete search to a React app](https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-25-adding-google-maps-autocomplete-search-to-a-react-app-8d238aa07288)”
- “[Integrating Google Maps search with a React app](https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-26-integrating-google-maps-search-with-a-react-app-f380d2c6cb83)”

### 6. User’s current location

The app utilizes Geolocation API so that the user can track their own location on the embedded Google Maps. The app also detects the direction of movement from two subsequent locations with a trigonometry formula.

See the following React components for how I implement it:
- [src/components/Controls.js](https://github.com/masakudamatsu/mima/blob/main/src/components/Controls.js)
- [src/components/LocatorButton.js](https://github.com/masakudamatsu/mima/blob/main/src/components/LocatorButton.js)

For more detail, see my blog post “[Showing user’s direction of movement on embedded Google Maps](https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-15-showing-users-direction-of-movement-on-embedded-google-maps-7e85ac8534ac)”.

## Optimizations

### Dynamic import

To reduce the initial bundle size, I use Next.js’s [`next/dynamic` module](https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#nextdynamic) to lazy-load the React components for place search ([Lines 18-27 in Search.js](https://github.com/masakudamatsu/mima/blob/a1393e34bad0aa7f8139e4197110fd5009a64928/src/components/Search.js#L18))and for editing notes on saved places ([Lines 27-36 in SavedPlaces.js](https://github.com/masakudamatsu/mima/blob/a1393e34bad0aa7f8139e4197110fd5009a64928/src/components/SavedPlaces.js#L26)).

### Avoid `props` in Styled Components

I use Styled Components for generating CSS stylesheets. It is now widely known that performance can suffer from the use of CSS-in-JS. Following the [advice from Aggelos Arvanitakis in 2019](https://calendar.perfplanet.com/2019/the-unseen-performance-costs-of-css-in-js-in-react-apps/), I avoid the use of `props`, which causes the rendering of additional components (i.e., React context consumers).
