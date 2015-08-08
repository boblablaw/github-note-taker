# components

> These components are used by `../containers` or by other components.

A component doesn't do any data fetching and expects data pass via `props`. It represents a reusesable component that can be used in different contexts. A component can have state. A component expects high-level data.

A component is allowed to import the following stuff:
* `components/*`
* `elements/*`

Don't import:
* external styles and components -> wrap the style or component in an element
