# Universal Link Router

Centralized link management for the ICPC Menofia website. Use semantic link keys instead of manual relative paths.

## Usage

```html
<!-- Instead of: ../../../community/coaches/#abdelrhman-sersawy -->
<a href="#" data-link="coach:abdelrhman_sersawy">Abdelrhman Sersawy</a>

<!-- Instead of: ../../resources/sessions/level1/ -->
<a href="#" data-link="page:level1_sessions">Level 1 Sessions</a>

<!-- External links -->
<a href="#" data-link="external:discord" target="_blank">Discord</a>
```

## Link Types

### Coaches (`coach:`)
```html
<a href="#" data-link="coach:abdelrhman_sersawy">Abdelrhman Sersawy</a>
<a href="#" data-link="coach:ahmed_mousa">Ahmed Mousa</a>
<a href="#" data-link="coach:amr_saud">Amr Saud</a>
```

### Pages (`page:`)
```html
<a href="#" data-link="page:about">About Us</a>
<a href="#" data-link="page:training">Training</a>
<a href="#" data-link="page:level1_sessions">Level 1 Sessions</a>
<a href="#" data-link="page:resources">Resources</a>
```

### External (`external:`)
```html
<a href="#" data-link="external:discord">Discord</a>
<a href="#" data-link="external:vjudge_level1">VJudge</a>
<a href="#" data-link="external:github">GitHub</a>
```

## Adding New Links

Edit the `LINKS` object in `universal-link-router.js`:

```javascript
const LINKS = {
  'coach:new_coach': '/community/coaches/#new-coach',
  'page:new_page': '/path/to/page/',
  'external:new_site': 'https://example.com'
};
```

## Rules

- Use absolute paths (`/community/coaches/`)
- No `.md` extensions
- Coach keys: `coach:first_last`
- Page keys: `page:descriptive_name`
- External keys: `external:service_name`

See the `LINKS` object in `universal-link-router.js` for all available links. 