# My Ideal Map

A full-stack web app for those who love exploring cities to save places on the embedded Google Maps _with links to external sites_—a feature unavailable with Google Maps's official app unless you use clunky [Google My Maps](https://www.google.com/maps/about/mymaps/).

## URL

https://my-ideal-map.app

Accessing the above URL redirects you to a login page. Please follow the instruction there to log in to a demo account so that you can see how the app works.

Hosted by [Vercel](https://vercel.com/), chosen for its seamless integration with full-stack Next.js apps.

## Features (from a viewpoint of web development)

### Seamless integration of front-end and back-end with Next.js

The app is built with [Next.js](https://nextjs.org) so that I can seamlessly integrate code bases for the front-end UI ([src/pages/](https://github.com/masakudamatsu/mima/tree/main/src/pages)) and for the back-end server ([src/pages/api](https://github.com/masakudamatsu/mima/tree/main/src/pages/api)).

### Embedded Google Maps

With [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview), the app embeds custom-styled Goole Maps fullscreen ([src/components/Map.js](https://github.com/masakudamatsu/mima/blob/main/src/components/Map.js)). 

Please see my blog post “[4 gotchas when setting up Google Maps API with Next.js and ESLint](https://medium.com/web-dev-survey-from-kyoto/3-gotchas-of-google-maps-api-when-used-with-next-js-and-eslint-dba627c9657d)” for how I have overcome a few complications due to the use of Next.js.

### Text editor for the notes associated with saved places

The app allows the user to save a place on the map along with a note that turns URLs into link text—a feature missing in Google Maps's official app.

This feature is built with [TipTap](https://tiptap.dev), a very-easy-to-use rich-text editor library that extends ProseMirror.

### Switching to dark mode after 6pm in user's local time

The app detects the user's local time with JavaScript's `Date` object ([src/wrappers/NightModeContext.js](https://github.com/masakudamatsu/mima/blob/main/src/wrappers/NightModeContext.js)) and applies a `data-*` attribute to the `<body>` to render the UI in dark mode ([src/hooks/useNightMode.js](https://github.com/masakudamatsu/mima/blob/main/src/hooks/useNightMode.js)).

Google Maps's official app does not automatically switch between light and dark modes. The map in light mode is glaring when the user is walking around outside after dark. The map in dark mode is difficult to see under the sunlight. My Ideal Map aims to improve this aspect of user experience. 

For detail, see my blog post “[Switching embedded Google Maps into custom dark mode after 6pm](https://medium.com/p/9bd8bafa8040)”.

After the initial release, I plan to advance this feature by switching on the dark mode after the sunset in the user's local area.

### Autocomplete place search

It is a tough job to build autocomplete search from scratch with accessibility taken into account. Consequently, I rely on battle-tested [Downshift](https://www.downshift-js.com) and incorporate [Google Maps Places API](https://developers.google.com/maps/documentation/places/web-service/overview) into it to customize the UI of the search box and autocomplete suggestions.

For detail, see a trilogy of my blog posts on this topic:
- “[Making autocomplete search accessible for React apps with Downshift](https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-24-making-autocomplete-search-accessible-for-react-apps-with-downshift-1326cc6f86aa)”
- “[Adding Google Maps autocomplete search to a React app](https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-25-adding-google-maps-autocomplete-search-to-a-react-app-8d238aa07288)”
- “[Integrating Google Maps search with a React app](https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-26-integrating-google-maps-search-with-a-react-app-f380d2c6cb83)”

### Showing the user's current location

With Geolocation API, the user can track their own location on the embedded Google Maps. The app detects the direction of movement from two subsequent locations with a trigonometry formula. 

For detail, see my blog post “[Showing user’s direction of movement on embedded Google Maps](https://medium.com/100-days-in-kyoto-to-create-a-web-app-with-google/day-15-showing-users-direction-of-movement-on-embedded-google-maps-7e85ac8534ac)”.


