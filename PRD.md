# Product Requirements Document (PRD)
## SP25 - Exploring User Interaction Educational Website

### Overview
An educational website showcasing interactive demos for students learning web interaction design, animation, and creative coding. Each project demonstrates a specific technique or effect with accessible source code.

---

### Target Audience
- Students in the SP25 Exploring User Interaction course
- Learners interested in interactive web design
- Anyone wanting to understand specific interaction patterns

---

### Project Categories

#### 1. ANIMATION
Demos focused on motion, timing, and visual effects.

**Current Projects:**
- Parallax Scrolling
- Depth (placeholder)
- Easing (placeholder)
- Staggered Timing (placeholder)

#### 2. BASIC INTERACTION
Demos teaching DOM manipulation, event handling, and JavaScript fundamentals with HTML elements.

**Current Projects:**
- *(No demos yet)*

#### 3. BY REQUEST
Student-requested effects and techniques - demos created based on direct student questions about how to achieve specific effects.

**Current Projects:**
- Breaking Grid (click interaction)
- Deconstructed Text (click + physics)
- Turning Knob (drag interaction)
- Image Array (click + animation sequence)
- AI Chatbot (API integration, dynamic UI)

---

### Site Structure

#### Navigation Pattern
- **Category tabs/sections** on main page
- Click category to reveal projects within that category
- Clean, scannable organization

#### Homepage Layout
```
[Header: Course Title + Description]

[Category Tabs]
  [ ANIMATION ] [ BASIC INTERACTION ] [ BY REQUEST ]

[Project Grid - filtered by selected category]
  [Project Card] [Project Card] [Project Card]
  - Preview image
  - Title
  - Short description
  - Click to view demo

[Footer]
```

#### Individual Demo Pages
Each demo page should include:
1. **Demo area** - The interactive experience
2. **Title + description** - What the demo teaches
3. **GitHub link** - Link to project folder for source code
4. **Back navigation** - Return to main site

---

### GitHub Integration

**Link Format:** Single link to project folder
- Base URL: `https://github.com/StrungOwl/SP26-Exploring-User-Interaction/tree/main/`
- Example: `https://github.com/StrungOwl/SP26-Exploring-User-Interaction/tree/main/Breaking%20Grid`

**Placement:** Visible button/link on each demo page
- Suggested text: "View Source on GitHub" or "Get the Code"

---

### Technical Stack
- **Creative coding:** p5.js library
- **Standard web:** HTML, CSS, vanilla JavaScript
- **Styling:** Modern CSS (flexbox, grid, custom properties)
- **No build process** - Each project is self-contained

---

### Design Guidelines

#### Visual Style
- Dark theme (consistent with current design)
- Accent colors: Cyan, indigo/purple
- Glassmorphism effects on cards
- Smooth transitions and hover states

#### Responsive Design
- Mobile-friendly layouts
- Touch-compatible interactions where possible

---

### File Organization

```
SP25-Exploring-User-Interaction/
├── index.html              (main homepage)
├── styles.css              (homepage styles)
├── PRD.md                  (this document)
├── README.md               (repo documentation)
├── xScreenshots/           (preview images)
│
├── ANIMATIONS/
│   ├── Parallax Scrolling/
│   ├── Depth/
│   ├── Easing/
│   └── Staggered Timing/
│
├── Breaking Grid/
├── Deconstructed Text/
├── Turning Knob/
├── Image Array/
└── AI Chatbot/
```

---

### Future Considerations
- Categories may evolve as new demos are added
- Consider adding search/filter functionality if project count grows
- Potential for student contribution section
- Code highlighting/explanation overlays on demos

---

### Success Metrics
- Students can easily find demos by category
- Source code is one click away
- New projects can be added without restructuring site

---

*Last updated: January 2026*
