# containers

A container does the data fetching for a small part of the application. It can represent a page or a fragment of a page.

A container is allowed to import the following stuff:
* `containers/*`
* `components/*`
* `utils/*`

Don't import:
* `elements/*` -> use a component instead
